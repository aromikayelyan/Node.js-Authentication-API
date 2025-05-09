import express from 'express'
import mongoose from 'mongoose'
import aurhRouter from './routes/authRoute.js'
import { dbconf } from './config.js'

const PORT = process.env.PORT || 5000


const app = express()

app.use(express.json())



app.use("/auth", aurhRouter)

const start = async () => {
    try {
        await mongoose.connect(dbconf)
        app.listen(PORT, ()=>{ console.log(`server run on port - ${PORT}`) })
    } catch (error) {
        console.log(error)
    }
}

start()