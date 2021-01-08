const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretkey';

async function verificarToken (req, res, next) {
    
    
    try {        
		if (!req.headers.authorization) {
			return res.status(401).json({
                status : "KO",
                respuesta : "Solicitud no autorizada"
            });              
		}
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
			return res.status(401).json({
                status : "KO",
                respuesta : "Solicitud no autorizada"
            });
        }
        
        const payload = await jwt.verify(token, TOKEN_SECRET);
		if (!payload) {
			return res.status(401).json({
                status : "KO",
                respuesta : "Solicitud no autorizada"
            });
		}
		req.userId = payload._id;
		next();
	} catch(e) {		
        return res.status(401).json({
            status : "KO",
            respuesta : "Solicitud no autorizada"
        });
        
	}
}

module.exports = verificarToken;