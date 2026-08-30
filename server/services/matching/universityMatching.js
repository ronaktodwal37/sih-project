const University = require('../../models/University');

const getUniversityMatches = async (challenge) => {
    const universities = await University.find({ verified: true });
    const requirements = challenge.aiAnalysis?.requiredSkills || [];

    const matches = universities.map(uni => {
        let score = 0;

        const matchedSkills = uni.expertise.filter(e => requirements.includes(e));
        if (requirements.length > 0) {
            score += (matchedSkills.length / requirements.length) * 35;
        }

        if (uni.district === challenge.location.district) {
            score += 15;
        }

        if (uni.availableCapacity > 0) {
            score += 10;
        }

        return {
            university: uni,
            matchScore: Math.round(score),
            reasons: [
                matchedSkills.length > 0 ? `Matched expertise: ${matchedSkills.join(', ')}` : '',
                uni.district === challenge.location.district ? `In same district` : '',
            ].filter(Boolean)
        };
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
};

module.exports = { getUniversityMatches };
