import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'


import userRoutes from './routes/user.js'
import viewRoutes from './routes/view.js'
const app = express();
dotenv.config()




app.use(bodyParser.json({limit : "30mb", extended : true}))
// excepts the incoming http request i.e client sends the request to server, and it verifies it 
// limit is 30mb and extended is true enables nested parsing 
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}))
app.use(cors());
// app.use('/posts',postRoutes)
app.use('/user', userRoutes)
app.use('/admin',viewRoutes)


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message) )

// mongoose.set('useFindAndModify', false)