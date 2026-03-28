import express from "express";
import { router } from "./routes";
import { createExpressEndpoints } from "@ts-rest/express";
import cors from "cors";
import { contract } from "@shared/contract";

const app = express();

app.use(express.json());
app.use(cors());
createExpressEndpoints(contract, router, app);

export default app;
