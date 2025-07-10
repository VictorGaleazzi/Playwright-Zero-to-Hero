// Relational or comparison operators

// > - more than
// < - less than
// >= - more than equal
// <= - less than equal

var result = 10 >= 11
console.log(result)

// Equality operators
var x = 1
console.log(x == '1')// lose comparison - true (Comparamos apenas o valor e nao o tipo da variavel, por isso é true)
console.log(x === '1')// strict comparisson - false (Checamos o valor e o tipo de variavel, um é string o outro number entao por isso é falso, apesar do valor ser o mesmo 1)