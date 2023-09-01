import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'

export const createHotel = async(req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(err)
    }
}

export const updateHotel = async(req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(err)
    }
}
export const deleteHotel = async(req, res, next) => {
    try {
        const id = req.params.id
        await Hotel.findByIdAndDelete(id)
        res.status(200).json(`Hotel with id: ${id} has been deleted`)
    } catch (error) {
        next(err)
    }
}
export const getHotel = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        return next(createError(404, "BRUh?"))
    }
}
export const countByCity = async(req, res, next) => {
    const cities = req.query.cities.split(",")

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))

        res.status(200).json(list)
        
    } catch (error) {
        return next(createError(404, "BRUh?"))
    }
}
export const countByType = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        return next(createError(404, "BRUh?"))
    }
}
export const getHotels = async(req, res, next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {
        return next(createError(404, "You are dumb"))
    }
}

