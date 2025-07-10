//Concatenation and Interpolation
var itemName = "Cup"
var itemPrice = 50
var messageToPrint = "The price for your " +itemName+ " is " +itemPrice+ " dollars" //concatenation
var messageToPrint = `The price for your ${itemName} is ${itemPrice} dollars` //interpolation
console.log(messageToPrint)