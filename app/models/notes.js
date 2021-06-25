/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Describing the schema for database.
 *
 * @description
 *
 * @file        : models/notes.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : this is necessary to perform CRUD operations, login and store the data
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : 1.0.0
 * @since       : 18-06-2021
 *********************************************************************/

const { array } = require("@hapi/joi");
const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    labels : {
        type: [String]
    }
}, {
    // generates the time stamp the data is been added
    timestamps: true,
    versionKey: false
})

const NoteModel = mongoose.model('Notes', NotesSchema);

// module.exports = mongoose.model('Notes', NotesSchema);

//created a class to write functions
class NotesModel {

    /**
     * @description function written to create notes into database
     * @param {*} a valid notesData is expected
     * @returns saved data or if error returns error
     */
    async createInfo(notesData) {
        try {
            const notes = new NoteModel({
                title: notesData.title,
                description: notesData.description
            });
            return await notes.save({});
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to get all notes from database 
     * @returns retrieved notes or if error returns error
     */
    async getAllNotes() {
        try {
            return await NoteModel.find({});
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to get notes by Id into database 
     * @param {*} valid notesId is expected
     * @returns notes of particular Id or if any error return error
     */
    async getNoteById(notesId) {
        try {
            return await NoteModel.findById(notesId.notesId);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to update notes by Id into database 
     * @param {*} a valid notesId is expected
     * @param {*} a valid notesData is expected
     * @returns notes of particular Id or if any error return error
     */
    async updateNote(notesId, notesData) {
        try {
            return await NoteModel.findByIdAndUpdate(notesId.notesId, {
                title: notesData.title,
                description: notesData.description
            }, {new : true});
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to update isDeleted to true
     * @param {*} notesId 
     * @param {*} notesData 
     * @returns data else if error returns error
     */
    async deleteNote(notesId, notesData) {
        try {
            return await NoteModel.findByIdAndUpdate(notesId.notesId, {
                isDeleted: notesData.isDeleted
            }, {new: true});
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to add label to note
     * @param {*} a valid noteId is expected
     * @param {*} a valid labelData is expected
     * @returns 
     */
    async addLabelToNote(noteId, labelData) {
        try {
            return await NoteModel.findByIdAndUpdate(noteId,
                {$push : { "labels": labelData.labelId} },
                {new: true});
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to remove label from note
     * @param {*} a valid noteId is expected
     * @param {*} a valid labelData is expected
     * @returns 
     */
    async deleteLabelFromNote(noteId, labelData) {
        try {
            // const label = (labelData.labelId[(0)]);
            return await NoteModel.findByIdAndUpdate(noteId,
                {$pull : { "labels": (labelData.labelId[(0)])} },
                {new: true});
        } catch (error) {
            return error;
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new NotesModel();
