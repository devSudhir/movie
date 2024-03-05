import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./connect.mjs";
import movieRouter from "./routes/movie.mjs";

console.log(connectDB);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", movieRouter);

dotenv.config();
connectDB();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("App started at port", port);
});
