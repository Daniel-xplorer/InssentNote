const { db } = require('./database/database');
const server = require('./index')

//conenexion de la base de datos de forma asincrinica (necesario)
db.sync({force: false}).then(() => {//force false para guardar los datos permanentemente en psql
    server.listen(3000, () => {
        console.log('listen on port 3000');
    });
})
.catch(err => console.log(err))//(manejo de errores necesario)