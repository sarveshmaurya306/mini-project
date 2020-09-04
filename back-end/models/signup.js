const mongoose =require('mongoose');
const validator= require('validator');

let pass=''
const userModel= mongoose.model('SignUp', {
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error("Email is invalid...");
        }  
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                pass=value;
                throw new Error({error:'password can not contain "password"'})
            }
        }
    },
    
})

module.exports= userModel;