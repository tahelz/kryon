import express from "express";
import * as http from "http";
import cors from "cors";
import * as dotenv from "dotenv";
import { router } from "./routes";

const app = express();
const server = http.createServer(app);
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
