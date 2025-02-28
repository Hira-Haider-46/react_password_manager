import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(cors());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "password_manager";

client.connect();

const db = client.db(dbName);

app.get("/", async (req: Request, res: Response) => {
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
});

app.post("/", async (req: Request, res: Response) => {
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(req.body);
  res.send({success: true, result: findResult});
});

app.delete("/", async (req: Request, res: Response) => {
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(req.body);
  res.send({success: true, result: findResult});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});