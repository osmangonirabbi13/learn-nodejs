import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/data/users.json");

export function readUsers() {
  try {
    if (!fs.existsSync(filePath)) {
      return []; // file না থাকলে empty array
    }

    const data = fs.readFileSync(filePath, "utf-8").trim();

    if (!data) {
      return []; // file খালি হলে empty array
    }

    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read JSON:", err);
    return []; // parse error হলেও empty array
  }
}

export function writeUsers(users: any) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}
