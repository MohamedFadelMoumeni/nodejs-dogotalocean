const db = require('../config/db');
const escape = require('sql-template-strings');
const bcrypt  = require('bcryptjs');

exports.Login = async (email, password) => {
    let message = null;
    let error = null;
    let status = null;
    let data = {};
    try{
        const query = await db.query(escape`SELECT * FROM users WHERE email=${email}`);
        console.log(query);
        if(query.error){
            message = query.error;
            error = true;
            status = 400;
        }else{
            if(query.length){
                if(bcrypt.compareSync(password, query[0].password)){
                    message = "Succees";
                    error = false;
                    data = {
                       username: query[0].username,
                       email,
                       user_id: query[0].user_id
                    };
                    status = 200;
                }else{
                    message = "Email/Password Invalid";
                    error = true;
                    status = 400;
                }

            }else{
                message = "Email/Password Invalid";
                error = true;
                status = 400;
            }
        }
    }catch(e){
        message = e.message;
        error = true;
        status = 400;
    }
    return {message, error, status, data};

}