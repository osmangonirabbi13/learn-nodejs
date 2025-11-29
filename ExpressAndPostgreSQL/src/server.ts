import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developer");
});

app.listen(port, () => {
  console.log(`Server start this port ${port}`);
});
