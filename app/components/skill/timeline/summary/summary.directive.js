angular.module('skill.timeline.summary.directive', [
    'skill.service',
])
    .directive('skillSummary',
        ['SkillService',
        function(SkillService) {
            return {
                restrict: 'E',
                scope: {
                    skills: '=',
                    slicedSkills: '=',
                    heroId: '='
                },
                templateUrl: 'views/components/skill/timeline/summary/summary.tpl',
                link: function(scope, elm) {
                    scope.hasRootBeenUpgraded = function(skill) {
                        return SkillService.isUpgraded(skill, scope.slicedSkills);
                    }
                    scope.getUpgradesForKey = function(key) {
                        var out = [];
                        for (var i = 0; i < scope.slicedSkillsInfo.length; i++) {
                            if (scope.slicedSkillsInfo[i].hotkey == key) {
                                out.push(scope.slicedSkillsInfo[i]);
                            }
                        };

                        return out;
                    }

                    scope.slicedSkillsInfo = [];
                    scope.$watch('slicedSkills', function(newVal) {
                        var slicedSkills = newVal;
                        scope.slicedSkillsInfo = [];
                        for (var i = 0; i < slicedSkills.length; i++) {
                            if (slicedSkills[i]) {
                                scope.slicedSkillsInfo[i] = SkillService.getSkillInfoByName(scope.heroId, slicedSkills[i]);
                            } else {
                                scope.slicedSkillsInfo[i] = {};
                            }
                        };
                    }, true)

                },
            };
        }])