const express=require('express');

const port=8000;

const app=express();

const path=require('path');

const cors=require('cors');


//node-fetch to make API calls from server-side
const  fetch = require('node-fetch');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '')))
app.use(express.urlencoded());

//for all reuqestss first HTML landing page is sent
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
  })

//for all requests to homepage we goto routes
app.use('/',require('./routes'));

//setting up server
app.listen(process.env.PORT||port,function(){
    console.log('Server is Up and Running');
});