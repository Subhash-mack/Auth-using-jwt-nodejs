const router=require('express').Router();
const productController=require('../controllers/products.controller');
const multerInstance=require('../middleware/multer');
const auth=require('../middleware/auth');

router.route('/')
    .get(productController.getProducts)
    .post(multerInstance.upload.single('image'),productController.createProduct)

router.route('/:id')
    .get(auth,productController.getProductById)
    .delete(auth,productController.removeProduct)


module.exports=router;

