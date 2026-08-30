const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'Delayed'],
        default: 'Not Started'
    },
    evidence: [String],
    completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Milestone', milestoneSchema);
