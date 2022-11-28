import express from 'express';
import { PORT } from './config';
import controller from './controllers/index';



// Create express server
const app: any = express();

app.get("/ping", controller.ping.getCripto);

app.get("/criptos", controller.cripto.getCripto);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;