const express = require('express');

const router = express.Router();

const { createInsight, getAllInsights, deleteInsight, updateInsightFavorite } = require('../controller/insightController.js');

router.post('/create-insight', createInsight);

router.get('/insights',getAllInsights);

router.delete('/insights/:id',deleteInsight);

router.put('/insights/:id/favorite',updateInsightFavorite);

module.exports = router;
