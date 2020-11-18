const route = require('express').Router();
const { Router } = require('express');
const controller = require('../controllers/board-controller');

route.post('/add', controller.addBoard);
route.post('/add-went-well', controller.addWentWell);
route.post('/add-to-improve', controller.addToImprove);
route.post('/add-action-item', controller.addActionItem);
route.post('/update-board-name', controller.updateBoardName);
route.post('/update-board-detail', controller.updateBoardDetail);
route.post('/delete-board-detail', controller.deleteBoardDetail);
route.get('/details/:boardID', controller.getBoardDetail);
route.get('/:owner', controller.getBoardList);
route.get('/get-by-id/:boardID', controller.getBoardByID);
route.delete(`/:boardID`, controller.deleteBoard);

module.exports = route;