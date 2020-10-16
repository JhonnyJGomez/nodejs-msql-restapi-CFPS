import Forecast from '../models/Forecast';


const { sequelize } = require('../database/database');
const { QueryTypes } = require('sequelize');

export async function createForecast(req, res) {

    var { cod_forecast } = '';
    var { estimacion_asistencia } = 0;
    var  reponse_forecast  = new Array;
    reponse_forecast = req.body;
    
    

    // run the array of the service body for doing an insert by every loop

    for (let index = 0; index < reponse_forecast.length; index++) {
        const id_pelicula = reponse_forecast[index].id_pelicula;
        const id_ciudad = reponse_forecast[index].id_ciudad;
        const id_semana = reponse_forecast[index].id_semana;
  
         try {
            let newForecast = await Forecast.create({
                cod_forecast,
                id_semana,
                estimacion_asistencia,
                id_pelicula,
                id_ciudad
            }, {
                fields: ['cod_forecast','id_semana', 'estimacion_asistencia', 'id_pelicula','id_ciudad']
                });

            if ((newForecast) &&= (index + 1 == reponse_forecast.length)) {
                return res.json({
                    Result: 'OK'
                })
            } 
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Something Goes Wrong. Try Again.',
                data: {},
            })
        } 
    }
};


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
        {replacements: { id_ciudad: req.query.id_ciudad, id_semana:  req.query.num_semana}, type: QueryTypes.SELECT })
 
          return res.json({
            Value: premiersbyWeek
        })

    } catch (error) {
        console.log(error);
    }
  
}