import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log('kết nối db thành công');
    } catch (error) {
        console.log('kết nối db không thành công');
        console.log(error);
        process.exit(1)
    }

}