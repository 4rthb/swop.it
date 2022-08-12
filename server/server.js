const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.json({"users": ["one", "two", "three", "five"]});
});

app.listen(5000, () => console.log(`Listening on port ${5000}`));