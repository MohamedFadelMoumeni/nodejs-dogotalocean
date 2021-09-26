const db = require('../config/db');
const escape = require('sql-template-strings');
const {checkSchema} = require('express-validator');

const UpdateSchema = checkSchema({
    email:{
        isEmail: {
            errorMessage: "Invalid Email"
        }
    },
    username: {
        isEmpty:{
            errorMessage:"Username Empty"
        }
    }
})

exports.userDetails = async (id) => {
    let message = null;
    let error = null;
    try{
        const query = await db.query(escape`SELECT * FROM users WHERE user_id = ${id}`);
        if(query.error){
            message = query.error;
            error = true;
        }else{
            message = query;
            error = false;
        }
    }catch(e){
        message = e.message;
        error = true;
    }

    return {message, error};
}

exports.deleteUser = async (id) => {
    let message = null;
    let error = null;
    try{
        const query = await db.query(escape`DELETE from users WHERE user_id = ${id}`);
        if(query.error){
            message = query.error;
            error = true;
        }else{
            message = query;
            error = false;
        }
    }catch(e){
        message = e.message;
        error = true;
    }

    return {message, error};
}

exports.updateUser = async (data) => {
    const {email, username, id} = data;
    let message = null;
    let error = null;
    try{
        const query = await db.query(escape`UPDATE users SET (email, username) VALUES(${email}, ${username}) `);
        if(query.error){
            message = query.error;
            error = true;
        }else{
            message = query;
            error = false;
        }
    }catch(e){
        message = e.message;
        error = true;
    }

    return {message, error};
}