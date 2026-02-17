import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { usersRoute } from './app/modules/UsersManagement/users.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/users', usersRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
