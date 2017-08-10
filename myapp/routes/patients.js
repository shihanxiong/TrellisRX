var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var uri = "mongodb://pointbit:chickenandrice@pbcluster01-shard-00-00-lviwo.mongodb.net:27017,pbcluster01-shard-00-01-lviwo.mongodb.net:27017,pbcluster01-shard-00-02-lviwo.mongodb.net:27017/TrellisRx?ssl=true&replicaSet=PBCluster01-shard-0&authSource=admin";

/* Default page. */
router.get('/', function (req, res, next) {
  res.send('respond with a list of patients');
});

// Get the list of all patients
router.get('/showall', function (req, res) {
  var mongoClient = mongodb.MongoClient;

  mongoClient.connect(uri, function (err, db) {
    if (err) {
      console.log('Unable to connect to the database server.', err);
      db.close();
    } else {
      console.log('Connection established...');

      var collection = db.collection('Patients');
      collection.find({}).toArray(function (err, result) {
        if (err) {
          res.send('Error occured while finding patients.');
        } else if (result.length) {
          res.send(result);
        } else {
          res.send('No patients found.');
        }
      });
      db.close();
    }
  });
});

// Add a patient
router.post('/addpatient', function (req, res) {
  var mongoClient = mongodb.MongoClient;

  mongoClient.connect(uri, function (err, db) {
    if (err) {
      console.log('Unable to connect to the database server.', err);
    } else {
      console.log('Connected to server.');

      var collection = db.collection('patients');

      var patient = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        town: req.body.town
      };

      collection.insert([patient], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('showall');
        }
      });
      db.close();
    }
  });

});

module.exports = router;
