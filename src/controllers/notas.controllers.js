const notasCtrol = {};

//Modelo
const nota = require('../models/nota');

notasCtrol.crearNota = async (req, res) =>{
    let errors = [];
    const { titulo, descripcion, enlace } = req.body;    
    if (!titulo) {
      errors.push({ text: "Por favor, escriba un título." });
    }
    if (!description) {
      errors.push({ text: "Por favor, escriba un descripción." });
    }
    if (!enlace) {
      errors.push({ text: "Por favor, escriba un enlace" });
    }
  
    if (errors.length > 0) {
      res.json(errors);
    }
    
    const newNota = new nota({ titulo, descripcion, enlace });
    await newNota.save();

    res.send("Se ha generado la nota");
}


notasCtrol.borrarNota = async (req, res) => {
    const nota = await nota.findByIdAndDelete(req.params.id)
    .then (db => {
        res.json({
            status : "OK",
            respuesta : "Nota eliminada." 
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            status : "KO",
            respuesta : "Error al borrar la nota."
        })
    });
}

module.exports = notasCtrol;



