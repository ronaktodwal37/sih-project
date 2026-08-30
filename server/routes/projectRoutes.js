const express = require('express');
const router = express.Router();
const { createProject, getProjectById, getAllProjects } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('University', 'Admin', 'Government'), createProject)
    .get(getAllProjects);

router.route('/:id')
    .get(getProjectById);

module.exports = router;
