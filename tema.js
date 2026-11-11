const contenedorIndice = document.getElementById('indice-automatico');
const subtitulos = document.querySelectorAll('main h2');

subtitulos.forEach(h2 => {
    const itemLista = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = `#${h2.id}`;
    enlace.textContent = h2.textContent;
    itemLista.appendChild(enlace);
    contenedorIndice.appendChild(itemLista);
});

const btnModo = document.getElementById('btn-modo');
btnModo.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    if (document.body.classList.contains('modo-oscuro')) {
        btnModo.textContent = "Modo claro";
    } else {
        btnModo.textContent = "Modo oscuro";
    }
});

const botonesTamano = document.querySelectorAll('.btn-tamano');
botonesTamano.forEach(boton => {
    boton.addEventListener('click', (evento) => {
        document.body.classList.remove('texto-pequeno', 'texto-estandar', 'texto-grande');
        botonesTamano.forEach(b => b.classList.remove('activo'));
        
        const tamano = evento.target.getAttribute('data-size');
        document.body.classList.add(`texto-${tamano}`);
        evento.target.classList.add('activo');
    });
});

const secciones = document.querySelectorAll('main section');
secciones.forEach(seccion => {
    const h2 = seccion.querySelector('h2');
    if (h2) {
        h2.addEventListener('click', () => {
            seccion.classList.toggle('plegado');
        });
    }
});

const formComentarios = document.getElementById('form-comentarios');
const inputNombre = document.getElementById('nombre-usuario');
const inputComentario = document.getElementById('texto-comentario');
const contadorCaracteres = document.getElementById('contador-caracteres');
const mensajeError = document.getElementById('mensaje-error');
const listaComentarios = document.getElementById('lista-comentarios');

inputComentario.addEventListener('input', () => {
    const longitud = inputComentario.value.length;
    contadorCaracteres.textContent = `${longitud}/200`;
});

formComentarios.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    const nombre = inputNombre.value.trim();
    const comentario = inputComentario.value.trim();
    
    inputNombre.classList.remove('error-input');
    inputComentario.classList.remove('error-input');
    mensajeError.classList.add('oculto');

    if (nombre === '') {
        inputNombre.classList.add('error-input');
        mensajeError.textContent = "El nombre no puede estar vacío.";
        mensajeError.classList.remove('oculto');
        return;
    }

    if (comentario.length < 10 || comentario.length > 200) {
        inputComentario.classList.add('error-input');
        mensajeError.textContent = "El comentario debe tener entre 10 y 200 caracteres.";
        mensajeError.classList.remove('oculto');
        return;
    }

    const nuevoComentario = document.createElement('li');
    const textoUsuario = document.createElement('strong');
    textoUsuario.textContent = `${nombre}: `;
    
    const textoMensaje = document.createElement('span');
    textoMensaje.textContent = comentario; 
    
    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = "Borrar";
    btnBorrar.style.marginLeft = "10px";
    btnBorrar.addEventListener('click', () => {
        nuevoComentario.remove();
    });

    nuevoComentario.appendChild(textoUsuario);
    nuevoComentario.appendChild(textoMensaje);
    nuevoComentario.appendChild(btnBorrar);
    listaComentarios.appendChild(nuevoComentario);

    formComentarios.reset();
    contadorCaracteres.textContent = "0/200";
});