const db = require('../config/db');
const escape = require('sql-template-strings');
const bcrypt = require('bcryptjs');

exports.userRegister = async (data) => {
    const {email, password, username, user_id} = data;
    let message = null;
    let error = null;
    let status = null;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try{
        const query = await db.query(escape`INSERT INTO users (email, password, username, user_id) VALUES(${email}, ${hashedPassword}, ${username}, ${user_id})`);
        if(query.error){
            message = query.error;
            error = true;
            status = 400;
        }else{
            message = "Success";
            error = false;
            status = 200;
        }
    }catch(e){
        message = e.message;
        error = true;
        status = 400;
    }
    
    return {message, error, status};
}