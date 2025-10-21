// placeholder

/* ==== Responsive header toggle (for .nav version) ==== */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  // Don’t add twice if it already exists
  if (!nav.querySelector('.hamburger')) {
    var btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '☰';

    // insert hamburger after the brand (keeps layout nice)
    var brand = nav.querySelector('.brand');
    if (brand && brand.nextSibling) {
      nav.insertBefore(btn, brand.nextSibling);
    } else {
      nav.appendChild(btn);
    }

    btn.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      btn.setAttribute('aria-expanded', String(!open));
    });
  }
})();
