require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db/connectDB')
const morgan = require('morgan')
const router = require('./routes/index')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// connect to database
let db = connectDB();
// middleware
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));
// routes
router(app)
// listen to port
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))