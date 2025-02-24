import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Console, error } from "console";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(() => {
    Console.log(error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
