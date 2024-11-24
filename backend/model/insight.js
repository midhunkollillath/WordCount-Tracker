const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const Insight = sequelize.define('Insight', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    word_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'Insight',
    timestamps: false,
});
const createInsight = async (data) => {
    try {
        const insight = await Insight.create(data);
        return insight;
    } catch (error) {
        console.error('Error in adding insight:', error);
        throw new Error('Failed to create insight');
    }
};

const updateInsights = async (data, id) => {
    try {
        const [updatedRows] = await Insight.update(data, {
            where: { id },
        });
        return updatedRows > 0;
    } catch (error) {
        console.error('Error in updating the insights:', error);
        throw new Error('Failed to update insight');
    }
};

const deleteInsights = async (id) => {
    try {
        const deletedRows = await Insight.destroy({
            where: { id },
        });
        return deletedRows > 0;
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
