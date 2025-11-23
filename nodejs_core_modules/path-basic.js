const path = require("path");

console.log("Current file Info : \n");
console.log("file name :", __filename);
console.log("Directory :", __dirname);

console.log("\n" + "-".repeat(50) + "\n")

const filePath = "/osman/documents/hello.pdf"
console.log("Analyzing Path : " , filePath , "\n")
console.log("Directory : " , path.dirname(filePath))
console.log("Base name : " , path.extname(filePath))
console.log("File Extension :" , path.basename(filePath));
console.log("File Name :" , path.basename(filePath , path.extname(filePath)) );

console.log("\n" + "-".repeat(50) + "\n")

const parsed = path.parse(filePath)
console.log("Parsed path object : " , parsed);
console.log("Formated path :" , path.format(parsed));