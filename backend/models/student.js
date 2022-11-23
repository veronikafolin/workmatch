module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var StudentSchema = new Schema({
        email:  String, 
        grade: String,
        name: String,
		school: {
			name: String,
			type: String
		},
        surname: String
    });
    return mongoose.model('Student', StudentSchema);
};