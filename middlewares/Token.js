const jwt = require('jsonwebtoken');

exports.generateToken = data => {
    var token = jwt.sign(data, "Mohamed");
    return token;
}
exports.verifyToken = async (req, res, next) => {
    const {authorization} = await req.headers;
    if(authorization){
        var decoded =  jwt.verify(authorization, 'Mohamed', (err, verify) => {
            if(err) {
                res.status(400).send("Unauthorized");
            }else{
                res.header('authorization', authorization);
                next();
            }
        });
    }else{
        res.send(400).send('Unauthorized');
    }
}