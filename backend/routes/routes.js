module.exports = (app) => {
    var controller = require('../controllers/controller')
    var authController = require('../controllers/authController')
    
    app
        .route('/api/greet/')
        .get(controller.greet);
    
    app
        .route('/api/students')
        .get(controller.list_students)

    app
        .route('/api/signup')
        .post(authController.signup);
}