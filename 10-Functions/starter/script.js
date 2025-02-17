'use strict';

const bookings = [];

const creatbooking = function(flightNum,numPperson=1,price=100){

    const booking ={
	flightNum,
	numPperson,
	price
    }
    
    console.log(booking);
    bookings.push(booking);
}

creatbooking("lm123");
