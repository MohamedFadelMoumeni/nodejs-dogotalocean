const PostsModel = require('../models/Posts');

exports.getPostsControl = async (req, res) => {
    const {id} = await req.params;
    console.log(id);
    try{
        const {message, error, status} = await PostsModel.getPosts(id);
        res.status(status).send({message, error});
    }catch(e){
        res.status(400).send({message: e.message, error: 400});
    }
}
exports.addPostControl = async (req, res) => {
    const {author, body, title, created_at} = await req.body;

    try{
        if(req.files){
        let imgFile = await req.files.File;
        if(imgFile.mimetype !== "image/jpeg"){
            return res.status(500).send('Error');
        }
        imgFile.mv(`${__dirname}/${imgFile.name.replace('.svg', '')}.jpg`) ;

        }
        const {message, error, status} = await PostsModel.addPost({author, title, body, created_at});
        res.status(status).send({message, error});
    }catch(e){
        res.status(400).send({message: e.message, error: 400});
    }
}

exports.deletePostControl = async (req, res) => {
    const {id} = await req.body;
    try{
        const {message, error, status} = await PostsModel.deletePost(id);
        res.status(status).send({message, error});
    }catch(e){
        res.status(400).send({message: e.message, error: 400});
    }
}