export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch('https://n8n.triptest.com.ar/webhook/81599eda-7a96-431f-b073-d33f2e5695cf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return { success: true, message: '¡Suscripción exitosa! Revisa tu email.' };
    } else {
      return { success: false, message: 'Hubo un error. Intentá de nuevo.' };
    }
  } catch (error) {
    console.error('Error al suscribirse:', error);
    return { success: false, message: 'Error de conexión. Intentá más tarde.' };
  }
};