angular.module('gameEffects.filter', [
    'ngSanitize',
    'tooltip.directive',
    'skill.service'
])
    .filter('gameEffects', ['SkillService', function(SkillService) {
        return function(input) {
            // parse [foo | bar] into colored text (with tooltips for skills) based type 'bar'
            if (!input) {
                return;
            }
            var i = 0;
                replaced = input.replace(/\[([^\|]+)\|\s?(\w+)\]/g, function(match, value, type) {
                    var tt = '', mo = '';
                    value = value.trim();
                    // none of this will do anything if it doesnt get angularly recompiled; should it move down below?
                    if (type == 'skill') {
                        var skill = SkillService.getSkillByKey(value), key = value;
                        tt = '<skill-tooltip skill="skills['+i+']" hero-id="heroId" key="\''+key+'\'" show="hover['+i+']"></skill-tooltip>';
                        mo = ' ng-mouseover="hover['+i+']=true" ng-mouseleave="hover['+i+']=false"'
                        value = '['+key.toUpperCase()+'] ' + skill.name;
                    }
                    i++;
                    return '<strong' + mo + ' class="' + type + '">' + tt + value + '</strong>';
                });
            return replaced;
        };
    }])
    // this wonky expletive is essentially here to double-compile gameEffects-filtered text so that we can stick directives in the filtered output and have them work
    .directive('gameTips',
        ['$compile', '$filter', 'SkillService',
        function($compile, $filter, SkillService) {
            return {
                restrict: 'A',
                scope: {
                    desc: '='
                },
                link: function(scope, elm) {
                    scope.skills = [];
                    // setting up the scope we'll use to compile, but not actually replacing anything
                    scope.desc.replace(/\[([^\|]+)\|\s?(\w+)\]/g, function(match, value, type) {
                        if (type == 'skill') {
                            value = value.trim(); // @todo do this with regex?
                            scope.skills.push(SkillService.getSkillByKey(value));
                            scope.heroId = SkillService.getCurrentHero();
                        }
                        return match;
                    });
                    var filtered = $filter('gameEffects')(scope.desc);
                    elm.append($compile('<span>'+filtered+'</span>')(scope))
                },
            };
        }])
