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
describe('POST user/register', () => {
    it('givenValidDataItShould_makePOSTRequestAndRegisterUser_andReturnsStatusCodeAs200', (done) => {
        let userData = userInputs.userCreatePos
        chai.request(server)
            .post('/user/register')
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
            .post('/user/register')
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
            .post('/user/register')
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
            .post('/user/register')
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
            .post('/user/register')
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