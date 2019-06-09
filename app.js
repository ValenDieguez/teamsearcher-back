// Express configuration
const express = require('express')
const cors = require('cors')
const app = express()
var router = express.Router()
// Imports
const bodyParser = require('body-parser')
var id = 0

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Configuration
const config = require('./configuration.js').configuration()

// Admin
const admin = require('firebase-admin'),
  key = require('./key.json')
admin.initializeApp({
  credential: admin.credential.cert(key),
  databaseURL: 'https://temsearcher.firebaseio.com',
})

// Firebase ADO
var db = admin.firestore()

app.get('/getUsuario', (req, res) => {
  admin
    .auth()
    .getUserByEmail('prueba@prueba.com')
    .then(userRecord => {
      res.status(200).send(userRecord)
    })
    .catch(error => {
      res.status(409).send(error)
    })
})

// Data access functions

app.get('/teams', function(req, res) {
  db.collection('team')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })
      res.send(objects)
    })
})

app.get('/team/:id', function(req, res) {
  var paramsId = req.params.id
  var correctItem = null
  db.collection('team')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })

      for (var item of objects) {
        if (item.id.toString() === paramsId) {
          correctItem = item
        }
      }
      res.send(correctItem)
    })
})

app.get('/match/:id', function(req, res) {
  var paramsId = req.params.id
  var correctItem = null
  db.collection('match')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })

      for (var item of objects) {
        if (item.id.toString() === paramsId) {
          correctItem = item
        }
      }
      res.send(correctItem)
    })
})

app.get('/matchTeam/:idTeam', function(req, res) {
  var paramsId = req.params.idTeam
  var correctItem = []
  db.collection('match')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })

      for (var item of objects) {
        if (item.idTeam.toString() === paramsId) {
          correctItem.push(item)
        }
      }
      res.send(correctItem)
    })
})

app.get('/map/:id', function(req, res) {
  var paramsId = req.params.id
  var correctItem = null
  db.collection('map')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })

      for (var item of objects) {
        if (item.id.toString() === paramsId) {
          correctItem = item
        }
      }
      res.send(correctItem)
    })
})
app.get('/player/:id', function(req, res) {
  var paramsId = req.params.id
  var correctItem = null
  db.collection('player')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })

      for (var item of objects) {
        if (item.id.toString() === paramsId) {
          correctItem = item
        }
      }
      res.send(correctItem)
    })
})

app.get('/teamPlayers/:id', function(req, res) {
  var paramsId = req.params.id
  var players = []
  db.collection('user_team')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })

      for (var user_team of objects) {
        if (user_team.team_id.toString() === paramsId) {
          db.collection('player')
            .get()
            .then(querySnapshot => {
              var playersSelected = []
              querySnapshot.forEach(doc => {
                var playerSelected = doc.data()
                playersSelected.push(playerSelected)
              })
              for (var item of playersSelected) {
                if (item.id === user_team.player) {
                  players.push(item)
                }
              }
              res.send(players)
            })
        }
      }
    })
})

app.get('/matchPlayers/:id', function(req, res) {
  var paramsId = req.params.id
  var players = []
  db.collection('match_player')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })

      for (var match_player of objects) {
        if (match_player.matchId.toString() === paramsId) {
          db.collection('player')
            .get()
            .then(querySnapshot => {
              var playersSelected = []
              querySnapshot.forEach(doc => {
                var playerSelected = doc.data()
                playersSelected.push(playerSelected)
              })
              for (var item of playersSelected) {
                if (item.id === match_player.playerId) {
                  players.push(item)
                }
              }
              res.send(players)
            })
        }
      }
    })
})

app.get('/game/:id', function(req, res) {
  var paramsId = req.params.id
  var correctItem = null
  db.collection('game')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })

      for (var item of objects) {
        if (item.id.toString() === paramsId) {
          correctItem = item
        }
      }
      res.send(correctItem)
    })
})

app.get('/players', function(req, res) {
  db.collection('player')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })
      res.send(objects)
    })
})

app.get('/games', function(req, res) {
  db.collection('game')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })
      res.send(objects)
    })
})

app.get('/matches', function(req, res) {
  db.collection('match')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })
      res.send(objects)
    })
})

app.get('/matchesTeam', function(req, res) {
  db.collection('match')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })
      res.send(objects)
    })
})

app.get('/maps', function(req, res) {
  db.collection('map')
    .get()
    .then(querySnapshot => {
      var objects = []
      querySnapshot.forEach(doc => {
        var object = doc.data()
        objects.push(object)
      })
      res.send(objects)
    })
})

app.post('/team', (req, res) => {
  getFollowingId('team', req, res)
})

app.post('/match', (req, res) => {
  getFollowingId('match', req, res)
})

app.post('/game', (req, res) => {
  getFollowingId('game', req, res)
})

app.post('/map', (req, res) => {
  getFollowingId('map', req, res)
})

app.post('/player', (req, res) => {
  getFollowingId('player', req, res)
})

app.post('/team/:id', (req, res) => {
  db.collection('team')
    .doc(req.body.id)
    .set(req.body.data)
    .then(ref => {
      res.json({ message: 'Added document with ID: ' + ref.id }) // ref.id devuelve el id
    })
})

app.post('/match/:id', (req, res) => {
  db.collection('match')
    .doc(req.body.id)
    .set(req.body.data)
    .then(ref => {
      res.json({ message: 'Added document with ID: ' + ref.id }) // ref.id devuelve el id
    })
})

app.post('/game/:id', (req, res) => {
  db.collection('game')
    .doc(req.body.id)
    .set(req.body.data)
    .then(ref => {
      res.json({ message: 'Added document with ID: ' + ref.id }) // ref.id devuelve el id
    })
})

app.post('/map/:id', (req, res) => {
  db.collection('map')
    .doc(req.body.id)
    .set(req.body.data)
    .then(ref => {
      res.json({ message: 'Added document with ID: ' + ref.id }) // ref.id devuelve el id
    })
})

app.post('/player/:id', (req, res) => {
  db.collection('player')
    .doc(req.body.id)
    .set(req.body.data)
    .then(ref => {
      res.json({ message: 'Added document with ID: ' + ref.id }) // ref.id devuelve el id
    })
})

app.delete('/playerDelete/:id', (req, res) => {
  db.collection('player')
    .doc(req.params.id)
    .delete()
    .then(ref => {
      res.json({ message: 'Removed document with ID:' + ref.id })
    })
})

app.delete('/deletePlayerTeam/:id/:userId', (req, res) => {
  try {
    const paramsId = req.params.id
    const userId = req.params.userId
    db.collection('team')
      .where('id', '==', paramsId)
      .get()
      .then(querySnapshop => {
        const data = querySnapshop.docs[0].data()
        const editTeam = {
          ...data,
          ...{
            members: data.members.filter(member => member !== userId),
          },
        }
        db.collection('team')
          .set(editTeam)
          .then(() => res.json(editTeam))
          .catch(e => res.status(500).json(e))
      })
      .catch(e => res.status(500).json(e))
  } catch (e) {
    res.status(500).json(e)
  }
})

app.delete('/mapDelete/:id', (req, res) => {
  db.collection('map')
    .doc(req.params.id)
    .delete()
    .then(ref => {
      res.json({ message: 'Removed document with ID:' + ref.id })
    })
})

app.delete('/gameDelete/:id', (req, res) => {
  db.collection('game')
    .doc(req.params.id)
    .delete()
    .then(ref => {
      res.json({ message: 'Removed document with ID:' + ref.id })
    })
})

app.delete('/matchDelete/:id', (req, res) => {
  db.collection('match')
    .doc(req.params.id)
    .delete()
    .then(ref => {
      res.json({ message: 'Removed document with ID:' + ref.id })
    })
})

app.delete('/teamDelete/:id', (req, res) => {
  console.log(req.params.id)
  db.collection('team')
    .doc(req.params.id)
    .delete()
    .then(ref => {
      console.log('team borrado')
      res.json({ message: 'Removed document with ID:' + ref.id })
    })
})

function getFollowingId(dataString, req, res) {
  let id = 0
  db.collection(dataString)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().id != null && doc.data().id > id) {
          id = doc.data().id
        }
      })
      req.body.id = parseInt(id) + 1
      db.collection(dataString)
        .add(req.body)
        .then(ref => {
          res.json({ message: 'Added document with ID: ' + ref.id }) // ref.id devuelve el id
        })
    })
}

app.listen(config.aplication_port, function() {
  console.log(`Connected to port ${config.aplication_port}`)
})
