import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token)
        return next(createError(401, "Non authenticated"))
    
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err)
            return next(createError(403, "Invalid token"))
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()=>{
        //check if you are the owner or admin
        if(req.user.id === req.params.id){ 
            next()
        } 
        else{
            return next(createError(403, "Not authorized"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{
        //check if you are the owner or admin
        if(req.user.isAdmin){ 
            next()
        } 
        else{
            return next(createError(403, "Not authorized as admin"))
        }
    })
}