/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Describing the schema for database.
 *
 * @description
 *
 * @file        : models/label.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : this is necessary to perform CRUD operations and store the data
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : 1.0.0
 * @since       : 23-06-2021
 *********************************************************************/

const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
    labelName: {
        type: String,
        required: true
    },
    userId: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const LabelModel = mongoose.model('Label', LabelSchema);

class LabelsModel {
    /**
     * @description function written to create label
     * @param {*} labelData 
     * @returns data else if returns error
     */
    async createLabel(labelData) {
        try {
            const label = new LabelModel({
                labelName: labelData.labelName,
                userId: labelData.userId
            });
            return await label.save({});
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to get all labels
     * @returns data else if returns error
     */
    async getAllLabels() {
        try {
            return await LabelModel.find({});
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to get label by ID
     * @param {*} labelId 
     * @returns data else if returns error
     */
    async getLabelById(labelId) {
        try {
            return await LabelModel.findById(labelId.labelId);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to update label name
     * @param {*} labelId 
     * @param {*} labelData 
     * @returns data else if returns error
     */
    async updateLabel(labelId, labelData) {
        try {
            return await LabelModel.findByIdAndUpdate(labelId.labelId, {
                labelName: labelData.labelName
            }, {new : true});
        } catch (error) {
            return error;
        }
    }

    /**
     * @description function written to delete label
     * @param {*} labelId 
     * @returns error in the case of error occurrence
     */
    async deleteLabel(labelId) {
        try {
            return await LabelModel.findByIdAndRemove(labelId.labelId);
        } catch (error) {
            return error;
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new LabelsModel();