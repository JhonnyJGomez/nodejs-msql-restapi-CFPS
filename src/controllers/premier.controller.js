import Premier from '../models/Premier';

export async function getPremiersbyWeek(req, res) {
     // extract week from URL 
     var idWeek  = req.query.id_semana;
     



     const premier = await Premier.findAll({
        attributes: ['cod_pelicula','titulo','id_rating','id_distributor','id_genero'],
        where: {
            id_fec_estreno: idWeek
        }        
    });

    const premierQuemado = "value: [{Cod_pelicula: 'HO00001', title: 'MALEFICENT: MISTRESS OF EVIL',Rating: 'A',Dist: 'DISNEY',Genre: 'Adventure'}}]";
    res.json({
        value:premier 
    });
}

