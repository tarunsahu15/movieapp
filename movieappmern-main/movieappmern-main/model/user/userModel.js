const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");



// user Schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
        }
    }]
},{
    timestamps:true
});

// password hashing
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
    }
});

// model
const userDB = new mongoose.model("users",userSchema);
module.exports = userDB;