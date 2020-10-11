const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');
const Forecast = require('./Forecast');

//const Task = require('./Week');

const Premier = sequelize.define('peliculas',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cod_pelicula:{
        type: Sequelize.TEXT
    },
    titulo:{
        type: Sequelize.TEXT
    },
    descripcion:{
        type: Sequelize.TEXT
    },
    formato:{
        type: Sequelize.TEXT
    },
    idioma:{
        type: Sequelize.TEXT
    },
    id_fec_estreno:{
        type: Sequelize.INTEGER
    },
    id_genero:{
        type: Sequelize.INTEGER
    },
    id_rating:{
        type: Sequelize.INTEGER
    },
    id_distributor:{
        type: Sequelize.INTEGER
    }
},{
    timestamps: false
});

module.exports = Premier;