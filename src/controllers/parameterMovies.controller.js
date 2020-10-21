const { sequelize } = require('../database/database');
const { QueryTypes } = require('sequelize');
import ParameterMovie from '../models/ParameterMovie';
/**
 * Validar si un parametro para el forcast existe actualiza los valores de no ser
 * asi inserta un nuevo parametro del forcast.  
 *
 * @param req - http.IncomingMessage
 * @param res - http.ServerResponse
 */
export async function validateMovieParameter(req, res) {
    const { Value } = req.body;

    Value.forEach(async function (element) {
        const param = await ParameterMovie.findOne({
            attributes: ['id_parametro', 'id_pelicula', 'value', 'id'],
            where: {
                id_parametro: element.id_parametro,
                id_pelicula: element.id_pelicula
            },
        });

        if (param) {
            updateMovieParameter(param, element.value)
        } else {
            createMovieParameter(element)
        }
    })

    const queryAzure = await sequelize.query(`select forecast_parametros.value, 
        forecast_parametros.value as Rank, 
        peliculas.titulo as Title,
        ratings.nom_rating as Rating,
        distribuidores.nom_distribuidor as Dist,
        generos.nom_genero as Genre from peliculas,
        distribuidores,
        ratings,
        generos,
        forecast_parametros where peliculas.id = :id_pelicula and
        peliculas.id_distributor = distribuidores.id
        and peliculas.id_rating = ratings.id
        and peliculas.id_genero = generos.id
        and peliculas.id = forecast_parametros.id_pelicula
        and forecast_parametros.id_parametro in (select id from parametros where id_parametro = 8)
    `,
    { replacements: { id_pelicula: req.query.id_pelicula}, type: QueryTypes.SELECT })

    res.json({
        value: queryAzure
    });
};

/**
 * Crea un nuevo parametro en el forcast. 
 *  
 * @param params - Objeto con los datos para crear un registro
 */
async function createMovieParameter(params) {
    try {
        await ParameterMovie.create(params);
    }
    catch (error) {
        console.log(error);
    }
};

/**
 * Actualiza un parametro en el forcast.   
 *
 * @param param - Instancia del modelo ParameterMovie
 * @param valueToSave - Objeto con los datos para crear un registro
 */
async function updateMovieParameter(param, valueToSave) {
    try {
        await param.update({ value: valueToSave })
    } catch (e) {
        console.log(e);
    }
};
