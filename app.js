import createServer	from  './config/server';
import dbConf		from  './config/db';
import redisConf	from  './config/redis';
import app		from  './config/app';
import apiRoutes	from  './API/index';

require('dotenv').config();

const port	= process.env.port || 3000;
const server	= createServer(app, port);

// mount routes
app.use('/api', apiRoutes);

dbConf.init(err => {
    if (err) throw err;

    redisConf.init(err =>  {
	if (err) throw err;

	server.listen(port);
	console.log('server listening on port ' + port);
    });
});

module.exports = app;
