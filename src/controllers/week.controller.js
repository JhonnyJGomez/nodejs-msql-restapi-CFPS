import Week from '../models/Week';

export async function getWeek(req, res) {
    // extract date from URL 
    var fecha  = req.query.fecha_inicial;
    console.info(fecha)
    var date = new Date(fecha);
    // get day in a week 0 = sunday and 6 = saturday
    var n_day = date.getDay();
    console.log("n_day", n_day)
    
    // setting the Thursday of the week respect of got date from the URL 
    if (n_day == 0) {
        date.setDate(date.getDate() - 3);
    }else if (n_day == 1) {
        date.setDate(date.getDate() - 4);
    }else if (n_day == 2) {
        date.setDate(date.getDate() - 5);
    }else if (n_day == 3) {
        date.setDate(date.getDate() - 6);
    }else if (n_day == 5) {
        date.setDate(date.getDate() - 1);
    }else if (n_day == 6) {
        date.setDate(date.getDate() - 2);
    }
   console.log("pasandola a jueves ",date); 
   
      const week = await Week.findAll({
        attributes: ['id','num_semana'],
        where: {
            fec_inicial: date
        }        
    });
    
    const semana = cleanObj(week);
   
    res.send ({
        "id": semana.id,
        "num_semana": semana.num_semana        
    });
}; 

// convierte la respuesta de sequelize en string, lo limpia para convertirlo en json y devolver el objeto. 
function cleanObj(query) {
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
