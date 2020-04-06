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

app.listen(port);
