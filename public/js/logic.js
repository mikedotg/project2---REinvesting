const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a7c44cc221mshcba2a134652cbf7p18ad27jsn84acac37d6f5',
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
    }
};

const pp = document.getElementById('ppInput');
const dp = document.getElementById('dpInput');
const dpC = document.getElementById('downpmtCalc');
const fa = document.getElementById('financedAmtCalc');
const lp = document.getElementById('lpInput');
const lpC = document.getElementById('lpC');
const lf = document.getElementById('lf');
const aCC = document.getElementById('aCC');
const tC = document.getElementById('tC');
const tPP = document.getElementById('tPP');
const arv = document.getElementById('arv');
const sC = document.getElementById('sC');
const ltv = document.getElementById('ltvT');
const te = document.getElementById('te');
const rb = document.getElementById('rb');
const hcb = document.getElementById('hcb');
const profit = document.getElementById('profit');
const cc = document.getElementById('cc');


function runFetch() {
    // this will be a fetch call for the displayed text in the search bar. 
    // will need to adjust it to include the new search into it with the space and commas matching
    fetch('https://realty-mole-property-api.p.rapidapi.com/properties?address=5500%20Grand%20Lake%20Dr%2C%20San%20Antonio%2C%20TX%2C%2078244', options)
        .then(function (data) { return data.json() })
        .then(function (data) { fillScreen(data) });
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
function dpCalc() {
    let dpcalc = (pp.value * (dp.value / 100));
    let faCalc = (pp.value - dpcalc);
    let lpCalc = (lp.value / 100) * faCalc;
    let accCalc = (pp.value * (1.5 / 100));
    let totalCash = (parseInt(lf.value) + parseInt(dpcalc) + parseInt(lpCalc) + parseInt(accCalc));
    let tPPrice = (parseInt(pp.value) + parseInt(lpCalc) + parseInt(lf.value)) + parseInt(accCalc);
    let sellCost = (arv.value * 0.06);
    let teCost = (parseInt(rb.value) + parseInt(hcb.value) + parseInt(sellCost));
    let profitCalc = (parseInt(arv.value) - parseInt(tPPrice) - parseInt(teCost));
    let ccCalc = (parseInt(profitCalc)/parseInt(totalCash));

    if ((pp.value && dp.value)) {
        dpC.classList.remove('text-secondary', 'text-danger')
        dpC.textContent = '$' + dpcalc;
        dpC.classList.add('text-primary');
        fa.classList.remove('text-secondary', 'text-danger')
        fa.textContent = '$' + faCalc;
        fa.classList.add('text-primary');
        aCC.classList.remove('text-secondary', 'text-warning')
        aCC.textContent = ' $' + accCalc;
        aCC.classList.add('text-primary');

    } else if ((!pp.value && dp.value)) {
        dpC.classList.remove('text-primary', 'text-warning')
        dpC.textContent = 'missing an input'
        dpC.classList.add('text-danger');
        fa.classList.remove('text-primary', 'text-warning')
        fa.textContent = 'missing pp'
        fa.classList.add('text-danger');
        aCC.classList.remove('text-primary')
        aCC.textContent = ('missing pp');
        aCC.classList.add('text-warning');

    } else if ((pp.value && !dp.value)) {
        dpC.classList.remove('text-primary', 'text-warning')
        dpC.textContent = 'missing an input'
        dpC.classList.add('text-danger');
        fa.classList.remove('text-primary', 'text-warning')
        fa.textContent = 'missing dp'
        fa.classList.add('text-danger');
        aCC.classList.remove('text-secondary', 'text-warning')
        aCC.textContent = ' $' + accCalc;
        aCC.classList.add('text-primary');

    } else if (!pp.value || !dp.value) {
        dpC.classList.remove('text-primary', 'text-danger')
        dpC.textContent = 'missing pp and dp'
        dpC.classList.add('text-warning');
        fa.classList.remove('text-primary', 'text-danger')
        fa.textContent = 'missing pp and dpC';
        fa.classList.add('text-warning');
        aCC.classList.remove('text-primary')
        aCC.textContent = ('missing pp');
        aCC.classList.add('text-warning');
    };

    if (!lp.value && (faCalc <= 0)) {
        lpC.classList.remove('text-primary', 'text-danger')
        lpC.textContent = 'missing lp and fa';
        lpC.classList.add('text-warning');
    } else if (!lp.value || (faCalc <= 0)) {
        lpC.classList.remove('text-primary', 'text-warning')
        lpC.textContent = 'missing an input';
        lpC.classList.add('text-danger');
    } else if ((lp.value && (faCalc > 0))) {
        lpC.classList.remove('text-danger', 'text-warning')
        lpC.textContent = '$' + lpCalc;
        lpC.classList.add('text-primary')
    };

    if (lf.value && (dpcalc > 0) && (lpCalc > 0) && (accCalc > 0)) {
        tC.classList.remove('text-warning');
        tC.textContent = '$' + totalCash;
        tC.classList.add('text-primary');
    } else if (!lf.value || (dpcalc <= 0) || (lpCalc <= 0) || (accCalc <= 0)) {
        tC.classList.remove('text-primary');
        tC.textContent = 'missing inputs';
        tC.classList.add('text-warning');
    }

    if (pp.value && (lpCalc > 0) && (lf.value)) {
        tPP.classList.remove('text-warning');
        tPP.textContent = '$' + tPPrice;
        tPP.classList.add('text-primary');
    } else if (!pp.value || (lpCalc > 0) || (lf.value)) {
        tPP.classList.remove('text-primary');
        tPP.textContent = 'missing inputs';
        tPP.classList.add('text-warning');
    }

    if (!pp.value && !arv.value) {
        sC.classList.remove('text-primary');
        sC.innerText = ' missing arv';
        sC.classList.add('text-warning');
        ltv.classList.remove('text-primary');
        ltv.innerText = ' missing pp and arv';
        ltv.classList.add('text-warning');
    } else if (!pp.value && arv.value) {
        sC.classList.remove('text-warning');
        sC.innerText = ' $' + sellCost;
        sC.classList.add('text-primary');
        ltv.classList.remove('text-primary');
        ltv.innerText = ' missing pp';
        ltv.classList.add('text-warning');
    } else if (pp.value && !arv.value) {
        sC.classList.remove('text-primary');
        sC.innerText = ' missing arv';
        sC.classList.add('text-secondary');
        ltv.classList.remove('text-primary');
        ltv.innerText = ' missing arv';
        ltv.classList.add('text-warning');
    } else if (pp.value && arv.value) {
        sC.classList.remove('text-warning');
        sC.innerText = ' $' + sellCost;
        sC.classList.add('text-primary');
        ltv.classList.remove('text-primary');
        ltv.innerText = ' $' + (pp.value / arv.value);
        ltv.classList.add('text-warning');
    }

    // let teCost = rb.value + hcb.value + sellCost
    if (!rb.value && !hcb.value && !arv.value){
        te.classList.remove('text-primary', 'text-danger');
        te.innerText = ' missing rb, hcb, and sc';
        te.classList.add('text-warning')
    } else if (rb.value && !hcb.value && !arv.value){
        te.classList.remove('text-primary', 'text-warning');
        te.innerText = ' missing hcb and sc';
        te.classList.add('text-danger')
    } else if (!rb.value && hcb.value && !arv.value){
        te.classList.remove('text-primary', 'text-warning');
        te.innerText = ' missing rb and sc';
        te.classList.add('text-danger')
    } else if (rb.value && hcb.value && !arv.value){
        te.classList.remove('text-primary', 'text-warning');
        te.innerText = ' missing sc';
        te.classList.add('text-danger')
    } else if (rb.value && hcb.value && arv.value){
        te.classList.remove('text-danger', 'text-warning');
        te.innerText = ' $' +teCost;
        te.classList.add('text-primary')
    }

    // let profitCalc = (parseInt(arv.value) - parseInt(tPPrice) - parseInt(teCost));
    if (!arv.value && !pp.value && !lf.value && !rb.value && !hcb.value){
        profit.classList.remove('text-primary', 'text-danger');
        profit.innerText = ' missing arv, te and tpp';
        profit.classList.add('text-warning');
    } else if (arv.value && (!pp.value||!lf.value) && (!rb.value||!hcb.value)){
        profit.classList.remove('text-primary', 'text-warning');
        profit.innerText = ' missing te and tpp';
        profit.classList.add('text-danger');
    } else if (arv.value && pp.value && lf.value && (!rb.value || !hcb.value)) {
        profit.classList.remove('text-primary', 'text-warning');
        profit.innerText = ' missing te';
        profit.classList.add('text-danger');
    } else if (arv.value && (!pp.value || !lf.value) && rb.value  &&hcb.value) {
        profit.classList.remove('text-primary', 'text-warning');
        profit.innerText = ' missing tpp';
        profit.classList.add('text-danger');
    } else if (arv.value && pp.value && lf.value && rb.value && hcb.value){
        profit.classList.remove('text-danger', 'text-warning');
        profit.innerText = ' $' + profitCalc;
        profit.classList.add('text-primary');
    }

    // let ccCalc = (parseInt(profitCalc)/parseInt(totalCash))
    // let profitCalc = (parseInt(arv.value) - parseInt(tPPrice) - parseInt(teCost));
        // let tPPrice = (parseInt(pp.value) + parseInt(lpCalc) + parseInt(lf.value)) + parseInt(accCalc);
    // let totalCash = (parseInt(lf.value) + parseInt(dpcalc) + parseInt(lpCalc) + parseInt(accCalc));

    if (!arv.value && !lf.value) {
        cc.classList.remove('text-primary', 'text-danger');
        cc.innerText = ' missing profit and tc';
        cc.classList.add('text-warning');
    } else if (!arv.value && lf.value){
        cc.classList.remove('text-primary', 'text-warning');
        cc.innerText = ' missing profit';
        cc.classList.add('text-danger');
    } else if (arv.value && !lf.value){
        cc.classList.remove('text-primary', 'text-warning');
        cc.innerText = ' missing tc';
        cc.classList.add('text-danger');
    }

};

dpCalc();

pp.addEventListener('input', (event) => { dpCalc(); });
dp.addEventListener('input', (event) => { dpCalc(); });
lp.addEventListener('input', (event) => { dpCalc(); });
lf.addEventListener('input', (event) => { dpCalc(); });
arv.addEventListener('input', (event) => { dpCalc(); });
rb.addEventListener('input', (event) => { dpCalc(); });
hcb.addEventListener('input', (event) => { dpCalc(); });

