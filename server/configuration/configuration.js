const configurationObject = {
    development: {
        dbConnectionString: "mongodb://localhost:27017/cars-angular",
        port: 5000,
        decodedToken: "rentCar5000rentCar",
        codedToken: "rentCar"
    },
    production: {}
};

module.exports = configurationObject;
