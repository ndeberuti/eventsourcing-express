const sql = require("mssql");

const getAccountBalanceController = async (req, res, next) => {
    try {
        console.log('AccountId: ', req.params.id);
        
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
           const query = !req.query.date ? 
           `select * from events where accountId = ${req.params.id}` :
           `select * from events where accountId = ${req.params.id} AND timestamp < 
           '${new Date(req.query.date * 1000).toISOString().slice(0, 19).replace('T', ' ')}'`;

            
            request.query(query, function (err, recordset) {
                
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
}
  