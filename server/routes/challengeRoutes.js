const express = require('express');
const router = express.Router();
const {
    submitChallenge,
    getChallenges,
    getChallengeById,
    getMatches
} = require('../controllers/challengeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, submitChallenge)
    .get(getChallenges);

router.route('/:id')
    .get(getChallengeById);

router.route('/:id/matches')
    .get(protect, authorize('Government', 'University', 'Admin'), getMatches);

module.exports = router;
