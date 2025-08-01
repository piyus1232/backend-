import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userrouter from "./routes/user.routes.js"
const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json()); 

app.use("/api/v1/users",userrouter)


app.use(express.json({
   limit:'16kb'
}))
app.use(express.urlencoded({
   limit:'16kb'
}))
app.use(express.static(
   "public"
))
app.use(cookieParser({
  
}))

export {app}