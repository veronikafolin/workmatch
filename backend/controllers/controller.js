const Student = require("../models/student.js")
const School = require("../models/school.js")
const Company = require("../models/company.js")
const JobOffer = require("../models/jobOffer.js")
const Notification = require("../models/notification.js")

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

exports.get_company = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let companyId = req.query.id;
	Company
		.findOne()
		.where('_id').equals(companyId)
		.exec((err, company) => {
			if (err) res.send(err);
			res.json(company);
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
		res.json(company);
	});
};

exports.list_schools = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	School.find().exec((err, school) => {
		if (err) res.send(err);
		res.json(school);
	});
};

exports.list_curriculums = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	School
		.distinct('curriculums')
		.exec((err, curriculums) => {
			if (err) res.send(err);
			res.json(curriculums);
		});
};

exports.list_jobOffers = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	JobOffer.find().exec((err, jobOffer) => {
			if (err) res.send(err);
			res.json(jobOffer);
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

exports.insert_jobOffer = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	var newJobOffer = new JobOffer(req.body.jobOffer);
	newJobOffer
		.save((err, result) => {
			if (err) {
				res.json({ message: 'Error on insert the job offer.'});
			}
			else{
				res.json({ message: 'Insertion completed successfully.', result: result});
			}
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

exports.deleteProfile = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let userId = req.query.id;
	let userType = req.query.userType.toLowerCase();

	function deleteStudent(req, res) {
		Student
			.findByIdAndDelete({'_id': userId})
			.exec((err, result) => {
				if (err || result == null) {
					res.json({ message: 'Error on delete.'});
				}
				else{
					res.json({ message: 'Deletion completed successfully.', result: result});
				}
			});
	}

	function deleteCompany(req, res) {
		Company
			.findByIdAndDelete({'_id': userId})
			.exec((err, result) => {
				if (err || result == null) {
					res.json({ message: 'Error on delete.'});
				}
				else{
					res.json({ message: 'Deletion completed successfully.', result: result});
				}
			});
	}

	switch(userType){
		case 'student':
			deleteStudent(req, res);
			break;
		case 'company':
			deleteCompany(req, res)
			break;
		default:
			res.json({message: 'Error! Unknown user type'});
	}
};

exports.updateProfile = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let userId = req.body.id;
	let userType = req.body.userType.toLowerCase();

	let update = req.body.update;

	function updateStudent(req, res) {
		Student
			.findByIdAndUpdate({'_id': userId}, update)
			.exec((err, result) => {
				if (err || result == null) {
					res.json({ message: 'Error on update.'});
				}
				else{
					res.json({ message: 'Update completed successfully.', result: result});
				}
			});
	}

	function updateCompany(req, res) {
		Company
			.findByIdAndUpdate({'_id': userId}, update)
			.exec((err, result) => {
				if (err || result == null) {
					res.json({ message: 'Error on update.'});
				}
				else{
					res.json({ message: 'Update completed successfully.', result: result});
				}
			});
	}

	switch(userType){
		case 'student':
			updateStudent(req, res);
			break;
		case 'company':
			updateCompany(req, res)
			break;
		default:
			res.json({message: 'Error! Unknown user type'});
	}

};

exports.saveNotification = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	var newNotification = new Notification(req.body.notification);
	newNotification
		.save((err, result) => {
			if (err) {
				res.json({ message: 'Error on insert the notification.'});
			}
			else{
				res.json({ message: 'Insertion completed successfully.', result: result});
			}
		});
};

exports.get_notifications = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let userId = req.query.id;
	Notification
		.find()
		.where('to')
		.equals(userId)
		.exec((err, notifications) => {
			if (err) res.send(err);
			res.json(notifications);
		});
};

