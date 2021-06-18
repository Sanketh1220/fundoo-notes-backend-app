/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations of user creation and login
 * 
 * @description
 * 
 * @file        : controllers/user.js
 * @overview    : controls the operations of user creation, login, forgot password and reset password
 * @module      : this is necessary to register new user and give authorization.
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : 1.0.0
 * @since       : 13-06-2021
 *********************************************************************/

const userService = require('../services/user');

const {userDataValidation, userLoginData, userForgotPasswordData} = require('../middleware/validation');

class UserController {
    /**
     * @description function written to register user
     * @param {*} A valid req is expected
     * @param {*} res
     */
    async registrationApi(req, res) {
        try {
            let dataValidation = userDataValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
            const userCreated = await userService.createUserInfo(userData);
            res.send({success: true, message: "User registered!", data: userCreated});
            
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while registering user" });
        }
    }

    /**
    * @description this function handles the login API
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async loginApi(req, res) {
        try {
            let dataValidation = userLoginData.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const userData = {
                email: req.body.email,
                password: req.body.password
            }
            const loginUser = await userService.loginUser(userData)
            if(loginUser.length < 30){
                res.status(401).send({message: loginUser });
            }   
            res.send({success: true, message: "User login successful!", token: loginUser});
        }catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while logging user" });
        }
    }

    /**
    * @description this function handles the forgot password api to send link to user for resetting password
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async forgotPasswordApi(req, res) {
        try {
            let dataValidation = userForgotPasswordData.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const userData = {
                email: req.body.email
            }
            const forgotPassword = await userService.forgotPassword(userData);
            if(forgotPassword == "User with given email doesn't exist!") {
                return res.status(404).send({message: forgotPassword});
            }
            return res.send({success: true, message: forgotPassword});
        } catch (error) {
            return res.status(500).send({message: error});
        }
    }
    
    /**
    * @description this function handles reset password api where user can update his password into database
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async passwordResetApi(req, res) {
        try {
            const userPassword = {
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            }
            const userToken = req.headers.token;
            if(!userToken) {
                return res.status(401).send({message: "Please get token!"});
            }
            else if(userPassword.password == userPassword.confirmPassword) {
                const resetPassword = await userService.resetPassword(userPassword, userToken);
                return res.send({success: true, message: "Password is changed successfully!"});
            }else {
                return res.status(500).send({message: "Please enter same password in both password and confirmPassword fields!"});
            }
        } catch (error) {
            res.status(500).send({message: error})
        }
    }
}

//exporting th whole class to utilize or call function created in this class
module.exports = new UserController();