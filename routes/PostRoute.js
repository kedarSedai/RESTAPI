const express = require('express');
const router = express.Router();
const Post = require('../model/Post');

//getting all data
router.get('/', async (req,res) => {
    const post  = await Post.find();
    try{
        res.json(post);
    }catch(err){
        res.json({message:err})
    }
});

//submit and save in database
router.post('/', async (req,res) =>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({message:err})
    }
});

//delete by id
router.delete('/:postId', async (req,res)=>{
    try{
        const deletePost = await Post.remove({_id: req.params.postId});
        res.json(deletePost);
    }catch(err){
        res.json({message:err});
    }
});

//update post
router.patch('/:postId', async (req,res) => {
    try{
        const updatePost = await Post.updateOne({_id: req.params.postId}, {$set: {title:req.body.title}});
        res.json(updatePost);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router;