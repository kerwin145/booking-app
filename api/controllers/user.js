import User from "../models/User.js"

export const updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        next(err)
    }
}
export const deleteUser = async(req, res, next) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id)
        res.status(200).json(`User with id: ${id} has been deleted`)
    } catch (error) {
        next(err)
    }
}
export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        return next(createError(404, "BRUh?"))
    }
}
export const getUsers = async(req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        return next(createError(404, "You are dumb"))
    }
}

