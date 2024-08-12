import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import productRoute from './routes/product.js'
import orderRoute from './routes/order.js';
import cartRoute from './routes/cart.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5500;
mongoose.set("strictQuery", false);

const dbConnect = async () => {

    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connection Established!")

    }catch(error){

        console.log(error);

    }

}

app.use(express.json());

app.use(cookieparser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/cart", cartRoute);


dbConnect()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`server is running in port ${port}`);
    })

})
.catch((error)=>{
    console.log(error);
})