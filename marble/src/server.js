const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 9000;

app.get('/', (req, res) => {});

app.post('/', (req, res) => {});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
