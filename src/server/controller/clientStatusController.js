const sql = require("mssql");

const clientMigrationStatusController = async (req, res, next) => {
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
            request.query(`select top 1 status from events where clientId = ${req.params.id} and eventType = 'MIGRATION' order by timestamp desc`, function (err, recordset) {
                
                if (err) console.log(err);
        
                // send normalized records as a response
                res.send(processClientStatus(recordset));
             });
        });
     
    } catch (error) {
      next(error);
    }
  }

const processClientStatus = (recordset) => {
    return recordset.recordset[0];
}

module.exports={
    clientMigrationStatusController
  }
  