const express = require('express');
const {checkSchema} = require('express-validator');
const LoginControllers = require('../controllers/Login');
const router  = express.Router();

const LoginSchema = checkSchema({
    email:{
        isEmail:{
            errorMessage: "Invalid Email"
        }
    }
})

router.post('/',LoginSchema, LoginControllers.LoginControl);

module.exports = router;
