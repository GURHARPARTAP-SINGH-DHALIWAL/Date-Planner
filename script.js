
//set up the map using leaflet.js
var mymap = L.map('mapid').setView([27, -80], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mymap);


//array for storing all the markers
var markArray=[];


const form=document.getElementById('form');


//event liostener for form
form.addEventListener('submit',async function(event){

    const button=document.getElementById("button");
    //preventing default reloading
    event.preventDefault();
    //disabling button
    button.disabled=true;
    console.log("here");
    const form=event.currentTarget;
    //url for server api
    const url="https://oxytocin-api.herokuapp.com/api/locations";
   //getting form data and converint it into JSON
    const formData=new FormData(form);

    const plainFormData = Object.fromEntries(formData.entries());

    console.log(plainFormData);

	const formDataJsonString = JSON.stringify(plainFormData);
    //JSON format data of form
    console.log(formDataJsonString);
    //Latitude Longitude set by User
    var lat=(plainFormData.startingLatitude);
    var lng=(plainFormData.startingLongitude);
    console.log(lat,lng);

   //Setting current view to User Location
    mymap.setView([lng,lat],12);

    //Icon for user Location
    var currentLocation = L.icon({
        iconUrl: 'current.png',
     
    
        iconSize:     [30, 30], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    //setting marker on current location
    var marker = await new L.marker([lng,lat],{icon:currentLocation}).bindPopup("Current Location").addTo(mymap);

    //options for API call
    const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: formDataJsonString,
	};

  //making API call and response contains tge response from the server
	const response = await fetch(url, fetchOptions);
    // if any error
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
  //converting data to JSON
    response.json().then(async function(data){
        
        console.log(data);
        //Removing All the previous Markers
        for(i of markArray)
        {
           await mymap.remove(i);     
        }
        //Setting up markers at all dating locations
        for(i of data.locations)
        {
           var marker = await new L.marker([i.latitude,i.longitude]).bindPopup(i.name).addTo(mymap);
           markArray.push(marker);
        }
    });
  
  
    



});