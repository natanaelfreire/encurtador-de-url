import swaggerAutogen from 'swagger-autogen';

const url = 'https://encurtador-de-url-production.up.railway.app'

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Encurtador de URL API',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: `${url}`,
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);

