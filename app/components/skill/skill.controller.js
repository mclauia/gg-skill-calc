angular.module('skill.controller', [
    'skill.picker.directive',
    'skill.timeline.directive',
    'language.filter',
    'ngStorage'
])
    .controller('SkillController',
        ['$scope', '$route', '$localStorage', 'PatchService', 'SkillService', 'patchData',
        function($scope, $route, $localStorage, PatchService, SkillService, patchData) {
            // request the current patch data and wait for response

            // reset skill points used, skills
            $scope.changeHero = function(hero) {
                $scope.selectedHero = hero;
                $storage.heroId = $scope.heroId = $scope.selectedHero.id;

                SkillService.resetSkills();
            };

            $scope.patch = patchData;
            $scope.heroes = patchData.body.heroes;

            // switch to the first class in the object
            var $storage = $localStorage.$default({
                heroId: patchData.body.heroes[Object.keys(patchData.body.heroes)[0]].id
            });
            $scope.selectedHero = $scope.heroes[$storage.heroId];
            $scope.heroId = $storage.heroId;

            $scope.resetSkills = SkillService.resetSkills;
            $scope.getSelectedSkillUpgrades = SkillService.getSelectedSkillUpgrades;

        }]);