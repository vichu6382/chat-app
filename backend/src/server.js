import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
kk
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.use("/uploads", express.static("uploads"));


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  connectDB();
});