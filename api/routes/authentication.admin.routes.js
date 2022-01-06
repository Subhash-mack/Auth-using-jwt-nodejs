const router=require('express').Router();
const authAdminController= require('../controllers/authentication.admin.controller');
const auth=require('../middleware/auth');
const resetPassword=require('../controllers/resetPassword');

router.route('/register')
    .get(authAdminController.registerGET)
    .post(authAdminController.registerPOST)
router.route('/login')
    .get(auth,authAdminController.loginGET)
    .post(authAdminController.loginPOST)
router.route('/logout')
    .get(auth,authAdminController.logoutGET)
router.route('/resetPassword')
    .post(auth,resetPassword);
    



module.exports=router;