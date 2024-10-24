const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

const routerApi = require('./routes');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Para datos form-data, usa multer
const multer = require('multer');
const upload = multer();
app.use(upload.none());

routerApi(app);
// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});