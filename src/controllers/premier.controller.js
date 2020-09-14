import Premier from '../models/Premier';

export async function getPremiersbyWeek(req, res) {
     // extract week from URL 
     var week  = req.query.num_semana;
     console.log("entro al controller", week);

     const premier = await Premier.findAll({
        attributes: ['id','cod_pelicula','titulo','descripcion','formato','idioma','id_fec_estreno','id_genero','id_rating','id_distributor'],
        where: {
            id_fec_estreno: week
        }        
    });
    res.json(premier);
}

