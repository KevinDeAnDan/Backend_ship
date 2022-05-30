const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const port = 3000
const userRoute = require("./routes/user");
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL,() => {
    console.log("Connect to mongosedb");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen(port, () => 
    console.log(`At http://localhost:${port}`));
