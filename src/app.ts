import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

// application routes
app.use(`/api/v1/students`, StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('first project is running');
});
// console.log(process.cwd());
//C:/ProgramingHeroNextLevel/first-project/.env for cofig file dotwnv
export default app;
