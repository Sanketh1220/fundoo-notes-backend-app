const notesService = require('../services/notes');
const {notesCreationValidation} = require('../middleware/validation');

class NotesController {
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
            res.send({success: true, message: "User registered!", data: notesCreated});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while creating notes" });
        }
    }

    async getAllNotesApi(req, res) {
        try {
            const getNotes = await notesService.getAllNotes();
            res.send({success: true, message: "Notes Retrieved!", data: getNotes});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving notes"});
        }
    }

    async getNotesByIdApi(req, res) {
        try {
            let notesId = req.params;
            const getNote = await notesService.getNoteById(notesId);
            res.send({success: true, message: "User registered!", data: getNote});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving notes"});
        }
    }
}

//exporting th whole class to utilize or call function created in this class
module.exports = new NotesController();