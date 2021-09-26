const LoginModel = require('../models/Login');
const Token = require('../middlewares/Token');
exports.LoginControl = async (req, res) => {
    const {email, password}  = await req.body;
    try{
        const {message, error, status, data} = await LoginModel.Login(email, password);
        if(!error){
            const token = Token.generateToken(data);
            res.status(status).send({message, error, token, data}).end();
        }else{
            res.status(status).send({message, error}).end();
        }
    }catch(e){
        res.status(422).send({message: e.message, error: true, hello:"dc"}).end();
    }
}