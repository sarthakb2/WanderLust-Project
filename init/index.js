const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const mongo_URL = "mongodb://localhost:27017/wanderlust";

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6739020540536489f1bc6773",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialised");
};

initDB();
