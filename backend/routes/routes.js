module.exports = (app) => {
    var controller = require('../controllers/controller');
    var authController = require('../controllers/authController');
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();
    app
        .route('/api/greet/')
        .get(controller.greet);
    
    app
        .route('/api/students')
        .get(controller.list_students);

    app
        .route('/api/signup')
        .post(jsonParser, authController.signup);
    app
        .route('/api/login')
        .post(jsonParser, authController.login);
    app
        .route('/api/schools')
        .get(controller.list_schools);
    app
        .route('/api/companies')
        .get(controller.list_companies);
}