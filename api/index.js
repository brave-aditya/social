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

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to mysql database!");
  connection.release();
});

app.use("/api/auth", authRoutes);
app.use("/api/users",  userRoutes);
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