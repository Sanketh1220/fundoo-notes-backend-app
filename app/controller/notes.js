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
            res.send({success: true, message: "User registered!", data: userCreated});
        } catch (error) {
            res.status(500).send({success: false, message: "Some error occurred while creating notes" });
        }
    }
}