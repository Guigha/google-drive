var googleAuth = require('google-oauth-jwt');
var request = require('request');
var googleDrive = require('google-drive');
var formidable = require('formidable');
var FileReader = require('filereader');
var fs = require('fs');
var blobb = require('blob-util');
console.log(blobb.createBlob);
module.exports = function(app) {
   var form = new formidable.IncomingForm();
    var GlobalToken =  app.models.token;// carregado pelo express load;
    var controller = {}; 
    
/******************************************
    #CREATEDBY GUILHERME SOARES
    #NOTE: RECUPERA OS ARQUIVOS E PASTAS
********************************************/
    controller.getFiles = function(req, res){
        
        GlobalToken.getToken().then(function(TOKEN){
            if (TOKEN) {
                var url = 'https://www.googleapis.com/drive/v2/files';
                var params = { access_token: TOKEN };

                // Send the API request
                request.get({url:url, qs:params}, function(err, resp, body) {
                    var list = JSON.parse(body);

                    if (err) return console.error("Error occured: ", err);
                    if (list.error) return console.error("Error returned from Google: ", list.error);
                   // console.log(list);
                    res.json(list);
                });
            }else {
                console.log("Token não recuperado como esperado");
                res.send("");
            }
        }).catch(function(err){
            console.log("Não foi possivel recuperar o Token de conexão"); 
            res.send("");
        });
    }
    

      
/******************************************
    #CREATEDBY GUILHERME SOARES
    #NOTE: CRIA PASTA NO GOOGLE DRIVE
********************************************/     
    controller.createFolder = function (req, res) {
           GlobalToken.getToken().then(function(TOKEN){
            var meta = {
                "title": req.body.name,
                "mimetype" :'application/vnd.google-apps.folder'
            };
            var params = {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ TOKEN
            };
               
            googleDrive(TOKEN).files().insert(meta, params, callback);
        
            function callback(err, response, body) {
                if (err) return console.log('err', err)
                console.log('body', JSON.parse(body))
                res.send(JSON.parse(body));
            }
        }).catch(function(err){
            console.log("Não foi possivel recuperar o Token de conexão"); 
            res.send("bad");
        });
      
       
      }
/******************************************
    #CREATEDBY GUILHERME SOARES
    #NOTE: CRIA ARQUIVO NO GOOGLE-DRIVE
********************************************/  

    controller.createFile = function (req, res) {
        form.parse(req, function(err, fields, files) {
                    console.log(files);
            //console.log('fields', files)
            
        var bitmap = fs.readFileSync(files.file.path);
            //console.log(bitmap);
    // convert binary data to base64 encoded string
   
          var buffer = new Buffer(bitmap).toString('base64');
            console.log(files.file.type);
            console.log(fields);
            console.log(files.username);
           GlobalToken.getToken().then(function(TOKEN){
//            var meta = {
//                "title" : fields.name,
//                "mimetype":files.file.type,
//                   "postBody": buffer
//    
//                };
//            var params = {
//                "title" : fields.name,
//                "mimetype":files.file.type,
//             
//            };
//            
//               
//            googleDrive(TOKEN).files().insert(meta, params,callback);
//        
//            function callback(err, response, body) {
//                if (err) return console.log('err', err)
//                //console.log('body', JSON.parse(body))
//                //res.json(JSON.parse(body));
//                console.log(body);
//                res.send('ok');
//            }
   /*********************************************************************************
   *                               TESTE                                            *
   *********************************************************************************/
                if (TOKEN) {
                var url = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=media';
                var params = {  'Authorization': 'Bearer '+ TOKEN,
                             'mimetype':files.file.type,
                            'postBody': JSON.stringify(bitmap)
                             };

                // Send the API request
                request.post({url:url, headers: params}, function(err, resp, body) {
                    var list = JSON.parse(body);

                    if (err) return console.error("Error occured: ", err);
                    if (list.error) return console.error("Error returned from Google: ", list.error);
                   // console.log(list);
                    res.json(list);
                });
            }else {
                console.log("Token não recuperado como esperado");
                res.send("o");
            }
   /*********************************************************************************
   *                               FIM TESTE                                       *
   *********************************************************************************/
            }).catch(function(err){
            console.log("Não foi possivel recuperar o Token de conexão");
            console.log(err);
            res.send("bad");
            });
        });
    }
                                       
    
    return controller;
}

// OST https://www.googleapis.com/upload/drive/v3/files?uploadType=media