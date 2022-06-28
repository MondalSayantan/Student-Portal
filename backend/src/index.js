const mongoose = require("mongoose");
const logger = require("./config/logger");
const config = require("./config/config");
const app = require("./app");

mongoose.connect(config.mongoose.url).then(() => {
  logger.info("Connected to MongoDB!");
  app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });
});
