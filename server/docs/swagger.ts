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
        properties: {
          status: { type: 'boolean', example: true },
          profile: {
            $ref: '#/components/schemas/profile',
          },
        },
      },
      profilesResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          profiles: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/profile' },
                { $ref: '#/components/schemas/profile' },
                { $ref: '#/components/schemas/profile' },
              ],
            },
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
      profile: {
        type: 'object',
        example: {
          id: 1,
          name: 'Mesero 1',
          role: 'EMPLOYEE',
          pinCode: 'unknow',
          barId: 22,
          updatedAt: '2024-02-23T23:14:39.342Z',
          createdAt: '2024-02-23T23:14:39.342Z',
        },
      },
      barResponse: {
        type: 'object',
        example: {
          status: true,
          bar: {
            email: 'correo@gmail.com',
            name: 'Bar la unica',
            password: 'abcde12345',
            userName: 'uniqueBar',
          },
        },
      },
      barGeneral: {
        type: 'object',
        required: ['email', 'name', 'password'],
        properties: {
          email: { type: 'string', example: 'correo@gmail.com' },
          name: { type: 'string', example: 'Bar la unica' },
          password: { type: 'string', example: 'abcde12345' },
          },
        },
      bar: {
        type: 'object',
        example: {
            email: 'correo@gmail.com',
            name: 'Bar la unica',
            password: 'abcde12345',
        }
      },
      tableGeneral: {
        type: 'object',
        required: ['ability', 'location'],
        properties: {
          isOccupied: {
            type: 'boolean',
            example: false,
            description: 'No es necesario enviarlo, el valor default de false',
          },
          ability: { type: 'num', example: 5 },
          location: { type: 'string', example: 'medio' },
        },
      },
      productCategoryGeneral: {
        type: 'object',
        required: ['name', 'category'],
        properties: {
          name: { type: 'string', example: 'Hamburgesas' },
          description: { type: 'string', example: 'sandwiches con medallones de carne' },
        },
      },
      table: {
        type: 'object',
        example: {
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
      tableResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          table: {
            $ref: '#/components/schemas/table',
          },
        },
      },
      tablesResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          tables: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/table' },
                { $ref: '#/components/schemas/table' },
                { $ref: '#/components/schemas/table' },
              ],
            },
          },
        },
      },
      productCategory: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Hamburgesas' },
          description: { type: 'string', example: 'sandwiches con medallones de carne' },
          barId: { type: 'number', example: '22' },
          updatedAt: { type: 'date', example: '2024-02-22T20:38:55.984Z' },
          createdAt: { type: 'date', example: '2024-02-22T20:38:55.984Z' },
        },
      },
      productsCategories: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Hamburgesas' },
          description: { type: 'string', example: 'sandwiches con medallones de carne' },
          barId: { type: 'number', example: '22' },
          updatedAt: { type: 'date', example: '2024-02-22T20:38:55.984Z' },
          createdAt: { type: 'date', example: '2024-02-22T20:38:55.984Z' },
          products: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/product' },
                { $ref: '#/components/schemas/product' },
                { $ref: '#/components/schemas/product' },
              ],
            },
          },
        },
      },
      productCategoryResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          category: {
            $ref: '#/components/schemas/productCategory',
          },
        },
      },
      productsCategoriesResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          categories: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/productsCategories',
            },
          },
        },
      },
      productGeneral: {
        type: 'object',
        required: ['name', 'description', 'price', 'productCategoryId'],
        properties: {
          name: { type: 'string', example: 'Hamburguesa cheese' },
          description: {
            type: 'string',
            example: 'Hamburguesa a la Parrilla Con Queso',
          },
          price: { type: 'float', example: 10.5 },
          productCategoryId: {
            type: 'number',
            example: 1,
            description: 'Id de la categoria al que pertenece el producto',
          },
        },
      },
      productGeneralEdit: {
        type: 'object',
        required: ['name', 'description', 'price'],
        properties: {
          name: { type: 'string', example: 'Hamburguesa cheese' },
          description: {
            type: 'string',
            example: 'Hamburguesa a la Parrilla Con Queso',
          },
          price: { type: 'float', example: 10.5 },
        },
      },
      product: {
        type: 'object',
        example: {
          id: 3,
          name: 'Helado Mini Princesa',
          price: 11.5,
          description: 'Helado Mini Princesa',
          productCategoryId: 3,
          createdAt: '2024-02-23T18:03:30.951Z',
          updatedAt: '2024-02-23T18:03:30.951Z',
        },
      },
      productResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          product: {
            $ref: '#/components/schemas/product',
          },
        },
      },
      productsResponse: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          products: {
            type: 'array',
            items: {
              oneOf: [
                { $ref: '#/components/schemas/product' },
                { $ref: '#/components/schemas/product' },
                { $ref: '#/components/schemas/product' },
              ],
            },
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
