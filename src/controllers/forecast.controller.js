import Forecast from '../models/Forecast';


const { sequelize } = require('../database/database');
const { QueryTypes } = require('sequelize');

export async function createForecast(req, res) {

    var { estimacion_asistencia } = 0;
    var reponse_forecast = new Array;
    reponse_forecast = req.body;
    reponse_forecast.forEach(async function(element, index){
        const id_pelicula = element.id_pelicula;
        const id_ciudad = element.id_ciudad;
        const id_semana = element.id_semana;
        const cod_forecast = id_ciudad + '' + id_semana;

        try {
            const forecast = await Forecast.findOne({
                attributes: ['id', 'cod_forecast', 'id_semana', 'estimacion_asistencia', 'id_pelicula', 'id_ciudad'],
                where: {
                    cod_forecast: cod_forecast
                },
            });

            if (forecast) {
                try {
                    await forecast.update({
                        cod_forecast,
                        id_semana,
                        estimacion_asistencia,
                        id_pelicula,
                        id_ciudad
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    await Forecast.create({
                        cod_forecast,
                        id_semana,
                        estimacion_asistencia,
                        id_pelicula,
                        id_ciudad
                    }, {
                        fields: ['cod_forecast', 'id_semana', 'estimacion_asistencia', 'id_pelicula', 'id_ciudad']
                    });
                } catch (e) {
                    console.log(e);
                }
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Something Goes Wrong. Try Again.',
                data: {},
            })
        }
    });

    // run the array of the service body for doing an insert by every loop 
    
    res.json({
        Result: 'OK'
    });
};

export async function updateForecast(req, res) {

    const data = req.body.data;
    if (data.length > 0) {
        data.forEach(async function (element) {
            const { cod_forecast } = req.params;
            await sequelize.query(`
                update forecasts set estimacion_asistencia = :estimacion_asistencia
                where id_pelicula in (select id from peliculas where titulo = :titulo)
                and cod_forecast = :cod_forecast
            `,
                { replacements: { cod_forecast: cod_forecast, estimacion_asistencia: parseInt(element['Scored Labels']), titulo: element['Title'] }, type: QueryTypes.SELECT })
        });

        res.json({
            value: "Updated"
        });
    }
}

export async function getPremierbyForecast(req, res) {
    console.log("Directo--> " + req.query.id_ciudad);

    console.log("Directo--> " + req.query.num_semana);

    /* select using RAW QUERY 
        const { QueryTypes } = require('sequelize');
    
        const users = await sequelize.query("SELECT * FROM forecasts", { type: QueryTypes.SELECT });
    console.log(users); 
    
     sequelize.query('CALL ForecastbyWeekCity :id_ciudad, :id_semana', 
              {replacements: { id_ciudad: req.query.id_ciudad, id_semana:  req.query.num_semana}})
        .then(v=>console.log(v));  */

    // extract parameters from URL 
    // const {id_ciudad} = req.query.id_ciudad
    // const {id_semana } = req.query.num_semana


    try {

        const premiersbyWeek = await sequelize.query("select forecasts.id as id_forecast, forecasts.cod_forecast as cod_forecast,peliculas.id as id_movie,peliculas.cod_pelicula as cod_pelicula,peliculas.titulo as nom_pelicula,forecasts.estimacion_asistencia as asistencia from forecasts, peliculas where	forecasts.id_pelicula = peliculas.id and id_ciudad = :id_ciudad and	id_semana = :id_semana",
            { replacements: { id_ciudad: req.query.id_ciudad, id_semana: req.query.num_semana }, type: QueryTypes.SELECT })

        return res.json({
            Value: premiersbyWeek
        })

    } catch (error) {
        console.log(error);
    }

}