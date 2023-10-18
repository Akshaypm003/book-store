import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());
// middleware for parsing request body
// middleware for handling CORS policy option 1 : allow all origin with default of CORS(*)
app.use(cors());

app.use("/books", booksRoute);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("response is sent");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to mongoose");
    app.listen(PORT, () => console.log(`app is listening to port ${PORT}`));
  })
  .catch((error) => {
    console.log("mongoose error");
  });

//middleware for handling CORS policy option 2 : Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     method: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );