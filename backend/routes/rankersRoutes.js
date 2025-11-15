const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Get rankers data from local JSON file (fallback functionality)
router.get('/', async (req, res) => {
    try {
        // Correct path from backend/routes/ to kataria-school-frontend/public/data/rankers.json
        const rankersPath = path.join(__dirname, '../../kataria-school-frontend/public/data/rankers.json');

        try {
            const data = await fs.readFile(rankersPath, 'utf8');
            const rankersData = JSON.parse(data);
            console.log('Successfully loaded rankers data from:', rankersPath);
            res.json(rankersData);
        } catch (fileError) {
            // If local file doesn't exist, return a fallback structure
            console.warn('Rankers JSON file not found at:', rankersPath, 'Error:', fileError.message);
            res.json({
                examName: 'Sample Exam',
                classes: [
                    {
                        class: '10',
                        rankers: [
                            { rank: 1, name: 'Student 1', score: 95, total: 100, studentId: 's1' },
                            { rank: 2, name: 'Student 2', score: 92, total: 100, studentId: 's2' },
                            { rank: 3, name: 'Student 3', score: 89, total: 100, studentId: 's3' }
                        ]
                    }
                ]
            });
        }
    } catch (error) {
        console.error('Error loading rankers data:', error);
        res.status(500).json({
            error: 'Internal server error loading rankers data',
            details: error.message
        });
    }
});

// Get specific rankers data by class
router.get('/class/:classNumber', async (req, res) => {
    try {
        const { classNumber } = req.params;
        // Correct path from backend/routes/ to kataria-school-frontend/public/data/rankers.json
        const rankersPath = path.join(__dirname, '../../kataria-school-frontend/public/data/rankers.json');

        try {
            const data = await fs.readFile(rankersPath, 'utf8');
            const rankersData = JSON.parse(data);
            const classData = rankersData.classes.find(c => c.class === parseInt(classNumber));

            if (classData) {
                res.json(classData);
            } else {
                res.status(404).json({ error: `Class ${classNumber} not found` });
            }
        } catch (fileError) {
            console.warn('Rankers JSON file not found:', fileError.message);
            res.status(404).json({ error: 'Rankers data not available' });
        }
    } catch (error) {
        console.error('Error loading class rankers data:', error);
        res.status(500).json({
            error: 'Internal server error loading class rankers data',
            details: error.message
        });
    }
});

module.exports = router;