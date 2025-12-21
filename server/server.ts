import express, { Request, Response } from 'express';
import "dotenv/config";
import cors from "cors";
import { auth } from './lib/auth.js';
import { toNodeHandler } from 'better-auth/node';
import userRouter from './routes/userRoutes.js';

const app = express();

const port = 3000;
const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(",") || [],
    credentials: true
}
app.use(cors(corsOptions));
app.all('/api/auth/{*any}', toNodeHandler(auth)); //? this line is for the any of the req coming from these better auth routes will be handled and "toNodeHandler" is making these FE better auth routes compatible to the express in BE. 

app.use(express.json({ limit: "50mb" }));

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use("/api/user", userRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});