const mongoose = require("mongoose");
const moment = require("moment");
const crypto = require('crypto');

const uuid = crypto.randomUUID();
const Schema = mongoose.Schema;

// Define the User schema
const eventSchema = new Schema({
    eventId:String,
    host:String,
    guest:String,
    guestDetails:String,
    fromEpoch:Number,
    toEpoch:Number,
    description:String,
    name:String,
    url:String,
    others:[String],
    metaInfo: {
        createdAt: { type: Number, default: moment().unix() },
        updatedAt: { type: Number, default: moment().unix() },
        createdBy:{type:String}
    },
});

// Create the User model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
