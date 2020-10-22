import Parameter from '../models/Parameter';
import ParameterProgram from '../models/ParameterProgram';

export async function getParameters(req, res) {
    const parameter = await Parameter.findAll({
        attributes: ['id', 'cod_parametro', 'type'],
        where: {
            status: 1,
            about: ['all', 'forecast']
        }
    });

    res.json({
        Value: parameter
    });
}

export async function getParametersProgram(req, res) {
    const parameter = await Parameter.findAll({
        attributes: ['id', 'cod_parametro', 'type'],
        where: {
            status: 1,
            about: ['all', 'program']
        }
    });

    res.json({
        value: parameter
    });
}

/**
 * Valida si se necesita crear o actualizasr un parametro
 *
 * @param paramIndex - Index of param array
 * @param req - http.IncomingMessage
 * @param res - http.ServerResponse
 */
function checkProgramParameter(paramIndex, req, res) {
    const { value } = req.body;

    if (value[paramIndex]) {
        const paramToCheck = value[paramIndex];

        ParameterProgram.findOne({
            attributes: ['id_parametro', 'id_forecast', 'value', 'id'],
            where: {
                id_parametro: paramToCheck.id_parametro,
                id_forecast: paramToCheck.cod_forecast
            },
        }).then(function (param) {
            if (param) {
                updateProgramParameter(param, paramToCheck.value).then(function () {
                    const nextParam = paramIndex + 1;
                    checkProgramParameter(nextParam, req, res);
                }, function () { })
            } else {
                createProgramParameter({
                    id_parametro: paramToCheck.id_parametro,
                    id_forecast: paramToCheck.cod_forecast,
                    value: paramToCheck.value
                }).then(function () {
                    const nextParam = paramIndex + 1;
                    checkProgramParameter(nextParam, req, res);
                }, function () { })
            }
        })
    } else {
        response(req, res);
    }
}


/**
 * Crea un nuevo parametro en el programa.
 *
 * @param params - Objeto con los datos para crear un registro
 */
function createProgramParameter(params) {
    return new Promise(function (resolve, reject) {
        ParameterProgram.create(params).then(function () {
            resolve();
        }, function (error) {
            reject();
        });
    });
};

/**
 * Actualiza un parametro en el forcast.
 *
 * @param param - Instancia del modelo ParameterProgram
 * @param paramToSave - Objeto con los datos para crear un registro
 */
function updateProgramParameter(param, paramToSave) {
    return new Promise(function (resolve, reject) {
        param.update({ value: paramToSave }).then(function () {
            resolve();
        }, function () {
            reject();
        });
    });
};

/**
 * Responde a la UI con los datos del parametro actualizado
 *
 * @param req - http.IncomingMessage
 * @param res - http.ServerResponse
 */
function response(req, res) {
    res.json({
        Result: "OK"
    });
}

/**
 * Validar si un parametro para el programa existe, actualiza los valores de no ser
 * asi inserta un nuevo parametro del programa.
 *
 * @param req - http.IncomingMessage
 * @param res - http.ServerResponse
 */
export function saveParamProgram(req, res) {
    let i = 0;
    checkProgramParameter(i, req, res)
}