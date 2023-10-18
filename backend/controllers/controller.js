const Student = require("../models/student.js")
const School = require("../models/school.js")
const Company = require("../models/company.js")
const JobOffer = require("../models/jobOffer.js")

const authController = require('../controllers/authController');

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

exports.get_school = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let schoolId = req.query.id;
	Student
		.findOne()
		.where('_id').equals(schoolId)
		.exec((err, school) => {
			if (err) res.send(err);
			res.json(school);
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
	res.header("Access-Control-Allow-Origin", "*");
	Company.find().exec((err, company)=> {
		if (err) res.send(err);
		console.log(company)
		res.json(company);
	});
};

exports.list_schools = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	School.find().exec((err, school) => {
		if (err) res.send(err);
		console.log(school)
		res.json(school);
	});
};

exports.list_curriculums = (req, res) => {
	let schoolId = req.query.id;
	School
		.findOne()
		.where('_id').equals(schoolId)
		.select("curriculums")
		.exec((err, curriculums) => {
			if (err) res.send(err);
			res.json(curriculums);
		});
};

exports.get_jobOffers = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let companyId = req.query.id;
	JobOffer
		.find()
		.where('from')
		.equals(companyId)
		.exec((err, jobOffers) => {
			if (err) res.send(err);
			res.json(jobOffers);
		});
};

exports.delete_jobOffer = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let jobOfferId = req.query.id;
	JobOffer
		.findOneAndDelete()
		.where('_id')
		.equals(jobOfferId)
		.exec((err, result) => {
			if (err || result == null) {
				res.json({ message: 'Error on delete.'});
			}
			else{
				res.json({ message: 'Deletion completed successfully.', result: result});
			}
	});
};
