const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js"];

const config = {
  info: {
    title: "Blog API Documentation",
    description: "",
  },
  tags: [],
  host: "localhost:8080",
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, config);
