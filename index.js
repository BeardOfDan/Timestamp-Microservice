const express = require('express');
const app = express();

const path = require('path');
const moment = require('moment')

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.status(200).sendFile(__dirname + 'public/index.html');
});

app.get('/:time', (req, res, next) => {
  const time = req.params.time;
  const result = { 'unix': null, 'natural': null };

  const unix = moment.unix(time);
  const natural = moment(time, ['MMMM DD, YYYY', 'MMMM D, YYYY']);

  if (unix.isValid()) {
    result.unix = unix.unix();
    result.natural = unix.utc().format('MMMM D, YYYY').toString();
  } else if (natural.isValid()) {
    result.unix = natural.unix();
    result.natural = natural.format('MMMM D, YYYY').toString();
  }

  res.send(result);
});

app.listen(PORT, () => {
  console.log('Now Listening on port ' + PORT);
});
