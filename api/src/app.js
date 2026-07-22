const express = require('express');
const routes= require('./routes/index.js');
const morgan=require('morgan');
const cookieParser=require("cookie-parser")
const server = express();

//para poder convertir los datos de las peticiones a json 
server.use(express.json());
//para ver en la consola lo que pasa con las peticiones
server.use(morgan('dev'));
server.use(cookieParser())

server.use((req, res, next) => {
    const origen = req.headers.origin;
    res.header('Access-Control-Allow-Origin',origen||'*' ); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes);


module.exports= server;