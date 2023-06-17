import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import snowflake from "snowflake-sdk";
const { createConnection } = snowflake;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const con = createConnection({
  account: "mytfsgn-iv68166",
  username: "SOS",
  password: "123456789@Abc",
  database: "SOS",
  schema: "",
  warehouse: "COMPUTE_WH",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

con.connect((err, conn) => {
  if (err) {
    console.log("Error in connection");
  } else {
    console.log("Connected");
  }
});
app.post("/member", (req, res) => {
  const details = req.body;
  console.log("details", details);
  const insertContactDetailsQuery = `INSERT INTO MEMBERS(NAME, EMAIL, COUNTRY, CITY, PHONE, GENDER) 
    VALUES (?, ?, ?, ?,?,?)`;

  const insertContactDetails = [
    `${details.name}`,
    details.email,
    details.country,
    details.city,
    details.phone,
    details.gender,

  ];

  con.execute({
    sqlText: insertContactDetailsQuery,
    binds: insertContactDetails,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Error inserting employee: ${err.message}`);
        return res.status(500).json({ Error: "Insert employee error in SQL" });
      }
      return res.json({ Status: "Success" });
    },
  });
});

app.get("/members", (req, res) => {
  const sql = "SELECT * FROM MEMBERS";
  con.execute({
    sqlText: sql,
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Error: "Get customer error in SQL" });
      }
      return res.json({ Status: "Success", Result: rows });
    },
  });
});

app.listen(8081, () => {
  console.log("Running");
});
