import express, { Request, Response, NextFunction } from "express";
import router from "./router";

const app = express();


app.use(express.json());
app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

export default app;
