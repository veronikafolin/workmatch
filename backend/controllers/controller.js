const Student = require("../models/student.js")
const School = require("../models/school.js")
const Company = require("../models/company.js")

exports.greet = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.json({ name: 'Davide' })
};


exports.list_students = (req, res) => {
	Student.find().exec((err, student)=> {
		if (err) res.send(err);
        console.log(student)
		res.json(student);
	});
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