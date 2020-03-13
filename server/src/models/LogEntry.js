const mongoose = require('mongoose');

const { Schema } = mongoose;

const numberRequired = {
   type: Number,
   required: true
}

const logEntrySchema = new Schema({
   title: {
      type: String,
      required: true
   },
   description: String,
   comments: String,
   image: String,
   rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
   },
   latitude: {
      ...numberRequired,
      min: -90,
      max: 90
   },
   longitude: {
      ...numberRequired,
      min: -180,
      max: 180
   },
   visitDate: {
      type: Date,
      required: true
   }}, {
      timestamps: true
   }
);

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
