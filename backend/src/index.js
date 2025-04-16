const express = require('express');
const cors = require('cors');
//const morgan = require('morgan');
const { Sequelize } = require('sequelize');
const turnosRoutes = require('./routes/turnos');
const models = require('./models'); // Importa todos los modelos para que se sincronicen
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para logging
//app.use(morgan('dev'));

// Middleware para CORS y parsing JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log,  // Activa el logging de SQL
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Comprobación de la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    return sequelize.sync({ alter: true });  // Sincroniza los modelos - en dev usamos alter:true
  })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

// Routes
app.use('/api/turnos', turnosRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.json({ message: 'API del sistema de gestión de turnos' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Modo debug habilitado en puerto 9229`);
});

module.exports = { app, sequelize };