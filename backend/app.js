import incidentRouter from './routes/incident.route.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import express from 'express';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/incidents', incidentRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});