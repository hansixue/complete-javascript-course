'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0)
}

console.log("length : " + poll.answers.length);

const registerNewAnswer = function(){
    let answer = Number(prompt(poll.question));
    //console.log(answer+"   "+ 1<NaN);
    
    if(answer<poll.answers.length){
	poll.answers[answer]++;
	console.log(poll.answers);
    }else{
	alert("Invalue input!")
    }
}
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
