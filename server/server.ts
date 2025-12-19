import express, { Request, Response } from 'express';
import "dotenv/config";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(",") || [],
    credentials: true
}

app.use(cors(corsOptions))

const port = 3000;
app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});