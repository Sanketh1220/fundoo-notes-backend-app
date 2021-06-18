/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations of notes creation and other CRUD
 * 
 * @description
 * 
 * @file        : controllers/notes.js
 * @overview    : controls notes creation, deletion, update and retrieval tasks
 * @module      : this is necessary to register new user and give authorization.
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : 1.0.0
 * @since       : 18-06-2021
 *********************************************************************/

const notesService = require('../services/notes');
const {notesCreationValidation} = require('../middleware/validation');

class NotesController {
    /**
     * @description function written to create notes into the database
     * @param {*} a valid req body is expected
     * @param {*} res 
     * @returns response
     */
    async createNotesApi(req, res) {
        try {
            let dataValidation = notesCreationValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const notesData = {
                title: req.body.title,
                description: req.body.description
            }
            const notesCreated = await notesService.createNotes(notesData);
            res.send({success: true, message: "Notes Created!", data: notesCreated});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while creating notes" });
        }
    }

    /**
     * @description function written to get all the notes from the database
     * @param {*} req 
     * @param {*} res 
     * @returns response
     */
    async getAllNotesApi(req, res) {
        try {
            const getNotes = await notesService.getAllNotes();
            res.send({success: true, message: "Notes Retrieved!", data: getNotes});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving notes"});
        }
    }

    /**
     * @description function written to get notes using ID from the database
     * @param {*} req 
     * @param {*} res 
     * @returns response
     */
    async getNotesByIdApi(req, res) {
        try {
            let notesId = req.params;
            const getNote = await notesService.getNoteById(notesId);
            res.send({success: true, message: "Notes Retrieved!", data: getNote});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving notes"});
        }
    }

    /**
     * @description function written to update notes using ID from the database
     * @param {*} req 
     * @param {*} res 
     * @returns response
     */
    async UpdateNotesByIdApi(req, res) {
        try {
            let dataValidation = notesCreationValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }

            let notesId = req.params;
            const notesData = {
                title: req.body.title,
                description: req.body.description
            }
            const updateNote = await notesService.updateNotesById(notesId, notesData);
            res.send({success: true, message: "Notes Updated!", data: updateNote});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while updating notes"});
        }
    }
}

//exporting th whole class to utilize or call function created in this class
module.exports = new NotesController();