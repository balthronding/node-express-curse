const notasCtrol = {};

//Modelo
const nota = require('../models/nota');

notasCtrol.crearNota = async (req, res) =>{
    let errores = [];
    const { titulo, descripcion, enlace, puntuacion, precio, idUsuario } = req.body;    
    if (!titulo) {
      errores.push({ text: "Por favor, escriba un título." });
    }
    if (!descripcion) {
      errerroresors.push({ text: "Por favor, escriba un descripción." });
    }
    if (!enlace) {
      errores.push({ text: "Por favor, escriba un enlace" });
    }

    if (!idUsuario) {
      errores.push({text: "Error en el sistema. No se puede dar de alta una nota sin un usuario asociado"});
    }
  
    if (errores.length > 0) {
      res.json({
        status : "KO",
        respuesta : "No se ha generado la nota correctamente",
        respuestas : errores
      });
    }
    
    const newNota = new nota({ titulo, descripcion, enlace, puntuacion, precio, idUsuario });
    await newNota.save();

    res.json({
      status : "OK",
      respuesta : "Nota generada correctamente"
    });
}


notasCtrol.borrarNota = async (req, res) => {
    const note = await nota.findByIdAndDelete(req.params.id)
    .then (db => {
        res.json({
            status : "OK",
            respuesta : "Nota eliminada." 
        })
    })
    .catch(err => {       
        res.json({
            status : "KO",
            respuesta : "Error al borrar la nota."
        });
    });
}

notasCtrol.obtenerNotas = async (req, res) =>{
  const notas = await nota.find({idUsuario : req.params.id});
  res.json(notas);
}

notasCtrol.actualizarNota = async (req, res) => {
    const { titulo, descripcion, enlace, puntuacion, precio, idUsuario } = req.body;
    await nota.findByIdAndUpdate(req.params.id,  { titulo, descripcion, enlace, puntuacion, precio, idUsuario })
    .then (db => {
      res.json({
          status : "OK",
          respuesta : "Nota actualizada correctamente." 
      })
  })
  .catch(err => {       
      res.json({
          status : "KO",
          respuesta : "Error al actualizar la nota."
      });
  });
}

module.exports = notasCtrol;



