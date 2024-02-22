import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import path from 'path';

const server = `http://${process.env.HOST}:${process.env.PORT}${process.env.ROUTE}`;
const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de mi API',
    version: '1.0.0',
  },
  servers: [
    {
      url: server,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      signUp: {
        type: 'object',
        required: ['name', 'password', 'userName', 'email'],
        properties: {
          email: { type: 'string', example: 'correo@gmail.com' },
          name: { type: 'string', example: 'Bar la unica' },
          password: { type: 'string', example: 'abcde12345' },
          userName: { type: 'string', example: 'uniqueBar' },
        },
      },
      login: {
        type: 'object',
        required: ['password', 'userName'],
        properties: {
          password: { type: 'string', example: 'abcde12345' },
          userName: { type: 'string', example: 'uniqueBar' },
        },
      },
      loginProfile: {
        type: 'object',
        required: ['pinCode', 'profielId'],
        properties: {
          pinCode: { type: 'string', example: '109e9d' },
          profileId: { type: 'number', example: 1 },
        },
      },
      loginResponse: {
        type: 'object',
        example: {
          status: true,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4MzgzNDY5LCJleHAiOjE3MDgzOTA2Njl9.Y5Y9qMfC9brP2tAbS-4OBYUEWa53OzTTo14j7_YiArw',
          bar: {
            email: 'correo@gmail.com',
            name: 'Bar la unica',
            password: 'abcde12345',
            userName: 'uniqueBar',
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: [`${path.join(__dirname, '../routes/*.routes*')}`],
};

export default swaggerJSDoc(swaggerOptions);
