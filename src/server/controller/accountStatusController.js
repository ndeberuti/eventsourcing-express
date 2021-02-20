const sql = require("mssql");

const getAccountBalanceController = async (req, res, next) => {
    try {
        console.log('ClientId: ', req.params.id)
        // config for your database
        const config = {
            user: 'sa',
            password: '',
            server: 'localhost', 
            database: 'eventSourcingDB' 
        };
    
        // connect to your database
        sql.connect(config, function(err) {
            if (err) console.log(err);
    
            // create Request object
            const request = new sql.Request();
               
            // query to the database and get the records
            request.query(`select * from events where accountId = ${req.params.id}`, function (err, recordset) {
                
                if (err) console.log(err);
        
                // send normalized records as a response
                const accountBalance = processAccountBalance(recordset);
                // TODO add snapshot
                res.send(accountBalance);
             });
        });
     
    } catch (error) {
      next(error);
    }
  }

const processAccountBalance = (recordset) => {
    const balance = recordset.recordset
    .map(record => record.eventType === 'CREDIT' ? +record.amount : -record.amount)
    .reduce((a,b) => a + b);

    return { balance }
}

module.exports={
  getAccountBalanceController
  // TODO add getAccountBalanceOnSpecificDate
}
  