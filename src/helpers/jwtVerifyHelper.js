const jwt = require('jsonwebtoken');

// Función para verificar y renovar el token
function verificarYRenovarToken(token, secretKey, tiempoDeVida) {
    try {
        // Verificar el token
        const decoded = jwt.verify(token, secretKey);

            // Eliminar la propiedad 'iat'
            
            delete decoded.iat;

            // Eliminar la propiedad 'exp'
            
            delete decoded.exp;

            

        // Si el token es válido y no está expirado, renovar el tiempo de vida del token
        const nuevoToken = jwt.sign({ ...decoded }, secretKey, { expiresIn: tiempoDeVida });

        return {
            valido: true,
            expirado: false,
            nuevoToken
        };
    } catch (error) {

        console.log(error)

        if (error.name === 'TokenExpiredError') {

            return {
                valido: false,
                expirado: true,
                nuevoToken: null
            };

        } else {
            return {
                valido: false,
                expirado: false,
                nuevoToken: null
            };
        }
    }
}

module.exports = verificarYRenovarToken;