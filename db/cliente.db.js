// const {Pool} = require('pg');
// const conectiondb = new Pool();


// module.exports = {
//     conectiondb
// }

// require('dotenv').config(); 

// const { Pool } = require('pg');

// const conectiondb = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });

// console.log("🔄 Conectando a la base de datos:", process.env.PGDATABASE, process.env.PGHOST);

// module.exports = { conectiondb };


require('dotenv').config(); 

const { Pool } = require('pg');

const conectiondb = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

console.log("🔄 Conectando a la base de datos:", process.env.PGDATABASE, process.env.PGHOST);






const {MongoClient} = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
 






module.exports = {
  client , conectiondb
};