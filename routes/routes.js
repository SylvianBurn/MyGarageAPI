const express = require('express');
const carModel = require('../model/carModel');
const router = express.Router()

module.exports = router;

//Post Method
router.post('/post', async (req, res) => {
    const data = new carModel({
        brand: req.body.brand,
        model: req.body.model,
        location: req.body.location
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await carModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await carModel.findById(req.params.id);
        res.send(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};
        const result = await carModel.findByIdAndUpdate(id, updatedData, options);

        res.send(result);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await carModel.findByIdAndDelete(req.params.id);
        res.send(`${result.brand} ${result.model} located at ${result.location} has been deleted.`);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})