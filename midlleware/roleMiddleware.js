import { secret } from "../config.js"
import jwt from 'jsonwebtoken'


export default function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            // console.log(req.headers.authorization)
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({ message: "polzovatel ne avtorizirovan" })
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true
                }
            });
            if(!hasRole){
                return res.status(403).json({message:"ne razreshena"})
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "polzovatel ne avtorizirovan" })
        }
    }

}