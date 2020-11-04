const userModel = require('../models/user-model');

exports.register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const newUser = new userModel({ email: email, password: password, firstName: firstName, lastName: lastName });
    const { _id } = await newUser.save();
    if (_id) {
        res.status(200).send(_id);
    } else {
        res.status(500).send();
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const { _id } = await userModel.findOne({ email: email, password: password }).select('_id');
    if (_id) {
        res.status(200).send(_id);
    } else {
        res.status(404).send();
    }
}

exports.getUserByID = async (req, res) => {
    const { userID } = req.params;
    const user = await userModel.findById(userID).select('-password');
    console.log(user);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send();
    }
}
