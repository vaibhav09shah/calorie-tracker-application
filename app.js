const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Including DotENV Config
require('dotenv').config();

// Importing Routes
// const productRoutes = require('./api/routes/products');
// const orderRoutes   = require('./api/routes/orders');
const userRoutes    = require('./api/routes/users');
const mealRoutes    = require('./api/routes/meals');

mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ds047355.mlab.com:47355/calorie-trackera-app-tata-aig' ,{ useNewUrlParser: true } )
        .then( () => console.log('Connection Successful'))
        .catch((error) => console.log('Mongo Connection Error',error));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-headers','Origin , X-Requested-with, Content-Type, Accept , Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT , POST, PATCH, DELETE , GET');
        return res.status(200).json({});
    }
    next();
});

// app.use('/products',productRoutes);
// app.use('/orders',orderRoutes);
app.use('/api/user',userRoutes);
app.use('/api/meal',mealRoutes);


app.use((req,res,next) => {
    res.status(200).json({
        message:'Welcome to Node API'
    })
});


app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
});

module.exports = app;