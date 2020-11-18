const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    owner: String,
    name: String,
    cardCount: { type: Number, default: 0 },
    isPrivate: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Boards', boardSchema, 'Boards');