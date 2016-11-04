var googleAuth = require('google-oauth-jwt');
var bluebird = require('bluebird');

module.exports =  function(app){
   var GlobalToken = {
        getToken: function(){
            return new Promise(function (resolve, reject) {
                 googleAuth.authenticate({
                             // use the email address of the service account, as seen in the API console
                            email: '',
                            // use the PEM file we generated from the downloaded key
                            keyFile: './config/perm.pem',
                            // specify the scopes you wish to access
                            scopes: ['https://www.googleapis.com/auth/drive']
                       }, function (err, token) {
                            if(!err){
                                resolve(token);
                            }else{
                                reject();
                            }
                        });
            });
        }
    }
   
   return GlobalToken;  
};