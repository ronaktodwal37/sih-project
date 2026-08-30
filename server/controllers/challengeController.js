const Challenge = require('../models/Challenge');
const { analyzeChallenge } = require('../services/ai/challengeAnalyzer');
const { findSimilarChallenges } = require('../services/ai/duplicateDetector');
const { calculatePriority } = require('../services/analytics/priorityEngine');

// Ensure matching services are available (lazy loaded if needed, but normally imported)
const { getUniversityMatches } = require('../services/matching/universityMatching');
const { getIndustryMatches } = require('../services/matching/industryMatching');

const submitChallenge = async (req, res, next) => {
    try {
        const { title, description, category, subCategory, location, affectedPopulation, urgency, severity, evidence } = req.body;

        const aiAnalysis = await analyzeChallenge(title, description);
        const priorityScore = calculatePriority({ affectedPopulation, severity, urgency });

        const challenge = await Challenge.create({
            title,
            description,
            category: aiAnalysis.category || category,
            subCategory: aiAnalysis.subCategory || subCategory,
            location,
            affectedPopulation,
            urgency,
            severity,
            evidence,
            aiAnalysis,
            priorityScore,
            submittedBy: req.user._id
        });

        const duplicateCandidates = await findSimilarChallenges(challenge);
        if (duplicateCandidates.length > 0) {
            challenge.duplicateCandidates = duplicateCandidates;
            await challenge.save();
        }

        res.status(201).json(challenge);
    } catch (error) {
        next(error);
    }
};

const getChallenges = async (req, res, next) => {
    try {
        const challenges = await Challenge.find({ status: { $ne: 'Pending' } }).select('-submittedBy');
        res.status(200).json(challenges);
    } catch (error) {
        next(error);
    }
};

const getChallengeById = async (req, res, next) => {
    try {
        const challenge = await Challenge.findById(req.params.id)
            .populate('submittedBy', 'name')
            .populate('assignedUniversities')
            .populate('assignedIndustries');

        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
        res.status(200).json(challenge);
    } catch (error) {
        next(error);
    }
};

const getMatches = async (req, res, next) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: 'Not found' });

        const universityMatches = await getUniversityMatches(challenge);
        const industryMatches = await getIndustryMatches(challenge);

        res.json({ universityMatches, industryMatches });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitChallenge, getChallenges, getChallengeById, getMatches };
