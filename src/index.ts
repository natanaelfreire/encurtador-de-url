import express from 'express'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerOutput from "./swagger_output.json";
import { routes } from './routes/routes'
import * as dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
    dotenv.config()
}

const app = express()

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(express.json())
app.use(routes)

const port = process.env.PORT != null ? Number(process.env.PORT) : 3000
app.listen(port, () => console.log('Server is running!!!'))