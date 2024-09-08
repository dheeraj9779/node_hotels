const express = require('express')
const router = express.Router();
const Person = require('../models/Person')


//Person API

//POST
router.post('/',async (req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log("Data Saved")
        res.status(200).json(response)

    }catch(err){
        console.log("Internal Server Error")
        res.status(500).json({error: "Internal Server Error"})
    }
})

//GET
router.get('/',async (req,res) => {
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