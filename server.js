const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')

const app = express();

app.use(express.json());

//Routes
app.get('/',(req, res)=>{
    res.send("Hello Node API--------> GET");
});

app.get('/products',async(req, res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }    
});

app.get('/products/:id',async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }    
});

//Create new Product
app.post('/products', async(req, res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
    // console.log(req.body);
    // res.send(req.body);
});


///Update Product
app.put('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Can not find any object with id: ${id}`});    
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
    // console.log(req.body);
    // res.send(req.body);
});



mongoose
    .connect('mongodb+srv://admin:admin@singhvij.rhw7v51.mongodb.net/mainDB')
    .then(()=>{
        console.log("Connected to the MongoDB SinghVij");
        app.listen(3000, ()=>{
            console.log('Node API app is running on port 3000');
        });
    }).catch((error)=>{
        console.log(error);
    });