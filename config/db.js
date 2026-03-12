import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const DB_OPTIONS = {
            dbName : process.env.DB_NAME || "company",
        };
        const DATABASE_URL = process.env.MONGO_URI || "mongodb+srv://admin1234:admin1234@cluster0.w7w41zg.mongodb.net/";
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('DataBase Connected Successfully')
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
};
export default connectDB;
