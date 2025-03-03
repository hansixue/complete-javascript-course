'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

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

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => console.error(`${err} !!`));
};

//getCountryData('usa');
//getCountryData('russia');
//getCountryAndNeighbour('zho');
//getCountryData('japan');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// 1. create the function
const whereAmI = function (lat, lng) {
  // 2. reverse geocoding with
  // http://api.geonames.org/findNearbyJSON?lat=47.3&lng=9&username=coin8275
  // const request = fetch('http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${lng}&username=coin8275')
  // console.log(request);
  fetch(
    `http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${lng}&username=coin8275`,
  )
    .then(response => response.json())
    .then(data => {
      if (data.status)
        throw new Error(`Web error! Status: ${data.status?.message}`);
      // 3. log the data
      console.log(data);
      console.log(`You are in ${data?.geonames[0]?.countryName}`);
      return data.geonames[0].countryName;
    })
    .then(name => getCountryData(name))
    .catch(err => alert(err));

  // 4. deal the 403 error
  // 5. reject and prompt a massage
  // 6. render the country
  // 7. catch all error
};

//whereAmI(35.7, 139.4);
//whereAmI('lat', 'lng');

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.
*/

// console.log(imgContainer);

const wait = function (seconds) {
  console.log(`waiting for $(seconds)s ! `);
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
// part 1
const createImage = function (imgPath) {
  // try html : <img src="pic_trulli.jpg" alt="Italian Trulli"> works
  // Promisify
  return new Promise((resolve, reject) => {
    // fetch the image
    fetch(imgPath)
      // if ok
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      // then show that on webpage
      .then(blob => {
        //console.log('blob' + blob);
        showImage();
        // 生成一个可以直接被 <img> 标签使用的本地 URL
        const imageURL = URL.createObjectURL(blob);
        // 1) 在页面中创建一个 <img> 元素并插入
        const imgElem = document.createElement('img');
        imgElem.src = imageURL;
        //console.log(imageURL);
        //console.log(imgElem);
          imgContainer.appendChild(imgElem);
	  return imgElem;
      })
      // catch the 403
      .catch(err => console.log('ERROR! ' + err));
  });
};

const hideImage = function () {
  console.log('hide!!!!');
  imgContainer.setAttribute('display', 'none');
};

const showImage = function () {
  console.log('showing!!!!');
  imgContainer.setAttribute('display', 'inline');
};
/*
PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const showImages = function (...imgs) {
  console.log(imgs);
  imgs.forEach(img => {
    //console.log(img);
    // show pic 1
    createImage(img)
      // weit 2s
      .then(() => {
        console.log('going to waiting');
      }).then(wait(2))
      // show next
      .then(hideImage);
  });
};
showImages('./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg');

// createImage('./img/img-1.jpg');
