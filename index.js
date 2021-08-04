import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit:"30mb" , extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb" , extended: true }));
app.use(cors());

app.use('/reviews' , routes);
 


app.get('/' , (req , res) =>  { 
    res.send("connected");
});
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
app.listen( process.env.PORT, () => {
    console.log('Server is listening on port 5000');
});
mongoose.set('useFindAndModify' , false);
