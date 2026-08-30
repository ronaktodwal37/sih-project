const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    industryPartners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Industry' }],
    facultyMentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ['Research', 'Proposal', 'Prototype', 'Testing', 'Pilot', 'Deployment', 'Completed'],
        default: 'Research'
    },
    budget: { type: Number, default: 0 },
    pilotLocation: {
        district: String,
        village: String
    },
    impactMetrics: [{
        metricName: String,
        value: Number,
        unit: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
