import express from "express"
import taskRoute from './routes/tasksRouters.js'
import { connectDB } from "./config/db.js"
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config();
const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

app.use('/api/tasks', taskRoute)

connectDB().then(() => {
    app.listen(5000, () => {
        console.log(`server đang chạy trên cổng ${PORT}`);

    })
})