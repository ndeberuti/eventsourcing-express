const sql = require("mssql");

const clientStatusController = async (req, res, next) => {
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
        sql.connect(config, function (err) {
            
            if (err) console.log(err);
    
            // create Request object
            const request = new sql.Request();
               
            // query to the database and get the records
            request.query(`select * from events where clientId = ${req.params.id}`, function (err, recordset) {
                
                if (err) console.log(err);
    
                // send records as a response
                res.send(processClientStatus(recordset));
                
            });
        });
  
     
    } catch (error) {
      next(error);
    }
  }

const processClientStatus = (recordset) => {
    return recordset.recordset.filter(record => record.eventType = 'MIGRATION').reduce((a,b) => (a.timestamp > b.timestamp ? a : b)).status;
}
module.exports={
    clientStatusController
  }
  