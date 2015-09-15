angular.module('skill.picker.upgrade.directive', [
    'gameEffects.filter',
    'skill.service',
    'RecursionHelper'
])
    .directive('skillUpgrade',
        ['RecursionHelper', 'SkillService',
        function(RecursionHelper, SkillService) {
            return {
                restrict: 'E',
                scope: {
                    upgrades: '=',
                },
                templateUrl: 'views/components/skill/picker/upgrade/upgrade.tpl',
                compile: function(elm) {
                    // avoiding angular directive recursion infinite loops
                    return RecursionHelper.compile(elm, function(scope){

                        scope.isSelected = SkillService.isSkillUpgradeSelected;
                        scope.isSiblingSelected = SkillService.isSkillUpgradeSiblingSelected;

                        scope.selectSkillUpgrade = function(skill, event) {
                            event.stopPropagation();
                            if (SkillService.isSkillUpgradeSiblingSelected(skill, scope.upgrades)) {
                                return false;
                            }
                            return SkillService.selectSkillUpgrade(skill, scope.upgrades);
                        };
                    });
                },
            };
        }])
    .directive('upgradeBranchLines',
        ['SkillService', function(SkillService) {
            return {
                restrict: 'E',
                scope: {
                    index: '=',
                    upgrade: '='
                },
                template: '<div class="lines" ng-class="{\'right-tree\':index, \'left-tree\':!index, \'selected\': isUpgradeSelected(upgrade)}">'
                            + '<div class="line vertical root"></div>'
                            + '<div class="line horizontal"></div>'
                            + '<div class="line vertical branch" ng-show="index || isUpgradeSelected(upgrade)"></div>'
                        + '</div>',
                link: function(scope, elm) {
                    scope.isUpgradeSelected = function() {
                        return SkillService.isSkillUpgradeSelected(scope.upgrade);
                    }
                },
            };
        }])

;