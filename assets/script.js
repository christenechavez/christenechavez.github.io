/* ============================
   Global site JS
   - Mobile nav toggle (works with .nav + .nav-toggle + .controls)
   - Footer year helper (#y or #year)
   ============================ */

(function () {
  var nav = document.querySelector('.nav');
  if (nav) {
    // Ensure there is a toggle button (safety for older pages)
    var toggle = nav.querySelector('.nav-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'nav-toggle';
      toggle.setAttribute('aria-label', 'Menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';

      var brand = nav.querySelector('.brand');
      if (brand && brand.parentNode === nav) {
        if (brand.nextSibling) nav.insertBefore(toggle, brand.nextSibling);
        else nav.appendChild(toggle);
      } else {
        nav.appendChild(toggle);
      }
    }

    var controls = nav.querySelector('.controls');

    function closeMenu() {
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
      nav.classList.add('is-open');
      document.body.classList.add('menu-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }
    function toggleMenu() {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    }

    if (toggle && controls) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
      });

      // Close when tapping outside overlay
      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('is-open')) return;
        // If the click is outside the .controls overlay and not the toggle, close.
        if (!controls.contains(e.target) && e.target !== toggle) closeMenu();
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      // Reset if resizing to desktop
      var DESKTOP = 861;
      window.addEventListener('resize', function () {
        if (window.innerWidth >= DESKTOP) closeMenu();
      });
    }
  }

  // Footer year helper (#y or #year)
  var y = document.getElementById('y') || document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
