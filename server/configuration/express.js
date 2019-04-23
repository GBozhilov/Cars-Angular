const bodyParser = require('body-parser');
const cors = require('cors');

function initializeExpress(application, configuration) {
    application.use(cors());

    application.use(bodyParser.json());

    application.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    application.use((error, req, res, next) => {
        const status = error.statusCode || 500;
        const message = error.message;
        res.status(status).json({ message: message });
        next();
      });
}

module.exports = initializeExpress;
