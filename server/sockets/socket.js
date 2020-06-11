// servidor  SOCKET
const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utiidades');

const usuarios = new Usuarios();

// para conocer que cliente esta conectado
io.on('connection', (cliente) => {


    //el envento escuchar entrarChat
    cliente.on('entrarChat', (recibeUsuario, callback) => {

        let usuarioConectado = recibeUsuario

        console.log(usuarioConectado);


        if (!usuarioConectado.nombre || !usuarioConectado.sala) {
            return callback({
                error: true,
                nombre: 'El nombre y la sala son necesarios'
            });
        }

        // Sintaxis para unir a una sala es join
        cliente.join(usuarioConectado.sala);

        let personas = usuarios.agregarPersona(cliente.id, usuarioConectado.nombre, usuarioConectado.sala);

        //Un envento para Saber Cuales Peronas ingresaron al chat
        cliente.broadcast.to(usuarioConectado.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuarioConectado.sala));

        // si quiero todos los conectados callback(personas);
        callback(usuarios.getPersonasPorSala(usuarioConectado.sala));

    });

    //aqui el servidor escucha mensaje
    cliente.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(cliente.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        cliente.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    });

    cliente.on('disconnect', () => {


        let personaBorrada = usuarios.borrarPersona(cliente.id);

        // console.log('Id Borrado', personaBorrada);


        cliente.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} Salio `));
        //Un envento para Saber Cuales Peronas ingresaron al chat
        cliente.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    // Mensaje Privado servidor Escuchando
    cliente.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(cliente.id);

        cliente.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });

});