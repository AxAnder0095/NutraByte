import cors from 'cors';
import express from 'express';
import testRoute from './routes/test.route';
import sampleRoute from './routes/sample.route';
import userRoute from './routes/user.route';
import postRoute from './routes/post.route';

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

// Routes
app.use('/api', testRoute);
app.use('/api', sampleRoute);
app.use('/api', userRoute);
app.use('/api', postRoute);

export default app;