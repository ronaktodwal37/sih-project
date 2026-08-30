const calculatePriority = (challengeData) => {
    let score = 0;

    if (challengeData.affectedPopulation > 5000) score += 30;
    else if (challengeData.affectedPopulation > 1000) score += 20;
    else if (challengeData.affectedPopulation > 100) score += 10;

    if (challengeData.severity === 'Critical') score += 25;
    else if (challengeData.severity === 'High') score += 20;
    else if (challengeData.severity === 'Medium') score += 10;

    if (challengeData.urgency === 'Immediate') score += 25;
    else if (challengeData.urgency === 'High') score += 15;

    return Math.min(score + 10, 100);
};

module.exports = { calculatePriority };
