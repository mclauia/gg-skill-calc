angular.module('skill.timeline.summary.directive', [
    'skill.service',
])
    /**
     * @ngdoc directive
     * @name skill.timeline.summary.directive:skillSummary
     * @restrict E
     * @requires skill.service:SkillService
     * @description Handles binding the skill summary area to the sliced set of skills
     *               (which will match the latest until the user interacts with the timeline)
     * @scope
     * @param {String} heroId the hero id for the skill picker
     * @param {Object} skills the hero's skills object, keyed by hotkey
     * @param {Array} slicedSkills a set of skill names sliced by the timeline
     */
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