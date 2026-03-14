import express  from "express";
import cors from "cors";
import testRoute from "./routes/test.route.ts";

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

// Routes
app.use('/api', testRoute);

export default app;