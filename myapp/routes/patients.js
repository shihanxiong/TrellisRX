var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var uri = "mongodb://pointbit:chickenandrice@pbcluster01-shard-00-00-lviwo.mongodb.net:27017,pbcluster01-shard-00-01-lviwo.mongodb.net:27017,pbcluster01-shard-00-02-lviwo.mongodb.net:27017/TrellisRx?ssl=true&replicaSet=PBCluster01-shard-0&authSource=admin";
var mongoClient = mongodb.MongoClient;

/* Default page. */
router.get('/', function (req, res, next) {
  res.send('respond with a list of patients');
});

// Get the list of all patients
router.get('/showall', function (req, res) {
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

// Find the given patient's medications
router.get('/:id/meds', function (req, res) {
  mongoClient.connect(uri, function (err, db) {
    if (err) {
      console.log('Unable to connect to the database server.', err);
      db.close();
    } else {
      console.log('Connection established...');

      var collection = db.collection('Patients');

      // Assign the query ID as an object ID
      var o_id = new mongodb.ObjectID(req.params.id);
      collection.find({
        "_id": o_id
      }).toArray(function (err, result) {
        if (err) {
          res.send('Error occured while finding patients.');
        } else if (result.length) {
          //res.send(result);
          res.send(result[0].Medications);
        } else {
          console.log(err);
          res.send('No patients found.');
        }
      });
      db.close();
    }
  });
});

// Add all patients
router.get('/addallpatients', function (req, res) {
  mongoClient.connect(uri, function (err, db) {
    if (err) {
      console.log('Unable to connect to the database server.', err);
      db.close();
    } else {
      console.log('Connection established...');

      var collection = db.collection('Patients');

      collection.insertMany([{
        "lastName": "Smith",
        "firstName": "Fred",
        "town": "Arlington",
        "Medications": [{
            "medname": "morphine",
            "dose": "10mg",
            "startDate": new Date("2015-10-10T00:00:00Z")
          },
          {
            "medname": "acetaminophen",
            "dose": "325mg",
            "startDate": new Date("2015-10-11T00:00:00Z"),
            "stopDate": new Date("2015-10-14T00:00:00Z")
          },
          {
            "medname": "furosemide",
            "dose": "20mg",
            "startDate": new Date("2015-10-31T00:00:00Z")
          }
        ]
      }, {
        "lastName": "Jones",
        "firstName": "Sally",
        "town": "Milford",
        "Medications": [{
            "medname": "morphine",
            "dose": "15mg",
            "startDate": new Date("2015-10-11T00:00:00Z")
          },
          {
            "medname": "coumadin",
            "dose": "5mg",
            "startDate": new Date("2015-10-15T00:00:00Z")
          },
          {
            "medname": "lovenox",
            "dose": "100mg/mL",
            "startDate": new Date("2015-10-31T00:00:00Z"),
            "stopDate": new Date("2015-11-02T00:00:00Z")
          }
        ]
      }], function (err, result) {
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