const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');


//const Task = require('./Week');

const Forecast = sequelize.define('forecasts',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cod_forecast:{
        type: Sequelize.TEXT
    },
    id_semana:{
        type: Sequelize.INTEGER
    },
    estimacion_asistencia:{
        type: Sequelize.INTEGER
    },
    id_pelicula:{
        type: Sequelize.INTEGER
    },
    id_ciudad:{
        type: Sequelize.INTEGER
    }
},{
    timestamps: false
});


//Forecast.hasMany(Premier, { foreinkey: 'id_pelicula', sourceKey: 'id' });
//Premier.belongsTo(Forecast, { foreinkey: 'id_pelicula', targetId: 'id' });

module.exports = Forecast;