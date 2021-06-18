const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    ifPin: {
        type: Boolean,
        default: false
    }
}, {
    // generates the time stamp the data is been added
    timestamps: true,
    versionKey: false
})

const NoteModel = mongoose.model('Notes', NotesSchema);

module.exports = mongoose.model('Notes', NotesSchema);

//created a class to write functions
class NotesModel {

    /**
     * @description function written to create user data into database
     * @param {*} notesData 
     * @returns saved data or if error returns error
     */
    async createInfo(notesData) {
        try {
            const notes = new NoteModel({
                title: notesData.title,
                description: notesData.description
            });

            const notesSaved = await notes.save({});
            return notesSaved;
        } catch (error) {
            return error;
        }
    }

    async getAllNotes() {
        try {
            const notes = await NoteModel.find({});
            return notes;
        } catch (error) {
            return error;
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new NotesModel();