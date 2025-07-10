export function printAge(age){
  console.log(age)
}

class CustomerDetails {

  printFirstName(firstname){
    console.log(firstname)
  }

  printLastName(lastname){
    console.log(lastname)
  }

}

export const customerDetails = new CustomerDetails()
