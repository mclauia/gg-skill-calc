angular.module('tooltip.directive', [
    'skill.service',
])
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
                templateUrl: 'views/shared/tooltip/tooltip.tpl',
                link: function(scope, elm, attrs, ctrl) {}
            };
        }])
