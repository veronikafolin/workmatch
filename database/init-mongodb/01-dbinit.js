var connection = new Mongo();
var db = connection.getDB('workmatch'); //creates the db
db.createCollection('students', function(err, collection){}) //creates the collection
db.createCollection('schools', function(err, collection){}) //creates the collection
db.createCollection('companies', function(err, collection){}) //creates the collection