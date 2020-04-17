import express from 'express';
import path from 'path';
import messenger from './src/messenger.js';
import getGoose from './src/goose.js';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(path.resolve(), 'static')));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/msg', async (req, res) => {
  messenger.addMessage(req.body.name, req.body.message);
  res.json('TBD');
});

app.get('/msg', async (req, res) => {
  if(req.query.since) {
    res.json(messenger.getLastMessagesSince(req.query.since));
  } else {
    res.json(messenger.getLastMessages(10));
  }
});

app.get('/goose', async (req, res) => {
  res.json(getGoose());
});

app.get('/deposits', async (req, res) => {
  res.json([
    {
        "id": "1",
        "deposit": "Пополняй (6-12 мес)",
        "currency": "RUB",
        "income": "3.5",
        "minTerm": "6",
        "maxTerm": "12",
        "minSumm": "100000",
        "maxSumm": ""
    },
    {
        "id": "2",
        "deposit": "Пополняй (1-2 года)",
        "currency": "RUB",
        "income": "3.85",
        "minTerm": "12",
        "maxTerm": "24",
        "minSumm": "100000",
        "maxSumm": ""
    },
    {
        "id": "3",
        "deposit": "Пополняй (2-3 года)",
        "currency": "RUB",
        "income": "4",
        "minTerm": "24",
        "maxTerm": "36",
        "minSumm": "100000",
        "maxSumm": ""
    },
    {
        "id": "4",
        "deposit": "Пополняй (3 года)",
        "currency": "RUB",
        "income": "4.15",
        "minTerm": "36",
        "maxTerm": "",
        "minSumm": "100000",
        "maxSumm": ""
    },
    {
        "id": "5",
        "deposit": "Пополняй + (6-12 мес)",
        "currency": "RUB",
        "income": "3.75",
        "minTerm": "6",
        "maxTerm": "12",
        "minSumm": "400000",
        "maxSumm": ""
    },
    {
        "id": "6",
        "deposit": "Пополняй + (1-2 года)",
        "currency": "RUB",
        "income": "4",
        "minTerm": "12",
        "maxTerm": "24",
        "minSumm": "400000",
        "maxSumm": ""
    },
    {
        "id": "7",
        "deposit": "Пополняй + (2-3 года)",
        "currency": "RUB",
        "income": "4.15",
        "minTerm": "24",
        "maxTerm": "36",
        "minSumm": "400000",
        "maxSumm": ""
    },
    {
        "id": "8",
        "deposit": "Пополняй + (3 года)",
        "currency": "RUB",
        "income": "4.3",
        "minTerm": "36",
        "maxTerm": "",
        "minSumm": "400000",
        "maxSumm": ""
    }
]);
});



app.listen(port);
