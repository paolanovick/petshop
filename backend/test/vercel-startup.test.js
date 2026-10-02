const assert = require('node:assert/strict');
const { once } = require('node:events');
const test = require('node:test');

test('the Vercel export waits for MongoDB and reports an unavailable database', { timeout: 45000 }, async () => {
  process.env.VERCEL = '1';
  delete process.env.MONGODB_URI;
  const app = require('../server');
  assert.equal(typeof app, 'function');

  const server = app.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const response = await fetch('http://127.0.0.1:' + server.address().port + '/api/products', {
      signal: AbortSignal.timeout(15000),
    });
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { message: 'Servicio temporalmente no disponible' });
  } finally {
    server.closeAllConnections();
    server.close();
  }
});
