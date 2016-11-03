module.exports = function(app) {
    
    //require o controle a ser utilizado
    var controller = app.controllers.token;
    

   app.route('/Files')
       .get(controller.getFiles)
       .post(controller.createFile);
    
    app.post('/createFolder', controller.createFolder);
}