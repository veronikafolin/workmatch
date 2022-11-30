var connection = new Mongo();
var db = connection.getDB('workmatch'); //creates the db
//creates the collection
db.createCollection('students', function(err, collection){}) 
db.createCollection('schools', function(err, collection){}) 
db.createCollection('companies', function(err, collection){}) 