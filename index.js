const express = require('express');
const app = express();

const path = require('path');

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.status(200).sendFile(__dirname + 'public/index.html');
});

app.listen(PORT, () => {
  console.log('Now Listening on port ' + PORT);
});
