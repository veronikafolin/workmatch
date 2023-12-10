const controller = require("../controllers/controller");
const authController = require("../controllers/authController");

module.exports = (app) => {
    const controller = require('../controllers/controller');
    const authController = require('../controllers/authController');
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();

    app
        .route('/api/greet/')
        .get(controller.greet);
    
    app
        .route('/api/students')
        .get(controller.list_students);

    app
        .route('/api/student')
        .get(jsonParser, controller.get_student);

    app
        .route('/api/school')
        .get(jsonParser, controller.get_school);

    app
        .route('/api/company')
        .get(jsonParser, controller.get_company);

    app
        .route('/api/message')
        .get(jsonParser, controller.get_message);

    app
        .route('/api/signup')
        .post(jsonParser, authController.signup);

    app
        .route('/api/login')
        .post(jsonParser, authController.login);

    app
        .route('/api/schools')
        .get(jsonParser, controller.list_schools);

    app
        .route('/api/companies')
        .get(jsonParser, controller.list_companies);

    app
        .route('/api/curriculums')
        .get(jsonParser, controller.list_curriculums);

    app
        .route('/api/jobOffers')
        .get(jsonParser, controller.list_jobOffers);

    app
        .route('/api/jobOffersOfCompany')
        .get(jsonParser, controller.get_jobOffers);

    app
        .route('/api/insertJobOffer')
        .post(jsonParser, controller.insert_jobOffer);

    app
        .route('/api/deleteJobOffer')
        .delete(jsonParser, controller.delete_jobOffer);

    app
        .route('/api/deleteProfile')
        .delete(jsonParser, controller.deleteProfile);

    app
        .route('/api/updateProfile')
        .put(jsonParser, controller.updateProfile);

    app
        .route('/api/notifications')
        .get(jsonParser, controller.get_notifications);

    app
        .route('/api/saveNotification')
        .post(jsonParser, controller.saveNotification);
}