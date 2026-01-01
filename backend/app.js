import express from 'express';
import cors from 'cors';
import incidentRouter from './routes/incident.route.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/incidents', incidentRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});