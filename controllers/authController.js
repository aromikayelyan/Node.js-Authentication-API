import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator"
import { secret } from "../config.js"


const genereteAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}



class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json(errors)
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message:"polzovaatel s takim imenem est"})
            }
            const userRole = await Role.findOne({value: "USER"})
            const hashPass = bcrypt.hashSync(password, 7)
            const user = new User({username, password: hashPass, roles:[userRole.value]})
            await user.save()
            return res.json({message:"user zaregistrirovan"})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:"registration error"})
        }
    }

    async login  (req, res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message:"polzovatel ne nayden"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message:"vvedyon nepravilni parol"})
            }
            console.log(user.id)
            const token = genereteAccessToken(user.id, user.roles)

            return res.json({token})


        } catch (error) {
            console.log(error)
            res.status(400).json({message:"login error"})
        }
    }

    async getUsers (req, res){
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(400).json({message:"rget method error"})
        }
    }
}



export default new authController()