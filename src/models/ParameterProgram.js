const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');


const ParameterProgram = sequelize.define('programacion_parametros',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_forecast:{
        type: Sequelize.INTEGER
    },
    id_parametro:{
        type: Sequelize.INTEGER
    },
    value:{
        type: Sequelize.TEXT
    }
},{
    timestamps: false
});

module.exports = ParameterProgram;