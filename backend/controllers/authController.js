const Student = require("../models/student.js");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const SECRET_KEY = 'E79FB19FDC927E709F250F01CAFED631971E3ECD';

exports.signup = (req, res) => {
    let type = req.body.type.toLowerCase();
    let user = req.body.user;
    switch(type){
        case 'student':
            registerStudent(user, res);
            break;
        case 'company':
            //TODO
            break;
        case 'school':
            //TODO
            break;
        default:
            res.json({message: 'Error! Unknown user type'});
    }
}

exports.login = (req, res) => {
    let type = req.body.type.toLowerCase();
    let user = req.body.user;
    switch(type){
        case 'student':
            loginStudent(user, res);
            break;
        case 'company':
            //TODO
            break;
        case 'school':
            //TODO
            break;
        default:
            res.json({message: 'Error! Unknown user type'});
    }
}

exports.authorization = (token, id) => { 
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

function registerStudent(user, res) {
    res.header('Access-Control-Allow-Origin', '*');
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

function loginStudent(user, res) {
    res.header('Access-Control-Allow-Origin', '*');
    Student
        .findOne()
        .where('username').equals(user.username)
        .exec((err, student) => {
            if (student != null && !err) {
                res.json(generateToken(user, student))
            } else {
                res.json({ message: 'Error! The specified student does not exist'});
            }
        });
}


function generateToken(remoteUser, dbUser){
    if(bcrypt.compareSync(remoteUser.password, dbUser.password)){
        let token = jsonwebtoken.sign({ username: dbUser.username, id: dbUser._id }, SECRET_KEY, { algorithm: 'HS512', expiresIn: '7d' });
        return { message: 'ok', token: token };
    } else {
        return { message: 'Error! Wrong password'};
    }
}