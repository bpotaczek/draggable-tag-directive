(function () {
    'use strict';

    angular.module('tag-directive').directive('draggableTag', ['tagService', '$sce', draggableTag]);

    function draggableTag(tagService, $sce) {
        return {
            restrict: 'E',
            templateUrl: 'tag-directive.html',
            require: '^tagContainer',
            scope: {
                value: '=ngModel',
                draggableModel: '=',
                disabled: '=ngDisabled',
                group: '=groupCode',
                likes: '=',
                dislikes: '=',
                experts: '='
            },
            link: function ($scope, element, attributes, tagsController) {
                var validDrop = false;
                $scope.showGroup = ($scope.group !== null);
                $scope.groupCode = $sce.trustAsHtml($scope.group);
                element.on('dragstart', function (ev) {
                    omniTagService.dragState = false;
                    var tag = angular.toJson($scope.draggableModel);
                    ev.originalEvent.dataTransfer.setData("Text", tag);
                });
                element.on('dragend', function (ev) {
                    if (tagService.dragState) {
                        tagsController.removeTag($scope.$parent.$index);
                    }
                });
            }
        };
    }
})();