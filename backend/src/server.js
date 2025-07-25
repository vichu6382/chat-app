import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    connectDB();
  });
}


// Export server for Vercel
export default server;