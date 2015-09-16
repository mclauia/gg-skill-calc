/**
 * @ngdoc object
 * @name skill.controller:SkillController
 * @description loads all the skill editor/inspector action, and handles switching between hero skillsets, as well as importing/exporting controls
 * @requires skill.picker.directive:skillPicker
 * @requires skill.timeline.directive:skillTimeline
 * @requires language.filter
 * @requires ngStorage
 */
angular.module('skill.controller', [
    'skill.picker.directive',
    'skill.timeline.directive',
    'language.filter',
    'ngStorage'
])
    .controller('SkillController',
        ['$scope', '$route', '$location', 'PatchService', 'SkillService', 'patchData',
        function($scope, $route, $location, PatchService, SkillService, patchData) {
            // reset skill points used, skills
            $scope.changeHero = function(hero) {
                $scope.selectedHero = hero;
                SkillService.resetSkills();
                SkillService.setCurrentHero($scope.selectedHero.id);
                $scope.heroId = $scope.selectedHero.id;
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

            $scope.exportSelections = function() {
                $scope.exported = SkillService.exportSelections();
            }
            $scope.importSelections = function() {
                SkillService.importSelections($scope.exported);
            }
        }]);