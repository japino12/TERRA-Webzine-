/* TERRA Zine - Validación de Formulario y Fuerza de Contraseña */

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-registro');
    const inputUsuario = document.getElementById('nombredeusuario');
    const inputCorreo = document.getElementById('correo');
    const inputPassword = document.getElementById('contraseña');
    const barraSeguridad = document.getElementById('nivel-seguridad');

    // Evaluar fuerza de contraseña en tiempo real
    inputPassword.addEventListener('input', () => {
        const valor = inputPassword.value;
        let porcentaje = 0;
        let color = 'var(--color-error)';

        if (valor.length > 0) {
            const tieneLetras = /[A-Za-z]/.test(valor);
            const tieneNumeros = /[0-9]/.test(valor);
            const tieneEspeciales = /[^A-Za-z0-9]/.test(valor);
            const longitudCorrecta = valor.length >= 8;

            if (longitudCorrecta && tieneLetras && tieneNumeros) {
                porcentaje = 100;
                color = 'var(--color-exitoso)'; // Fuerte
            } else if (valor.length >= 5 && (tieneLetras || tieneNumeros)) {
                porcentaje = 50;
                color = 'var(--color-advertencia)'; // Media
            } else {
                porcentaje = 25;
                color = 'var(--color-error)'; // Débil
            }
        }

        barraSeguridad.style.width = `${porcentaje}%`;
        barraSeguridad.style.backgroundColor = color;
    });

    // Controlar validación al enviar
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const usuarioValido = inputUsuario.checkValidity();
        const correoValido = inputCorreo.checkValidity();
        const passwordValido = inputPassword.checkValidity();

              if (usuarioValido && correoValido && passwordValido) {
            // Muestra el mensaje de éxito
            alert(`¡Registro exitoso!\n\nUsuario: ${inputUsuario.value}\n\n¡Bienvenido a TERRA Zine!`);
            
            // Redirige automáticamente al index de la revista
            window.location.href = 'index.html';
        } else {
            // Indicar error si hay campos incorrectos
            alert('Por favor, completa correctamente los campos antes de continuar.');
        }
    });

    // Alternar vista completa del artículo al hacer clic en "Leer artículo" (con accesibilidad)
    const readBtns = document.querySelectorAll('.read-more-btn');
    readBtns.forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.article-card');
            if (!card) return;
            const expanded = card.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            if (expanded) {
                btn.innerHTML = 'Ocultar artículo <i class="fa-solid fa-chevron-right"></i>';
                btn.classList.add('open');
            } else {
                btn.innerHTML = 'Leer artículo <i class="fa-solid fa-chevron-right"></i>';
                btn.classList.remove('open');
            }
        });
    });
});