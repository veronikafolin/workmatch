const mongoose = require('mongoose');
const Student = require("../models/student.js")(mongoose);
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

exports.signup = (req, res) => {
    var newUser = req.body.params;
    Student
        .findOne()
        .where('username').equals(newUser.username)
        .exec(function(err, student) {
            if (student == null) {
                //I can save it
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newUser.password, salt);
                console.log(`signup, salt: ${salt} hash: ${hash}`)
            } else{
                res.json({message: 'Error! User already registered'})
            }
        })
}