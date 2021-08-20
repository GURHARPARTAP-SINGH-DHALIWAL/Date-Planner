var mymap = L.map('mapid').setView([27, -80], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mymap);

var markArray=[];





const form=document.getElementById('form');
form.addEventListener('submit',async function(event){
    const button=document.getElementById("button");
   
    event.preventDefault();
    button.disabled=true;
    console.log("here");
    const form=event.currentTarget;
    
    const url="http://localhost:8000/api/locations";
    const formData=new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData);
	const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
    var lat=(plainFormData.startingLatitude);
    var lng=(plainFormData.startingLongitude);
    console.log(lat,lng);
    //var marker = L.marker([lng, lat]).addTo(mymap);
    mymap.setView([lng,lat],12);
    var currentLocation = L.icon({
        iconUrl: 'current.png',
      //  shadowUrl: 'leaf-shadow.png',
    
        iconSize:     [30, 30], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var marker = await new L.marker([lng,lat],{icon:currentLocation}).bindPopup("Current Location").addTo(mymap);
  //  markArray.push(marker);
  
  
    const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

    response.json().then(async function(data){
        console.log(data);
        for(i of markArray)
        {
           await mymap.remove(i);     
        }
        for(i of data.locations)
        {
           var marker = await new L.marker([i.latitude,i.longitude]).bindPopup(i.name).addTo(mymap);
           markArray.push(marker);
        }
    });
  
    //  console.log(responseData);
    



});