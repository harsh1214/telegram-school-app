import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import sequelize from "./config/db.js";
import { router } from "./routes/User.js";
const port = 3000;


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(router);
// app.use('/user', User);

sequelize.sync({ 
    alter: true 
}).then(() => {
    console.log("Tables created.");
}).catch((err) => {
    console.log(err);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
