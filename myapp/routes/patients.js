var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* Default page. */
router.get('/', function (req, res, next) {
  res.send('respond with a list of patients');
});

// Get the list of all patients
router.get('/list', function (req, res) {
  var mongoClient = mongodb.MongoClient;

  var collection = db.collection('patients');
  collection.find({}).toArray(function(err, result){
    if (err) {
      res.send('Error occured while finding patients.');
    } else if (result.length) {
      res.send(result);
    } else {
      res.send('No patients found.');
    }
  });
  
});

module.exports = router;
