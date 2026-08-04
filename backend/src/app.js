require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const loginRoutes = require('./routes/login.routes');
const testRoutes = require('./routes/test.routes');
const citasRoutes = require('./routes/citas.routes');
const areasRoutes = require('./routes/areas.routes');
const disponibilidadRoutes = require('./routes/disponibilidad.routes');

const app = express();

// conexión MySQL
require('./config/db');

// middlewares
app.use(cors());
app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, '../../frontend')
    )
);

// rutas
app.use('/api', testRoutes);
app.use('/api', loginRoutes);
app.use('/api', citasRoutes);
app.use('/api', areasRoutes);
app.use('/api/disponibilidad', disponibilidadRoutes);

// puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});