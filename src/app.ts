import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// console.log(process.cwd());
//C:/ProgramingHeroNextLevel/first-project/.env for cofig file dotwnv
export default app;
