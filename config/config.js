const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "cOMp_229",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:C0dF0BZRRYcf9jPS@sneakout.4hzzcfi.mongodb.net/?retryWrites=true&w=majority",
  userToken:
    process.env.USER_TOKEN || ["secretAdminCode_TkTWh"] ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/sneakOut",
};

module.exports = config;

//"mongodb+srv://SneakOut_Admin:83fGvqfDZytC3Gb@cluster0.qvpmnce.mongodb.net/?retryWrites=true&w=majority"

// "mongodb+srv://admin:0j0dXqeeMOxzld97@sneakout.4hzzcfi.mongodb.net/?retryWrites=true&w=majority"