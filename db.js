const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/hotel'


//setup connection
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('COnnected to MongoDB server')
})

db.on('disconnected', () => {
    console.log('DisConnected from MongoDB server')
})

db.on('error', (error) => {
    console.log('COnnection Error',error)
})

module.exports = db;