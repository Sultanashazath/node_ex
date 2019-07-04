let express = require('express');
let router = express.Router();
let controller=require('../controllers/controller')
router.get('/api',controller.test)
router.post('/login',controller.login)
router.post('/register',controller.register);


module.exports=router