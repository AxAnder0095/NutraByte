import cors from 'cors';
import express from 'express';
import testRoute from './routes/test.route';
import sampleRoute from './routes/sample.route';

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

// Routes
app.use('/api', testRoute);
app.use('/api', sampleRoute);


export default app;