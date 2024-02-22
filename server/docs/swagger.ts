import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import path from 'path';

const server = `http://${process.env.HOST}:${process.env.PORT}${process.env.ROUTE}`;
const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion BAR API',
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
      profileResponse: {
        type: 'object',
        example: {
          status: true,
          profile: {
            id: 4,
            name: 'Mesero1',
            role: 'EMPLOYEE',
            pinCode:
              '$2a$10$XyWLLX1dZFhUL6wi89d2XOqnDHGK2sFBC8r0MR3C20n07lMgS7Gkm',
            barId: 22,
            createdAt: '2024-02-22T03:54:21.177Z',
            updatedAt: '2024-02-22T15:55:19.407Z',
          },
        },
      },
      profileGeneral: {
        type: 'object',
        required: ['name', 'role', 'pinCode'],
        properties: {
          name: { type: 'string', example: 'Mesero1' },
          role: {
            type: 'string',
            example: 'EMPLOYEE',
            enum: ['ADMIN', 'EMPLOYEE'],
          },
          pinCode: { type: 'string', example: 'abcde12345' },
        },
      },
      tableGeneral: {
        type: 'object',
        required: ['tableNumber', 'ability', 'location'],
        properties: {
          tableNumber: { type: 'num', example: 1 },
          isOccupied: {
            type: 'boolean',
            example: false,
            description: 'No es necesario enviarlo, el valor default de false',
          },
          ability: { type: 'num', example: 5 },
          location: { type: 'string', example: 'medio' },
        },
      },
      productsCategoryGeneral: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', example: 'Hamburgesas' },
        },
      },
      tableResponse: {
        type: 'object',
        example: {
          status: true,
          profile: {
            isOccupied: false,
            id: 1,
            tableNumber: 1,
            ability: 5,
            location: 'medio',
            barId: 22,
            updatedAt: '2024-02-22T19:37:04.016Z',
            createdAt: '2024-02-22T19:37:04.016Z',
          },
        },
      },
      productsCategoryResponse: {
        type: 'object',
        example: {
          status: true,
          category: {
            id: 1,
            name: 'Hamburgesas',
            barId: 22,
            updatedAt: '2024-02-22T20:38:55.984Z',
            createdAt: '2024-02-22T20:38:55.984Z',
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
