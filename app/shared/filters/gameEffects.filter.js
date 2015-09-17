//
angular.module('gameEffects.filter', [
    'ngSanitize',
    'tooltip.directive',
    'skill.service'
])
    /**
     * @ngdoc filter
     * @name gameEffects.filter:gameEffects
     * @restrict E
     * @requires skill.service:SkillService
     * @requires ngSanitize
     * @description Parses skill description text for tags that can be displayed as colored text or skill/upgrade/passive tooltips.
     *              Scrape an input string for [foo | bar] to convert into colored text (with tooltips for skills) based on type 'bar'
     * @param {String} input the string to scrape
     */
    .filter('gameEffects', ['SkillService', function(SkillService) {
        return function(input) {
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
    /**
     * @ngdoc directive
     * @name gameEffects.filter:gameTips
     * @restrict A
     * @requires skill.service:SkillService
     * @requires tooltip.directive:skillTooltip
     * @requires ngSanitize
     * @description this wonky expletive is essentially here to double-compile gameEffects-filtered text so that we can stick directives in the filtered output and have them work
     * @scope
     * @param {String} desc the description string
     */
    //
    .directive('gameTips',
        ['$compile', '$filter', 'SkillService',
        function($compile, $filter, SkillService) {
            return {
                restrict: 'A',
                scope: {
                    desc: '='
                },
                link: function(scope, elm) {
                    scope.$watch('desc', function(newVal) {
                        scope.skills = [];
                        // sets up the tooltip skill scope to match gameEffects, but makes no actual replacements
                        newVal.replace(/\[([^\|]+)\|\s?(\w+)\]/g, function(match, value, type) {
                            if (type == 'skill') {
                                value = value.trim(); // @todo do this with regex?
                                scope.skills.push(SkillService.getSkillByKey(value));
                                scope.heroId = SkillService.getCurrentHero();
                            }
                            return match;
                        });
                        scope.desc = newVal;
                        var filtered = $filter('gameEffects')(scope.desc);
                        elm.empty();
                        elm.append($compile('<span>'+filtered+'</span>')(scope))
                    });
                },
            };
        }])
