const dotenv = require("dotenv");
dotenv.config();

const { URI, PORT, SECRET_ACCESS_TOKEN } = process.env;

module.exports = { PORT, SECRET_ACCESS_TOKEN, URI };
