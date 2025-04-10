import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./src/config/dbConnection.js";
import userRoute from "./src/routes/userRoute.js";
import noteRoute from "./src/routes/noteRoute.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static("uploads")); // saving files as static


app.use('/user', userRoute);
app.use('/note', noteRoute);

const PORT = process.env.PORT || 8000;
console.log("PORT: ", PORT);
app.listen(PORT, () => console.log(`Notes App Listening on Port: ${PORT}`));

dbConnect();

