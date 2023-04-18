const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Test API',
            version: 'v0.0.1',
            description: 'API With Swagger',
            // license: {
            //     name: "naver",
            //     url: "https://www.naver.com/",
            // },
        },
        // host: "192.168.0.90",
        // basePath: "/",
        servers: [
            {
                url: "http://192.168.0.90:3000",
            },
        ],
    },
    apis: ['./routes/*.js'] // ,'./swagger/*'
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};