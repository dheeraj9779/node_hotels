const express = require('express')
const router = express.Router();
const Person = require('../models/Person')
const { jwtAuthMiddleware, generateToken } = require('../jwt')


//Person API

//POST
router.post('/signup',async (req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log("Data Saved")
        const payload = {
            id: response.id,
            username: response.username
        }
        const token = generateToken(payload)
        res.status(200).json({response: response, token: token})

    }catch(err){
        console.log("Internal Server Error")
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.post('/login', async(req,res) => {
    try{
        const {username, password} = req.body;
        const user = await Person.findOne({username: username})

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "Invalid username or password"})
        }

        //generate payload
        const payload = {
            id: user.id,
            username: user.username
        }

        //generating Token
        const token = generateToken(payload)
        res.json({token})
    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
    }
})

//Profile route
router.get('/profile',jwtAuthMiddleware, async(req,res) => {
    try{
        const userData = req.user;
        console.log(userData)
        const user = await Person.findById(userData.id)
        res.status(200).json({user})

    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
    }
})

//GET
router.get('/',jwtAuthMiddleware,async (req,res) => {
    try{
        const data  = await Person.find();
        console.log("Data Fetched Success")
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
    }
})

//GET Parameterized
router.get('/:work',async (req,res) => {
    try{
        const worktype = req.params.work
            if(worktype === 'chef' || worktype === 'manager' || worktype === 'waiter'){
            const response =  await Person.find({work:worktype})
                res.status(200).json(response)
            }else{
                res.status(404).json({error: "Invalid Work Type"})
            } 
    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
    }
})

//UPDATE
router.put('/:id',async (req,res) => {
    try{
        const personId = req.params.id;
        const updatePersonData = req.body

        const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
            new: true,
            runValidators: true
        })

        if(!response){
            console.log("not foind")
            return res.status(404).json({error: "Person not found"})
        }
        console.log("Data Updated")
        res.status(200).json(response)
    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
    }
})

//DELETE
router.delete('/:id',async (req,res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)
        if(!response){
            console.log("not foind")
            return res.status(404).json({error: "Person not found"})
        }
        console.log("Person Deleted")
        res.status(200).json("Person Deleted")
    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
    }
})




module.exports = router