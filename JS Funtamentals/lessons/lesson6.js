// Conditional statement

// if(condition) {
  //execute some code here
// } else {
  // execuite some code here
// }

// Se for entre 6 e meio dia vamos imprimir bom dia
// Se for entre 12 e 18 vamos imprimir boa tarde
// Se for outra condição vamos imprimir boa noite

var hour = 7

if(hour >= 6 && hour < 12){
  console.log('Good Morning')
} else if (hour >= 12 && hour < 18){
  console.log("Boa Tarde")
} else {
  console.log("Good Evening")
}
