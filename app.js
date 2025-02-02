require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./connectToDatabase');

// routes
const currencyRouter = require('./routes/currency.route');
const exchangeRateRouter = require('./routes/exchangeRate.router');
const userRouter = require('./routes/user.route');

const app = express();
app.use(express.json());

app.use('/api/v1/currencies', currencyRouter);
app.use('/api/v1/exchangerates', exchangeRateRouter);
app.use('/api/v1/users', userRouter);

connectToDatabase();

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`App listening on port ${port}!`));
