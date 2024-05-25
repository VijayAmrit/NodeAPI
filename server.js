const express = require('express');
const app = express();


//Routes
app.get('/',(req, res)=>{
    res.send("Hello Node API--------> GET");
});


app.listen(3000, ()=>{
    console.log('Node API app is running on port 3000');
});