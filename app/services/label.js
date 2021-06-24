const labelsModel = require('../models/label');

class LabelService {
    async createLabel(labelData) {
        try {
            return await labelsModel.createLabel(labelData);
        } catch (error) {
            return error;
        }
    }

    async getAllLabels() {
        try {
            return await labelsModel.getAllLabels();
        } catch (error) {
            return error;
        }
    }

    async getLabelById(labelId) {
        try {
            return await labelsModel.getLabelById(labelId);
        } catch (error) {
            return error;
        }
    }

    async updateLabelById(labelId, labelData) {
        try {
            return await labelsModel.updateLabel(labelId, labelData);
        } catch (error) {
            return error;
        }
    }

    async deleteLabelById(labelId, labelData) {
        try {
            return await labelsModel.deleteLabel(labelId, labelData);
        } catch (error) {
            return error
        }
    }
}

module.exports = new LabelService();