const form=document.getElementById('form');
form.addEventListener('submit',async function(event){
    event.preventDefault();
    const form=event.currentTarget;
    const url="http://localhost:8000/api/locations";
    const formData=new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
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

	const responseData=response.json();
  
     console.log(responseData);
    



});