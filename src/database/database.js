import Sequelize from 'sequelize'

// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};


//MSSQL
export const sequelize = new Sequelize(
    'Programacion',
    'admin',
    'admin', {    
    dialect: 'mssql',
    dialectOptions: {
      options: {
        useUTC: false,
        dateFirst: 1,
        enableArithAbort: true,
        validateBulkLoadParameters: true
      }
    }
  });
