module.exports = (app) => {
    var controller = require('../controllers/controller')

    /*app
        .route('/')
        .get(controller.mainpage);*/
    
    app
        .route('/api/greet')
        .get(controller.greet);
    
    app
        .route('/api/students')
        .get(controller.list_students)


    app.use(controller.mainpage)
}