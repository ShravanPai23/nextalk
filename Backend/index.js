import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env");
  process.exit(1);
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4001",
    credentials: true,
  })
);

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRoute);
app.use("/message", messageRoute);