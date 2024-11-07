import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Configura la conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Define tus rutas
app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor!');
});

const PORT = 5012;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
