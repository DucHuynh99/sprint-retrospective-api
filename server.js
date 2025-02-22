const connectionString = 'mongodb://admin:H5jka88bnqsH2Y3@sprint-retrospective-da-shard-00-00.9n3q1.mongodb.net:27017,sprint-retrospective-da-shard-00-01.9n3q1.mongodb.net:27017,sprint-retrospective-da-shard-00-02.9n3q1.mongodb.net:27017/SprintRetrospectiveDB?ssl=true&replicaSet=atlas-w8j4zr-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('./middleware/passport');

const boardRoute = require('./routes/board-route');
const userRoute = require('./routes/user-route');


mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Kết nối CSDL thành công!'));


const app = express();
app.use(bodyParser.json());
app.use(cors());


// app.use(passport.initialize());


app.use('/boards', boardRoute);
app.use('/users', userRoute);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));