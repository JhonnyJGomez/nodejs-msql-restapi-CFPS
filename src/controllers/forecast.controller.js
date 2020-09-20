import Forecast from '../models/Forecast';

export async function createForecast(req, res) {

    const { num_semana, id_ciudad, movies } = req.body;
    console.log (num_semana);
    console.log (id_ciudad);
    console.log (movies);


//    [ { cod_pelicula: 'HO00001' }, { cod_pelicula: 'HO00002' } ]

//    {cod_forecast: '', id_semana: num_semana , estimacion_asistencia: , id_pelicula: , id_ciudad: id_ciudad},

    // convierte la respuesta de sequelize en string, lo limpia para convertirlo en json y devolver el objeto. 
    function cleanObj(movies) {
        if (query != ''){
            var toJson = JSON.stringify(query)
            toJson = toJson.replace('[','');
            toJson = toJson.replace(']','');
            var obj = JSON.parse(toJson);
        }else{
            obj = "{}"
        }

        return obj;
    }



   try {
        let newForecast = await Forecast.create({
            num_semana,
            id_ciudad,
            movies
        }, {
                fields: ['id_semana', 'id_ciudad', 'description', 'deliverydate']
            });
        if (newProject) {
            return res.json({
                message: 'New Project created',
                data: newProject
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something Goes Wrong. Try Again.',
            data: {},
        })
    }
    res.json('OK');
};


