const cart=require("../models/cart");


exports.cart=async(userId)=>{
    const carts=await cart.find({userId}).populate({
        path:"items.productId",
        select:"name price total"
    });

    return carts[0];
}

exports.addItem=async(payload)=>cart.create(payload);