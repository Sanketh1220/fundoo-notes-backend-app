const labelService = require('../services/label');

class LabelController {
    async createLabel(req, res) {
        try {
            // let dataValidation = notesCreationValidation.validate(req.body);
            // if (dataValidation.error) {
            //     return res.status(400).send({
            //         message: dataValidation.error.details[0].message
            //     });
            // }
            const labelData = {
                labelName: req.body.labelName,
                userId: req.params
            }
            const labelCreated = await labelService.createLabel(labelData);
            res.send({success: true, message: "Label Created!", data: labelCreated});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while creating label"});
        }
    }

    async getAllLabels(req, res) {
        try {
            const getLabels = await labelService.getAllLabels();
            res.send({success: true, message: "Labels Retrieved!", data: getLabels});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving labels"});
        }
    }

    async getLabelById(req, res) {
        try {
            let labelId = req.params;
            const getLabel = await labelService.getLabelById(labelId);
            res.send({success: true, message: "Label Retrieved!", data: getLabel});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving label"});
        }
    }

    async updateLabelById(req, res) {
        try {
            // let dataValidation = notesCreationValidation.validate(req.body);
            // if (dataValidation.error) {
            //     return res.status(400).send({
            //         message: dataValidation.error.details[0].message
            //     });
            // }

            let labelId = req.params;
            const labelData = {
                labelName: req.body.labelName
            }
            const updatedLabel = await labelService.updateLabelById(labelId, labelData);
            res.send({success: true, message: "Label Name Updated!", data: updatedLabel});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while updating label name"});
        }
    }

    async deleteLabelById(req, res) {
        try {
            let labelId = req.params;
            await labelService.deleteLabelById(labelId);
            res.send({success: true, message: "Note Deleted!"});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while deleting label"});
        }
    }
}

module.exports = new LabelController();