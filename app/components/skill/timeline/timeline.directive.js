angular.module('skill.timeline.directive', [
    'skill.timeline.summary.directive',
    'skill.service',
])
    .directive('skillTimeline',
        ['SkillService',
        function(SkillService) {
            return {
                restrict: 'E',
                scope: {
                    heroId: '=',
                    skills: '=',
                    passives: '='
                },
                templateUrl: 'views/components/skill/timeline/timeline.tpl',
                link: function(scope, elm) {

                    scope.selectedSkillUpgradesInfo = [];

                    scope.$watch(SkillService.getSelectedSkillUpgrades, function(newVal) {
                        scope.selectedSkillUpgrades = newVal;
                        for (var i = 0; i < 9; i++) {
                            if (scope.selectedSkillUpgrades[i]) {
                                scope.selectedSkillUpgradesInfo[i] = SkillService.getSkillInfoByName(scope.heroId, scope.selectedSkillUpgrades[i]);
                            } else {
                                scope.selectedSkillUpgradesInfo[i] = {};
                            }
                        };
                        scope.sliceAllSkills();
                    }, true);
                    scope.$watch(SkillService.getSelectedPassives, function(newVal) {
                        scope.selectedPassives = newVal;
                        scope.sliceAllSkills();
                    }, true);

                    scope.wasRootOfSkillSelectedAtLevel = function(skill, index) {
                        if (!scope.selectedSkillUpgrades[index]) return false;
                        var skillInfo = scope.selectedSkillUpgradesInfo[index];

                        return skillInfo.root.name == skill.name;
                    }

                    scope.hasRootBeenUpgraded = function(skill) {
                        return SkillService.isUpgraded(skill, scope.slicedSkills);
                    }
                    scope.getSkillSelectedAtLevel = function(index) {
                        return scope.selectedSkillUpgradesInfo[index];
                    }
                    scope.getPassiveInfo = function(passiveName) {
                        return SkillService.getSkillInfoByName(scope.heroId, passiveName);
                    }
                    scope.sliceSkills = function(level) {
                        if (scope.selectedSkillUpgrades.length > level - 2) {
                            scope.sliceLevel = level;
                            scope.slicedSkills = scope.selectedSkillUpgrades.slice(0, level - 1);
                        }
                    }
                    scope.sliceAllSkills = function() {
                        scope.slicedPassives = scope.selectedPassives;
                        scope.slicedSkills = scope.selectedSkillUpgrades;
                        scope.sliceLevel = scope.selectedSkillUpgrades.length + 1;
                    }

                },
            };
        }])