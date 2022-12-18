const Student = require("../models/student.js")

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
}