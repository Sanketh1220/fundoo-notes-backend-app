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
    createUserInfo(userData, callBack) {
        userModel.createInfo(userData, (error, data) => {
            return ((error) ? callBack(error.null) : callBack(null, data)); 
        });
    }

    loginUser(userData, callBack) {
        const token = helperClass.generateAccessToken({userData});

        userModel.loginUser(userData, (error, data) => {
            if (error) {
                callBack(error, null);
            }
            else if(helperClass.bcryptDataCheck(userData.password, data.password)){
                return callBack("Please enter correct password", error);
            }
            return callBack(null, token);
        });
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new UserService();