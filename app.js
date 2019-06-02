// Express configuration
const express = require('express');
const cors = require('cors');
const app = express();
var router = express.Router();
// Imports
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Configuration
const config = require('./configuration.js').configuration();

// Admin
const admin = require('firebase-admin'),
    key = require('./key.json');
admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: "https://temsearcher.firebaseio.com"
});

// Firebase ADO
var db = admin.firestore();


app.get('/getUsuario', (req, res) => {
    admin.auth().getUserByEmail('prueba@prueba.com').then((userRecord) => {
        res.status(200).send(userRecord);
    }).catch((error) => {
        res.status(409).send(error);
    });
});

// Data access functions


app.get('/teams', function (req, res) {
    db.collection('team').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        });
        res.send(objects);
    })
});


app.get('/team/:id', function (req, res) {
    var paramsId = req.params.id;
    var correctItem = null;
    db.collection('team').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        });

        for (var item of objects) {
            if (item.id.toString() === paramsId) {
                correctItem = item;
            }
        }
        res.send(correctItem);
    })
});

app.get('/match/:id', function (req, res) {
    var paramsId = req.params.id;
    var correctItem = null;
    db.collection('match').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        });

        for (var item of objects) {
            if (item.id.toString() === paramsId) {
                correctItem = item;
            }
        }
        res.send(correctItem);
    })
});

app.get('/map/:id', function (req, res) {
    var paramsId = req.params.id;
    var correctItem = null;
    db.collection('map').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        });

        for (var item of objects) {
            if (item.id.toString() === paramsId) {
                correctItem = item;
            }
        }
        res.send(correctItem);
    })
});
app.get('/player/:id', function (req, res) {
    var paramsId = req.params.id;
    var correctItem = null;
    db.collection('player').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        });

        for (var item of objects) {
            if (item.id.toString() === paramsId) {
                correctItem = item;
            }
        }
        res.send(correctItem);
    })
});

app.get('/game/:id', function (req, res) {
    var paramsId = req.params.id;
    var correctItem = null;
    db.collection('game').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        });

        for (var item of objects) {
            if (item.id.toString() === paramsId) {
                correctItem = item;
            }
        }
        res.send(correctItem);
    })
});


app.get('/players', function (req, res) {
    db.collection('player').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        })
        res.send(objects);
    })
});

app.get('/games', function (req, res) {
    db.collection('game').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        })
        res.send(objects);
    })
});

app.get('/matches', function (req, res) {
    db.collection('match').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        })
        res.send(objects);
    })
});

app.get('/maps', function (req, res) {
    db.collection('map').get().then(querySnapshot => {
        var objects = [];
        querySnapshot.forEach(doc => {
            var object = doc.data();
            objects.push(object);
        })
        res.send(objects);
    })
});

app.post('/team', (req, res) => {
    db.collection('team').add(req.body).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/match', (req, res) => {
    db.collection('match').add(req.body).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/game', (req, res) => {
    db.collection('game').add(req.body).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/map', (req, res) => {
    db.collection('map').add(req.body).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/player', (req, res) => {
    db.collection('player').add(req.body).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/team/:id', (req, res) => {
    db.collection('team').doc(req.body.id).set(req.body.data).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/match/:id', (req, res) => {
    db.collection('match').doc(req.body.id).set(req.body.data).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/game/:id', (req, res) => {
    db.collection('game').doc(req.body.id).set(req.body.data).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/map/:id', (req, res) => {
    db.collection('map').doc(req.body.id).set(req.body.data).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});

app.post('/player/:id', (req, res) => {
    db.collection('player').doc(req.body.id).set(req.body.data).then(ref => {
        res.json({message: 'Added document with ID: ' + ref.id}); // ref.id devuelve el id
    });
});


app.delete('/playerDelete/:id', (req, res) => {
    db.collection('player').doc(req.params.id).delete()
        .then(ref => {
            res.json({message: 'Removed document with ID:' + ref.id});
        })
});

app.delete('/mapDelete/:id', (req, res) => {
    db.collection('map').doc(req.params.id).delete()
        .then(ref => {
            res.json({message: 'Removed document with ID:' + ref.id});
        })
});

app.delete('/gameDelete/:id', (req, res) => {
    db.collection('game').doc(req.params.id).delete()
        .then(ref => {
            res.json({message: 'Removed document with ID:' + ref.id});
        })
});

app.delete('/matchDelete/:id', (req, res) => {
    db.collection('match').doc(req.params.id).delete()
        .then(ref => {
            res.json({message: 'Removed document with ID:' + ref.id});
        })
});

app.delete('/teamDelete/:id', (req, res) => {
    db.collection('team').doc(req.params.id).delete()
        .then(ref => {
            res.json({message: 'Removed document with ID:' + ref.id});
        })
});


function postTeam() {
    db.collection('team').doc(team).post()

}


app.listen(config.aplication_port, function () {


    console.log(`Connected to port ${config.aplication_port}`);
});