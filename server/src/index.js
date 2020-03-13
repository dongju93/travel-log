const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// after dotenv installed, make ".env" file that all config date will stored
require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const app = express();

// message style log
app.use(morgan('common'));
// for secure app
app.use(helmet());
// prevent same origin cross
app.use(cors({
   origin: process.env.CORS_ORIGIN,
}));
// body-parsing middleware only for json
app.use(express.json());

app.get('/', (req, res) => {
   res.json({
      message: 'Hello World!',
   });
});

app.use('/api/logs', logs);

// import from middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
   console.log(`Listening at http://localhost:${port}`)
});
