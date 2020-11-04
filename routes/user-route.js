const route = require('express').Router();
const controller = require('../controllers/user-controller');

route.get('/:userID', controller.getUserByID);
route.post('/', controller.login);
route.post('/register', controller.register);
route.put('/update', controller.update);

module.exports = route;