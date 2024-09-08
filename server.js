const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();

//Parsing the request body
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000



const person = require('./routes/personRoute')
const menu = require('./routes/menuItemRoute')

app.use('/person',person)
app.use('/menu',menu)



app.listen(PORT,() => {
    console.log("Server started on 3000")
})