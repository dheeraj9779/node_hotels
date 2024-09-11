const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')

const PORT = process.env.PORT || 3000

//Parsing the request body
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const logger = (req,res,next) => {
    console.log(`Hitting URL(${req.url}) on [${new Date().toLocaleString()}]`)
    next();
}

app.use(logger)


app.use(passport.initialize());
const localAuthMiddleWare = passport.authenticate('local', {session: false}) //Authenticate using username and password

app.get('/',(req,res) => {
    //res.redirect('/menu')
    res.send('Welcome here')
})

const person = require('./routes/personRoute')
const menu = require('./routes/menuItemRoute');


app.use('/person',person)
app.use('/menu',menu)



app.listen(PORT,() => {
    console.log("Server started on 3000")
})