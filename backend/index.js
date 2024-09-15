import express from 'express';
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import booksRoute from './routes/booksroutes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
        allowedHeaders: ['Content-Type'],
    }
))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('welcome to mern stack')
});

app.use('/books', booksRoute)

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('connected to db')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
    
})
.catch((err) => {
    console.log(err)
    })