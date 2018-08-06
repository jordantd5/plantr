const db = require('./models');

db.sync({force: true})
.then(() => {
  console.log('Database synced!')
  db.close()
})
.catch(err => {
  console.log('Disaster! Something went wrong!')
  consol.log(err);
  db.close()
})
