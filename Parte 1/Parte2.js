document.addEventListener("DOMContentLoaded", function() {

    const apiUrl = "https://jsonplaceholder.typicode.com/users"; // Reemplaza con la URL real de la API
    const aventurasBody = document.getElementById("aventurasBody");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            aventurasBody.innerHTML = ""; // Limpiar la tabla antes de insertar datos
            data.forEach((aventura, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${aventura.address.city}</td>
                    <td>${aventura.username}</td>
                    <td>${aventura.company.catchPhrase}</td>
                `;
                aventurasBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al obtener las aventuras:", error));

    document.getElementById("contactForm").addEventListener("submit", function (e) {
        // Evitar que el formulario se envíe para validar primero
        e.preventDefault();

        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const messageField = document.getElementById("message");
        const termsField = document.getElementById("terms");
        const subscribeField = document.getElementById("subscribe");

        let isValid = true;

        // Validación del nombre
        const nameError = document.getElementById("nameError");
        if (!/^[a-zA-Z\s]+$/.test(nameField.value)) {
            nameError.classList.remove("d-none");
            isValid = false;
        } else {
            nameError.classList.add("d-none");
        }

        // Validación del correo electrónico
        const emailError = document.getElementById("emailError");
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailField.value)) {
            emailError.classList.remove("d-none");
            isValid = false;
        } else {
            emailError.classList.add("d-none");
        }

        // Validación de los checkboxes
        const checkboxError = document.getElementById("checkboxError");
        if (!termsField.checked && !subscribeField.checked) {
            checkboxError.classList.remove("d-none");
            isValid = false;
        } else {
            checkboxError.classList.add("d-none");
        }

        // Si todo es válido, mostramos el toast de éxito
        if (isValid) {
            const toastEnviar = new bootstrap.Toast(document.getElementById("toastEnviar"));
            toastEnviar.show();

            document.getElementById("contactForm").reset();
        }
    });

    // Agregar evento para limpiar el formulario y mostrar el toast
    document.getElementById("clearFormButton").addEventListener("click", function () {
        document.getElementById("contactForm").reset();
        const toastLimpiar = new bootstrap.Toast(document.getElementById("toastLimpiar"));
        toastLimpiar.show();
    });

    // Funcionalidad de Modo Oscuro/Claro
    const toggleThemeButton = document.getElementById("toggleTheme");
    toggleThemeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const navbar = document.querySelector(".navbar");
        const table = document.querySelector(".table");
        const clock = document.getElementById("digitalClock");

        if (document.body.classList.contains("dark-mode")) {
            navbar.classList.add("navbar-dark-mode");
            toggleThemeButton.textContent = "Modo Claro";
            clock.classList.add("clock-dark-mode");
        } else {
            navbar.classList.remove("navbar-dark-mode");
            toggleThemeButton.textContent = "Modo Oscuro";
            clock.classList.remove("clock-dark-mode");
        }

        if (table) {
            table.classList.toggle("table-dark-mode");
        }
    });

    // Funcionalidad para agrandar la imagen al hacer clic
    const carouselImages = document.querySelectorAll('.carousel-item img');
    const modalImage = document.getElementById('modalImage');

    carouselImages.forEach(image => {
        image.addEventListener('click', function () {
            modalImage.src = this.src;
        });
    });

    // Funcionalidad para cambiar las imágenes del carrusel dinámicamente
    const changeImagesButton = document.getElementById('changeImages');
    const newImages = [
        '../media/imagen-Cambiar1.png',
        '../media/imagen-Cambiar2.png',
        '../media/imagen-Cambiar3.png'
    ];

    changeImagesButton.addEventListener('click', function () {
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (newImages[index]) {
                img.src = newImages[index];
                img.alt = `Nueva Imagen ${index + 1}`;
            }
        });
    });

    // Funcionalidad para reiniciar el carrusel a las imágenes originales
    const originalImages = [
        '../media/playas1.jpg',
        '../media/fotografia.jpg',
        '../media/Montañas1.jpg'
    ];

    const resetCarouselButton = document.getElementById('resetCarousel');
    resetCarouselButton.addEventListener('click', function () {
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (originalImages[index]) {
                img.src = originalImages[index];
                img.alt = `Imagen Original ${index + 1}`;
            }
        });
    });

    // Función para actualizar el reloj en tiempo real
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        document.getElementById('time').textContent = timeString;
        document.getElementById('date').textContent = dateString;
    }

    setInterval(updateClock, 1000);
    updateClock();
});