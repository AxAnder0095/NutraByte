import cors from 'cors';
import express from 'express';
import testRoute from './routes/test.route';
import sampleRoute from './routes/sample.route';
import userRoute from './routes/user.route';
import postRoute from './routes/post.route';
import createUserRoute from './routes/create-user.route';

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

// Test routees
app.use('/api', testRoute);
app.use('/api', sampleRoute);

// Routes
app.use('/api', userRoute);
app.use('/api', postRoute);

// Route for creating a user via Auth0 webhook
app.use('/api', createUserRoute);

export default app;