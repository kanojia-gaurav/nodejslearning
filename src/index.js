
const express = require("express");
const path = require("path");
const bcrypt = require('bcryptjs')
const app = express();
const hbs = require("hbs")
require("./db/conn");
const port = process.env.PORT || 9000;
const static_path = path.join(__dirname,"../public")
const templates_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")


const Register = require("./model/model");
app.use(express.json())
app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}))
app.set("view engine", "hbs");
app.set("views",templates_path)
hbs.registerPartials(partial_path)

app.get('/', (req,res)=>{
    res.render("index");
})

app.get('/login', (req,res)=>{
    res.render("login");
})


app.post('/', async(req, res)=>{

    try {
        const password = req.body.password
        const cpassword = req.body.cpassword
        const fname = req.body.fname
        const lname  = req.body.lname
        const email = req.body.email
        const contact  = req.body.contact
        console.log(req.body)
    
        if(password === cpassword){
            const registered = new Register({
                fname : fname,
                lname : lname,
                email : email,
                contact : contact,
                password : password,
                cpassword : cpassword
            })
            const reg =await registered.save();
            // res.sendFile(path.join(static_path+'/login.html')); alternative way 

             res.status(201).render("login")
        }
        else{
            console.log("Invalid user Details");
        }
        
        
    } catch (error) {
        console.log("Error "+error)
        
    }
   

})

app.post('/login',async(req,res)=>{

    try {
        const email = req.body.email
        const password = req.body.password

        const useremail = await Register.findOne({email:email});

        const isMatch = bcrypt.compare(password, useremail.password)

        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("password Not matching")
        }
        

    } catch (error) {
        res.status(400).send("Invalid User Credentials")
        
    }

})


app.listen(port, () => {
    console.log('server is listening on port')
})