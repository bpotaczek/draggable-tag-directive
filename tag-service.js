(function () {
    'use strict';

    angular.module('tag-directive').factory('tagService', tagService);

    function tagService() {
        return {
            dragState: false
        };
    }
})();