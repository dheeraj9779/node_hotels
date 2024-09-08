const express = require('express')
const app = express()
const db = require('./db')

//Parsing the request body
const bodyParser = require('body-parser')
app.use(bodyParser.json())



const person = require('./routes/personRoute')
const menu = require('./routes/menuItemRoute')

app.use('/person',person)
app.use('/menu',menu)



app.listen(3000,() => {
    console.log("Server started on 3000")
})