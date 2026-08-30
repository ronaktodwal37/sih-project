require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Challenge = require('../models/Challenge');
const University = require('../models/University');
const Industry = require('../models/Industry');

const seedDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sih_portal';
        await mongoose.connect(mongoUri);
        console.log('DB Connected for Seeding...');

        await User.deleteMany();
        await Challenge.deleteMany();
        await University.deleteMany();
        await Industry.deleteMany();

        const citizen = await User.create({ name: 'Rahul Kumar', email: 'rahul@example.com', password: 'password123', role: 'Citizen' });
        const admin = await User.create({ name: 'Jharkhand Admin', email: 'admin@jharkhand.gov.in', password: 'password123', role: 'Admin' });

        const bitMesra = await University.create({
            name: 'Birla Institute of Technology (BIT) Mesra',
            district: 'Ranchi',
            expertise: ['Water Management', 'IoT', 'Data Analytics', 'Computer Science'],
            availableCapacity: 5,
            verified: true
        });

        const nitJsr = await University.create({
            name: 'National Institute of Technology (NIT) Jamshedpur',
            district: 'Jamshedpur',
            expertise: ['Civil Engineering', 'Energy', 'Environmental Engineering'],
            availableCapacity: 3,
            verified: true
        });

        const tataSteel = await Industry.create({
            companyName: 'Tata Steel CSR',
            district: 'Jamshedpur',
            expertise: ['Manufacturing', 'Community Infrastructure', 'Water'],
            csrDomains: ['Water Management', 'Healthcare', 'Education'],
            districts: ['Jamshedpur', 'Ranchi', 'Dhanbad', 'All'],
            verified: true,
            pilotSupport: true
        });

        await Challenge.create({
            title: 'Village Groundwater Contamination',
            description: 'Residents in Namkum block are facing difficulty accessing safe drinking water due to rising iron levels in groundwater.',
            category: 'Water Management',
            subCategory: 'Quality',
            location: { district: 'Ranchi', block: 'Namkum', village: 'Rampur' },
            affectedPopulation: 4500,
            urgency: 'High',
            severity: 'Critical',
            submittedBy: citizen._id,
            aiAnalysis: {
                category: 'Water Management',
                summary: 'High iron contamination in Namkum block groundwater affecting 4500 people.',
                keywords: ['Water', 'Contamination', 'Iron', 'Namkum'],
                requiredSkills: ['Water Management', 'Environmental Engineering', 'IoT'],
                rootCauseHypothesis: 'Industrial runoff or natural geogenic contamination.',
                complexity: 'High',
                confidence: 85
            },
            priorityScore: 85,
            status: 'Validated'
        });

        await Challenge.create({
            title: 'Lack of Cold Storage for Farmers',
            description: 'Tomato farmers are losing 30% of yield every season because there is no localized cold storage facility near the wholesale market.',
            category: 'Agriculture',
            subCategory: 'Infrastructure',
            location: { district: 'Hazaribagh', village: 'Ichak' },
            affectedPopulation: 1200,
            urgency: 'Medium',
            severity: 'Medium',
            submittedBy: citizen._id,
            priorityScore: 65,
            status: 'Pending'
        });

        console.log('Demo Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1);
    }
};

seedDB();
