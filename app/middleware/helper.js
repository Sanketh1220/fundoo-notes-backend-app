const jwt = require('jsonwebtoken');

//requiring package bcrypt
 const bcrypt = require('bcrypt');

//Creating a class so as to avail all functions return in it
class HelperClass {

    /**
     * @description function is return to generate a token when there is a valid user
     * @param {*} A valid employeeData is expected
     * @returns 
     */
    generateAccessToken(employeeData) {
        return jwt.sign(employeeData, SECRET_TOKEN, {
            expiresIn: '36000s'
        });
    }

    /**
     * @description function compares the password requested by user with 
     * one in data using bcrypt as password in database will be encrypted
     * @param {*} userData 
     * @param {*} dbData 
     * @returns 
     */
    bcryptDataCheck(userData, dbData) {
        return (userData && dbData) ? (!bcrypt.compareSync(userData, dbData)): false;
    }

    /**
     * @description takes in the token from user and authorizes the user only when token
     * is correct and moves user to next() which is an access to perform CRUD
     * 400 - Bad request, 401 - Unauthorized user
     * @param {*} A valid req is expected
     * @param {*} res 
     * @param {*} next is a method 
     * @returns 
     */
     tokenChecker(req, res, next) {
        let token = req.get("token");
        if (token) {
            jwt.verify(token, SECRET_TOKEN, error => {
                if (error) {
                    console.log(error);
                    return res.status(400).send({
                        success: false,
                        message: "Token is Invalid!"
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: "Unauthorized User, Provide token to get authorized!"
            });
        }
    }

    /**
     * @description function written to verify and decode data from token
     * @param {*} token 
     * @returns decoded email of user
     */
    getEmailFromToken(token){
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        return decoded.email
    }
}

//exporting the class to utilize or call function created in this class
 module.exports = new HelperClass(); 