//objects

var customer = {
  firstName: "Virso",
  lastname: "Meredick"
}
console.log(customer)

//dot notation
customer.firstName = "Mike"
//bracket notation
customer['lastname'] = "Siver"
console.log(`${customer.firstName} ${customer.lastname}`)

//arrays
var car = ["Volvo", "Toyota", "Tesla"]
car[2] = "BMW"
console.log(car[2])