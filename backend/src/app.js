require('dotenv').config();

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const path = require('path');

const loginRoutes = require('./routes/login.routes');
const testRoutes = require('./routes/test.routes');
const citasRoutes = require('./routes/citas.routes');
const areasRoutes = require('./routes/areas.routes');
const disponibilidadRoutes = require('./routes/disponibilidad.routes');
const materialesRoutes = require('./routes/materiales.routes');
const googleCalendarRoutes = require('./routes/google-calendar.routes');
const notificacionesRoutes = require('./routes/notificaciones.routes');
const preguntasBotRoutes = require('./routes/preguntas-bot.routes');
const chatbotRoutes = require('./routes/chatbot.routes');

const app = express();

// conexión MySQL
require('./config/db');

// middlewares
app.use(cors({
    exposedHeaders: ['Content-Disposition']
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../../frontend/pages/login.html')
    );
});

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
app.use('/api/materiales', materialesRoutes);
app.use('/api/google-calendar', googleCalendarRoutes);
app.use('/api', notificacionesRoutes);
app.use('/api', preguntasBotRoutes);
app.use('/api', chatbotRoutes);

// puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});