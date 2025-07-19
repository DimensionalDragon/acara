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
                password: 'test12345',
            },
            RegisterRequest: {
                fullName: 'Joni Erlangga',
                username: 'joni2025',
                email: 'joni2025@yopmail.com',
                password: 'test12345',
                confirmPassword: 'test12345',
            },
            ActivationRequest: {
                code: 'abcdef',
            },
            CreateCategoryRequest: {
                name: '',
                description: '',
                icon: '',
            },
            CreateEventRequest: {
                name: '',
                banner: '[File url]',
                category: '[Category object ID]',
                description: '',
                startDate: 'YYYY-MM-DD HH:MM:SS',
                endDate: 'YYYY-MM-DD HH:MM:SS',
                location: {
                    region: '[Region ID]',
                    coordinates: [0, 0],
                },
                isOnline: false,
                isFeatured: false,
            },
            RemoveMediaRequest: {
                fileUrl: ''
            },
        }
    },
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['../routes/api.ts'];

swaggerAutogen({openapi: "3.0.0"})(outputFile, endpointsFiles, doc);