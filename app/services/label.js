/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Invokes the functions related to the database
 *
 * @description
 *
 * @file        : service/label.js
 * @overview    : calls functions from the model to respond to the controller
 * @module      : this is necessary to perform CRUD operations
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 23-06-2021
 *********************************************************************/

const labelsModel = require('../models/label');

class LabelService {
    /**
     * @description function written to create label
     * @param {*} labelData 
     * @returns data else returns error
     */
    async createLabel(labelData) {
        try {
            return await labelsModel.createLabel(labelData);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to get all labels
     * @returns data else returns error
     */
    async getAllLabels() {
        try {
            return await labelsModel.getAllLabels();
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to get label by ID
     * @param {*} a valid labelId is expected
     * @returns data else returns error
     */
    async getLabelById(labelId) {
        try {
            return await labelsModel.getLabelById(labelId);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to update label using ID
     * @param {*} a valid labelId is expected
     * @param {*} a valid labelData is expected
     * @returns 
     */
    async updateLabelById(labelId, labelData) {
        try {
            return await labelsModel.updateLabel(labelId, labelData);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to delete label by ID
     * @param {*} a valid labelId is expected
     * @returns error in case of error occurrence
     */
    async deleteLabelById(labelId) {
        try {
            return await labelsModel.deleteLabel(labelId);
        } catch (error) {
            return error
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new LabelService();