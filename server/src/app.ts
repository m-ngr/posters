require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const port = process.env.PORT || 4000;
const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'"],
    },
  })
);

// Apply rate limiter to all requests
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
  })
);

app.use(cors());
app.use(express.json());
app.use(compression());

app.use("/api/posts", postsRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  const msg = err.message || "Internal Server Error";
  res.status(500).json({ error: msg });
});

mongoose
  .connect(process.env.MONGO_URI ?? "")
  .then(() => {
    app.listen(port, () => console.log("Server is running on port", port));
  })
  .catch((err) => console.log(err));
