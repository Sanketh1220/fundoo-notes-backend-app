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
const labelController = require('../controller/label');
const tokenVerification = require('../middleware/helper');
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
    app.post('/createNotes', tokenVerification.verifyToken, notesController.createNotes);

    //get all notes api - GET request
    app.get('/notes/:notes', tokenVerification.verifyToken, redisCache.checkCache, notesController.getAllNotes);

    //get note by Id api - GET request
    app.get('/notes/:notesId', tokenVerification.verifyToken, notesController.getNotesById);

    //update note by Id api - PUT request
    app.put('/note/:notesId', tokenVerification.verifyToken, notesController.updateNotesById);

    //delete note by Id api - PUT request
    app.put('/delete/:notesId', tokenVerification.verifyToken, notesController.deleteNotesById);

    //label creation api - POST request
    app.post('/createLabel/:userId', tokenVerification.verifyToken, labelController.createLabel);

    //get all labels api - GET request
    app.get('/labels', tokenVerification.verifyToken, labelController.getAllLabels);

    //get single label by ID api - GET request
    app.get('/label/:labelId', tokenVerification.verifyToken, labelController.getLabelById);

    //update single label by ID api - PUT request
    app.put('/label/:labelId', tokenVerification.verifyToken, labelController.updateLabelById);

    //delete label by ID api - DELETE request
    app.delete('label/:labelId', tokenVerification.verifyToken, labelController.deleteLabelById);
}