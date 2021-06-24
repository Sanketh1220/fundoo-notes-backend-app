/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Invokes the functions related to the database
 *
 * @description
 *
 * @file        : service/notes.js
 * @overview    : calls functions from the model to respond to the controller
 * @module      : this is necessary to perform CRUD operations
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 18-06-2021
 *********************************************************************/

const notesModel = require('../models/notes');

class NotesService {
    /**
     * @description this function is written to send data models
     * @param {*} A valid notesData is expected
     * @returns error if it has error else data
     */
    async createNotes(notesData) {
        try {
            return await notesModel.createInfo(notesData);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description this function is written to trigger or call the models function
     * @returns error if it has error else data
     */
    async getAllNotes() {
        try {
            return await notesModel.getAllNotes();
        } catch (error) {
            return error;
        }
    }

    // /**
    //  * @description this function is written to trigger or call the models function
    //  * @param {*} notesId 
    //  * @returns error if it has error else data
    //  */
    // async getNoteById(notesId) {
    //     try {
    //         return await notesModel.getNoteById(notesId);
    //     } catch (error) {
    //         return error;
    //     }
    // }

    /**
     * @description this function is written to trigger or call the models function
     * @param {*} notesId 
     * @param {*} notesData 
     * @returns error if it has error else data
     */
    async updateNotesById(notesId, notesData) {
        try {
            return await notesModel.updateNote(notesId, notesData);
        } catch (error) {
            return error;
        }
    }

    async deleteNoteById(notesId, notesData) {
        try {
            return await notesModel.deleteNote(notesId, notesData);
        } catch (error) {
            return error
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new NotesService();