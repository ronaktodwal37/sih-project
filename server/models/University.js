const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    district: { type: String, required: true },
    departments: [String],
    expertise: [String],
    availableCapacity: { type: Number, default: 0 },
    verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('University', universitySchema);
