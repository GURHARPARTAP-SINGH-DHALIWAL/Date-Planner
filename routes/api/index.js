const express=require('express');
const router=express.Router();
var fetch = require('node-fetch');
const key=require('../../secret');

console.log('In Locations');
router.post('/locations',async function(req,res){
    console.log(req.body);
    const neighborhood = 'chelsea'
    const borough = 'manhattan'
    const city = 'new+york+city'
    const category = 'burgers'
   
   
    var requestOptions = {
      method: 'GET',
    };
    
      fetch(`https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${req.body.startingLatitude},${req.body.startingLongitude},5000&limit=20&apiKey=${key.key}`, requestOptions)
      .then(response => response.json())
      .then(
            function(result) {
                
                res.send(result);
    
    })
      .catch(error => console.log('error', error));
});

module.exports=router;