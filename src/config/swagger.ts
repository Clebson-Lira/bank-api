import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bancária',
      version: '1.0.0',
      description: 'Documentação da API fictícia de banco',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
   apis: ['src/routes/*.ts', 'src/modules/**/*.ts'], // Caminho dos arquivos com JSDoc
});
