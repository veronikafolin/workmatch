const Student = require("../models/student.js")
var authController = require('../controllers/authController');

exports.greet = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.json({ name: 'Davide' })
};


exports.list_students = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	Student.find().exec((err, students) => {
		if (err) res.send(err);
		res.json(students);
	});
};

exports.get_student = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let studentId = req.query.id;
	Student
	.findOne()
	.where('_id').equals(studentId)
	.exec((err, student) => {
		if (err) res.send(err);
		res.json(student);
	});
};

exports.get_message = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let token = req.headers['authorization'];
	let userId = req.query.id;
	let auth = authController.authorization(token, userId);
	if(auth.isValid){
		res.json({message: 'Oook, valid token!'});
	}else{
		res.json({message: 'Ooooops, non-valid token!'});
	}
};