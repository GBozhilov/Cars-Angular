const express = require('express');

const configurationEnvironments = require("./configuration/configuration");
const initializeDatabase = require("./configuration/database");
const initializeExpress = require("./configuration/express");
const initializeRoutes = require("./configuration/routes");

const currentEnvironment = "development";
const configuration = configurationEnvironments[currentEnvironment];

const application = express();

initializeDatabase(configuration);
initializeExpress(application, configuration);
initializeRoutes(application);

application.listen(configuration.port, () => console.log(`Server listening on port: ${configuration.port}`));
