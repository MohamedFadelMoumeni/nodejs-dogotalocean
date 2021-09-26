const express = require('express');
const {checkSchema} = require('express-validator');
const UserControllers = require('../controllers/User');
const router = express.Router(); 

const UpdateSchema = checkSchema({
    email: {
        isEmail:{
            errorMessage: "Invalid Email"
        }
    },
    username: {
        isLength: {
            errorMessage : "Min 7 chars",
            options: {min: 7}
        }
    }
})

router.get('/:id', UserControllers.userDetailControl);
router.delete('/delete', UserControllers.userDeleteControl);
router.put('/update',UpdateSchema, UserControllers.userUpdateControl);

module.exports = router;