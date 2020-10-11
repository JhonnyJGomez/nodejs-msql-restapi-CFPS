const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');
const Parameter = require('./Parameter');

const Premier = sequelize.define('parametros',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cod_parametro:{
        type: Sequelize.TEXT
    },
    nom_parametro:{
        type: Sequelize.TEXT
    },
    type:{
        type: Sequelize.TEXT
    },
    about:{
        type: Sequelize.TEXT
    },
    status:{
        type: Sequelize.BOOLEAN
    }
},{
    timestamps: false
});

module.exports = Parameter;