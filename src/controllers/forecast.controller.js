import Forecast from '../models/Forecast';
import Premier from './premier.controller';

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

