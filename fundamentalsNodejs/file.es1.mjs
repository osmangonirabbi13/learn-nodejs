// common js to esm

import {a} from './file.es2.mjs'
import {a as b} from  './file.es3.mjs'



import utils from './utils.esm/index.mjs'
console.log(utils.add(2 , 4))
console.log(utils.subs(2 , 4))
console.log(a)
console.log(b)