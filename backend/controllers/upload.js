const Image = require("../models/image.js");
const path = require("path");

exports.saveImage = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

        let userId = req.query.id;

        var date = new Date();

        const newImage = new Image(
            {
                of: userId,
                name: req.file.originalname,
                url: req.file.path,
                timestamp: date
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

exports.deleteImage = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let userId = req.query.id;

    Image.find({'of': userId})
        .sort({ 'timestamp': 1 })
        .exec((err, images) => {
            if (err) {
                res.json({ message: 'Error finding images.' });
            } else {
                if (images.length > 1) {
                    const oldestImage = images[0]; // Oldest image based on the timestamp
                    Image.findOneAndDelete({ _id: oldestImage._id }, (deleteErr, deletedImage) => {
                        if (deleteErr) {
                            res.json({ message: 'Error deleting the oldest image.' });
                        } else {
                            res.json({ message: 'Deletion completed successfully.', result: deletedImage });
                        }
                    });
                } else {
                    console.log('Only one or zero images found. No deletion needed.');
                }
            }
        });
}