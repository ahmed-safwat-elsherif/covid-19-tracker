const express = require('express');
const app = express();
require('./db-connect');

const users = require('./routes/users')
const countries = require('./routes/countries')

app.use(express.static('public'))



app.use(express.json());

app.use((req, res, next) => {
    const timeNow = new Date();
    console.log({ method: req.method, timeNow, URL: req.url });
    next();
})
//----------------------------------------------------------------------------------------------------


app.use('/api/users', users)
app.use('/api/countries', countries)
//----------------------------------------------------------------------------------------------------

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Server is listening on: http://localhost:${port}`)
})

