// loads a dev app which sets up our fake api for patch data. in a release environment, the main template would not include this.
angular.module('skillCalcAppDev', ['skillCalcApp', 'ngMockE2E', 'patch.data'])
    .run(['$httpBackend', 'PatchData', function($httpBackend, PatchData) {
        $httpBackend.whenGET('/patch').respond(PatchData);
        $httpBackend.whenGET(/^views\/.*/).passThrough();
    }]);