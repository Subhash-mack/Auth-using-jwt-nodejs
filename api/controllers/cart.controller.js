const cartRepository=require('../../repository/repository.cart');
const productRepository=require('../../repository/repository.product');

module.exports=class CartController{

    static addItemToCart=async (req,res)=>{
        
        try {
            const {productId}=req.body;
            const quantity = Number.parseInt(req.body.quantity);
            const userId=req.user._id;
            console.log(userId)
            let cart = await cartRepository.cart(userId);
            let productDetails = await productRepository.productById(productId);
                 if (!productDetails) {
                return res.status(500).json({
                    type: "Not Found",
                    msg: "Invalid request"
                })
            }
            //--If Cart Exists ----
            if (cart) {
                //---- Check if index exists ----
                const indexFound = cart.items.findIndex(item => item.productId.id == productId);
                //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
                if (indexFound !== -1 && quantity <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subtotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if quantity is greater than 0 then add item to items array ----
                else if (quantity > 0) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subtotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----If quantity of price is 0 throw the error -------
                else {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process successful",
                    data: data
                })
            }
            //------------ This creates a new cart and then adds the item to the cart that has been created------------
            else {
                const cartData = {
                    items: [{
                        productId: productId,
                        quantity: quantity,
                        total: parseInt(productDetails.price * quantity),
                        price: productDetails.price
                    }],
                    userId,
                    subtotal: parseInt(productDetails.price * quantity)
                }
                cart = await cartRepository.addItem(cartData)
                res.json(cart);
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }

    static getCart= async(req,res)=>{
        try {
            const userId=req.user._id;
            let cart = await cartRepository.cart(userId)
            if (!cart) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Cart not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: cart
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }

    static removeItemFromCart=async(req,res)=>{

        try{
            const {productId}=req.body;
            const userId=req.user._id;
            let cart = await cartRepository.cart(userId);
            let productDetails = await productRepository.productById(productId);
                 if (!productDetails) {
                return invalidRequest(res);
            }
            if(!cart) return invalidRequest(res);

            const indexFound = cart.items.findIndex(item => item.productId.id == productId);
            if(indexFound===-1) return invalidRequest(res);
            let existingProductTotal=cart.items[indexFound].total;
            cart.items.splice(indexFound,1);
            cart.subtotal-=existingProductTotal;
            let data=await cart.save();
            res.status(200).json({
                    type: "success",
                    mgs: "item removed from cart",
                    data: data
            });
        }
        catch(err){
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }

        
    }

    static reduceProductQuantity =async(req,res)=>{
        const {productId}=req.body;
        const quantity = Number.parseInt(req.body.quantity);
        let cart = await cartRepository.cart();
        let productDetails = await productRepository.productById(productId);
             if (!productDetails) {
            return invalidRequest(res);
        }
        if(!cart) return invalidRequest(res);



    }

    static emptyCart = async(req,res)=>{
            try {
                const userId=req.user._id;
                let cart = await cartRepository.cart(userId);
                cart.items = [];
                cart.subtotal = 0
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Cart has been emptied",
                    data: data
                })
            } catch (err) {
                console.log(err)
                res.status(400).json({
                    type: "Invalid",
                    msg: "Something went wrong",
                    err: err
                })
            }
        }
}

function invalidRequest(res){
    return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request"
    });
}