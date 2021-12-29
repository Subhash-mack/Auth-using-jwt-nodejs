const router=require('express').Router();
const registerController= require('../controllers/register.controller');
const LoginController=require('../controllers/login.controller');
const auth=require('../middleware/auth');


router.route('/register')
    .get(registerController.registerGET)
    .post(registerController.registerPOST)
router.route('/login')
    .get(auth,LoginController.home)
    .post(LoginController.LoginPOST)
    



module.exports=router;