const Industry = require('../../models/Industry');

const getIndustryMatches = async (challenge) => {
    const industries = await Industry.find({ verified: true });
    const category = challenge.aiAnalysis?.category || challenge.category;

    const matches = industries.map(ind => {
        let score = 0;

        if (ind.csrDomains.includes(category)) {
            score += 40;
        }

        if (ind.districts.includes(challenge.location.district) || ind.districts.includes('All')) {
            score += 20;
        }

        if (ind.pilotSupport) score += 10;

        return {
            industry: ind,
            matchScore: score,
            reasons: [
                ind.csrDomains.includes(category) ? `Aligned with CSR Domain: ${category}` : '',
                ind.districts.includes(challenge.location.district) ? `Operates in ${challenge.location.district}` : ''
            ].filter(Boolean)
        };
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
};

module.exports = { getIndustryMatches };
