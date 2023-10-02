const express = require('express')
const { engine } = require('express-handlebars')
const { create } = require('express-handlebars')
const { Server } = require('http')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const moment = require('moment')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')


mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {})

app.use(express.static('public'))

app.use(expressSession({
    secret: 'tesotesto',
    resave: false,
    saveUninitialized: true,
    store: connectMongo.create({ mongoUrl: 'mongodb://127.0.0.1/nodeblog_db' }) // 
}))

app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash  //its shows you warning text 
    delete req.session.sessionFlash
    next()
})

app.use(fileUpload())

const hbs = create({
    helpers: {
        generateDate: (date, format) => {
            return moment(date).format(format)          //its shows prettyprint date time 
        }
    }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
    const { userId } = req.session

    if (userId) {
        res.locals = {
            displayLink: true
        }
    }
    else {
        res.locals = {
            displayLink: false
        }
    }
    next()
})

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const contacts = require('./routes/contacts')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/contacts', contacts)


app.listen(port, hostname, () => {
    console.log(`Server Running , http://${hostname}:${port}/`)
})