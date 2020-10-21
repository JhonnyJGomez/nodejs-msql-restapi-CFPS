
const { sequelize } = require('../database/database');
const { QueryTypes } = require('sequelize');



export async function getCinemasbyCity(req, res) {
        try {

        const cinemabyCity = await sequelize.query("select id, nom_cine, ticket_promedio from cines where id_ciudad = :id_ciudad",
        {replacements: { id_ciudad: req.query.cod_ciudad}, type: QueryTypes.SELECT })
 
          return res.json({
            value: cinemabyCity
        })

    } catch (error) {
        console.log(error);
    }
  
}
