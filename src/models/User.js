const { Model } = require('objection');

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
        type: 'object',
        required: ['username', 'email'],
        properties: {
            id: { type: 'integer' },
            person_id: { type: 'integer'},
            username: { type: 'string' },
            email: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
        } ,
        };
    }
}

module.exports = Users;