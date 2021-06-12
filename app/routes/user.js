const userController = require('../controller/user');
const tokenCheck = require('../middleware/helper');


//exporting it to server.js
module.exports = (app) => {

    //registration api POST request
    app.post('/user/register', userController.registrationApi);

    //login api POST request
    app.post('/user/login', userController.loginApi);

    //sends password reset link
    app.post('/user/passwordReset', userController.passwordResetLinkApi);

    //reset user password
    // app.post('/user/password-reset/:userId/:token')
}