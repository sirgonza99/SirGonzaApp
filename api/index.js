const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env
const serverless=require("serverless-http")

// Syncing all the models at once.
conn.sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada con Neon");
    
  // server.listen(PORT, () => {
  //   console.log(`Server listening at ${PORT}`);
  // });
  })
  .catch((err)=>{
    console.log("Error al sincronizar la bbdd: ",err);
  })

  module.exports=serverless(server); 