const express = require('express');
const app = express();
const port = 3000;

app.get('/clientStatus/:id', clientStatusController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});