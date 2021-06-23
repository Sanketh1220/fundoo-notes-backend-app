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
const notesController = require('../controller/notes');
const tokenCheck = require('../middleware/helper');
const redisCache = require('../middleware/redis');

//exporting it to server.js
module.exports = (app) => {

    //registration api POST request
    app.post('/register', userController.registration);

    //login api POST request
    app.post('/login', userController.login);

    //sends password reset link
    app.post('/forgotPassword', userController.forgotPassword);

    //reset user password
    app.put('/resetPassword', userController.passwordReset);

    //notes creation api - POST request
    app.post('/createNotes', tokenCheck.verifyToken, notesController.createNotes);

    //get all notes api - GET request
    app.get('/notes/:notes', tokenCheck.verifyToken, redisCache.checkCache, notesController.getAllNotes);

    //get note by Id api - GET request
    app.get('/notes/:notesId', tokenCheck.verifyToken, notesController.getNotesById);

    //update note by Id api - PUT request
    app.put('/note/:notesId', tokenCheck.verifyToken, notesController.updateNotesById);

    //delete note by Id api - PUT request
    app.put('/delete/:notesId', tokenCheck.verifyToken, notesController.deleteNotesById);
}