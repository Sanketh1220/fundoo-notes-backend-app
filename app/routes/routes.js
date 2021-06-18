/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : To contain express routes
 *
 * @description
 *
 * @file        : routes/routes.js
 * @overview    : Contains all the express routes
 * @module      : this is necessary to use HTTP methods
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 13-06-2021
 *********************************************************************/

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

    //notes creation api - POST request
    app.post('/createNotes', tokenCheck.tokenChecker, notesController.createNotesApi);

    //get all notes api - GET request
    app.get('/notes', tokenCheck.tokenChecker, notesController.getAllNotesApi);

    //get note by Id api - GET request
    app.get('/notes/:notesId', tokenCheck.tokenChecker, notesController.getNotesByIdApi);

    //update note by Id api - PUT request
    app.put('/notes/:notesId', tokenCheck.tokenChecker, notesController.UpdateNotesByIdApi);
}