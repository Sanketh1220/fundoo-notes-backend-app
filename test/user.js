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
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("User registered!");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenInvalidFirstName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegFirstName
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenInvalidLastName_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegLastName
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenInvalidEmail_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegEmail
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenEmptyDataInPasswordField_andOtherValidData_failsToMakePOSTRequestToRegisterUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userCreateNegPassword
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                if (error) {
                    return done(error);
                }
                done();
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
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("User login successful!");
                res.body.should.have.property("token");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenInvalidEmailItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userLoginNegEmail;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenEmptyStringInPasswordItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userLoginEmpPassword;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenIncorrectPasswordItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs401', (done) => {
        let userData = userInputs.userLoginNegPassword;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Please enter correct password");
                if (error) {
                    return done(error);
                }
                done();
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
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Password reset link sent to your email account!");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenInvalidEmailItShould_failToMakePOSTRequestToSendEmailToUserEmail_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userForgotPasswordNegEmail;
        chai.request(server)
            .post('/forgotPassword')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenValidEmail_WhoIsNotRegisteredItShould_failToMakePOSTRequestToSendEmailToUserEmail_andReturnsStatusCodeAs404', (done) => {
        let userData = userInputs.userForgotPasswordNegNonRegistered;
        chai.request(server)
            .post('/forgotPassword')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("User with given email doesn't exist!");
                if (error) {
                    return done(error);
                }
                done();
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
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Password is changed successfully!");
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    it('givenNoTokenCorrectPasswordsItShould_failToMakePOSTRequestToSendEmailToUserEmail_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userResetPasswordNeg;
        chai.request(server)
            .put('/resetPassword')
            .set('headerParameter', '')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Please get token!");
                if (error) {
                    return done(error);
                }
                done();
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
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Please enter same password in both password and confirmPassword fields!");
                if (error) {
                    return done(error);
                }
                done();
            });
    });
});

describe('Notes API', () => {

    let token = '';

    beforeEach(done => {
        chai.request(server)
            .post('/login')
            .send(userInputs.userLoginPos)
            .end((error, res) => {
                token = res.body.token;
                res.should.have.status(200);
                if (error) {
                    return done(error);
                }
                done();
            });
    });

    /**
     * /POST request test
     * Positive and Negative - Creation of Notes
     */
    describe('POST notes /create', () => {
        it('givenValidDataItShould_makePOSTRequestAndCreateNotes_andReturnsStatusCodeAs200', (done) => {
            let notesData = userInputs.notesCreatePos
            chai.request(server)
                .post('/createNotes')
                .send(notesData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Created!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidTitle_andValidDescription_failsToMakePOSTRequestToCreateNote_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.notesCreateNegTitle
            chai.request(server)
                .post('/createNotes')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"title\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidDescription_andValidTitle_failsToMakePOSTRequestToCreateNotes_andReturnsStatusCodeAs400', (done) => {
            let addressBookData = userInputs.notesCreateNegDescription
            chai.request(server)
                .post('/createNotes')
                .send(addressBookData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"description\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });


    /**
     * /GET request test
     * Positive and Negative - Get all Notes from database
     */
    describe('GET all /notes', () => {
        it('givenValidRequest_successfullyMakesGETRequestToGetAllNotes_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .get('/notes')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
     * /GET request test
     * Positive and Negative - Get notes by Id from database Test 
     */
    describe('GET notes using ID /notes/:addressBookId', () => {
        it('givenValidRequest_successfullyMakesGETRequest_toGetSingleNotes_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .get('/notes/', userInputs.getNotesById)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidID_failsToMakeGETRequest_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .get('/notes/', userInputs.getNotesByIdNeg)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Retrieved!");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
     * /PUT request test
     * Positive and Negative - Updating a single contact using ID into database 
     */
    describe('PUT /notes/:notesId', () => {
        it('givenValidDataItShould_updateOrPUTNotesSuccessfullyUsingID_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/note/60ccedfb5597a6e2d6aecc60')
                .send(userInputs.notesPutPos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Updated!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidTitle_andValidDescription_failsToMakePUTRequestToUpdateNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/note/60ccedfb5597a6e2d6aecc60')
                .send(userInputs.notesPutNegTitle)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"title\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidDescription_andValidTitle_failsToMakePUTRequestToUpdateNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/note/60ccedfb5597a6e2d6aecc60')
                .send(userInputs.notesPutNegDescription)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"description\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
     * /DELETE request test
     * Positive and Negative - Deleting a single contact using ID into database 
     */
     describe('PUT /delete/:notesId', () => {
        it('givenValidDataItShould_deleteOrPUTNotesSuccessfullyUsingID_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/delete/60ce06afb2b3c723334777f0')
                .send(userInputs.notesDelPos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Note Deleted!");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInValidDataItShould_deleteOrPUTNotesSuccessfullyUsingID_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/delete/60ce06afb2b3c723334777f0')
                .send(userInputs.notesDelNeg)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"isDeleted\" must be a boolean");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });
});