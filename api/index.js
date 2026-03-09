import express from "express";
import userRoutes from '../backend/routes/users.js'
import authRoutes from '../backend/routes/auth.js'
import postRoutes from '../backend/routes/posts.js'
import commentRoutes from '../backend/routes/comments.js'
import likeRoutes from '../backend/routes/likes.js'
import relationshipRoutes from '../backend/routes/relationships.js'
import cors from "cors";
import { db } from "../backend/connect.js";
const app = express();
const PORT = process.env.PORT || 8808;

//middlewares
app.use(express.json())
app.use(cors());

// Health check route
app.get("/api/", (req, res) => {
  res.status(200).json({ status: "API is running", env: process.env.NODE_ENV });
});

// Test DB route
app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1", (err, data) => {
    if (err) {
      console.error("DB Test Error:", err);
      return res.status(500).json({ error: "DB connection failed", message: err.message });
    }
    res.status(200).json({ message: "DB connection successful", data });
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);


// Only start the server if we're not running in a serverless environment (like Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Api working fine on port:${PORT}`);
  });
}

export default app;