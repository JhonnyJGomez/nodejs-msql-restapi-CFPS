import Premier from '../models/Premier';


export async function getPremiersbyWeek(req, res) {
     // extract week from URL 
     var idWeek  = req.query.id_semana;

     const premier = await Premier.findAll({
        attributes: ['id','cod_pelicula','titulo','id_rating','id_distributor','id_genero'],
        where: {
            id_fec_estreno: idWeek
        }        
    });

    res.json({
        value:premier 
    });
}

