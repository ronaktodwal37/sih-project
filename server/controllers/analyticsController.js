const Challenge = require('../models/Challenge');
const Project = require('../models/Project');
const University = require('../models/University');
const Industry = require('../models/Industry');

// @desc    Get system-wide analytics for government dashboard
// @route   GET /api/analytics/government
// @access  Public (for demo)
const getGovernmentAnalytics = async (req, res, next) => {
    try {
        const totalChallenges = await Challenge.countDocuments();
        const validatedChallenges = await Challenge.countDocuments({ status: { $ne: 'Pending' } });
        const activeProjects = await Project.countDocuments({ status: { $nin: ['Completed', 'Deployment'] } });
        const completedProjects = await Project.countDocuments({ status: 'Completed' });

        const universitiesParticipating = await University.countDocuments({ verified: true });
        const industryPartners = await Industry.countDocuments({ verified: true });

        // Aggregate challenges by category
        const categoryDistribution = await Challenge.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        // Aggregate challenges by district
        const districtDistribution = await Challenge.aggregate([
            { $group: { _id: "$location.district", count: { $sum: 1 } } }
        ]);

        const charts = {
            categories: categoryDistribution.map(c => ({ name: c._id || 'Unclassified', value: c.count })),
            districts: districtDistribution.map(d => ({ name: d._id || 'Unknown', value: d.count }))
        };

        res.status(200).json({
            kpis: {
                totalChallenges,
                validatedChallenges,
                activeProjects,
                completedProjects,
                universitiesParticipating,
                industryPartners,
                citizensImpacted: 14500 // Demo mock metric
            },
            charts
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getGovernmentAnalytics };
