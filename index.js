const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const userRoute = require('./routes/user.route')
const questionRoute = require('./routes/question.route');
const answerRoutes = require("./routes/answer.route");
const commentaireRoutes = require("./routes/commentaire.route");


const cors = require('cors')

dotenv.config();
const app = express()

connectDB();

app.use(express.json());
app.use(cors({
     origin: [
        "http://localhost:5173",
        "https://front-node-snowy.vercel.app"
     ]
    }));
const PORT = process.env.PORT;
app.listen(PORT ,() =>{
    console.log(`serveur demarre sur http://localhost:${PORT}`)
})

app.use('/api/auth' , userRoute);
app.use('/api/question' , questionRoute);
app.use("/api/answer", answerRoutes);
app.use("/api/commentaire", commentaireRoutes);


app.get('/', (req , res) =>{
    res.send('Bienevenue sur mon serveur express')
} );