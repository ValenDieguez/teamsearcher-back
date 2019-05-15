// Express configuration
const express = require('express');
const app = express();
// Imports
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Configuration
const config = require('./configuration.js').configuration();

// Admin
const admin = require('firebase-admin'),
    key = require('./key.json');
admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: "https://temsearcher.firebaseio.com"
});





app.get('/getUsuario', (req, res) => {
    admin.auth().getUserByEmail('prueba@prueba.com').then((userRecord) => {
        res.status(200).send(userRecord);
    }).catch((error) => {
        res.status(409).send(error);
    });
});

app.get('/getOneTeam', (req, res) => {
    admin;
});



app.listen(config.aplication_port, function () {
    console.log(key);
    console.log('---------------------------------');
    console.log(config);

    console.log(`Connected to port ${config.aplication_port}`);
});