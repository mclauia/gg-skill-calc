angular.module('skill.controller', [
    'skill.picker.directive',
    'skill.timeline.directive',
    'language.filter',
    'ngStorage'
])
    .controller('SkillController',
        ['$scope', '$route', 'PatchService', 'SkillService', 'patchData',
        function($scope, $route, PatchService, SkillService, patchData) {
            // request the current patch data and wait for response

            // reset skill points used, skills
            $scope.changeHero = function(hero) {
                $scope.selectedHero = hero;
                SkillService.setCurrentHero($scope.selectedHero.id);
                $scope.heroId = $scope.selectedHero.id;

                SkillService.resetSkills();
            };

            $scope.patch = patchData;
            $scope.heroes = patchData.body.heroes;

            // switch to the first hero in the object
            var heroId = SkillService.getCurrentHero();
            if (!heroId) {
                SkillService.setCurrentHero(patchData.body.heroes[Object.keys(patchData.body.heroes)[0]].id);
                heroId = SkillService.getCurrentHero();
            }
            $scope.selectedHero = $scope.heroes[heroId];
            $scope.heroId = $scope.selectedHero.id;

            $scope.resetSkills = SkillService.resetSkills;
            $scope.getSelectedSkillUpgrades = SkillService.getSelectedSkillUpgrades;

        }]);