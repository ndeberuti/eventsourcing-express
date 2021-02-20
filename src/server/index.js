const express = require('express');
const { getAccountBalanceController } = require('./controller/accountStatusController');
const app = express();
const port = 3000;


app.get('/getAccountBalance/:id', getAccountBalanceController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});