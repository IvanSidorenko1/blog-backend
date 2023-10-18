import express from "express";
import multer from "multer";

import cors from "cors";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import { handleValidationErorrs, checkAuth } from "./utils/index.js";
import { PostController, UserController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:var1009@cluster1009.2ocq0sj.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => console.log("DB error", err));

const app = express();
// создаєм схоdищє для файлов за допомогою мультер
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
// обробка гет запросів статичних файлів з допомогою express
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErorrs,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErorrs,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErorrs,
  PostController.create
);
app.delete("/posts/:id", PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErorrs,
  PostController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
