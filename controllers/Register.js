const RegisterModel = require('../models/Register');
const {validationResult} = require('express-validator');

exports.RegisterControl = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({message: 'Password should be at least 7 chars long', error: true});
    }
    const {email, password, username, user_id} = await req.body;
    try{
        const {message, error, status} = await RegisterModel.userRegister({email, password, username, user_id});
        res.status(status).send({message, error}).end();
    }catch(e){
        res.status(422).send({message: e.message, error : true}).end();
    }
}