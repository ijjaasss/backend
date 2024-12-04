import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './confiq/db.js';
import authRoute from './routes/authRout.js'
import productRoute from './routes/productRout.js'
import pymentRoute from './routes/pymentRoute.js'
import cors from 'cors'
import Razorpay from 'razorpay';
import session from 'express-session';
import adminRoutes from './routes/adminroute.js';

//configur env
dotenv.config()
const app=express()

//databaseconfig
connectDB()


//razorpay
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  
    
  
  });
//middilware
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(session({
    secret: 'buse123',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}));

app.use('/api/v1/auth',authRoute)
app.use('/api/admin',adminRoutes)
app.use('/api/v1',productRoute)
app.use('/api/route',pymentRoute)


app.get('/',(req,res)=>{
    res.send({
        message:'hai'
        
        
        
    })

    
})
app.get('/test-session', (req, res) => {
    console.log('Session Data in /test-session route:', req.session.user);
    res.send(req.session.user || 'No user found in session');
});


app.get('/api/getkey',(req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_ID_KEY})

})

  
const port=process.env.PORT||8080;
app.listen(port,()=>{
    console.log(`server runing on ${process.env.DEV_MODE} port on ${port}`);
    
})