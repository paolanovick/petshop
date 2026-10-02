require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { seedIfEmpty } = require("./controllers/categoryController");

const app = express();

app.use(cors());
app.use(express.json());

// Vercel starts a new function instance as needed. Wait for MongoDB before
// handling a request so a cold start cannot race the database connection.
app.use((req, res, next) => {
  connectDB().then(() => next()).catch((error) => {
    console.error('MongoDB unavailable:', error.name, [...(error.reason?.servers?.values() || [])].map((server) => server.error?.code || server.error?.cause?.code || server.error?.name || 'unknown').join(','));
    res.status(503).json({ message: 'Servicio temporalmente no disponible' });
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "🐾 Pet Shop Vagabundo API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      appointments: "/api/appointments",
      friends: "/api/friends",
      advertisements: "/api/advertisements",
      admin: "/api/admin/login",
    },
  });
});

app.use("/api/upload", require("./routes/upload"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/advertisements", require("./routes/advertisements"));
app.use("/api/shipping-config", require("./routes/shippingConfig"));
app.use("/api/admin", require("./routes/admin"));

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

if (!process.env.VERCEL && require.main === module) {
  connectDB()
    .then(() => seedIfEmpty())
    .then(() => {
      const port = process.env.PORT || 5001;
      app.listen(port, () => console.log('Pet Shop Vagabundo API listening on port ' + port));
    })
    .catch((error) => {
      console.error('Could not start API:', error.name);
      process.exitCode = 1;
    });
}

module.exports = app;
