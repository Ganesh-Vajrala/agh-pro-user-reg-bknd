import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/index.js';

dotenv.config({path:"./.env"})
const PORT = process.env.PORT || 5100;

connectDB()
.then(() => {
    app.listen(PORT, () => {console.log(`running on port ${PORT}`)});
})
.catch((error) => {
    console.log("DB Error Occured", error);
})

