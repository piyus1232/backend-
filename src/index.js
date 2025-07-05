// index.js
import {app} from "./app.js";
import express from 'express'
import dotenv from 'dotenv';
import connectdb from './db/database.js'; // ✅ use file path and extension
dotenv.config({ path: './env' });
// const app = express()
// console.log(process.env.PORT);

connectdb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

