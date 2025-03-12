const express = require('express');
const path = require('path');
const angularConfig = require('./angular.json');

const app = express();

const baseHref = angularConfig.projects['fe-discs'].architect.build.options.baseHref;
const outputPath = angularConfig.projects['fe-discs'].architect.build.options.outputPath;

const buildPath = '/' + outputPath;

const indexFile = 'index.html';
const indexFilePath = buildPath + '/' + indexFile;

const basePath = baseHref.substring(0, baseHref.indexOf('/'));

const appPath = baseHref + '/**';

app.use(basePath, express.static(__dirname + buildPath)); // Para la ruta genera archivos estaticos

app.get(appPath, (req, res) => { // Al entrar en la ruta base
    res.sendFile(path.join(__dirname + indexFilePath));  // Retorna el index.html
});

const PORT = process.env.PORT || angularConfig.projects['fe-discs'].architect.serve.options.port;
const PATH = baseHref;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}${PATH}`);
});
