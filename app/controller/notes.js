const notesService = require('../services/notes');

class NotesController {
    async createNotesApi(req, res) {
        try {
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