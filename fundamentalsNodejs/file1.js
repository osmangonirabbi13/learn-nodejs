const {a : x} = require('./file2')
const {a : y} = require('./file3')
const {add , subs } = require('./utils')


console.log(add(2 , 4))
console.log(subs(2 , 4))
console.log(x)
console.log(y)

