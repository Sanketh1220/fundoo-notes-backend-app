//importing a class from models and assigned to constant variable
const userModel = require('../models/user');

const helperClass = require('../middleware/helper');

require('dotenv').config();

class UserService {
    /**
     * @description function created to create user into database
     * @param {*} A valid userData is expected 
     * @param {*} callBack 
     */
    // createUserInfo(userData, callBack) {
    //     userModel.createInfo(userData, (error, data) => {
    //         return ((error) ? callBack(error.null) : callBack(null, data)); 
    //     });
    // }

    async createUserInfo(userData) {
        try {
            const createdUser = userModel.createInfo(userData)
            return createdUser;
        }catch (error) {
            return error;
        }
    }

    /**
     * @description function created to login user
     * @param {*} A valid userData is expected 
     * @param {*} callBack 
     */
    // loginUser(userData, callBack) {
    //     const token = helperClass.generateAccessToken({userData});

    //     userModel.loginUser(userData, (error, data) => {
    //         if (error) {
    //             callBack(error, null);
    //         }
    //         else if(helperClass.bcryptDataCheck(userData.password, data.password)){
    //             return callBack("Please enter correct password", error);
    //         }
    //         return callBack(null, token);
    //     });
    // }

    async loginUser(userData) {
        try {
            const token = helperClass.generateAccessToken({userData});
            const loginUser = await userModel.loginUser(userData)
            if(helperClass.bcryptDataCheck(userData.password, loginUser.password)){
                return "Please enter correct password";
            }else {
            // console.log("token:   ", token);
            return token;
            }
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function created to send forgot password link to user
     * @param {*} A valid userData is expected 
     * @param {*} callBack 
     */
    // forgotPassword(userData, callBack) {
    //     userModel.forgotPassword(userData, (error, data) => {
    //         return ((error) ? callBack(error.null) : callBack(null, data));
    //     })
    // }

    async forgotPassword(userData) {
        try {
            const forgotPassword = userModel.forgotPassword(userData)
            return forgotPassword;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function created to update password of user
     * @param {*} A valid userData is expected 
     * @param {*} callBack 
     */
    resetPassword(userData, token, callBack) {
        const email = helperClass.getEmailFromToken(token);

        userModel.resetPassword(userData, email, (error, data) => {
            if(error) {
                callBack(error, null);
            }
            return callBack(null, data);
        });
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new UserService();