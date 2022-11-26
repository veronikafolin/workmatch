const Student = require("../models/student.js")
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

exports.signup = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let user = req.body.user;
    Student
        .findOne()
        .where('username').equals(user.username)
        .exec(function(err, student) {
            if (student == null) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(user.password, salt);
                user.salt = salt;
                user.password = hash;
                var newStudent = new Student(user);
                newStudent.save(function(err, st){
                    if(err) res.json({ message: 'Error! Retry later' });
                    else res.json({ message: 'OK! User registerd! '});
                })
            } else{
                res.json({ message: 'Error! User already registered' })
            }
        })
}