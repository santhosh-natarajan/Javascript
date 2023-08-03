const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const router = require('./router/router');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/v1',router);

app.listen(port, () => {
    console.log(`Billing server running on ${port}`)
})