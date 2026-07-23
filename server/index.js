import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const CULQI_SECRET_KEY = process.env.CULQI_SECRET_KEY;
const CULQI_PUBLIC_KEY = process.env.CULQI_PUBLIC_KEY;

function culqiRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.culqi.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${CULQI_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    if (data) options.headers['Content-Length'] = Buffer.byteLength(data);

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(responseBody) });
        } catch {
          resolve({ status: res.statusCode, data: responseBody });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

app.get('/api/config', (_req, res) => {
  res.json({ publicKey: CULQI_PUBLIC_KEY });
});

app.post('/api/create-charge', async (req, res) => {
  try {
    const { token_id, amount, email, name, description } = req.body;

    if (!token_id || !amount || !email) {
      return res.status(400).json({ error: 'Faltan campos requeridos: token_id, amount, email' });
    }

    const chargeData = {
      amount,
      currency_code: 'PEN',
      email,
      description: description || 'Donación - Sembrando Huellas Perú',
      token_id,
      metadata: { name: name || '' },
    };

    const result = await culqiRequest('/v1/charges', 'POST', chargeData);

    if (result.status >= 400) {
      return res.status(result.status).json({
        error: result.data?.user_message || result.data?.merchant_message || 'Error al procesar el pago',
        details: result.data,
      });
    }

    res.json({ success: true, charge: result.data });
  } catch (err) {
    console.error('Charge error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/create-customer', async (req, res) => {
  try {
    const { email, name } = req.body;
    const result = await culqiRequest('/v1/customers', 'POST', { email, first_name: name });
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

app.listen(PORT, () => {
  console.log(`\n  Servidor Culqi corriendo en http://localhost:${PORT}`);
  console.log(`  Public Key: ${CULQI_PUBLIC_KEY ? 'Configurada' : 'FALTA - Agrega CULQI_PUBLIC_KEY en .env'}`);
  console.log(`  Secret Key: ${CULQI_SECRET_KEY ? 'Configurada' : 'FALTA - Agrega CULQI_SECRET_KEY en .env'}\n`);
});
