// get data about patches
angular.module('patch.service', [])
    .service('PatchService', ['$q', '$http', function($q, $http) {
        var cachedPatchData;

        // load the current patch data
        this.loadCurrent = function() {
            if (cachedPatchData) {
                return $q.when(cachedPatchData);
            }

            return $http.get('/patch').then(function(response) { // see patch.data
                return cachedPatchData = response.data[0];
            });
        };

        // get the current patch data (should already be loaded)
        this.getCurrent = function() {
            if (cachedPatchData) {
                return cachedPatchData;
            } else {
                throw 'you are trying to get data before you load it';
            }
        };

        this.getByVersion = function(version) {
            for (var i = 0; i < PatchData.length; i++) {
                if (PatchData[i].version == version) {
                    return PatchData[i];
                }
            }
        };

        this.getVersions = function() {
            var versions = [];
            for (var i = 0; i < PatchData.length; i++) {
                versions.push(PatchData[i].version);
            }
            return versions;
        }
    }]);