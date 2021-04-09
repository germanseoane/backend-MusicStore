const connectDB = require("./connectDB");
const { Guitar } = require("../models/guitar");
const { Bass } = require("../models/bass");
const guitarData = require("./guitarsData");
const bassData = require("./bassData");

connectDB();

const seeder = async () => {
  try {
    await Guitar.deleteMany({});
    await Guitar.insertMany(guitarData);
    await Bass.deleteMany({});
    await Bass.insertMany(bassData);

    console.log("Data import success");
    process.exit();
  } catch (err) {
    console.error("Error with data import", err);
    process.exit(1);
  }
};

seeder();
