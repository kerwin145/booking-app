import express from 'express'
import {updateUser, deleteUser, getUser, getUsers} from "../controllers/user.js"
import {verifyToken, verifyUser, verifyAdmin} from '../utils/verifyToken.js';

const router = express.Router();

router.get("/checkauth", verifyToken, (req, res, next) =>{
    res.status(200).send("Hello, you are authenticated")
})

router.get("/checkuser/:id", verifyUser, (req, res, next) =>{
    res.status(200).send("Hello rightful user, you are authenticated")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) =>{
    res.status(200).send("Hello admin, you are authenticated")
})

//UPDATE
router.put("/:id", verifyUser, updateUser)
//DELETE
router.delete("/:id", verifyUser, deleteUser)
//GET
router.get("/:id", verifyUser, getUser)
//GET ALL
router.get("/", verifyAdmin, getUsers)

export default router