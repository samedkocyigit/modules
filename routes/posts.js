const express = require('express')
const router = express.Router()
const path = require('path')
const Post = require('../models/Post')
const session = require('express-session')


router.get('/new',(req,res)=>{
    if(req.session.userId) {
       return res.render('site/addpost')
    }
    res.redirect('/users/login')
})

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id).lean().then(post=>{
        res.render('site/post',{post:post})
    })
})

router.post('/test',(req,res)=>{
    const post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname,'../public/img/postimages', post_image.name))

    Post.create({
        ...req.body,
        post_image:`/img/postimages/${post_image.name}`
    }, )
    
    req.session.sessionFlash= {
        type: 'alert alert-success',
        message: 'Your Post Have Been Created Successfuly'

    }
    
    res.redirect('/blog')
})


module.exports = router