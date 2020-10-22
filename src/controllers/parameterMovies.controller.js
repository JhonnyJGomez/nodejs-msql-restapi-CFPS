import ParameterMovie from '../models/ParameterMovie';

const { sequelize } = require('../database/database');
const { QueryTypes } = require('sequelize');

/**
 * Valida si se necesita crear o actualizasr un parametro
 *
 * @param paramIndex - Index of param array
 * @param req - http.IncomingMessage
 * @param res - http.ServerResponse
 */
function checkMovieParameter(paramIndex, req, res) {
    const { Value } = req.body;

    if (Value[paramIndex]) {
        const paramToCheck = Value[paramIndex];

        ParameterMovie.findOne({
            attributes: ['id_parametro', 'id_pelicula', 'value', 'id'],
            where: {
                id_parametro: paramToCheck.id_parametro,
                id_pelicula: paramToCheck.id_pelicula
            },
        }).then(function (param) {
            if (param) {
                updateMovieParameter(param, paramToCheck.value).then(function () {
                    const nextParam = paramIndex + 1;
                    checkMovieParameter(nextParam, req, res);
                }, function () { })
            } else {
                createMovieParameter(paramToCheck).then(function () {
                    const nextParam = paramIndex + 1;
                    checkMovieParameter(nextParam, req, res);
                }, function () { })
            }
        })
    } else {
        response(req, res);
    }
}

/**
 * Responde a la UI con los datos del parametro actualizado
 *
 * @param req - http.IncomingMessage
 * @param res - http.ServerResponse
 */
function response(req, res) {
    sequelize.query(`select
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
    {
        replacements: {
            id_pelicula: req.query.id_pelicula
        },
        type: QueryTypes.SELECT
    }).then(function (response) {
        res.json({
            value: response
        });
    }, function() {
        console.log("Un error ha ocurrido obteniendo los datos despues de actualizar los datos de la pelicula en el forecast");
    })
}

/**
 * Crea un nuevo parametro en el forcast.
 *
 * @param params - Objeto con los datos para crear un registro
 */
function createMovieParameter(params) {
    return new Promise(function (resolve, reject) {
        ParameterMovie.create(params).then(function () {
            resolve();
        }, function () {
            reject();
        });
    });
};

/**
 * Actualiza un parametro en el forcast.
 *
 * @param param - Instancia del modelo ParameterMovie
 * @param valueToSave - Objeto con los datos para crear un registro
 */
function updateMovieParameter(param, valueToSave) {
    return new Promise(function (resolve, reject) {
        param.update({ value: valueToSave }).then(function () {
            resolve();
        }, function () {
            reject();
        });
    });
};

/**
 * Validar si un parametro para el forcast existe actualiza los valores de no ser
 * asi inserta un nuevo parametro del forcast.
 *
 * @param req - http.IncomingMessage
 * @param res - http.ServerResponse
 */
export function validateMovieParameter(req, res) {
    let i = 0;
    checkMovieParameter(i, req, res)
};
