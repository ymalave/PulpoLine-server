const { Model } = require('objection');
const Knex = require('knex');
const Usuario = require('../models/User');
const Persona = require('../models/Person');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// Configura Knex
const environment = process.env.NODE_ENV || 'development';
const knex = Knex(require('../knexfile')[environment]);
Model.knex(knex);

class UserService {
    constructor() { }

    async findAllUsers() {
        const usuarios = await Usuario.query();
        return usuarios;
    }

    async authenticateUser(username, pass){
        if(username == '' || pass == ''){
          const results = {icon: 'warning', msj: 'Por favor rellene todos los campos'}
          return results;
        }
        try{
            const user = await Usuario.query().where('username', username).first();
            if (!user) {
              const results = {icon: 'warning', msj: 'Usuario inválido', code:403}
              return results;
            }
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                const persona = await Persona.query().findById(user.person_id);
                const secretKey = crypto.randomBytes(32).toString('hex'); 
                let token = jwt.sign({persona, uid: user.id, username: user.username}, secretKey, {expiresIn: '1h'});
                
                const { password, created_at, updated_at, ...filteredUser } = user;
                const results = {icon: 'success', msj: 'Has iniciado sesión', token, persona, user: filteredUser, code:200}
                return results;
            } else {
              const results = {icon: 'warning', msj: 'Contraseña incorrecta', code:403}
              return results;
            }
        }catch (error) {
          console.log(error)
          const results = {icon: 'error', msj: 'Ha ocurrido un error', error, code:403}
          return results;
        }
    }

    async create(data) {
        try {
            const trx = await Usuario.startTransaction();
            const persona = await Persona.query(trx).findById(data.person_id);

            if(!persona){
                const person = await Persona.query(trx).insert({
                    id: data.person_id,
                    nombres: data.name,
                    apellidos: data.lastname,
                    fecha_nac: '2001-03-13',
                    nro_telefonico: data.phone
                });   
            }

            const model = await Usuario.query(trx)
                                .where(function () {
                                    this.where('person_id', data.person_id)
                                        .orWhere('username', data.username);
                                })
                                .first();
            if (model) {
                const result = { icon: 'warning', msj: 'El usuario existe', code: 1 };
                return result;
            }
            const hash = await bcrypt.hash(data.password, 10);
            const valores = {
                person_id: parseInt(data.person_id),
                username: data.username,
                email: data.email,
                password: hash,
            };
            const res = await Usuario.query(trx).insert(valores);
            // Commit de la transacción
            await trx.commit();
           return res;
        } catch (error) {
            console.log(error);
            if (trx) await trx.rollback();
            const results = { icon: 'error', msj: 'Ha ocurrido un error', error: error }
            return results;
        }

    }

}



module.exports = UserService;