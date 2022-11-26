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
                console.log(req.body)
                const hash = bcrypt.hashSync(user.password, salt);
                console.log(`signup, salt: ${salt} hash: ${hash}`)

                //TODO --- salvare per bene 
                var newStudent = new Student({
                    email: 'alemme@gmail.com', username: user.username, password: hash, 
                    grade: '100', name: 'Alessandro', surname: 'Magnani', school: { name: 'ITIS N.Baldini', type: 'Technical institute'}
                });

                newStudent.save(function(err, st){
                    if(err) res.json({ message: 'Error! Retry later' });
                    else res.json({ message: 'OK! User registerd! '});
                })
            } else{
                res.json({ message: 'Error! User already registered' })
            }
        })
}