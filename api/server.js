const express = require('express');
const path = require('path');
const angularConfig = require('../angular.json');

const app = express();

const basePath = angularConfig.projects['fe-discs'].architect.build.options.baseHref;
const outputPath = angularConfig.projects['fe-discs'].architect.build.options.outputPath;

const buildPath = '/' + outputPath;

const indexFile = 'index.html';
const indexFilePath = buildPath + '/' + indexFile;

// Ruta base para los archivos estaticos
app.use(basePath, express.static(path.join(__dirname, '..', buildPath)));

// Redirigir la ruta raiz al index.html
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '..', indexFilePath));
});

// Redirigir todas las rutas no manejadas al index.html
app.get(basePath + '*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', indexFilePath));
});

const PORT = process.env.PORT || angularConfig.projects['fe-discs'].architect.serve.options.port;
const PATH = basePath;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}${PATH}`);
});