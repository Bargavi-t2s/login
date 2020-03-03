const express= require('express');
const router = express.Router();
const bcrypt =require('bcrypt');
let db="";
//-----------------------database connection------------------------------------------------------------

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'loginapp';

// Use connect method to connect to the server
MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to database via mongo");

  db = client.db(dbName);
  //console.log(db);

});

exports.insertDocuments = function(email,password, callback) {
    const collection = db.collection('users');
    var val= bcrypt.hashSync(password,10);
    collection.insertOne(
      { Email: email,
        Password: val }
    , function(err, result) {
      assert.equal(1, result.result.n);
       callback(result);
    });
  }

//---------------------------------authentication--------------------------------------------------------------------

exports.authenticateuser = function(email,password, callback) {
    const collection = db.collection('users');
    collection.findOne(
      { Email: email }
    , function(err, result) {
      if(result){
      bcrypt.compare(password, result.Password).then(res1 => {
              if(res1)
              {
                return callback(res1);
              }
              else{
                return callback(res1);
              }
            
            }).catch(err => console.error(err.message));
                }
      else{
        return callback(result);
      }
    });
}

  exports.authenticateemail = function(email, callback) {
    const collection = db.collection('users');
    collection.findOne(
      { Email: email
       }
    , function(err, result) {
       return callback(result);
    });
  }
