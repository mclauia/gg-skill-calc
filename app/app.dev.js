angular.module('skillCalcAppDev', ['skillCalcApp', 'ngMockE2E', 'patch.data'])
    .run(['$httpBackend', 'PatchData', function($httpBackend, PatchData) {
        $httpBackend.whenGET('/patch').respond(PatchData);
        $httpBackend.whenGET(/^views\/.*/).passThrough();
    }]);