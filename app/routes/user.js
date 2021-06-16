const userController = require('../controller/user');
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
}