# Mover la API de Vagabundo a Vercel

La web actual de Vercel usa VITE_API_URL=https://api.vagabundo.com.ar.
Mantener el dominio de API evita cambiar esa variable. La web sí debe
redesplegarse para usar la carga directa de imágenes a Cloudinary.

1. Crear un segundo proyecto Vercel conectado a este repositorio, con
   Root Directory = backend. La API Express se exporta desde server.js.
2. Configurar en ese proyecto MONGODB_URI, ADMIN_EMAIL,
   ADMIN_PASSWORD y JWT_SECRET. Para cargas de imágenes, agregar
   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.
   Configurar N8N_WEBHOOK_TURNO si se usa el aviso de turnos. Nunca copiar
   valores al repositorio ni a los logs.
3. Comprobar que MongoDB acepte conexiones desde las funciones de Vercel.
   El backend actual utiliza un MongoDB externo y Cloudinary; conservar
   los mismos datos durante la migración.
4. Desplegar la web actualizada en preview y probar la carga firmada directa
   a Cloudinary. Las imágenes de 5 MB exceden el límite de 4,5 MB por solicitud
   de Vercel Functions; el navegador las envía directamente a Cloudinary.
   La web usa la carga antigua si la API todavía no tiene la ruta de firma.
5. Desplegar una URL de prueba de la API y verificar /, /api/products,
   /api/categories, /api/appointments/availability y
   /api/shipping-config. Probar también login, edición, turnos y carga
   de imágenes con cuentas de prueba antes de cambiar el dominio.
6. Asociar api.vagabundo.com.ar al proyecto Vercel y cambiar el DNS.
   Comprobar desde varios resolvers que ya no apunta al droplet. Mantener
   el proceso de DigitalOcean como respaldo hasta confirmar la nueva API.
7. Solo después detener petshop-api, retirar el sitio Nginx de esa API
   y actualizar el monitor de TravelSuite. Conservar una copia verificable
   del repositorio y la configuración para rollback, y medir el ahorro real
   de RAM.

La web y el backend son proyectos separados porque la web tiene su propio
frontend/vercel.json para rutas de React.
