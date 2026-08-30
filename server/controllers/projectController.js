const Project = require('../models/Project');
const Milestone = require('../models/Milestone');
const Challenge = require('../models/Challenge');

// @desc    Create a new project from an accepted challenge
// @route   POST /api/projects
// @access  Private (University)
const createProject = async (req, res, next) => {
    try {
        const { challengeId, title, description, universityId } = req.body;

        const project = await Project.create({
            challengeId,
            universityId,
            title,
            description
        });

        await Challenge.findByIdAndUpdate(challengeId, { status: 'In Progress' });

        const defaultMilestones = [
            { projectId: project._id, title: 'Research' },
            { projectId: project._id, title: 'Proposal' },
            { projectId: project._id, title: 'Prototype' },
            { projectId: project._id, title: 'Testing' },
            { projectId: project._id, title: 'Pilot' }
        ];
        await Milestone.insertMany(defaultMilestones);

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('challengeId', 'title category location')
            .populate('universityId', 'name')
            .populate('industryPartners', 'companyName')
            .populate('facultyMentor', 'name')
            .populate('students', 'name');

        if (!project) return res.status(404).json({ message: 'Not found' });

        const milestones = await Milestone.find({ projectId: project._id });

        res.status(200).json({ project, milestones });
    } catch (error) {
        next(error);
    }
};
// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find()
            .populate('challengeId', 'title')
            .populate('universityId', 'name');
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};

module.exports = { createProject, getProjectById, getAllProjects };
