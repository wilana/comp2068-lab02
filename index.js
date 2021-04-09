require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// setup mongoose
const mongoose = require('mongoose');
mongoose.connect(
  process.env.DB_URI,
  {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)
.catch(error => console.error(error));

// requiring our routes
const routes = require('./routes');
const router = routes(express.Router());
app.use(router);

// adding error handling
const { handle404s, errorHandler } = require('./errorHandling');
app.use(handle404s);
app.use(errorHandler);

app.listen(
    process.env.PORT,
    () => console.log(`Listening on port ${process.env.PORT}`)
  );
