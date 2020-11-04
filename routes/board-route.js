const route = require('express').Router();
const controller = require('../controllers/board-controller');

route.get('/:owner', controller.getBoardList);
route.delete(`/:boardID`, controller.deleteBoard);

module.exports = route;