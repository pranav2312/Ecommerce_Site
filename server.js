require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}));
//connect mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
 })
app.get('/',(req,res)=>{
    res.json({msg:"Welecome to serve"})
})
app.use('/user',require('./Routes/userRoutes'))
app.use('/api',require('./Routes/categoryRoute'))
app.use('/api',require('./Routes/upload'))
app.use('/api',require('./Routes/productRoute'))
app.use('/api',require('./Routes/paymentRoute'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(process.cwd(),'client','build','index.html'))

    })
}
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server is running on port ',PORT)
})