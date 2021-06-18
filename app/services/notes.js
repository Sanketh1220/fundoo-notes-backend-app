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

    async getAllNotes() {
        try {
            return await notesModel.getAllNotes();
        } catch (error) {
            return error;
        }
    }

    async getNoteById(notesId) {
        try {
            return await notesModel.getNoteById(notesId);
        } catch (error) {
            return error;
        }
    }

    async updateNotesById(notesId, notesData) {
        try {
            return await notesModel.updateNote(notesId, notesData);
        } catch (error) {
            return error;
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new NotesService();