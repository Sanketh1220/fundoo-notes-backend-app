/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node notes.js
 *                2. If nodemon installed    cmd> npm test
 *
 * Purpose      : To test the API's
 *
 * @description : tests all the positive and negative cases
 *
 * @file        : test/notes.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 22-06-2021
 *********************************************************************/

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
require('superagent');
const server = require('../server');
const userInputs = require('./notes.json');
const labelInputs = require('./labels.json');
const userInput = require('./user.json');

//assertion style
const should = chai.should();
chai.use(chaiHttp);

describe('Notes API', () => {

    let token = '';

    beforeEach(done => {
        chai.request(server)
            .post('/login')
            .send(userInput.userLoginPos)
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
                .get('/notes/notes')
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

    // /**
    //  * /PUT request test
    //  * Positive and Negative - Updating a single contact using ID into database 
    //  */
    describe('PUT /note/:notesId', () => {
        it('givenValidDataItShould_updateOrPUTNotesSuccessfullyUsingID_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/note/60d1ec33dcb70161ff688e09')
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
                .put('/note/60d1ec33dcb70161ff688e09')
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

    /**
     * /PUT request test
     * Positive and Negative - Adding label to note using Note ID into database 
     */
    describe('PUT /addLabel/', () => {
        it('givenValidDataItShould_addLabelToNoteSuccessfully_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/addLabel')
                .send(userInputs.addLabelToNotePos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Added!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInValidNoteIdItShould_failToAddLabelToNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/addLabel')
                .send(userInputs.addLabelToNoteNegNoteId)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"noteId\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInValidLabelIdItShould_failToAddLabelToNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/addLabel')
                .send(userInputs.addLabelToNoteNegLabelId)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"labelId\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
     * /PUT request test
     * Positive and Negative - Deleting label from note using Note ID into database 
     */
     describe('PUT /deleteLabel/', () => {
        it('givenValidDataItShould_addLabelToNoteSuccessfully_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/deleteLabel')
                .send(userInputs.deleteLabelFromNotePos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Deleted!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInValidNoteIdItShould_failToAddLabelToNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/deleteLabel')
                .send(userInputs.deleteLabelToNoteNegNoteId)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"noteId\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInValidLabelIdItShould_failToAddLabelToNote_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/deleteLabel')
                .send(userInputs.deleteLabelToNoteNegLabelId)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"labelId\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
     * /POST request test
     * Positive and Negative - Creation of Labels
     */
    describe('POST labels /create', () => {
        it('givenValidDataItShould_makePOSTRequestAndCreateLabel_andReturnsStatusCodeAs200', (done) => {
            let labelData = labelInputs.labelCreatePos
            chai.request(server)
                .post('/createLabel/60c4597634863b5812d0f877')
                .send(labelData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Created!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInValidDataItShould_failToMakePOSTRequestToCreateLabel_andReturnsStatusCodeAs400', (done) => {
            let labelData = labelInputs.labelCreateNeg
            chai.request(server)
                .post('/createLabel/60c4597634863b5812d0f877')
                .send(labelData)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"labelName\" is not allowed to be empty");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
     * /GET request test
     * Positive and Negative - Get all Labels from database
     */
    describe('GET all /labels', () => {
        it('givenValidRequest_successfullyMakesGETRequestToGetAllLabels_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .get('/labels/labels')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Labels Retrieved!");
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
    describe('GET labels using ID /label/:labelId', () => {
        it('givenValidRequest_successfullyMakesGETRequest_toGetSingleNotes_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .get('/label/60d45f0bb0734760a4bddd2a')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenValidRequest_successfullyMakesGETRequest_toGetSingleNotes_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .get('/label/60d45f0bb0734760a4bddd')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Retrieved!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    /**
     * /PUT request test
     * Positive and Negative - Updating a single label using ID into database 
     */
    describe('PUT /updateLabel/:labelId', () => {
        it('givenValidDataItShould_updateOrPUTNotesSuccessfullyUsingID_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .put('/updateLabel/60d45f0bb0734760a4bddd2a')
                .send(labelInputs.labelCreatePos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Name Updated!");
                    res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });

        it('givenInvalidTitle_failsToMakePUTRequestToUpdateLabel_andReturnsStatusCodeAs400', (done) => {
            chai.request(server)
                .put('/updateLabel/60ccedfb5597a6e2d6aecc60')
                .send(labelInputs.labelCreateNeg)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"labelName\" is not allowed to be empty");
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
    describe('PUT /deleteLabel/:labelId', () => {
        it('givenValidDataItShould_deleteLabelSuccessfullyUsingID_andReturnsStatusCodeAs200', (done) => {
            chai.request(server)
                .delete('/deleteLabel/60d4bfb1da59098c02f43fc6')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Deleted!");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });
});