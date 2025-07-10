// Declarative Function
helloOne();
function helloOne(){
  console.log('Hello one')
}

// Anonymous Function
var helloTwo = function(){
  console.log('Hello two')
}

helloTwo()

// A diferença entre elas é que a função declarativa pode ser chamada antes da escrita da função em si,
// sem problema de execução, já a função anonima só pode ser chamada após se escrita

//ES6 function syntax or arrow function
var helloThree = () => {
  console.log('Hello three')
}
helloThree()

//Function with arguments
function printName(name){
  console.log(name)
}

printName('Victor')

//Function with return
function multipleByTwo(number){
  var result = number * 2
  return result
}

var myResult = multipleByTwo(5)
console.log(myResult)

//Import function
import { printAge } from "../helpers/printHelper.js";
printAge(4)

//Import all
import * as helper from '../helpers/printHelper.js'
helper.printAge(5)