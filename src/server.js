const express = require('express');
const router = require('./routes')

const app = express();

app.use(express.static('src/public'));
app.use(router)

app.listen(3000, () => console.log('App na porta 3000'));