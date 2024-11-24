const Insight = require('../model/insight');
const {getWordCount} = require('../helper/helpers.js');

const createInsight = async (req, res) => {
    try {
        const { url } = req.body;
        
        let alreadyExistURL = await Insight.checkIfUrlExists(url); 
        if (alreadyExistURL) {
            return res.status(400).json({ success: 0, message: "Website link already exists" });
        }else{
        const wordCount = await getWordCount(url);
        const result = await Insight.createInsight({
            url,
            word_count: wordCount,
            is_favorite: false,
        });

        res.status(201).json({
            success: 1,
            message: 'Insight added successfully',
            insightId: result.id,
        });
    }
    } catch (error) {
        console.error('Error in creating the insights:', error);
        res.status(500).json({ success: 0, message: error.message+'in creating the insights:' });
    }
};


const getAllInsights = async (req, res) => {
    try {
        const insights = await Insight.getAllInsights();

        res.status(200).json({
            success: 1,
            insights,
        });
    } catch (error) {
        console.error('Error in fetching all insights:', error);
        res.status(500).json({ success: 0, message: error.message });
    }
};

const deleteInsight = async (req, res) => {
    const { id } = req.params;
    try {
        const insight = await Insight.getInsightByURL(id);

        if (!insight) {
            return res.status(404).json({ success: 0, message: 'Insight not found' });
        }

        await Insight.deleteInsights(id);
        res.status(200).json({ success: 1, message: 'Insight removed successfully' });
    } catch (error) {
        console.error('Error in deleting insight:', error);
        res.status(500).json({ success: 0, message: error.message });
    }
};

const updateInsightFavorite = async (req, res) => {
    const {id} =req.params;

    try {
        const insight = await Insight.getInsightByURL(id);

        if (!insight) {
            return res.status(404).json({ success: 0, message: 'Insight not found' });
        }

        let is_favorite = insight.is_favorite ===0 ? 1 : 0
        const updated = await Insight.updateInsights(
            { word_count: insight.word_count,
                 is_favorite:is_favorite
                 },
                  id);
        if (updated) {
            res.status(200).json({
                success: 1,
                message: 'Insight updated successfully',
                updatedInsight: { ...insight,is_favorite },
            });
        } else {
            res.status(400).json({ success: 0, message: 'Failed to update insight' });
        }
    } catch (error) {
        console.error('Error in updating insight favorite:', error);
        res.status(500).json({ success: 0, message: error.message });
    }
};

module.exports = {
    createInsight,
    getAllInsights,
    deleteInsight,
    updateInsightFavorite,
};
