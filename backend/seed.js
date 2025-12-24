require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: "Alimento Premium Dog Chow 15kg",
    description: "Alimento balanceado para perros adultos de todas las razas",
    price: 25000,
    stock: 50,
    category: "alimentos",
    images: [
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&crop=left"
    ],
    destacado: true
  },
  {
    name: "Collar Reflectivo Ajustable",
    description: "Collar reflectivo de nylon resistente, ajustable para perros medianos y grandes",
    price: 4500,
    stock: 30,
    category: "accesorios",
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400"
    ],
    destacado: false
  },
  {
    name: "Juguete Kong Dental",
    description: "Juguete interactivo de goma natural para limpieza dental",
    price: 6000,
    stock: 25,
    category: "juguetes",
    images: [
      "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400"
    ],
    destacado: true
  },
  {
    name: "Cama Ortopédica Grande",
    description: "Cama ortopédica con espuma viscoelástica para perros grandes",
    price: 18000,
    stock: 15,
    category: "accesorios",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&crop=top"
    ],
    destacado: true
  },
  {
    name: "Alimento Royal Canin 10kg",
    description: "Alimento premium para perros adultos con ingredientes de alta calidad",
    price: 32000,
    stock: 40,
    category: "alimentos",
    images: [
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400"
    ],
    destacado: false
  },
  {
    name: "Correa Extensible 5m",
    description: "Correa retráctil automática con freno y bloqueo",
    price: 5500,
    stock: 35,
    category: "accesorios",
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400"
    ],
    destacado: false
  },
  {
    name: "Pelota con Sonido",
    description: "Pelota de goma con sonido incorporado para estimular el juego",
    price: 3000,
    stock: 60,
    category: "juguetes",
    images: [
      "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400"
    ],
    destacado: true
  },
  {
    name: "Casa de Transporte",
    description: "Transportadora plástica resistente con puerta metálica",
    price: 15000,
    stock: 20,
    category: "accesorios",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400"
    ],
    destacado: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    await Product.deleteMany({});
    console.log('🗑️ Productos anteriores eliminados');

    await Product.insertMany(products);
    console.log('✅ Productos creados exitosamente');

    mongoose.connection.close();
    console.log('👋 Conexión cerrada');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDB();