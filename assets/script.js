/* ============================
   Global site JS
   - Mobile overlay menu: open/close + link click to close
   - Footer year helper (#y or #year)
   ============================ */

(function () {
  var nav = document.querySelector('.nav');
  if (nav) {
    // Ensure there is a hamburger toggle
    var toggle = nav.querySelector('.nav-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'nav-toggle';
      toggle.type = 'button';
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

    // Add a close button inside the overlay (mobile)
    var closeBtn = controls && controls.querySelector('.menu-close');
    if (!closeBtn && controls) {
      closeBtn = document.createElement('button');
      closeBtn.className = 'menu-close';
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.textContent = 'Close ✕';
      controls.insertBefore(closeBtn, controls.firstChild);
    }

    function setToggleIcon(open) {
      toggle.textContent = open ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', String(open));
    }

    function closeMenu() {
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      setToggleIcon(false);
    }

    function openMenu() {
      nav.classList.add('is-open');
      document.body.classList.add('menu-open');
      setToggleIcon(true);
    }

    function toggleMenu() {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    }

    // Start closed (covers bfcache/back nav)
    closeMenu();

    if (toggle && controls) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
      }

      // Close when a link in the overlay is tapped/clicked
      controls.addEventListener('click', function (e) {
        var a = e.target.closest('a');
        if (a) closeMenu();
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      // If resized to desktop, ensure menu is closed
      var DESKTOP = 861;
      window.addEventListener('resize', function () {
        if (window.innerWidth >= DESKTOP) closeMenu();
      });

      // Extra safety: close before page hide (bfcache scenarios)
      window.addEventListener('pagehide', closeMenu);
    }
  }

  // Footer year helper (#y or #year)
  var y = document.getElementById('y') || document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
