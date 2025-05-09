import { secret } from "../config.js"
import jwt from 'jsonwebtoken'


export default function (req,res,next){
    if(req.method === "OPTIONS"){
        next()
    }

    try {
        // console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).json({message:"polzovatel ne avtorizirovan"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({message:"polzovatel ne avtorizirovan"})
    }
}