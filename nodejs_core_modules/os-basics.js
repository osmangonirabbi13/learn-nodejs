const os = require("os");


console.log("System info \n");
console.log("-".repeat(50));

console.log("Platform Details : ")
console.log("Platform : ", os.platform())
console.log("Architecture : " , os.arch())
console.log("Os Type :" , os.type())
console.log("os release : " , os.release())
console.log("hostname : " , os.hostname())

console.log("\n CPU info : ")

const cpus = os.cpus()
console.log("CPU Model :" , cpus[0].model)
console.log("Cores : " , cpus.length )
console.log("CPU Speed  :"  , cpus[0].speed)

const totalMem = os.totalmem()
const freeMem = os.freemem()
console.log("Total Memory : " , (totalMem /1024 /1024/1024).toFixed(2) , "GB")
console.log("Free Memory : " , (freeMem /1024 /1024/1024).toFixed(2) , "GB")

console.log("-".repeat(50));

const uptime = os.uptime()
console.log(uptime);

const days = Math.floor(uptime / 86400)
const hours = Math.floor((uptime % 86400) / 3600)
const minutes = Math.floor((uptime%3600) / 60)

console.log(`${days} days ${hours} hours ${minutes}`)