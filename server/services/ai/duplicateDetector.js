const Challenge = require('../../models/Challenge');

const findSimilarChallenges = async (newChallenge) => {
    const keywords = newChallenge.aiAnalysis?.keywords || [];
    if (keywords.length === 0) return [];

    const regexPattern = keywords.join('|');

    const similar = await Challenge.find({
        _id: { $ne: newChallenge._id },
        $or: [
            { title: { $regex: regexPattern, $options: 'i' } },
            { description: { $regex: regexPattern, $options: 'i' } }
        ]
    }).limit(3).select('title priorityScore');

    return similar.map(c => ({
        challengeId: c._id,
        similarityScore: Math.floor(Math.random() * (95 - 60)) + 60 // Demo random score
    }));
};

module.exports = { findSimilarChallenges };
