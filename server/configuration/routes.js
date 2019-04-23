const userRouter = require("../routes/user");
const carRouter = require("../routes/car");
const rentRouter = require("../routes/rent");

function initializeRoutes(application) {
    application.use("/user", userRouter);
    application.use("/car", carRouter);
    application.use("/rent", rentRouter);
}

module.exports = initializeRoutes;
