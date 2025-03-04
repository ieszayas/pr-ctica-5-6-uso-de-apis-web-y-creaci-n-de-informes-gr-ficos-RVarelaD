/*
 * Descripción: Maneja la funcionalidad de la página:
 *  - Obtención y visualización de datos mediante Chart.js y tabla.
 *  - Validación y manejo del formulario de contacto.
 *  - Alternancia entre modo oscuro y claro.
 *  - Funcionalidades de carrusel y modal de imágenes.
 *  - Actualización en tiempo real del reloj digital.
 */

document.addEventListener("DOMContentLoaded", function () {

    // URL de la API para obtener usuarios (para el gráfico)
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    // Contexto del canvas para el gráfico de Chart.js
    const ctx = document.getElementById("cityChart").getContext("2d");

    // Obtener datos de la API y construir un gráfico circular
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Contar cuántos usuarios hay en cada ciudad
            const cityCounts = {};
            data.forEach(user => {
                const city = user.address.city;
                cityCounts[city] = (cityCounts[city] || 0) + 1;
            });

            // Preparar datos para Chart.js
            const cities = Object.keys(cityCounts);
            const userCounts = Object.values(cityCounts);

            // Crear el gráfico circular (pie chart)
            new Chart(ctx, {
                type: "pie",
                data: {
                    labels: cities,
                    datasets: [{
                        label: "Usuarios por Ciudad",
                        data: userCounts,
                        backgroundColor: "rgb(0, 123, 255)",
                        borderColor: "rgb(172, 172, 172)",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error al obtener los datos:", error));

    // Segunda llamada a la API para poblar la tabla de "aventuras"
    const apiUrl2 = "https://jsonplaceholder.typicode.com/users"; // Reemplaza con la URL real de la API
    const aventurasBody = document.getElementById("aventurasBody");

    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            // Limpiar la tabla antes de insertar datos
            aventurasBody.innerHTML = "";
            data.forEach((aventura, index) => {
                // Crear una fila con los datos de cada usuario
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

    // Evento para validar y manejar el envío del formulario de contacto
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        // Prevenir el envío para validar los campos primero
        e.preventDefault();

        // Obtener referencias a los campos del formulario
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const messageField = document.getElementById("message");
        const termsField = document.getElementById("terms");
        const subscribeField = document.getElementById("subscribe");

        let isValid = true;

        // Validación del campo de nombre (solo letras y espacios)
        const nameError = document.getElementById("nameError");
        if (!/^[a-zA-Z\s]+$/.test(nameField.value)) {
            nameError.classList.remove("d-none");
            isValid = false;
        } else {
            nameError.classList.add("d-none");
        }

        // Validación del campo de correo electrónico
        const emailError = document.getElementById("emailError");
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailField.value)) {
            emailError.classList.remove("d-none");
            isValid = false;
        } else {
            emailError.classList.add("d-none");
        }

        // Validación de checkboxes (al menos uno debe estar seleccionado)
        const checkboxError = document.getElementById("checkboxError");
        if (!termsField.checked && !subscribeField.checked) {
            checkboxError.classList.remove("d-none");
            isValid = false;
        } else {
            checkboxError.classList.add("d-none");
        }

        // Si la validación es exitosa, se muestra un toast de éxito y se resetea el formulario
        if (isValid) {
            const toastEnviar = new bootstrap.Toast(document.getElementById("toastEnviar"));
            toastEnviar.show();

            document.getElementById("contactForm").reset();
        }
    });

    // Evento para limpiar el formulario y mostrar un toast de limpieza
    document.getElementById("clearFormButton").addEventListener("click", function () {
        document.getElementById("contactForm").reset();
        const toastLimpiar = new bootstrap.Toast(document.getElementById("toastLimpiar"));
        toastLimpiar.show();
    });

    // Modo Oscuro/Claro
    
    const toggleThemeButton = document.getElementById("toggleTheme");
    toggleThemeButton.addEventListener("click", function () {
        // Alternar clase 'dark-mode' en el body para cambiar tema
        document.body.classList.toggle("dark-mode");
        const navbar = document.querySelector(".navbar");
        const table = document.querySelector(".table");
        const clock = document.getElementById("digitalClock");

        // Ajustes de estilos según el modo activado
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

    // Modal y Carrusel de Imágenes
    
    // Permite agrandar la imagen al hacer clic (mostrándola en un modal)
    const carouselImages = document.querySelectorAll('.carousel-item img');
    const modalImage = document.getElementById('modalImage');

    carouselImages.forEach(image => {
        image.addEventListener('click', function () {
            modalImage.src = this.src;
        });
    });

    // Cambiar las imágenes del carrusel de forma dinámica
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

    // Reiniciar el carrusel a las imágenes originales
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

    // Actualización del Reloj Digital

    /**
     * Función que actualiza el reloj digital y la fecha en tiempo real.
     */
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

        // Actualizar los elementos HTML con la hora y fecha actual
        document.getElementById('time').textContent = timeString;
        document.getElementById('date').textContent = dateString;
    }

    // Actualizar el reloj cada segundo
    setInterval(updateClock, 1000);
    updateClock();
});
