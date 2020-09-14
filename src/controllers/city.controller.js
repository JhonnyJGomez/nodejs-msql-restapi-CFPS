import City from '../models/City';

export async function getCities(req, res){
    const city = await City.findAll({
        attributes: ['id','nom_ciudad']
    });

    res.json({
        value: city
    });
}  
