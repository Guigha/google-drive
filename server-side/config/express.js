var load = require('express-load');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');     

module.exports = function() {
   var app = express();
    //configuração de ambiente
    app.set('port', process.env.port || 3000);
    
  
     //middleware
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));   //requisições  form_urlencoded
    app.use(bodyParser.json());                         //parse de json
    app.use(require('method-override')());              //permite acessar req.body
    
    //engine
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
    
    
    //chamando controllers , rotas
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);
    
    return app;
};  