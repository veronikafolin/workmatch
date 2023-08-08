const Student = require("../models/student.js")
const School = require("../models/school.js")
const Company = require("../models/company.js")

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

exports.list_companies = (req, res) => {
	Company.find().exec((err, company)=> {
		if (err) res.send(err);
		console.log(company)
		res.json(company);
	});
};

exports.list_schools = (req, res) => {
	School.find().exec((err, school)=> {
		if (err) res.send(err);
		console.log(school)
		res.json(school);
	});
};