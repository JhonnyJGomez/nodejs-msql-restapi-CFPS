const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');

const City = sequelize.define('ciudades',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cod_ciudad:{
        type: Sequelize.TEXT
    },
    nom_ciudad:{
        type: Sequelize.TEXT
    }
},{
    timestamps: false
});

module.exports = City;

