const express = require('express')
const router = express.Router();
const MenuItem = require('../models/MenuItem')

//Menu API

//POST
router.post('/', async (req,res) => {
    try{
        const newMenuItem = new MenuItem(req.body)
        const response = await newMenuItem.save();
        console.log("Data Saved")
        res.status(200).json(response)
    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
    }
})

//GET
router.get('/',async (req,res) => {
    try{
        const data = await MenuItem.find()
        console.log("Data Fetched Success")
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
    }
} )

//GET parameterized
router.get('/:taste', async (req,res) => {
    try{
        const tastetype = req.params.taste
        if(tastetype === 'sweet' || tastetype === 'sour' || tastetype === 'spicy'){
            const resp = await MenuItem.find({taste: tastetype})
            console.log("Data fetched successfully")
            res.status(200).json(resp)
        }else{
            res.status(404).json({error: "Not Found"})
        }

    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
})

//UPDATE
router.put('/:id',async (req,res) => {
    try{
        const menuId = req.params.id
        const menuBody = req.body

        const response = await MenuItem.findByIdAndUpdate(menuId,menuBody,{
            new: true,
            runValidators: true
        })

        console.log("Data Updated successfully")
        res.status(200).json(response)

    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
})

//DELETE
router.delete('/:id',async (req,res) => {
    try{
        const menuId = req.params.id
        const response = await MenuItem.findByIdAndDelete(menuId)
        console.log("Menu Deleted successfully")
        res.status(200).json("Menu Deleted successfully")

    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }
})


module.exports = router