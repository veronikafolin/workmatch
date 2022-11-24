const mongoose = require('mongoose');
const Student = require("../models/student.js")(mongoose);
const constants = require("../../constants")

exports.greet = (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.json({ name: 'Davide' })
};


exports.list_students = (req, res)=> {
	Student.find().exec((err, student)=> {
		if (err) res.send(err);
        console.log(student)
		res.json(student);
	});
};