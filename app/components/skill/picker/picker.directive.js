// drives the main skill picker row in the middle of the screen.
// Recursively loads skill upgrades.
// Handles passive selection.
angular.module('skill.picker.directive', [
    'skill.service',
    'skill.picker.upgrade.directive',
    'ui.bootstrap',
    'ui.bootstrap.progressbar'
])
    .directive('skillPicker',
        ['SkillService', function(SkillService) {
            return {
                restrict: 'E',
                scope: {
                    heroId: '=',
                    skills: '=',
                    passives: '='
                },
                link: function(scope) {
                    var highlighted = {
                        skill: false,
                        passiveSlot: false
                    };
                    scope.toggleSkillHighlight = function(skill) {
                        if (highlighted.skill.name !== skill.name) {
                            highlighted.skill = skill;
                        } else {
                            highlighted.skill = false;
                        }
                        highlighted.passiveSlot = false
                    }
                    scope.isSkillHighlighted = function(skill) {
                        return highlighted.skill && highlighted.skill.name == skill.name;
                    }
                    scope.isSkillUpgradeSelected = SkillService.isSkillUpgradeSelected;

                    scope.togglePassiveHighlight = function(passiveSlot) {
                        if (SkillService.isPassiveAvailable(passiveSlot) && highlighted.passiveSlot !== passiveSlot) {
                            highlighted.passiveSlot = passiveSlot;
                            highlighted.skill = false;
                        } else {
                            highlighted.passiveSlot = false
                        }
                    }
                    scope.isPassiveHighlighted = function(passiveSlot) {
                        return highlighted.passiveSlot === passiveSlot;
                    }
                    scope.selectPassive = function(passive, $event) {
                        $event.stopPropagation();
                        if (highlighted.passiveSlot === false || !SkillService.isPassiveSlotSelected(highlighted.passiveSlot)) {
                            SkillService.selectPassive(passive, highlighted.passiveSlot);
                        }
                    }

                    scope.isPassiveAvailable = SkillService.isPassiveAvailable;
                    scope.isPassiveSelected = SkillService.isPassiveSelected;
                    scope.getRequiredLevelForPassive = SkillService.getRequiredLevelForPassive;
                    scope.isPassiveSlotSelected = SkillService.isPassiveSlotSelected;

                    scope.getPassiveForSlot = function(passiveSlot) {
                        if (SkillService.isPassiveSlotSelected(passiveSlot)) {
                            return SkillService.getSkillInfoByName(scope.heroId, SkillService.getSelectedPassives()[passiveSlot]);
                        }
                    }

                    // recurse down the (very short) tree to find out if we've hit the end (so we can hide level up indicators)
                    function checkSelectionTree(skill) {
                        if (skill.upgrades) {
                            return checkSelectionTree(skill.upgrades.left) || checkSelectionTree(skill.upgrades.right);
                        }
                        return SkillService.isSkillUpgradeSelected(skill);
                    }
                    scope.isFullySelected = function(skill) {
                        return checkSelectionTree(skill);
                    }
                },
                templateUrl: 'views/components/skill/picker/picker.tpl'
            };
        }]);