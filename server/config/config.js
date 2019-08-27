// PUERTO
process.env.PORT = process.env.PORT || 3005;

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// BASE DE DATOS
let urlDB;
urlDB = process.env.NODE_ENV === 'local' ? 'mongodb://localhost:27017/unlz' : process.env.MONGO_URI;
process.env.URLDB = urlDB;

// TOKEN - AUTENTICACION
process.env.TOKEN_EXPIRATION_TIME = '2d';
process.env.SEED = process.env.SEED || 'la-clave-secreta-para-generar-token-unlz';