const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const userRoute = require('./routes/user.route')
const cors = require('cors')
// import express from 'express'


dotenv.config();
const app = express()
// 
connectDB();

// accepter les donner sous format json
app.use(express.json());
app.use(cors({ origin: "*"}));
const PORT = process.env.PORT;
app.listen(PORT ,() =>{
    console.log(`serveur demarre sur http://localhost:${PORT}`)
})
// route de test
app.use('/api/auth' , userRoute);
app.get('/', (req , res) =>{
    res.send('Bienevenue sur mon serveur express')
} );