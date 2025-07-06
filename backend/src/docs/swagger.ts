import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: 'v0.0.1',
        title: 'Dokumentasi API Acara',
        description: 'Dokumentasi API Acara'
    },
    servers: [
        {url: 'http://localhost:5000/api', description: 'Local Server'},
        {url: 'https://acara-ashen.vercel.app/api', description: 'Deployed Server'}
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        },
        schemas: {
            LoginRequest: {
                identifier: 'andhika',
                password: 'test123',
            }
        }
    },
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['../routes/api.ts'];

swaggerAutogen({openapi: "3.0.0"})(outputFile, endpointsFiles, doc);