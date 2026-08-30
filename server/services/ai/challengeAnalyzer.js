const { callGeminiAPI } = require('./aiProvider');

const analyzeChallenge = async (title, description) => {
    const prompt = `You are a societal challenge analysis engine for the Government of Jharkhand.
Analyze the following citizen-submitted challenge.
Title: ${title}
Description: ${description}

Identify and return a valid JSON object strictly matching this structure:
{
  "category": "string",
  "subCategory": "string",
  "summary": "string (concise summary)",
  "keywords": ["string"],
  "rootCauseHypothesis": "string",
  "requiredSkills": ["string"],
  "complexity": "string (Low, Medium, High)",
  "confidence": 0-100 (number)
}`;

    try {
        const aiResult = await callGeminiAPI(prompt);
        return aiResult;
    } catch (error) {
        console.error("AI Analysis failed, using fallback:", error.message);
        return fallbackAnalyzer(title, description);
    }
};

const fallbackAnalyzer = (title, description) => {
    return {
        category: "General",
        subCategory: "Unclassified",
        summary: `${title} - ${description.substring(0, 50)}...`,
        keywords: title.split(' '),
        rootCauseHypothesis: "Needs further manual investigation.",
        requiredSkills: ["General Management"],
        complexity: "Medium",
        confidence: 10
    };
};

module.exports = { analyzeChallenge };
