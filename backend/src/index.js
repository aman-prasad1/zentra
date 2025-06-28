import { connectDB } from './db/index.js';
import { app } from './app.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});


connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection Failed !!!");
})