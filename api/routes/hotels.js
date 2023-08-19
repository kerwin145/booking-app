import express from 'express'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js';

const router = express.Router();

//CREATE
router.post("/", async (req, res) =>{
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})
//UPDATE
router.put("/:id", async (req, res) =>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id", async (req, res) =>{
    try {
        const id = req.params.id
        await Hotel.findByIdAndDelete(id)
        res.status(200).json(`Hotel with id: ${id} has been deleted`)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET
router.get("/:id", async (req, res, next) =>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        return next(createError(404, "BRUh?"))
    }
})

//GET ALL
router.get("/", async (req, res, next) =>{
    
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {
        return next(createError(404, "You are dumb"))
    }
})

export default router