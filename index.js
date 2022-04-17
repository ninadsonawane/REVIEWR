import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import dotenv from "dotenv";
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit:"30mb" , extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb" , extended: true }));
app.use(cors());

app.use('/reviews' , routes);
app.use('/user' , userRoutes);

 
const PORT = process.env.PORT || 8000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
app.listen( PORT, () => {
    console.log(`${PORT}`);
});
mongoose.set('useFindAndModify' , false);
