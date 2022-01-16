const product =require('../models/products');

exports.products=async ()=> product.find({});

exports.productById=async _id => product.findById({_id});

exports.createProduct=async payload => product.create(payload);

exports.removeProduct=async _id=>product.findByIdAndRemove({_id});
