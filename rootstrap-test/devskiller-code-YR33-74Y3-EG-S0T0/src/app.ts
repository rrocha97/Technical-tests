import express from 'express';
import { PORT } from './config';
import { GetTheLatestCurrencies } from './utils';

// Create express server
const app: any = express();

app.get("/ping", (req: any, res: any) => {
  res.send('pong');
});

app.get("/criptos", async (req: any, res: any) => {
  const currencies = await GetTheLatestCurrencies();
  res.json({ total: currencies.length, currencies });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;