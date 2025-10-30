import dotenv from 'dotenv';
dotenv.config();

import { connect } from "./config/db.ts";
import app from './app.ts';

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server:", err);
  }
};

start();