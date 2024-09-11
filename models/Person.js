const mongoose = require('mongoose')
const bcyrpt = require('bcrypt')

//Creating Schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: Number,
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    }, 
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})

//Middleware for hashing password
personSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only if it modified or it is new
    if(!person.isModified('password')) return next()

    try{
        //Generating salt
        const salt = await bcyrpt.genSalt(10);

        //Hashing the password
        const hashedpasswrod = await bcyrpt.hash(person.password,salt);

        //Override plain password with hashed password
        person.password = hashedpasswrod

    }catch(err){
        next(err)
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{

        const isMatched = await bcyrpt.compare(candidatePassword,this.password);
        return isMatched;
        
    }catch(err){
        throw err;
    }
}



//Creating Model
const Person = mongoose.model('Person', personSchema);

module.exports = Person