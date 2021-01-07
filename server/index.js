require('./common/env');
const db = require('./dbconnection');
const routes = require ('./routes');
const Server = require('./common/server');
const populateDb = require('./models/init');
//const Express = require ('express');


let server = null;

async function run()
{
    const s = await db.connect();
    console.log('connected to ' + s);
    await populateDb();
    console.log('Running...');
    server = new Server().router(routes).listen(process.env.PORT);
}

run().catch((err) => {
    console.log(err.stack);
    process.exit(1);
  });