const { ref, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
    },
  price: {
    type: Number,
    default: 0,
    set: (p) => (p === "" ? "0" : p),
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry:{
    type:{
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates:{
      type: [Number],
      required: true,
    },
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing){
    await Review.deleteMany({ reviews: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
