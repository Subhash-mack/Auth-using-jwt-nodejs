const productRepository=require('../../repository/repository.product');

module.exports=class ProductsController{
     static createProduct=async (req,res)=>{
         try{
             const {name,price}=req.body;
             const image=req.file.path.replace(/\\/g, '/');
             const payload={name,price,image};
             console.log(payload);
             const product=await productRepository.createProduct({...payload});
             res.status(200).send({
                 message:"product added successfully",
                 product
             })
             
         }
         catch(err){
             console.log(err);
             res.status(500).send({
                message:"product not added error",
            });
         }

     }
     static getProducts=async(req,res)=>{
         try{
            const products=await productRepository.products();
            res.status(200).send({
                message:"products fetched successfully",
                products
            });
         }
         catch(err){
            res.status(500).send({
                message:"error products cannot be fetched",
            });
         }
     }
     static getProductById=async(req,res)=>{
        try{
            const objectID=req.params.id.trim();
           const product=await productRepository.productById(objectID)
           res.status(200).send({
               message:"products fetched successfully",
               product
           });
        }
        catch(err){
            console.log(err);
            res.status(500).send({
               message:"product not found error",
           });
        }
    }
    static removeProduct=async(req,res)=>{
        try{
           const product=await productRepository.removeProduct(req.params.id);
           res.status(200).send({
               message:"product removed successfully",
               product
           });
        }
        catch(err){
            console.log(err);
            res.status(500).send({
               message:"product not found error",
           });
        }
    }


}