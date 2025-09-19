import express from "express";

const router = express.Router();

router.post("/register-team", (req, res) => {
    console.log("route reached");
    res.status(200).json({ message: "reached route" })
});


export default router;