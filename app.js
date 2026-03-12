import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/productRoutes.js';
// import cors
import cors from 'cors'

dotenv.config();
const app = express();

// allow all origins
app.use(cors());

// database calling 
connectDB();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// base route for all product controllers
app.use('/', router);

app.get('/', (req, res)=>{
    res.send("Hello Rest API Project...")
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server listening on:$http://localhost:${port}`)
})