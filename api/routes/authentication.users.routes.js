const router=require('express').Router();
const authController= require('../controllers/authentication.controller');
const resetPassword = require('../controllers/resetPassword');
const auth=require('../middleware/auth');


router.route('/register')
    .get(authController.registerGET)
    .post(authController.registerPOST)
router.route('/login')
    .get(auth,authController.loginGET)
    .post(authController.loginPOST)
router.route('/logout')
    .get(auth,authController.logoutGET)
router.route('/resetPassword')
    .post(auth,resetPassword);
    



module.exports=router;