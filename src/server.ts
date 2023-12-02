import app from './app';
import { AppDataSource } from './data-source';

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source initialized successfully');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor executando na porta ${port}`);
    });
  } catch (err) {
    console.error('Erro durante a inicialização', err);
  }
})();
