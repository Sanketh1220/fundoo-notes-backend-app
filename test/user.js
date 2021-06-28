/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node user.js
 *                2. If nodemon installed    cmd> npm test
 *
 * Purpose      : To test the API's
 *
 * @description : tests all the positive and negative cases
 *
 * @file        : test/user.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 15-06-2021
 *********************************************************************/

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
require('superagent');
const server = require('../server');
const userInputs = require('./user.json');

//assertion style
const should = chai.should();
chai.use(chaiHttp);

/**
 * /POST request test
 * Positive and Negative - Registration of User Testing
 */
describe('POST /register', () => {
    it('givenValidDataItShould_makePOSTRequestAndRegisterUser_andReturnsStatusCodeAs200', (done) => {
        let userData = userInputs.userCreatePos
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("User registered!");
                return done();
            });
    });

    it('givenInvalidFirstName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegFirstName
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                return done();
            });
    });

    it('givenInvalidLastName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegLastName
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                return done();
            });
    });

    it('givenInvalidEmail_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegEmail
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                return done();
            });
    });

    it('givenEmptyDataInPasswordField_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegPassword
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                return done();
            });
    });
});

/**
 * /POST request test
 * Positive and Negative - Login of User Testing
 */
 describe('POST /login', () => {
    it('givenValidDataItShould_makePOSTRequestToLoginUser_andReturnTokenAndStatusCodeAs200', (done) => {
        let userData = userInputs.userLoginPos;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("User login successful!");
                res.body.should.have.property("token");
                return done();
            });
    });

    it('givenInvalidEmailItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userLoginNegEmail;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                return done();
            });
    });

    it('givenEmptyStringInPasswordItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userLoginEmpPassword;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                return done();
            });
    });

    it('givenIncorrectPasswordItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs401', (done) => {
        let userData = userInputs.userLoginNegPassword;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Please enter correct password");
                return done();
            });
    });
});

/**
 * /POST request test
 * Positive and Negative - Forgot Password of User Testing
 */
 describe('POST /forgotPassword', () => {
    it('givenValidDataItShould_makePOSTRequestToSendEmailToUserEmail_andReturnTokenAndStatusCodeAs200', (done) => {
        let userData = userInputs.userForgotPasswordPos;
        chai.request(server)
            .post('/forgotPassword')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Password reset link sent to your email account!");
                return done();
            });
    });

    it('givenInvalidEmailItShould_failToMakePOSTRequestToSendEmailToUserEmail_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userForgotPasswordNegEmail;
        chai.request(server)
            .post('/forgotPassword')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                return done();
            });
    });

    it('givenValidEmail_WhoIsNotRegisteredItShould_failToMakePOSTRequestToSendEmailToUserEmail_andReturnsStatusCodeAs404', (done) => {
        let userData = userInputs.userForgotPasswordNegNonRegistered;
        chai.request(server)
            .post('/forgotPassword')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("User with given email doesn't exist!");
                return done();
            });
    });
});

/**
 * /PUT request test
 * Positive and Negative - Reset Password of User Testing
 */
 describe('PUT /resetPassword', () => {
    it('givenCorrectPasswordsAndTokenItShould_makePOSTRequestChangePasswordOfUser_andReturnsStatusCodeAs200', (done) => {
        let userData = userInputs.userResetPasswordPos;
        let userToken = userInputs.userResetPasswordToken;
        chai.request(server)
            .put('/resetPassword')
            .set('token', userToken)
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Password is changed successfully!");
                return done();
            });
    });

    it('givenNoTokenCorrectPasswordsItShould_failToMakePOSTRequestToSendEmailToUserEmail_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userResetPasswordNeg;
        chai.request(server)
            .put('/resetPassword')
            .set('headerParameter', '')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Please get token!");
                return done();
            });
    });

    it('givenMisMatchedPasswordsAndTokenItShould_failToMakePOSTRequestChangePasswordOfUser_andReturnsStatusCodeAs500', (done) => {
        let userData = userInputs.userResetPasswordNeg;
        let userToken = userInputs.userResetPasswordToken;
        chai.request(server)
            .put('/resetPassword')
            .set('token', userToken)
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Please enter same password in both password and confirmPassword fields!");
                return done();
            });
    });
});