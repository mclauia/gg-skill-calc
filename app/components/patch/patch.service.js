angular.module('patch.service', [])
     /**
     * @ngdoc service
     * @name patch.service:PatchService
     * @description
     *  get data about patches
     */
   .service('PatchService', ['$q', '$http', function($q, $http) {
        var cachedPatchData;

        /**
         * @ngdoc method
         * @name patch.service#loadCurrent
         * @methodOf patch.service:PatchService
         * @description     load the current patch data.
         *                  See patch.data for faked dev backend response.
         * @returns {Promise} for the http call; resolves with patch data
         */
        this.loadCurrent = function() {
            if (cachedPatchData) {
                return $q.when(cachedPatchData);
            }

            return $http.get('/patch').then(function(response) {
                return cachedPatchData = response.data[0];
            });
        };

        /**
         * @ngdoc method
         * @name patch.service#getCurrent
         * @methodOf patch.service:PatchService
         * @description     get the current patch data (should already be loaded)
         * @returns {Object} current patch data
         */
        this.getCurrent = function() {
            if (cachedPatchData) {
                return cachedPatchData;
            } else {
                throw 'you are trying to get data before you load it';
            }
        };

        /**
         * @ngdoc method
         * @name patch.service#getByVersion
         * @methodOf patch.service:PatchService
         * @description     Get patch data by a particular version
         * @param {string} version the patch version to get
         * @returns {Object} patch data for this version
         */
        this.getByVersion = function(version) {
            for (var i = 0; i < PatchData.length; i++) {
                if (PatchData[i].version == version) {
                    return PatchData[i];
                }
            }
        };

        /**
         * @ngdoc method
         * @name patch.service#getVersions
         * @methodOf patch.service:PatchService
         * @description     get a list of patch versions from the response
         * @returns {Array} list of versions
         */
        this.getVersions = function() {
            var versions = [];
            for (var i = 0; i < PatchData.length; i++) {
                versions.push(PatchData[i].version);
            }
            return versions;
        }
    }]);