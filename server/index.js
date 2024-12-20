require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require("./routes/User");
const cookieParser = require('cookie-parser');
const port = 3000;

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/user', user);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
