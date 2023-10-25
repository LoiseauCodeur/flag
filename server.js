const express = require('express');
const path = require('path');
const app = express();
const port = 1000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Serveur web Node.js lancé sur le port ${port}, ou rendez vous surlocalhost ${port}`);
});
