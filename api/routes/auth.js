import express from 'express'

const router = express.Router();

router.get("/", (req, res) => {
    res.send("<i>Yoooo</i>")
})

export default router