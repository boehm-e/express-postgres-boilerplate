import createServer	from  './config/server';
import dbConf		from  './config/db';
import app		from  './config/app';
import apiRoutes	from  './API/routes/index';

const port	=  process.env.port || 3000;
const server	= createServer(app, port);


// mount routes
app.use('/api', apiRoutes);

(async function main() {
    // await dbConf.initDB();
    server.listen(port);
    console.log('server listening on port ' + port);
})();
