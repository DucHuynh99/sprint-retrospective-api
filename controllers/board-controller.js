const boardModel = require('../models/board-model');
const boardDetailModel = require('../models/board-detail-model');

exports.getBoardList = async (req, res) => {
    const { owner } = req.params;
    const boards = await boardModel.find({ owner: owner });
    res.status(200).send(boards);
}

exports.addBoard = async (req, res) => {
    const { boardName, userID } = req.body;
    const newBoard = new boardModel({ owner: userID, name: boardName });
    const { _id } = await newBoard.save();
    const newBoardDetail = new boardDetailModel({ boardID: _id });
    await newBoardDetail.save();
    res.status(200).send(newBoard);
}

exports.getBoardByID = async (req, res) => {
    const { boardID } = req.params;
    const boards = await boardModel.findById(boardID);
    res.status(200).send(boards);
}

exports.getBoardDetail = async (req, res) => {
    const { boardID } = req.params;
    const boardDetail = await boardDetailModel.findOne({ boardID: boardID });
    if (boardDetail)
        res.status(200).send(boardDetail);
    else
        res.status(404).send();
}

exports.deleteBoard = async (req, res) => {
    const { boardID } = req.params;
    await boardModel.findByIdAndDelete(boardID);
    res.status(200).send();
}

exports.addWentWell = async (req, res) => {
    const { boardID, info } = req.body;
    const response = await boardDetailModel.findOneAndUpdate({ boardID: boardID }, { $push: { "wentWell": info } }, { useFindAndModify: true });
    if (response)
        res.status(200).send(response);
    else
        res.status(404).send("Invalid boardID");
}

exports.addToImprove = async (req, res) => {
    const { boardID, info } = req.body;
    const response = await boardDetailModel.findOneAndUpdate({ boardID: boardID }, { $push: { "toImprove": info } }, { useFindAndModify: true });
    if (response)
        res.status(200).send(response);
    else
        res.status(404).send("Invalid boardID");
}

exports.addActionItem = async (req, res) => {
    const { boardID, info } = req.body;
    const response = await boardDetailModel.findOneAndUpdate({ boardID: boardID }, { $push: { "actionItems": info } }, { useFindAndModify: true });
    if (response)
        res.status(200).send("Success");
    else
        res.status(404).send("Invalid boardID");
}

exports.deleteBoardDetail = async (req, res) => {
    const { boardID, column, info } = req.body;
    let query = {};
    switch (new String(column).toLowerCase()) {
        case "wentwell":
            query.wentWell = info;
            break;
        case "toimprove":
            query.toImprove = info;
            break;
        case "actionitems":
            query.actionItems = info;
            break;
        default:
            res.status(404).send("Invalid column name");
            return;
    };
    console.log(query);
    const response = await boardDetailModel.findOneAndUpdate({ boardID: boardID }, { $pull: query }, { useFindAndModify: true });
    if (response)
        res.status(200).send("Success");
    else
        res.status(404).send("Invalid boardID");
}

exports.updateBoardName = async (req, res) => {
    const { boardID, newName } = req.body;
    const response = await boardModel.findByIdAndUpdate(boardID, { name: newName });
    if (response)
        res.status(200).send("Success");
    else
        res.status(404).send("Invalid boardID");
}

exports.updateBoardDetail = async (req, res) => {
    const { boardID, column, oldInfo, newInfo } = req.body;
    let query1 = { boardID: boardID };
    let query2 = {}
    switch (new String(column).toLowerCase()) {
        case "wentwell":
            query1.wentWell = oldInfo;
            query2["wentWell.$"] = newInfo;
            break;
        case "toimprove":
            query1.toImprove = oldInfo;
            query2["toImprove.$"] = newInfo;
            break;
        case "actionitems":
            query1.actionItems = oldInfo;
            query2["actionItems.$"] = newInfo;
            break;
        default:
            res.status(404).send("Invalid column name");
            return;
    };
    const response = await boardDetailModel.findOneAndUpdate(query1, { $set: query2 }, { useFindAndModify: true });
    if (response)
        res.status(200).send("Success");
    else
        res.status(404).send("Invalid boardID");
}