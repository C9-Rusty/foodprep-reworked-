require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/dbConn')
const foodRouter = require('./routes/foodRoute')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')
const orderRouter = require('./routes/orderRoute')
const mongoose = require("mongoose");
const app = express();
console.log("🔍 MONGO_URI =", process.env.MONGO_URI);


//app config
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("🧠 Using DB:", mongoose.connection.name);
    app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });


//middleware
app.use(express.json())
app.use(cors())

//connectDB()

app.get('/',(req,res)=>{
    res.send("API working")
})

//routes
app.use('/api/food',foodRouter)
app.use("/api/user", userRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/image',express.static('uploads'))


