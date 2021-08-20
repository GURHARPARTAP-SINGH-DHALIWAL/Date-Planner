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
       var arr=["accommodation.hotel","commercial.shopping_mall","catering.restaurant","entertainment.cinema","tourism.attraction.fountain"];
       var string="";
       for(i of arr)
       {
           string+=i;
           
           string+=","
       }
       string = string.substring(0, string.length - 1);

   console.log(string);
   var lat=parseFloat(req.body.startingLatitude);
   var lon=parseFloat(req.body.startingLongitude);
   console.log(lat,lon);
      fetch(`https://api.geoapify.com/v2/places?categories=${string}&filter=circle:${lat},${lon},5000&limit=5&apiKey=${key.key}`, requestOptions)
      .then(response => response.json())
      .then(
            function(result) {
                var finalResult={};
                finalResult.locations=[];
                console.log(result);
                for(i of result.features)
                {   
                    var originalLocation=i.properties;
                    var currentLocation={
                        //type:originalLocation.categories[categories.size-1],
                        name:originalLocation.name,
                        street:originalLocation.street,
                        city:originalLocation.city,
                        county:originalLocation.county,
                        state:originalLocation.state,
                        country:originalLocation.country,
                        longitude:originalLocation.lon,
                        latitude:originalLocation.lat,


                    };
                    finalResult.locations.push(currentLocation);
                }


                
                  console.log(finalResult);
                res.send(finalResult);
    
    })
      .catch(error => console.log('error', error));
});

module.exports=router;