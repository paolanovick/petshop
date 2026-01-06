require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Conectar DB
connectDB();

// Middlewares
app.use(cors());
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
app.use("/api/products", require("./routes/products"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/advertisements", require("./routes/advertisements")); // ← ACÁ
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