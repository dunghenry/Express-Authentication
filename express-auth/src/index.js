const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const createError = require('http-errors');
dotenv.config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logEvents = require('./helpers/logEvents');
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const connectDB = require('./config/connectDB');
// require('./config/connect'); //test connectDB 
require('./config/connectMultipleDB');
const routes = require('./routes');
const app = express();
//app use package
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(helmet());
//connectDB
connectDB();
//Use routes and test
// app.get("/", async (req, res) => {
//     try {
//         console.log(a);
//        res.status(200).json({message: "Success!"});
//     } catch (error) {
//         const txt = 'D:\\Express-Authentication\\express-auth\\'
//         console.log(module.filename.slice(txt.length))
    //    Test logEvents errors
//        await logEvents(error.message, module.filename);
//    }
// })
app.use('/api/v1', routes);
//app listen on port
app.listen(port, () => console.log("App started on http://localhost:" + port));