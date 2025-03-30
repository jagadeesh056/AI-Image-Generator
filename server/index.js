import express from 'express'
import * as dotenv from 'dotenv'
import cors from "cors"

import connectDB from './mongodb/connect.js'
import dalleRoutes from './routes/dalleRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get("/", (req, res) => {
    res.send("Hello from Dalle")
})

const startServer = () => {
    try{
        connectDB(process.env.MONGO_URL)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }catch(err){
        console.log(err)
    }
    
}

startServer()