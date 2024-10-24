const { Model } = require('objection');

class Person extends Model {
  static get tableName() {
    return 'person';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
        type: 'object',
        required: ['nombres', 'apellidos', 'fecha_nac', 'nro_telefonico'],
        properties: {
            id: { type: 'integer' },
            nombres: {type: 'string'},
            apellidos: {type: 'string'},
            fecha_nac: {type: 'string', format: 'date'},
            nro_telefonico: {type: 'string'},
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },

        },
        };
    }
}

module.exports = Person;