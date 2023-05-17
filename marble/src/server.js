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

app.post('/marble/init', (req, res) => {
    let config;
    if (!fs.existsSync(`${defaultAssetsPath}/registered-components.json`)) {
        const emptyConfig = JSON.stringify({});
        fs.writeFileSync(`${defaultAssetsPath}/registered-components.json`, emptyConfig);
        config = {};
    } else {
        config = fs.readFileSync(`${defaultAssetsPath}/registered-components.json`);
    }

    res.send(config);
});

app.get('/marble', (req, res) => {
    const componentKey = req.query.componentKey;
    const uniqueKey = req.query.uniqueKey;
    try {
        const config = fs.readFileSync(`${defaultAssetsPath}/${componentKey}.json`);
        return res.send(config);
    } catch (error) {
        return res.send({
            message: `Error ocurred while reading file : ${defaultAssetsPath}/${componentKey}.json`,
            error
        });
    }
});

app.post('/marble', (req, res) => {
    const componentKey = req.query.componentKey;
    const body = JSON.stringify(req.body);

    fs.writeFileSync(`${defaultAssetsPath}/${componentKey}.json`, body);

    res.send({ message: 'success' });
});

app.post('/marble/register', (req, res) => {
    const componentKey = req.body.componentKey;

    let components = {};

    if (fs.existsSync(`${defaultAssetsPath}/registered-components.json`)) {
        components = JSON.parse(fs.readFileSync(`${defaultAssetsPath}/registered-components.json`));
    }

    components[componentKey] = true;

    console.log(components);

    fs.writeFileSync(`${defaultAssetsPath}/registered-components.json`, JSON.stringify(components));

    res.send({ message: 'success' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
