const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    location: {
        district: String,
        block: String,
        village: String,
        latitude: Number,
        longitude: Number
    },
    affectedPopulation: { type: Number },
    urgency: { type: String },
    severity: { type: String },
    evidence: [String],
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Validated', 'Assigned', 'In Progress', 'Completed', 'Rejected'],
        default: 'Pending'
    },
    priorityScore: { type: Number, default: 0 },
    aiAnalysis: {
        category: String,
        subCategory: String,
        summary: String,
        keywords: [String],
        rootCauseHypothesis: String,
        requiredSkills: [String],
        complexity: String,
        confidence: Number
    },
    duplicateCandidates: [{
        challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
        similarityScore: Number
    }],
    assignedUniversities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'
    }],
    assignedIndustries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry'
    }],
    validation: {
        validatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        validatedAt: Date,
        notes: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
