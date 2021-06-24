/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations of label creation and other CRUD
 * 
 * @description
 * 
 * @file        : controllers/label.js
 * @overview    : controls label creation, deletion, update and retrieval tasks
 * @module      : this is necessary to create new label.
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : 1.0.0
 * @since       : 24-06-2021
 *********************************************************************/

const labelService = require('../services/label');
const {labelValidation} = require('../middleware/validation');
const redisClass = require('../middleware/redis')

class LabelController {
    /**
     * @description function written to create label into database
     * @param {*} a valid req body is expected
     * @param {*} res
     */
    async createLabel(req, res) {
        try {
            let dataValidation = labelValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const labelData = {
                labelName: req.body.labelName,
                userId: req.params.userId
            }
            const labelCreated = await labelService.createLabel(labelData);
            res.send({success: true, message: "Label Created!", data: labelCreated});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while creating label"});
        }
    }

    /**
     * @description function written to get all labels
     * @param {*} req 
     * @param {*} res 
     */
    async getAllLabels(req, res) {
        try {
            const getLabels = req.params;
            const getAllLabels = await labelService.getAllLabels();
            const data = await JSON.stringify(getAllLabels);
            redisClass.setDataInCache(getLabels.labels, 3600, data)
            res.send({success: true, message: "Labels Retrieved!", data: getAllLabels});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving labels"});
        }
    }

    /**
     * @description function written to get label by ID
     * @param {*} req 
     * @param {*} res 
     */
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

    /**
     * @description function written to update label
     * @param {*} a valid req body is expected
     * @param {*} res 
     */
    async updateLabelById(req, res) {
        try {
            let dataValidation = labelValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }

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

    /**
     * @description function written to delete label by ID
     * @param {*} req 
     * @param {*} res 
     */
    async deleteLabelById(req, res) {
        try {
            let labelId = req.params;
            await labelService.deleteLabelById(labelId);
            res.send({success: true, message: "Label Deleted!"});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while deleting label"});
        }
    }
}

//exporting class to utilize or call function created in this class
module.exports = new LabelController();