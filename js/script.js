const toggleButton = document.querySelector('[data-collapse-toggle="navbar-solid-bg"]');
const navMenu = document.getElementById('navbar-solid-bg');
+
toggleButton.addEventListener('click', function() {
  navMenu.classList.toggle('hidden');
  const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
  toggleButton.setAttribute('aria-expanded', !isExpanded);
});
