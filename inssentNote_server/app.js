const { db } = require('./src/database/database');
const server = require('./src/index')

db.sync({force: true}).then(() => {
    server.listen(3000, () => {
        console.log('listen on port 3000');
    });
})
.catch(err => console.log(err))