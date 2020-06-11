const crearMensaje = (nombrePersona, mensajePersona) => {

    return {
        nombre: nombrePersona,
        mensaje: mensajePersona,
        fecha: new Date().getTime()
    }

}

module.exports = {

    crearMensaje
}