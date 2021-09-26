const db = require('../config/db');
const escape = require('sql-template-strings');

exports.getPosts = async (id) => {
    let message = null;
    let error = null;
    let status = null;
    try{
        const query = await db.query(escape`SELECT * FROM posts WHERE author = ${id} ORDER BY created_at DESC`);
        if(query.error){
            message = query.error;
            error = true;
            status = 400;
        }else{
            message = query;
            error = false;
            status =200;
        }
    }catch(e){
        message = e.message;
        error = true;
        status = 400;
    }
    return {message, error, status};
}

exports.addPost = async (data) => {
    let message = null;
    let error = null;
    let status = null;
    const {author, title, body, created_at} = data;
    try{
        const query = await db.query(escape`INSERT INTO posts (author, title, body, created_at) VALUES(${author}, ${title}, ${body}, ${created_at})`);
        if(query.error){
            message = query.error;
            error = true;
            status = 400;
        }else{
            message = "success";
            error = false;
            status =200;
        }
    }catch(e){
        message = e.message;
        error = true;
        status = 400;
    }
    return {message, error, status};
}

exports.deletePost = async (id) => {
    let message = null;
    let error = null;
    let status = null;
        try{
        const query = await db.query(escape`DELETE from posts WHERE id =${id}`);
        if(query.error){
            message = query.error;
            error = true;
            status = 400;
        }else{
            message = "success";
            error = false;
            status =200;
        }
    }catch(e){
        message = e.message;
        error = true;
        status = 400;
    }
    return {message, error, status};
}