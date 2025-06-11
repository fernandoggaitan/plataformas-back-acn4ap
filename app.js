const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 8888;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


//Iniciamos el servidor.
app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}`);
});

app.get('/',  (req, res) => {
    res.send('Bienvenida/o a mi sitio web');
});

//Request (Petición)
//Response (Respuesta)
const bcrypt = require("bcrypt");

app.get('/test', async(req, res) => {

    const contrasena = "1234";
    const contrasena_hash = await bcrypt.hash(contrasena, 10);

    res.send(contrasena_hash);

    //res.send('Ésta es una página de test 4');
});

app.get('/saludar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.send(`Hola, ${nombre}`);
});

app.use(require('./src/routes/eventoRoutes'));
app.use(require('./src/routes/usuarioRoutes'));

app.use((req, res, next) => {
    res.status(404);
    res.send(`
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/">Volver a la página de inicio</a>
    `);
});