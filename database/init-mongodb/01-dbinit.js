var connection = new Mongo();
var db = connection.getDB('workmatch'); //creates the db
db.createCollection('students', function(err, collection){}) //creates the collection
db.createCollection('schools', function(err, collection){}) //creates the collection
db.createCollection('companies', function(err, collection){}) //creates the collection
db.createCollection('joboffers', function(err, collection){}) //creates the collection
db.createCollection('notifications', function(err, collection){}) //creates the collection
db.createCollection('images', function(err, collection){}) //creates the collection