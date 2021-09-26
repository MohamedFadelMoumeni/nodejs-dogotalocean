const express = require('express');
const {checkSchema} = require('express-validator');
const RegisterControllers = require('../controllers/Register');

const userRegisterSchema = checkSchema({
    username: {
        isLength:{
            errorMessage : "Min 7",
            options: {min: 7}
        }
    },
    password :{
        isLength:{
            errorMessage : "Password should be at least 7 chars long",
            options: {
                min: 9
            }
        }
    },email: {
        isEmail:{
            errorMessage: "Invalid Email"
        }
    }

})

const router = express.Router();

router.post('/',userRegisterSchema, RegisterControllers.RegisterControl);

module.exports  = router;