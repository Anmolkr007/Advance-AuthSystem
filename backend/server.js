import express from 'express';
import "dotenv/config";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import {sql} from "./DB.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();



// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
app.use(express.json());
app.use(cookieParser());





app.use("/api/auth",authRoute);



if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))
  app.get("/{*any}",(req,res)=>{
    console.log(path.resolve(__dirname, "..", "frontend", "dist", "index.html"))
    res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"))
  })
}


async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        isVerified BOOLEAN DEFAULT FALSE,
        resetPasswordToken TEXT,
        resetPasswordExpiresAt TIMESTAMP,
        verificationToken TEXT,
        verificationTokenExpiresAt TIMESTAMP
      );
    `;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}
initDB().then(()=>{
    
    app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    })
}
)