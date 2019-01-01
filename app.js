const express = require("express");
const bodyparser=require('body-parser');
const mongoose= require('mongoose');
const cloudinary= require('cloudinary');
var multer  =   require('multer');
// Set Expesss App

const app=express();
// connect to mongo db

 /*var storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, new Date().toISOString()+ file.originalname);
    }
});*/
 /*var imageFilter = function(req, file, cb){
    //accept image files only
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};*/
const fileFilter = (req, file ,cb)=>{
    if(file.mimetype ==='*/jpeg'|| file.mimetype ==='*/png'||file.mimetype ==='*/jpg')
    {
        callback(null, true);
    }else{
        callback(null , false);
    }
}

//mongoose.connect('mongodb://Admin:admin12@ds211083.mlab.com:11083/registration');
//mongoose.Promise=global.Promise;
app.use(bodyparser.json());

const upload = multer({
    //storage: storage ,
    limits:{
    fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});//NOT WORKINGGGG

//cloudinary.image("testimg.jpg", { width: 100, height: 150, crop: "fill" });

//Cloudnary api 
cloudinary.config({ 
    cloud_name: 'del7jhjt5', //Gaurav's cloud name
    api_key: '738963556285972', 
    api_secret: 'im05JW-nNMjnMAFvCVA6TlZKYAg' 
  });
  var eager_options = {
    width: 200, height: 150, crop: 'scale', format: 'jpg'
  };
cloudinary.v2.uploader.upload("done.png",
    {
        tags : "basic_sample", 
        public_id :new Date().toISOString(), 
        eager: eager_options
    },function(result,error) {
      console.log(result, error);
      console.log("Image uploaded....");
});
  
// using routes .js
//app.use('/api',require('./routes/api'));
//Handle errors
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
}) ;
// Listen for request 
app.listen(process.env.port||3000,function(){
    console.log("Listening");
});