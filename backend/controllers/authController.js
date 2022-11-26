const Student = require("../models/student.js");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const SECRET_KEY = 'E79FB19FDC927E709F250F01CAFED631971E3ECD';

exports.signup = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let user = req.body.user;
    Student
        .findOne()
        .where('username').equals(user.username)
        .exec((err, student) => {
            if (student == null) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(user.password, salt);
                user.salt = salt;
                user.password = hash;
                var newStudent = new Student(user);
                newStudent.save((err, st) => {
                    if(err) res.json({ message: 'Error! Retry later' });
                    else res.json({ message: 'OK! User registerd! '});
                });
            } else{
                res.json({ message: 'Error! User already registered' })
            }
        });
}

exports.login = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let user = req.body.user;
    Student
        .findOne()
        .where('username').equals(user.username)
        .exec((err, student) => {
            if (student != null && !err) {
                if(bcrypt.compareSync(user.password, student.password)){
                    let token = jsonwebtoken.sign({ username: student.username, id: student._id }, SECRET_KEY, { algorithm: 'HS512', expiresIn: '7d' });
                    res.json({ result: 'ok', token: token });
                } else {
                    res.json({ message: 'Error! Wrong password'});
                }
            } else {
                res.json({ message: 'Error! The specified user does not exist'});
            }
        });
}

function authorization(token, id){ 
    let valid;
    if(token == null) valid = { isValid: false };
    try {
        const decoded = jsonwebtoken.verify(token, SECRET_KEY);
        if(decoded.id == id) valid = { isValid: true }
        else valid = { isValid: false }
    }catch(ex){
        valid = { isValid: false };
    }
    return valid;
} 