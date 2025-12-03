import dotenv from "dotenv";
import path from "path";
import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const app = express();
const port = 5000;

//parser
app.use(express.json());
// app.use(express.urlencoded())  form-data এর  jonno use kora hoy.

//db
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      titel VARCHAR(200) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `);
};

initDB();


//Middlware

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);
  next();
};

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developer");
});

//? ------------------ USER CRUD ------------------

app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );

    return res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "Users retrieved suuccessfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User update successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User delete successfully",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//? ------------------ TODO CRUD ------------------

app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, titel } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id , titel) VALUES($1 , $2) RETURNING *`,
      [user_id, titel]
    );

    return res.status(201).json({
      sucess: true,
      message: "Todo created",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Todo created failed",
    });
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Server start this port ${port}`);
});
