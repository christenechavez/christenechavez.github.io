/* ============================
   Global site JS
   - Mobile nav toggle (works with .nav + .nav-toggle + .controls)
   - Footer year helper (#y or #year)
   ============================ */

(function () {
  var nav = document.querySelector('.nav');
  if (nav) {
    // 1) Ensure there is a toggle button
    var toggle = nav.querySelector('.nav-toggle');
    if (!toggle) {
      // Create one if missing (pages that only have .nav + .controls)
      toggle = document.createElement('button');
      toggle.className = 'nav-toggle';
      toggle.setAttribute('aria-label', 'Menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';

      var brand = nav.querySelector('.brand');
      if (brand && brand.parentNode === nav) {
        // Insert right after the brand for consistent layout
        if (brand.nextSibling) {
          nav.insertBefore(toggle, brand.nextSibling);
        } else {
          nav.appendChild(toggle);
        }
      } else {
        nav.appendChild(toggle);
      }
    }

    var controls = nav.querySelector('.controls');

    // 2) Toggle behavior
    function closeMenu() {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
      nav.classList.add('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }
    function toggleMenu() {
      if (nav.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    if (toggle && controls) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
      });

      // Close when clicking outside the nav
      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('is-open')) return;
        if (!nav.contains(e.target)) closeMenu();
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      // Reset menu if resizing to desktop
      var DESKTOP_BREAKPOINT = 861; // mirrors CSS @media (max-width: 860px)
      window.addEventListener('resize', function () {
        if (window.innerWidth >= DESKTOP_BREAKPOINT) {
          closeMenu();
        }
      });
    }
  }

  // 3) Footer year helper (supports #y or #year)
  var y = document.getElementById('y') || document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
