(function () {
    'use strict';

    angular.module('tag-directive')
        .directive('tagContainer', ['tagService', tagContainer]);

    function tagContainer(tagService) {
        return {
            restrict: 'E',
            templateUrl: 'tag-container.html',
            scope: {
                tags: '=ngModel',
                disabled: '=ngDisabled',
                keep: '=staticList'
            },
            link: function ($scope, element, attributes) {
                element.on('dragover', function (ev) {
                    ev.originalEvent.dataTransfer.dropEffect = 'copy';
                    ev.preventDefault();
                });
                element.on('drop', function (ev) {
                    omniTagService.dragState = true;
                    var data = ev.originalEvent.dataTransfer.getData("Text");
                    $scope.$apply(function () {
                        var tag = angular.fromJson(data);
                        $scope.tags.push(tag);
                    });
                });
            },
            controller: function ($scope) {
                this.removeTag = function (index) {
                    if (!$scope.keep) {
                        $scope.$apply(function () {
                            $scope.tags.splice(index, 1);
                        })
                    }
                }
            }
        };
    }
})();