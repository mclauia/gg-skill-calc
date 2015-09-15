angular.module('skill.picker.upgrade.directive', [
    'gameEffects.filter',
    'skill.service',
    'RecursionHelper'
])
    /**
     * @ngdoc directive
     * @name skill.picker.upgrade.directive:skillUpgrade
     * @restrict E
     * @requires skill.service:SkillService
     * @requires gameEffects.filter:gameEffects
     * @requires RecursionHelper
     * @description Recursively constructs the skill upgrade tree for a skill node.
     * @scope
     * @param {Object} upgrades the binary tree of upgrades
     */
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
    /**
     * @ngdoc directive
     * @name skill.picker.upgrade.directive:upgradeBranchLines
     * @restrict E
     * @description constructs some css lines for the upgrade tree
     * @requires skill.service:SkillService
     * @scope
     * @param {Number} index the index of the node in its parent tree
     * @param {Object} upgrade the upgrade node itself
     */
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