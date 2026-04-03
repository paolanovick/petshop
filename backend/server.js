require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Conectar DB y seed de categorías
const { seedIfEmpty } = require('./controllers/categoryController');
connectDB().then(() => seedIfEmpty());

// Middlewares
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (ej: Postman, curl en dev)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS: origen no permitido'));
  },
  credentials: true,
}));
app.use(express.json());


// Ruta base
app.get("/", (req, res) => {
  res.json({
    message: "🐾 Pet Shop Vagabundo API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      appointments: "/api/appointments",
      friends: "/api/friends",
      advertisements: "/api/advertisements", // ← AGREGAR
      admin: "/api/admin/login",
    },
  });
});

// Rutas
app.use("/api/upload", require("./routes/upload"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/advertisements", require("./routes/advertisements"));
app.use('/api/shipping-config', require('./routes/shippingConfig'));// ← ACÁ
app.use("/api/admin", require("./routes/admin"));

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});