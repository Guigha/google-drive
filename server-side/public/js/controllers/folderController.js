angular.module('googledrive')
    .controller('folderController',['$scope','$resource','Upload', 
        function($scope, $resource, Upload) {
        
        var createFolder = $resource('/createFolder');
/******************************************
    #CREATEDBY GUILHERME SOARES
    #NOTE: SOLICITA A ROTA PARA CRIAR PASTA
********************************************/   
       $scope.update = function(folder) {
           if(folder.name){
                $scope.loading = true;
                createFolder.save(folder, function (res) {
                    console.log(res);
                    $scope.loading = false;
                    $scope.resposta = 'Pasta criada com sucesso - ID = '+ res.id
                     + ' - Nome = ' + res.title;
                }, function(err){
                    console.log('erro ao criar a pasta'+ err);
                    $scope.resposta = 'Erro ao criar a Pasta';
                });
            }
       }
    
/******************************************
    #CREATEDBY GUILHERME SOARES
    #NOTE: SOLICITA A ROTA PARA ARQUIVO
********************************************/ 
        $scope.uploader= function(file) {
            console.log(file);
            $scope.loading = true;
            Upload.upload({
                url: '/Files',
                data: {file: $scope.files, 'name': file.name}
            }).then(function (resp) {
               // console.log('Success ' + resp + 'uploaded. Response: ' + resp.data);
                $scope.respostaFile = resp;//'Arquiv salvo com sucesso - ID = '+ res.id
                   // + ' - Nome = ' + res.title;
                  $scope.loading = false;
                $scope.resposta= 'wwwwss';
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
                console.log(file.name);
                console.log($scope.files);
          
            }
}]);