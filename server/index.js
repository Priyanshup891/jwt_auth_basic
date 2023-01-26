import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use("/user", UserRoutes);

const PORT = process.env.PORT || 5500;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb://${mongo_username}:${mongo_password}@ac-xfs6l7q-shard-00-00.lsgh9rg.mongodb.net:27017,ac-xfs6l7q-shard-00-01.lsgh9rg.mongodb.net:27017,ac-xfs6l7q-shard-00-02.lsgh9rg.mongodb.net:27017/?ssl=true&replicaSet=atlas-emnr1m-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`Something wrong with server: ${error}`));
