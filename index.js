const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Import Routes
const authRoutes = require('./routes/auth')

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  },
    () => { console.log('Conncted to MongoDB') },
    
)

//Middleware
app.use(express.json())

//Route middleware
app.use('/api/users', authRoutes)

app.listen(5000, () => { 
    console.log('listening on 5000')
})
