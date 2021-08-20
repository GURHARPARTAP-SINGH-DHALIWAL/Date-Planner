const express=require('express');
const port=8000;
const app=express();
const cors=require('cors');
app.use(cors());

var fetch = require('node-fetch');
app.use(express.json());
app.use(express.urlencoded());


app.use('/',require('./routes'));

app.listen(port,function(){
    console.log('Server is Up and Running');
});