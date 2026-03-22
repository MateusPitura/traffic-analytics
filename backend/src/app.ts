import express from "express";
import { router } from "./routes";
import { createExpressEndpoints } from "@ts-rest/express";
import { contract } from "@shared/contract";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
createExpressEndpoints(contract, router, app);

export default app;
