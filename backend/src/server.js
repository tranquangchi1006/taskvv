import express from "express"
import taskRoute from './routes/tasksRouters.js'
import { connectDB } from "./config/db.js"
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from "mongoose"


// dotenv.config();
// dotenv.config({ path: "./.env" });
const app = express()
// const PORT = process.env.PORT || 5000

// ---- CẤU HÌNH TRỰC TIẾP TẠI ĐÂY ----
const MONGO_URI = "mongodb://quangchi1006:quangchi1006@45.77.45.202:27017/taskvv";
const PORT = 5000;

app.use(express.json())
app.use(cors())

app.use('/api/tasks', taskRoute)

// connectDB().then(() => {
//     app.listen(5000, () => {
//         console.log(`server đang chạy trên cổng ${PORT}`);

//     })
// })
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Kết nối MongoDB thành công");

        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Kết nối DB thất bại:", err);
        process.exit(1);
    });