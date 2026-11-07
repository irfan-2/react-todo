import express from "express"
import bcrypt from "bcrypt"
import userModel from "../../models/User.js"
import tokenize from "../../utils/token.js"

const router = express.Router()

router.post("/register", async (req,res) =>{
    try {
        const {name, email, password} = req.body

        let checkIfExists = await userModel.findOne({email: email})

        if(checkIfExists){
            return res.status(400).json({
                "msg" : "User already exists with this email"
            })
        }

        let newUser = {
            name,
            email,
            password: await bcrypt.hash(password, 10)
        }

        let response = await userModel.create(newUser)

        res.status(201).json({
            "msg" : "User created successfully", token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "internal server error :("
        })
    }
})

router.post("/login", async (req,res) =>{
    try {
        let {email, password} = req.body

        let checkIfExists = await userModel.findOne({email: email})

        if(!checkIfExists){
            return res.status(404).json({
                "msg" : "No user found with this email. Please Register first"
            })
        }

        const passwordMatches = await bcrypt.compare(password, checkIfExists.password)

        if(!passwordMatches){
            return res.status(400).json({
                "msg" : "incorrect credentials"
            })
        }

        let payload = {
            id: checkIfExists._id
        }

        let token = await tokenize(payload)

        res.status(200).json({
            "msg" : "Logged in successfully", token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "Internal server error :("
        })
    }
})

export default router 