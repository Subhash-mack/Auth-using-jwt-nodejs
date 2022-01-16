const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({destination:(req,res,cb)=>{
    cb(null,path.join("./images/"));
},
filename:(req,file,cb)=>{
    cb(null,new Date().toISOString().replace(':','r')+file.originalname)
}});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
    else cb(new Error('Not an image! Please upload image'));
}

exports.upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*6
    },
    fileFilter:fileFilter
});