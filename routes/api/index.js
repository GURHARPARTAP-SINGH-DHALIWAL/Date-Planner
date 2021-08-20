const express=require('express');
const router=express.Router();
var fetch = require('node-fetch');
//getting the api key from secret.js file
const key=require('../../secret');

console.log('In Locations');
router.post('/locations',async function(req,res){
   
   
   //request options
    var requestOptions = {
      method: 'GET',
    };
    //array of categories due to non availability og google API we had limited categories
       var arr=["accommodation.hotel","commercial.shopping_mall","catering.restaurant","entertainment.cinema","tourism.attraction.fountain"];

       var string="";
       for(i of arr)
       {
           string+=i;
           string+=","
       }

       //string to make category reuest
       string = string.substring(0, string.length - 1);

   console.log(string);
   //Latitude Longitude for request
   var lat=parseFloat(req.body.startingLatitude);
   var lon=parseFloat(req.body.startingLongitude);
   console.log(lat,lon);
   
   //Making the API call
      fetch(`https://api.geoapify.com/v2/places?categories=${string}&filter=circle:${lat},${lon},10000&limit=10&apiKey=${key.key}`, requestOptions)
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
                        //setting up the required attributes for the currentlocation 
                        type:originalLocation.categories[originalLocation.categories.length-1],
                        name:originalLocation.name,
                        street:originalLocation.street,
                        city:originalLocation.city,
                        county:originalLocation.county,
                        state:originalLocation.state,
                        country:originalLocation.country,
                        longitude:originalLocation.lon,
                        latitude:originalLocation.lat,
                        currency:'USD'


                    };
                    //Adding curretn location to final result
                    finalResult.locations.push(currentLocation);
                }


                
                console.log(finalResult);

                //returning response back to JS file
                res.send(finalResult);
    
    })
      .catch(error => console.log('error', error));
});

module.exports=router;