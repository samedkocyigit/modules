const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/register',(req,res)=>{
    res.render('site/register')
})

router.post('/register',(req,res)=>{
    User.create(req.body).then(user =>{
        res.redirect('/')
    })
    .catch(error => {
        res.status(500).send('ERROR')
    })
})

router.get('/login',(req,res)=>{
    res.render('site/login')
})

router.post('/login',(req,res)=>{
    const {email,password} =req.body

    User.findOne({email}).then(user=>{
        if(user){
            if(user.password == password){
                //USER SESSION
                req.session.userId = user._id
                res.redirect('/')                           //then fonksiyonu işlemi kontrol ediyor catch fonksiyonu da hatayı denetliyor
            }else {
                res.redirect('/users/login')
            }
        }else {
            res.redirect('/users/register')
        }
    })
    .catch(error => {
        res.status(500).send('ERROR')
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})
module.exports = router