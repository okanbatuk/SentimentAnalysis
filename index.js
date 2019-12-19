const express = require('express')
const bodyParser = require("body-parser");
const port = process.env.PORT||3000

var cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verifyToken = require('./middleware/verifyToken');

const jwtConfig = require ('./config/jwtConfig');
app.set('api_key', jwtConfig.api_key);

app.use('/api/',verifyToken);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})