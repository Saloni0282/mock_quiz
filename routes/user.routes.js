const express = require("express")
const { UserModel } = require("../model/user.model")
require('dotenv').config()


const UserRouter = express.Router()

UserRouter.post("/register", async (req, res) => {

    try {

        const { username, email } = req.body;
        const UserExits = await UserModel.findOne({ email })

        if (UserExits) {
            return res.status(201).json({ msg: "User already Present" })
            // return res.redirect('/dashboard');
        }
        const user = new UserModel({ username, email })
        await user.save()
        res.send({ msg: " New User Registered Success" })
        
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = {UserRouter}

