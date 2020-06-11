var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');
//referencia jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var divChatMainHeader = $('#divChatMainHeader');

// funciones para renderizar usuarios
function renderizarUsuarioDelChat(personas) { // esto lo que se espera [{},{},{}]

    console.log(personas);

    var html = '';
    var html1 = '';

    html1 += '<div class="p-20 b-b">';
    html1 += '     <h3 class="box-title">Sala de chat <small>' + params.get('sala') + '</small></h3>';
    html1 += '</div>';


    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a >';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {


        html += '<li>';
        html += '  <a data-idx="' + personas[i].id + '" href="javascript: void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"><span>' + personas[i].nombre + '<small class="text-success">online</small></span ></a>';
        html += '</li >';

    };
    // divUsuarios.html(html);

    divChatMainHeader.html(html1);

    divUsuarios.html(html);




}


function renderizarMensaje(mensaje, yo) {


    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ":" + fecha.getMinutes();
    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {

        adminClass = 'danger';


    }





    if (yo) {

        // yo usuario

        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '         <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time" >' + hora + '</div> ';
        html += '</li>';


    } else {

        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg"alt ="user"/></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';

        html += '    </div> ';
        html += '    <div class="chat-time">' + hora + '</div> ';
        html += '</li>';

    }
    // console.log(html);


    divChatbox.append(html);


}

//funcion para el scroll Hacia Abajo automatico
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}





// Listeners de Jquery o escuchas
divUsuarios.on('click', 'a', function() {

    var id = $(this).data('idx');


    if (id) {

        console.log(id);
    }

});
formEnviar.on('submit', function(evento) {

    evento.preventDefault();
    if (txtMensaje.val().trim().length === 0) {
        return;

    }


    socket.emit('crearMensaje', {
        usuario: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {

        // console.log('respuesta del servidor: ', mensaje);
        txtMensaje.val('').focus;
        renderizarMensaje(mensaje, soyYoQueEnvio = true);
        scrollBottom();
    });

    // console.log(txtMensaje.val());

});


socket.emit('crearMensaje', {
    usuario: nombre,
    mensaje: txtMensaje.val()
}, function(mensaje) {

    // console.log('respuesta del servidor: ', mensaje);
    txtMensaje.val('').focus;
    renderizarMensaje(mensaje, soyYoQueEnvio = true);
    scrollBottom()
});

// console.log(txtMensaje.val());