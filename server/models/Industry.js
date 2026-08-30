const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    description: { type: String },
    expertise: [String],
    csrDomains: [String],
    fundingCapacity: { type: String },
    pilotSupport: { type: Boolean, default: false },
    districts: [String],
    verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Industry', industrySchema);
