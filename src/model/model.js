const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const register = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    contact:{
        type:Number,
        unique:true
    },
    password:{
        type: String,
    },
    cpassword:{
        type: String,
    }


})


register.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
        this.cpassword = undefined
    }

    next();
})



const Register = new mongoose.model("Register", register);


module.exports = Register;