const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 9000;

const defaultAssetsPath = 'src/assets/marble';

if (fs.existsSync(defaultAssetsPath) && !fs.lstatSync(defaultAssetsPath)?.isDirectory()) {
    throw new Error('please remove marble file from assets, name is reserved for marble folder');
}

if (!fs.existsSync(defaultAssetsPath)) {
    fs.mkdirSync(defaultAssetsPath);
}

app.get('/marble', (req, res) => {
    const key = req.query.key;
    try {
        const config = fs.readFileSync(`${defaultAssetsPath}/${key}.json`);
        return res.send(config);
    } catch (error) {
        return res.send({
            message: `Error ocurred while reading file : ${defaultAssetsPath}/${key}.json`,
            error
        });
    }
});

app.post('/marble', (req, res) => {
    const key = req.query.key;
    const body = JSON.stringify(req.body);

    fs.writeFileSync(`${defaultAssetsPath}/${key}.json`, body);

    res.send({ message: 'success' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
