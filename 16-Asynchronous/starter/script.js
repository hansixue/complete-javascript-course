'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className) {
  //console.log(data);
  //console.log(Object.values(data.flags));
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} Million</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//   });
// };

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//     // get neighbour country
//     const [neighbour] = Object.values(data.borders);
//     console.log(neighbour);
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/name/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       // console.log(JSON.parse(this.responseText))
//       const [data2] = JSON.parse(this.responseText);
//       //console.log(data2)
// 	renderCountry(data2,"neighbour");
//     });
//   });
// };

// const request = fetch('https://restcountries.com/v3.1/name/zho')
// console.log(request);

// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
// 	.then(function(response){
// 	    console.log(response);
// 	    return response.json();
// 	}).then(function(data){
// 	    console.log(data);
// 	    renderCountry(data[0]);
// 	})
// }

const getCountryData = function(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
	.then(response=> response.json())
	.then(data=> {
	    renderCountry(data[0]);
	    const neighbour = data[0].borders?.[0];
	    return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
	}).then(response=>response.json())
	.then(data=>renderCountry(data[0],'neighbour'))
	.catch(err =>console.error(`${err} !!`));
}

getCountryData('usa');
//getCountryData('russia');
//getCountryAndNeighbour('zho');
//getCountryData('japan');
