// Mobile menu toggle
(function () {
  const toggle = document.getElementById('menu-toggle');
  const mobile = document.getElementById('mobile-menu');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('open');
    });
    mobile.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => mobile.classList.remove('open'))
    );
  }
})();

// Highlight current nav link (robust for relative links)
(function () {
  const currentPath = location.pathname.replace(/index\.html$/, '/') || '/';
  document.querySelectorAll('[data-nav] a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const url = new URL(href, location.href);
    const hrefPath = url.pathname.replace(/index\.html$/, '/') || '/';
    if (hrefPath === currentPath) a.classList.add('active');
  });
})();

// Theme toggle removed (site uses light theme only)

// Apply brand color palette (adjust here to match target site)
(function () {
  const brandStorageKey = 'brand-palette-applied';
  const root = document.documentElement;
  const applied = localStorage.getItem(brandStorageKey);

  const ramaPalette = {
    '--bg': '#fff5e6',
    '--card': '#fffdf7',
    '--muted': '#ffe8c2',
    '--text': '#2a1f0f',
    '--muted-text': '#7a5b3a',
    '--primary': '#d97706',
    '--primary-foreground': '#1a1207',
    '--secondary': '#fff8ee',
    '--secondary-foreground': '#2a1f0f',
    '--gold': '#cfa24d',
    '--border': '#ffe0b8'
  };

  function applyPalette(vars) {
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }

  if (!applied) {
    applyPalette(ramaPalette);
    localStorage.setItem(brandStorageKey, 'true');
  }
})();

// Google Translate (EN <-> HI) using cookies
(function () {
  const btns = Array.from(document.querySelectorAll('#translate-toggle, #translate-toggle-mobile'));
  if (!btns.length) return;

  function setCookie(name, value) {
    document.cookie = name + '=' + value + '; path=/';
    // Also try setting domain cookie when available
    if (location.hostname && location.hostname !== 'localhost') {
      document.cookie = name + '=' + value + '; domain=' + location.hostname + '; path=/';
    }
  }

  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }

  function isHindi() {
    const v = getCookie('googtrans');
    return /\/hi$/i.test(v);
  }

  function applyHindi(hindi) {
    if (hindi) {
      setCookie('googtrans', '/en/hi');
    } else {
      // Clear cookie to return to English
      setCookie('googtrans', '/en/en');
    }
    location.reload();
  }

  // Load Google Translate script (hidden element) — optional for some setups,
  // but helps when running on a server without prior cookies.
  function ensureTranslateScript() {
    if (window.google && window.google.translate) return;
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none';
    document.body.appendChild(div);
    window.googleTranslateElementInit = function () {
      /* global google */
      // eslint-disable-next-line no-undef
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi',
        autoDisplay: false
      }, 'google_translate_element');
    };
    const s = document.createElement('script');
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(s);
  }

  // Initialize label
  btns.forEach((b) => (b.textContent = isHindi() ? 'EN' : 'हिं'));
  ensureTranslateScript();
  btns.forEach((btn) =>
    btn.addEventListener('click', () => {
      const hindi = !isHindi();
      applyHindi(hindi);
    })
  );
})();

// Donation amount selector logic (only runs on donation page)
(function () {
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('custom-amount');
  const donateBtn = document.getElementById('donate-button');
  let selectedAmount = null;

  function updateButton() {
    const value = selectedAmount || (customInput && customInput.value ? Number(customInput.value) : 0);
    if (donateBtn) donateBtn.textContent = `Donate ₹${value.toLocaleString()}`;
  }

  amountBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      amountBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = Number(btn.dataset.amount || '0');
      if (customInput) customInput.value = '';
      updateButton();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      amountBtns.forEach((b) => b.classList.remove('active'));
      selectedAmount = null;
      updateButton();
    });
  }

  updateButton();
})();
