const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');


const Week = sequelize.define('semanas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cod_semana: {
        type: Sequelize.STRING
    },
    num_semana: {
        type: Sequelize.INTEGER
    },
    fec_inicial: {
        type: Sequelize.DATE
    },
    fec_final:
    {
        type: Sequelize.DATE
    }
}, {
    timestamps: false
});

module.exports = Week;