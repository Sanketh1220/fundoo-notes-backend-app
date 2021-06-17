const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const sendEmail = require("../../utils/mailGun");

const UserInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{2,30}$/,
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{2,30}$/,
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    // generates the time stamp the data is been added
    timestamps: true,
    versionKey: false
})

UserInfoSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) return next(error);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserInfoSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//created constant variable to assign schema
const UserInfoModel = mongoose.model('UserInfo', UserInfoSchema);

module.exports = mongoose.model('UserInfo', UserInfoSchema)

//created a class to write functions
class UserModel {

    /**
     * @description function written to create user data into database 
     * @param {*} A valid userData is expected
     * @param {*} callBack 
     */
    // createInfo(userData, callBack) {
    //     const user = new UserInfoModel({
    //         firstName: userData.firstName,
    //         lastName: userData.lastName,
    //         email: userData.email,
    //         password: userData.password
    //     });

    //     console.log('models user data', user);
    //     user.save({}, (error, data) => {
    //         return ((error) ? (callBack(error, null)) : (callBack(null, data)));
    //     })
    //     // sendEmail.sendActivationLink(userData);
    // }

    async createInfo(userData) {
        try {
            const user = new UserInfoModel({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password
            });
    
            console.log('models user data', user);
            const userSaved = await user.save({});
            console.log(userSaved);
            return userSaved;
            sendEmail.sendRegistrationEmail(userData);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description checks if user is present and generates JWT token
     * @param {*} A valid userData is expected
     * @param {*} callBack 
     */
    // loginUser(userData, callBack) {
    //     UserInfoModel.findOne({
    //         'email': userData.email
    //     }, (error, data) => {
    //         if (error) {
    //             return callBack(error, null);
    //         } else if (!data) {
    //             return callBack("This user doesn't exist! Please register.", null);
    //         }
    //         return callBack(null, data);
    //     });
    // }

    async loginUser(userData) {
        try {
            const loginUser = await UserInfoModel.findOne({'email': userData.email});
            // console.log("Models login User Data 1:   ", loginUser);
            if(!loginUser) {
                return "This user doesn't exist! Please register.";
            }else {
            // console.log("Models login User Data", loginUser);
            return loginUser;
            }
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to send reset password link to user 
     * @param {*} A valid userData is expected
     * @param {*} callBack 
     */
    // forgotPassword(userData, callBack) {
    //     console.log("Models", userData);
    //     try {
    //         const user = UserInfoModel.findOne({
    //             email: userData.email
    //         });

    //         if (!user) {
    //             return callBack("user with given email doesn't exist", null);
    //         }

    //         sendEmail.sendPasswordResetLink(userData);

    //         return callBack(null, "Password reset link sent to your email account");
    //     } catch (error) {
    //         console.log(error, "error Occurred")
    //     }
    // }

    async forgotPassword(userData) {
        try {
            console.log("Models", userData);
            const user = await UserInfoModel.findOne({email: userData.email});

            if (!user) {
                return "User with given email doesn't exist!";
            }

            sendEmail.sendPasswordResetLink(userData);
            return "Password reset link sent to your email account!";
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to update password of user into database
     * @param {*} A valid userData is expected
     * @param {*} callBack 
     */
    resetPassword(userData, email, callBack) {
        try {
            const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
            const hashPassword = bcrypt.hashSync(userData.password, salt);
    
            UserInfoModel.findOne({'email': email}, (err, data) => {
                const myData = data;
                console.log("myData at models", myData);
                if(err) {
                    console.log(err)
                }
                UserInfoModel.findByIdAndUpdate(myData.id, {
                    firstName: myData.firstName,
                    lastName: myData.lastName,
                    email: myData.email,
                    password: hashPassword
                }, {new : true}, (error, data) => {
                        return((error) ? (callBack(error, null)) : (callBack(null, data)));
                });
                sendEmail.sendSuccessEmail(myData); 
            });
        } catch (error) {
            console.log(error);
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new UserModel();