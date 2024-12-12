import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Encurtador de URL API',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Ambiente local'
        },
        {
            url: 'https://encurtador.up.railway.app',
            description: 'Ambiente núvem'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    },
    security: {
        bearerAuth: []
    }
};

const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/routes/routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);

