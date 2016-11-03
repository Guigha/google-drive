angular.module('googledrive')
    .controller('googledriveController',['$scope','$resource','Upload', function( $scope,$resource, Upload) {

        var getFiles = $resource('/Files');
        var upFiles = $resource('/upFiles');
        
        
        $scope.onFileSelect = function(files) {
        Upload.upload({
            url: '/upFiles',
            data: {file: files, 'username': files.name}
        }).then(function (resp) {
            console.log('Success ' + resp + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            //console.log('Error status: ' + resp.status);
        }, function (evt) {
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
        }
        getFiles.get(function (list){
            if(list !=""){
                $scope.files = list.items;
                $scope.quantidade = list.items.length;
                $scope.img = '/img/folder.png';
            }else{
                $scope.token = "Não há itens";
            }
        },function(err){
           console.log('erro de resposta');
        });
        
     
}]);