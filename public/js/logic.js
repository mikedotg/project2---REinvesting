const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a7c44cc221mshcba2a134652cbf7p18ad27jsn84acac37d6f5',
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
    }
};

const pp = document.getElementById('ppInput');
const dp = document.getElementById('dpInput');


function runFetch() {
// this will be a fetch call for the displayed text in the search bar. 
// will need to adjust it to include the new search into it with the space and commas matching
    fetch('https://realty-mole-property-api.p.rapidapi.com/properties?address=5500%20Grand%20Lake%20Dr%2C%20San%20Antonio%2C%20TX%2C%2078244', options)
        .then(function(data){return data.json()})
        .then(function (data){fillScreen(data)});
}

// function to fillScreen w/ the necessary information. 
let fillScreen = (data) => {
    const searchAddress = document.querySelector('#searchAddress');     //creating a var for searchAddress list item
        searchAddress.textContent = `Address: ${data[0].formattedAddress}`;  // adding into the search

    const searchBeds = document.querySelector('#searchBeds');     //creating a var for searchBeds list item
        searchBeds.textContent = `Beds: ${data[0].bedrooms}`;   
    const searchBaths = document.querySelector('#searchBaths');     //creating a var for searchBaths list item
        searchBaths.textContent = `Baths ${data[0].bathrooms}`;  
    const searchSqft = document.querySelector('#searchSqft');     //creating a var for searchSqft list item
        searchSqft.textContent = `Sqft: ${data[0].squareFootage}`;  
    const searchLot = document.querySelector('#searchLot');     //creating a var for searchLot list item
        searchLot.textContent = `Lot Size: ${data[0].lotSize} Sqft.`;  

    
};

// this will be what launches the API to do it's search and fill in the property info
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', function () {
    let input = document.querySelector('#userInput').value;
    console.log(input);
    runFetch();
});

// downpayment calculations. 
function dpCalc(){
    
    if (ppInput.value && dpInput.value) { 
        let calc = ppInput.value * dpInput.value;
        console.log(calc);

    }};

    dpCalc();


// think about this, if there is no input on one of the items I want you to show what is missing in my calculation if both are filled I want you to to say inputs required. if both are there then add em up. 