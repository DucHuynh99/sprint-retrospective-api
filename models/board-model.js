const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    owner: String,
    name: String,
    cardCount: Number,
    isArchived: Boolean,
    isDeleted: Boolean,
    createdDate: Date,
    modifiedDate: Date
});

module.exports = mongoose.model('boards', boardSchema, 'Boards');