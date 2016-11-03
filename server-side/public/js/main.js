angular.module('googledrive', ['ngRoute','ngResource','ngFileUpload'])
    .config( function($routeProvider) {
       
        $routeProvider.when('/ol', {
                    templateUrl: 'partials/arquivos.html',
                    controller: 'googledriveController'
                });
        $routeProvider.when('/criarpasta',{
                templateUrl :'partials/folder.html',
                controller: 'folderController'
        });

    }); 