import mongoose from "mongoose";

export const  connectDB = async () =>{
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food-del";

    try {
        await mongoose.connect(mongoUri);
        console.log("DB Connected");
    } catch (err) {
        console.error("DB Connection Failed:", err?.message || err);
        console.error(
            "Set MONGO_URI in backend/.env (e.g. mongodb://127.0.0.1:27017/food-del or your MongoDB Atlas URI)."
        );
        process.exit(1);
    }
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.