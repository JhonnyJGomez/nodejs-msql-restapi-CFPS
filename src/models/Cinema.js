const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');

const Cinema = sequelize.define('cines',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cod_cine:{
        type: Sequelize.TEXT
    },
    nom_cine:{
        type: Sequelize.TEXT
    },
    id_ciudad: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ticket_promedio: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
},{
    timestamps: false
});

module.exports = Cinema;

