import express from 'express';
import path from 'path';
import messenger from './src/messenger.js';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(path.resolve(), 'static')));
app.use(express.json());

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

app.listen(port);
