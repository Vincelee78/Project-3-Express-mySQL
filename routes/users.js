const express = require("express");
const router = express.Router();

const {User}=require('../models/index');

const {createRegistrationForm, bootstrapField}=require('../forms/index');

router.get('/register',(req,res)=>{
    const registerForm=createRegistrationForm();
    res.render('users/register'<{
        form: registerForm.toHTML(bootstrapField)
    })
})

module.exports=router;