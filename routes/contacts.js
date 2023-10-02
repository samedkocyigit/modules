const express = require('express')
const router =express.Router()
const Contact = require('../models/Contact')
const { route } = require('./main')

router.get('/new',(req,res)=>{
    res.render('site/contact')
})

router.post('/test',(req,res)=>{
    Contact.create(req.body).then(contact =>{
    })
    .catch(error =>{
        res.status(500).send('ERROR')
    })
    res.redirect('/')
})

module.exports = router