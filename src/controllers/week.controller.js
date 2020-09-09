import Week from '../models/Week';
var moment = require('moment');

export async function getWeek(req, res) {
    // extract date from URL 
    var fecha  = req.query.fecha_inicial;
    console.info(fecha)
    var date = new Date(fecha);
    // get day in a week 0 = sunday and 6 = saturday
    var n_day = date.getDay();

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
        attributes: ['id'],
        where: {
            fec_inicial: date
        }
    });

    res.json({
        num_semana: week,
    //    ingresada: fecha,
    //    jueves_sem: date

    }); 
}; 