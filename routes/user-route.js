const route = require('express').Router();
const passport = require('../middleware/passport');
const controller = require('../controllers/user-controller');
const { json } = require('body-parser');


route.get('/logout', passport.authenticate('jwt', { session: false }), async (req, res) => {
    req.user.token = undefined;
    console.log(req.user);
    await req.user.save();
    res.status(200).send('Success');
});
route.get('/:userID', controller.getUserByID);
route.post('/', passport.authenticate('local', { session: false }), controller.login);
route.post('/register', controller.register);
route.put('/update', controller.update);
route.post('/login-with-google', controller.loginWithGoogle);
route.post('/login-with-facebook', controller.loginWithFacebook);

module.exports = route;