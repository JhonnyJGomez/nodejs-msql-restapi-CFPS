import Forecast from '../models/Forecast';

const { sequelize } = require('../database/database');
const { QueryTypes } = require('sequelize');

export async function createForecast(req, res) {
    var { estimacion_asistencia } = 0;
    const peliculas_seleccionadas = req.body.peliculas_seleccionadas;

    peliculas_seleccionadas.forEach(async function(pelicula, index){
        const { id_pelicula, id_ciudad, id_semana } = pelicula;
        const cod_forecast = id_ciudad + '' + id_semana;

        try {
            const forecast = await Forecast.findOne({
                attributes: ['id', 'cod_forecast', 'id_semana', 'estimacion_asistencia', 'id_pelicula', 'id_ciudad'],
                where: {
                    cod_forecast: cod_forecast,
                    id_pelicula: id_pelicula
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
    try {
        const premiersbyWeek = await sequelize.query(
            "select forecasts.id as id_forecast, forecasts.cod_forecast as cod_forecast,peliculas.id as id_movie,peliculas.cod_pelicula as cod_pelicula,peliculas.titulo as nom_pelicula,forecasts.estimacion_asistencia as asistencia from forecasts, peliculas where	forecasts.id_pelicula = peliculas.id and id_ciudad = :id_ciudad and	id_semana = :id_semana",
            { replacements: { id_ciudad: req.query.id_ciudad, id_semana: req.query.num_semana }, type: QueryTypes.SELECT }
        )

        return res.json({
            Value: premiersbyWeek
        })

    } catch (error) {
        console.log(error);
    }
}

export function getForecastReport(req, res) {
    sequelize.query(
        `select fp.value as Rank,
            p.titulo as Title,
            r.nom_rating as Rating,
            d.nom_distribuidor as Dist,
            g.nom_genero as Genre,
            s.fec_inicial as ReleaseDate,
            f.estimacion_asistencia as 'Scored Labels'
            from forecasts f, peliculas p, ratings r, distribuidores d, semanas s, generos g, forecast_parametros fp
            where f.id_pelicula = p.id
            and f.cod_forecast = :cod_forecast
            and f.id_semana = s.id
            and p.id_distributor = d.id
            and p.id_genero = g.id
            and p.id_rating = r.id
            and fp.id_pelicula = p.id
            and fp.id_parametro = 8
        `,
        { replacements: { cod_forecast: req.params.cod_forecast}, type: QueryTypes.SELECT }
    ).then(function(response) {
        res.json({
            Results: {
                output1: response
            }
        });
    }, function() {
        console.log("Error obteniendo el forecast");
    });
}