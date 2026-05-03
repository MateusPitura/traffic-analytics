import { contract } from "@shared/contract";
import { createExpressEndpoints } from "@ts-rest/express";
import cors from "cors";
import express from "express";
import { router } from "./routes";
import { sseRouter } from "./routes/sse";

const app = express();

app.use(express.json());
app.use(cors());
createExpressEndpoints(contract, router, app);
app.use("/", sseRouter);

export default app;
