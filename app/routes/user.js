const userController = require('../controller/user');
const notesController = require('../controller/notes')
const tokenCheck = require('../middleware/helper');

//exporting it to server.js
module.exports = (app) => {

    //registration api POST request
    app.post('/register', userController.registrationApi);

    //login api POST request
    app.post('/login', userController.loginApi);

    //sends password reset link
    app.post('/forgotPassword', userController.forgotPasswordApi);

    //reset user password
    app.put('/resetPassword', userController.passwordResetApi);

    //creation request api POST request
    app.post('/createNotes', tokenCheck.tokenChecker, notesController.createNotesApi);

    //get all notes request api GET request
    app.get('/notes', tokenCheck.tokenChecker, notesController.getAllNotesApi);
}