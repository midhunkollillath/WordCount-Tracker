const sequelize = require('../config/dbConnection');

const createInsight = async (data) => {
    try {
        const query = `
            INSERT INTO Insight (url, word_count, is_favorite)
            VALUES (:url, :word_count, :is_favorite)
        `;
        const [result] = await sequelize.query(query, {
            replacements: data,
        });
        return result; 
    } catch (error) {
        console.error('Error in adding insights:', error);
        throw new Error('Failed to create insight');
    }
};

const updateInsights = async (data, id) => {
    try {
        const query = `
            UPDATE Insight 
            SET word_count = :word_count, is_favorite = :is_favorite 
            WHERE id = :id
        `;
        const [result] = await sequelize.query(query, {
            replacements: { ...data, id },
        });
        return result.affectedRows > 0 ? true :false; 
    } catch (error) {
        console.error('Error in updating the insights:', error);
        throw new Error(`Failed to update insight: ${error.message}`);
    }
};


const deleteInsights = async (id) => {
    try {
        const query = `
            DELETE FROM Insight 
            WHERE id = :id
        `;
        const [result] = await sequelize.query(query, {
            replacements: { id },
        });
        return result > 0; 
    } catch (error) {
        console.error('Error in deleting the insights:', error);
        throw new Error('Failed to delete insight');
    }
};

const getAllInsights = async () => {
    try {
        const query = `
            SELECT * FROM Insight
        `;
        const [result] = await sequelize.query(query);
        return result; 
    } catch (error) {
        console.error('Error in getting the insights:', error);
        throw new Error('Failed to fetch insights');
    }
};

const getInsightByURL = async (id) => {
    try {
        const query = `
            SELECT * FROM Insight 
            WHERE id = :id
        `;
        const [result] = await sequelize.query(query, {
            replacements: { id },
        });
        return result.length ? result[0] : null; 
    } catch (error) {
        console.error('Error in getting URL:', error);
        throw new Error('Failed to fetch insight by URL');
    }
};
const checkIfUrlExists = async (url) => {
    const result = await sequelize.query(
        `SELECT 1 FROM Insight WHERE url = :url LIMIT 1`, 
        {
            replacements: { url },
            type: sequelize.QueryTypes.SELECT,
        }
    );
    return result.length > 0;
};

  
module.exports = {
    createInsight,
    updateInsights,
    deleteInsights,
    getAllInsights,
    getInsightByURL,
    checkIfUrlExists,
};
