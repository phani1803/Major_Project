const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref } = require("joi");

const listingSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description: String,
    image:{
        // type: String,
        // default : "https://unsplash.com/photos/soccer-field-6J7eIvNwttQ",
        // set: (v) =>
        // v ===""
        // ? "https://unsplash.com/photos/soccer-field-6J7eIvNwttQ"
        // :v,
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry : {
        type: {
        type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }, 
    },
    // category: {
    //     type: String,
    //     enum: ["mountains","srctic","farms","desers"]
    // },
});

listingSchema.post("findOneAndDelete",async(listing) =>{
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;