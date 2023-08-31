import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const regsiter = async(req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
    
        await newUser.save()
        res.status(201).send("User has been created")
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user) 
            return next(createError(404, "User does not exist"))

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        
        if(!correctPassword)
            return next(createError(401, "Invalid credentials"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)


        const {password, isAdmin, ...other} = user._doc
        res
            .cookie("access_token", token, {httpOnly: true})
            .status(200)
            .json(other)

    }catch(error){
        next(error)
    }
}