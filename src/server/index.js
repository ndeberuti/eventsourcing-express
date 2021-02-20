const express = require('express');
const { clientMigrationStatus } = require('./controller/clientStatusController');
const app = express();
const port = 3000;


app.get('/clientMigrationStatus/:id', clientMigrationStatus);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});