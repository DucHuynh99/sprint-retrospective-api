const mongoose = require('mongoose');

const boardDetailSchema = new mongoose.Schema({
    boardID: String,
    wentWell: { type: Array, default: [] },
    toImprove: { type: Array, default: [] },
    actionItems: { type: Array, default: [] }
});

module.exports = mongoose.model('BoardDetails', boardDetailSchema, 'BoardDetails');