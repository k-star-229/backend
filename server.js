const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routers/router');
const cors = require('cors')

const app = express();

// Init Middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
