const API_URL = import.meta.env.VITE_API_URL;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

async function uploadThroughApi(file, token) {
  const data = new FormData();
  data.append('image', file);
  const response = await fetch(API_URL + '/api/upload', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: data,
  });
  if (!response.ok) throw new Error('No se pudo subir la imagen');
  const result = await response.json();
  if (!result.url) throw new Error('La imagen no devolvió una URL');
  return result.url;
}

export async function uploadImage(file) {
  if (!file || !file.type.startsWith('image/') || file.size > MAX_IMAGE_BYTES) {
    throw new Error('Elegí una imagen de hasta 5 MB');
  }

  const token = localStorage.getItem('token');
  const signatureResponse = await fetch(API_URL + '/api/upload/signature', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
  });

  // Keep uploads working while the current DigitalOcean API is still live.
  if (signatureResponse.status === 404) return uploadThroughApi(file, token);
  if (!signatureResponse.ok) throw new Error('No se pudo autorizar la carga');
  const { cloudName, apiKey, timestamp, folder, signature } = await signatureResponse.json();

  const data = new FormData();
  data.append('file', file);
  data.append('api_key', apiKey);
  data.append('timestamp', String(timestamp));
  data.append('folder', folder);
  data.append('signature', signature);

  const uploadResponse = await fetch(
    'https://api.cloudinary.com/v1_1/' + encodeURIComponent(cloudName) + '/image/upload',
    { method: 'POST', body: data },
  );
  if (!uploadResponse.ok) throw new Error('No se pudo subir la imagen');
  const result = await uploadResponse.json();
  if (!result.secure_url) throw new Error('La imagen no devolvió una URL segura');
  return result.secure_url;
}
