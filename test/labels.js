// const mocha = require('mocha');
//  const chai = require('chai');
//  const chaiHttp = require('chai-http');
//  require('superagent');
//  const server = require('../server');
//  const userInputs = require('./labels.json');
//  const userInput = require('./user.json');
 
//  //assertion style
//  const should = chai.should();
//  chai.use(chaiHttp);
 
//  describe('Notes API', () => {

//     let token = '';

//     beforeEach(done => {
//         chai.request(server)
//             .post('/login')
//             .send(userInput.userLoginPos)
//             .end((error, res) => {
//                 token = res.body.token;
//                 res.should.have.status(200);
//                 if (error) {
//                     return done(error);
//                 }
//                 done();
//             });
//     });

//     /**
//      * /POST request test
//      * Positive and Negative - Creation of Notes
//      */
//      describe('POST labels /create', () => {
//         it('givenValidDataItShould_makePOSTRequestAndCreateLabel_andReturnsStatusCodeAs200', (done) => {
//             let labelData = userInputs.labelCreatePos
//             chai.request(server)
//                 .post('/createLabel/60c4597634863b5812d0f877')
//                 .send(labelData)
//                 .set('token', token)
//                 .end((error, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property("success").eql(true);
//                     res.body.should.have.property("message").eql("Label Created!");
//                     res.body.should.have.property("data").should.be.a('object');
//                     if (error) {
//                         return done(error);
//                     }
//                     done();
//                 });
//         });
//     });
// });