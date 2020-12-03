const express = require('express');

const app = express();
app.use(express.json());

app.get('/repositories', (req, res) => {
    return res.json({"Response": "Hello world"});
});

app.listen(3333, () => {
    console.log('Started server');
});