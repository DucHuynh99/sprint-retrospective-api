const boardModel = require('../models/board-model');

exports.getBoardList = async (req, res) => {
    const { owner } = req.params;
    const boards = await boardModel.find({ owner: owner });
    res.status(200).send(boards);
}