const crypto = require("crypto");

console.log("\n MD5 Hash : ");

const md5Hash = crypto.createHash("md5").update("password123").digest("hex"); //not recommended
console.log("input : password123");
console.log("MD5 HasedPassword : ", md5Hash);

console.log("-".repeat(50));


const sha256Hash = crypto.createHash('sha256').update('password123').digest('hex')
console.log("sha256Hash :"  , sha256Hash)

console.log("-".repeat(50));

const sha512Hash = crypto.createHash('sha512').update('password123').digest('hex')
console.log("sha512Hash :"  , sha512Hash)