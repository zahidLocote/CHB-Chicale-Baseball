export async function registrarPartido(data) {
  try {
    const response = await fetch('api/partido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    return await response.json(); // devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error en registrarPartido:', error);
    throw error;
  }
}
