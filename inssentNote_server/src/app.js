const { db } = require('./database/database');
const server = require('./index')

db.sync({force: false}).then(() => {
    server.listen(3000, () => {
        console.log('listen on port 3000');
    });
})
.catch(err => console.log(err))