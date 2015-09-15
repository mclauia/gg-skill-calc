angular.module('tooltip.directive', [
    'skill.service',
])
    /**
     * @ngdoc directive
     * @name tooltip.directive:skillTooltip
     * @restrict E
     * @requires skill.service:SkillService
     * @description Creates a skill tooltip for a root skill, skill upgrade, or passive
     * @scope
     * @param {Object} skill the skill object
     * @param {Boolean} show when to show the tooltip
     * @param {String=} heroId the hero id for the skill picker
     * @param {String=} key the skill's hotkey, for displaying root skills
     */
    .directive('skillTooltip',
        ['SkillService',
        function(SkillService) {
            return {
                restrict: 'E',
                scope: {
                    skill: '=',
                    show: '=',
                    key: '=?',
                    heroId: '=?'
                },
                templateUrl: 'views/shared/tooltip/tooltip.tpl'
            };
        }])
