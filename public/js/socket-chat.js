// EL CLIENTE O CLIENTES
var socket = io();

var params = new URLSearchParams(window.location.search);
console.log(params);

if (!params.has('nombre') || !params.has('sala')) {

    //redirecciono a undex.html
    window.location = 'index.html';
    throw new Error('El Nombre y sala son necesarios');

}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

//  el evento de conexion
socket.on('connect', function() {
    console.log('conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuario conectados:', resp);
    });

});

// detectar que mi servidor se deconecto
//(.on) on son para escuchar evento y los emit para enviar informacion
socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});

//Enviar Informacio (.emit) //cadena o boolean lo recomendarme es enviar objeto{}
/*
socket.emit('crearMensaje', {
    usuario: 'Darwin Uzcategui',
    mensaje: 'Hola Darwin'
}, function(resp) {
    // console.log('se disparo el callback');
    console.log('respuesta del servidor: ', resp);
});
*/
// escuchar informacion
socket.on("crearMensaje", function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Escuchar cambio de usuarios
// Cuandoun usuario entra y sale del chat//Un envento para Saber Cuales Peronas ingresaron al chat
socket.on('listaPersona', function(personas) {
    console.log('personas', personas);
});

// Mensajes Privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('mensaje Privado:', mensaje);

});