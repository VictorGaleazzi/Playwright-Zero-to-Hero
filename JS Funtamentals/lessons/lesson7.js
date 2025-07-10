//Loops

//statement1: declaração inicial para começar o loop
//statement2: define a condição de quão longo voce quer que seja o loop e quando queremos parar
//statement3: o que precisamos q seja feito após cada ciclo do loop

// for(statement1; statement2; statement3){

// }

//for loop (for i loop)
for (let i=0; i<5; i++){
  console.log("hello world")
}

var cars = ["Volvo", "Toyota", "Tesla"]
// for of loop
for (let car of cars){
  console.log(car)
  if(car == "Toyota"){
    break
  }
}

//ES6 syntax for each loop
cars.forEach( car => {
  console.log(car)
})