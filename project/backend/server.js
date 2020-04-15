require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userRouter = require('./api/routes/user');
const categoryRouter = require('./api/routes/category');
const emotionRouter = require('./api/routes/emotion');
const emotionRouter = require('./api/routes/genre');


mongoose.connect("mongodb+srv://LAPD:LAPD2020@cluster0-gi0qi.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/emotion', emotionRouter);
app.use('/api/genre', genreRouter);


app.listen(3000, () => console.log('server started'))

