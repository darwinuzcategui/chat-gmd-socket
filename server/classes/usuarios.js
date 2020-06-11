class Usuarios {

    constructor() {
        this.personas = [];
    };

    // colocar los metodos de la clases

    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;

    };


    // metodo retorna una persona
    getPersona(id) {

        let persona = this.personas.filter(pers => pers.id === id)[0];

        return persona; // si no encuentra la persona envia undefine o null


    };

    // metodo retorna todas las personas
    getPersonas() {

        return this.personas;
    }

    // Metodos de personas por salas de chat gmd
    getPersonasPorSala(sala) {

        let personasEnSala = this.personas.filter(persona => persona.sala === sala);

        // retornas las personas de salas
        return personasEnSala;

    }

    // borrar las personas del chat
    borrarPersona(id) {

        let personaBorrada = this.getPersona(id)

        this.personas = this.personas.filter(pers => pers.id != id);

        return personaBorrada;

    }



    // fin de la classes
};



module.exports = {
    Usuarios
}