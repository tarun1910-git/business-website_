document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        // Toggle the navigation menu
        nav.classList.toggle('nav-active');
        
        // Animate the burger icon (optional)
        burger.classList.toggle('toggle');
    });
});