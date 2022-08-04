const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a7c44cc221mshcba2a134652cbf7p18ad27jsn84acac37d6f5',
		'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
	}
};

fetch('https://realty-in-us.p.rapidapi.com/locations/auto-complete?input=new%20york', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));