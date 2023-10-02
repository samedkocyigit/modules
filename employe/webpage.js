const path = require('path')
const express = require('express')
const { Server } = require('http')
const app = express()
const port = 3000
const hostname = '127.0.0.1'

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'))
})
app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'about.html'))
})
app.get('/home',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'home.html'))
})

app.get('/user/:userId/movie/:movieName',(req,res)=>{
    res.send(
        `<h1>User name : ${req.params.userId}</h1>
        <h1>Movie Name: ${req.params.movieName}</h1>
        `
    )
})

app.listen(port,hostname,()=>{
    console.log(`Server Running , http://${hostname}:${port}/`)
})


// const http = require('http')
// const fs   = require('fs')

// const hostname = '127.0.0.1'
// const port = 3000

// const homePage  = fs.readFileSync('home.html')
// const indexPage = fs.readFileSync('index.html')
// const aboutPage = fs.readFileSync('about.html')
// const errorPage = fs.readFileSync('404.html')

// const server = http.createServer((req,res) =>{
//     if(req.url === '/'){
//         return res.end(homePage)
//     }else if(req.url === '/about'){
//         return res.end(aboutPage)
//     }else if (req.url === '/index'){
//         return res.end(indexPage)
//     }else{
//         res.statusCode = 404
//         res.end(errorPage)
//     }

// })
// Server.listen(port,hostname,()=>{
//     console.log(`Server Running , http://${hostname}:${port}/`)
// })
