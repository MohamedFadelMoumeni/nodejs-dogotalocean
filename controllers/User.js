const UserModel = require('../models/Users');
const {validationResult} = require('express-validator');

exports.userDetailControl = async (req, res) => {
    const {id} = await req.params;
    try{
        const {message, error} = await UserModel.userDetails(id);
        res.status(200).send({message, error}).end();
    }catch(e){
        res.status(400).send({message : e.message, error : true}).end()
    }
}
exports.userDeleteControl = async (req, res) => {
    const {id} = await req.body;
    try{
        const {message, error} = await UserModel.deleteUser(id);
        res.status(200).send({message, error}).end();
    }catch(e){
        res.status(400).send({message : e.message, error : true}).end()
    }
}

exports.userUpdateControl = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).send(errors);
    }
    const {id, username, email} = await req.body;
    try{
        const {message, error} = await UserModel.updateUser({id, username, email});
        res.status(200).send({message, error}).end();
    }catch(e){
        res.status(400).send({message : e.message, error : true}).end()
    }
}