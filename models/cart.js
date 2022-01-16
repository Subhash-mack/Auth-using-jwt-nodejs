const mongoose=require('mongoose');
const findOrCreate=require('mongoose-findorcreate')

const ItemSchema=new mongoose.Schema({
    quantity:{type:Number,required:true,min:[1,'quantity cannot be less than one']},
    price:{type:Number,required:true},
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    total: {
        type: Number,required: true
    }


});

const cartSchema= new mongoose.Schema({
    items:[ItemSchema],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    subtotal:{
        default:0,
        type:Number
    }},
    {timestamps:true}
)
cartSchema.plugin(findOrCreate);
module.exports=mongoose.model('cart',cartSchema);