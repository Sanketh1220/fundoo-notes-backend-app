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
    async createLabel(labelData) {
        try {
            console.log('Models label data', labelData);
            const label = new LabelModel({
                labelName: labelData.labelName,
                userId: labelData.userId
            });
            return await label.save({});
        } catch (error) {
            return error;
        }
    }

    async getAllLabels() {
        try {
            return await LabelModel.find({});
        } catch (error) {
            return error;
        }
    }

    async getLabelById(labelId) {
        try {
            return await LabelModel.findById(labelId.labelId);
        } catch (error) {
            return error;
        }
    }

    async updateLabel(labelId, labelData) {
        try {
            return await LabelModel.findByIdAndUpdate(labelId.labelId, {
                labelName: labelData.labelName
            }, {new : true});
        } catch (error) {
            return error;
        }
    }

    async deleteLabel(labelId) {
        try {
            return await NoteModel.findByIdAndRemove(labelId.labelId);
        } catch (error) {
            return error;
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new LabelsModel();