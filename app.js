const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 8888;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Iniciamos el servidor.
app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}`);
});

app.get('/',  (req, res) => {
    res.send('Bienvenida/o a mi sitio web');
});

app.get('/test',  (req, res) => {
    res.send('Ésta es una página de test 2');
});

app.get('/saludar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.send(`Hola, ${nombre}`);
});

app.get('/eventos', async (req, res) => {

    const query = `
        SELECT id, nombre, descripcion, cupo
        FROM eventos
    `;
    try{
        [results] = await connection.query(query);
        res.json({ success: true, results });
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar los eventos' });
    }
});

app.use((req, res, next) => {
    res.status(404);
    res.send(`
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/">Volver a la página de inicio</a>
    `);
});