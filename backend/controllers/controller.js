const mongoose = require('mongoose');
const Student = require("../models/student.js")(mongoose);

exports.greet = (req, res) => {
    res.sendFile(global.appRoot + '/public/greet.html')
};

exports.mainpage = (req, res) => {
    res.sendFile(global.appRoot + '/public/index.html')
}

exports.list_students = (req, res)=> {
	Student.find().exec((err, student)=> {
		if (err) res.send(err);
        console.log(student)
		res.json(student);
	});
};