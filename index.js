const express=require('express');
const port=8000;
const app=express();
const path=require('path');
const cors=require('cors');
app.use(cors());

var fetch = require('node-fetch');
app.use(express.json());
app.use(express.urlencoded());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'))
  })
app.use('/',require('./routes'));

app.listen(process.env.PORT||port,function(){
    console.log('Server is Up and Running');
});