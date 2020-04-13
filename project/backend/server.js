require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const subscribersRouter = require('./routes/subscribers')

mongoose.connect("mongodb+srv://LAPD:LAPD2020@cluster0-gi0qi.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))



app.use(express.json())
app.listen(3000, () => console.log('server started'))

