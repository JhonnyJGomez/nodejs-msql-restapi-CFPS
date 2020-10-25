const { sequelize } = require('../database/database');
const { QueryTypes } = require('sequelize');

/**
 * Genera la programacion
 *
 * @param req - http.IncomingMessage
 * @param res - http.ServerResponse
 */
export function generateSchedule(req, res) {
    sequelize.query(`
        select pe.id, pe.titulo, ge.nom_genero, ra.nom_rating, pr.id_dia, sa.nom_sala, sa.capacidad, pr.id_tiempo
        from peliculas pe, generos ge, ratings ra, programacion pr , salas sa
        where pr.estado = 1
        and pr.id_semana = :week
        and pr.id_sala = sa.id
        and pe.id in (:premieres_forecast_ids)
        and pe.id_genero = ge.id
        and pe.id_rating = ra.id
        and pe.id = pr.id_pelicula
        and sa.id_cines = :cinemaId
        order by pr.id_dia, sa.nom_sala, pr.id_tiempo asc
    `,
    {
        replacements: {
            week: req.body.week,
            premieres_forecast_ids: req.body.premieres_forecast_ids,
            cinemaId: req.body.cinemaId
        },
        type: QueryTypes.SELECT
    }).then(function (response) {
        res.json({
            status: response
        });
    }, function (error) {
        console.log(error);
        console.log("Un error ha ocurrido generando la programacion");
    })
}