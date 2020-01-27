let validcount = 0;
let invalidcount = 0;
let valid = [];
let invalid = [];

import {validateEmail} from"./helpers";

export default function validateUsers(users){
users.forEach((element) => {
const {traineeEmail, reviewerEmail} = element;
let check = validateEmail(traineeEmail);
if( check == true){
validcount++;
valid.push(traineeEmail);
}
else{
invalidcount++;
invalid.push(traineeEmail);
}
let check1 = validateEmail(reviewerEmail);
if( check1 == true){
validcount++;
valid.push(reviewerEmail);
}
else{
invalidcount++;
invalid.push(reviewerEmail);
}
})


console.log("valid count \n"+validcount);
console.log ("valid email\n" +valid);
console.log("invlaid count \n"+invalidcount);
console.log("invalid email\n"+invalid);
}
