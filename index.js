const express = require('express');
const path = require('path');
const angularConfig = require('./angular.json');

const app = express();

const projectConfig = angularConfig.projects['fe-discs'];

const basePath = projectConfig.architect.build.options.baseHref;
const outputPath = 'dist/browser';

const buildPath = '/' + outputPath.replace(/^\/+/, '');
const indexFile = 'index.html';
const indexFilePath = buildPath + '/' + indexFile;

// Ruta base para los archivos estaticos
app.use(basePath, express.static(__dirname + buildPath));

// Redirigir la ruta raiz al index.html
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname + indexFilePath));
});

// Redirigir todas las rutas no manejadas al index.html
app.get(basePath + '*', (req, res) => {
    res.sendFile(path.join(__dirname + indexFilePath));
});

const PORT = process.env.PORT || projectConfig.architect.serve.options.port;
const PATH = basePath;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}${PATH}`);
});