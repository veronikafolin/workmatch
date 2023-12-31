const Image = require("../models/image.js");
const path = require("path");

exports.saveImage = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

        let userId = req.query.id;

        const newImage = new Image(
            {
                of: userId,
                name: req.file.originalname,
                url: req.file.path
            })

        newImage.save().then((err, result) => {
            if (err) {
                res.json({ message: 'Error on save the image.'});
            }
            else{
                res.json({ message: 'Insertion completed successfully.', result: result});
            }
        });
}

exports.getImage = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let userId = req.query.id;
    Image
        .findOne()
        .where('of')
        .equals(userId)
        .exec((err, image) => {
            if (err) res.send(err);
            try{
                res.sendFile(path.resolve(image["url"]));
            } catch (err) {
                res.sendFile(path.resolve("../uploads/avatar.png"));
            }
        });
}