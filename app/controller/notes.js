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
const {notesCreationValidation, notesDeletionValidation, addingLabelToNotesValidation} = require('../middleware/validation');
const redisClass = require('../middleware/redis')
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

class NotesController {
    /**
     * @description function written to create notes into the database
     * @param {*} a valid req body is expected
     * @param {*} res 
     * @returns response
     */
    async createNotes(req, res) {
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
    async getAllNotes(req, res) {
        try {
            const getNotes = req.params;
            const getAllNotes = await notesService.getAllNotes();
            const data = await JSON.stringify(getAllNotes);
            redisClass.setDataInCache(getNotes.notes, 3600, data)
            res.send({success: true, message: "Notes Retrieved!", data: getAllNotes});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving notes"});
        }
    }

    // /**
    //  * @description function written to get notes using ID from the database
    //  * @param {*} req 
    //  * @param {*} res 
    //  * @returns response
    //  */
    // async getNotesById(req, res) {
    //     try {
    //         const notesId = req.params;
    //         const getNote = await notesService.getNoteById(notesId);
    //         console.log(getNote);
    //         res.send({success: true, message: "Notes Retrieved!", data: getNote});
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send({success: false, message: "Some error occurred while retrieving notes"});
    //     }
    // }

    /**
     * @description function written to update notes using ID from the database
     * @param {*} req 
     * @param {*} res 
     * @returns response
     */
    async updateNotesById(req, res) {
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

    /**
     * @description function written to delete note by ID
     * @param {*} req 
     * @param {*} res 
     * @returns response
     */
    async deleteNotesById(req, res) {
        try {
            let dataValidation = notesDeletionValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }

            let notesId = req.params;
            const notesData = {
                _id: notesId,
                isDeleted: req.body.isDeleted
            }
            const deleteNote = await notesService.deleteNoteById(notesId, notesData);
            res.send({success: true, message: "Note Deleted!"});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while updating notes"});
        }
    }

    /**
     * @description function written to add label to note
     * @param {*} a valid noteId is expected
     * @param {*} a valid labelData is expected
     * @returns 
     */
    async addLabelToNote(req, res) {
        try {
            const noteId = req.body.noteId;
            const labelData = {
                labelId: [req.body.labelId]
            }

            const addLabelName = await notesService.addLabelToNote(noteId, labelData);
            res.send({success: true, message: "Label Added!", data: addLabelName});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while adding label to notes"});
        }
    }
}

//exporting th whole class to utilize or call function created in this class
module.exports = new NotesController();