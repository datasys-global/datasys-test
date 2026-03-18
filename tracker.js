/* ══════════════════════════════════════════════
   DATASYS VISITOR TRACKER  ·  tracker.js  v4
   Sincronización cross-device via JSONBin.io
   + Scroll Depth · Ciudad · Conexión · Eventos
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  var JSONBIN_ID  = '69a7aeaeae596e708f5d2b54';
  var JSONBIN_KEY = '$2a$10$ltBKJ6GmJ0krgbTs/OldMeTFmk.HNe856CGMTXwjHfTjelIjxaa.2';
  var JSONBIN_URL = 'https://api.jsonbin.io/v3/b/' + JSONBIN_ID;

  var STORAGE_KEY     = 'datasys_visitors';
  var SESSION_KEY     = 'datasys_session';
  var SESSION_TIMEOUT = 30 * 60 * 1000;

  /* 1. SESSION ID */
  var SESSION_ID;
  var savedSession = null;
  try { savedSession = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch(e) {}
  if (savedSession && savedSession.id && (Date.now() - savedSession.ts) < SESSION_TIMEOUT) {
    SESSION_ID = savedSession.id;
  } else {
    SESSION_ID = 'SID-' + Date.now() + '-' + Math.random().toString(36).slice(2,7).toUpperCase();
  }
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({ id: SESSION_ID, ts: Date.now() })); } catch(e) {}
  window._dsVisitorId = SESSION_ID;
  var SESSION_START = Date.now();

  /* 2. HELPERS */
  function getDevice() {
    var ua = navigator.userAgent;
    if (/iPad|Tablet/i.test(ua)) return 'Tablet';
    if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'Movil';
    return 'Desktop';
  }
  function getOS() {
    var ua = navigator.userAgent;
    if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
    if (/Windows NT/.test(ua))    return 'Windows';
    if (/Mac OS X/.test(ua))      return 'macOS';
    if (/Android/.test(ua))       return 'Android';
    if (/iPhone|iPad/.test(ua))   return 'iOS';
    if (/Linux/.test(ua))         return 'Linux';
    return 'Desconocido';
  }
  function getBrowser() {
    var ua = navigator.userAgent;
    if (/Edg\//.test(ua))                            return 'Edge';
    if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return 'Chrome';
    if (/Firefox\//.test(ua))                        return 'Firefox';
    if (/Safari\//.test(ua) && !/Chrome/.test(ua))   return 'Safari';
    if (/OPR\/|Opera\//.test(ua))                    return 'Opera';
    return 'Otro';
  }
  function getOrigen() {
    var params = new URLSearchParams(window.location.search);
    var utm = params.get('utm_source');
    if (utm) return 'UTM:' + utm;
    var ref = document.referrer;
    if (!ref) return 'Directo';
    try {
      var host = new URL(ref).hostname.replace('www.','');
      if (/google/.test(host))           return 'Google';
      if (/facebook|fb\.com/.test(host)) return 'Facebook';
      if (/instagram/.test(host))        return 'Instagram';
      if (/linkedin/.test(host))         return 'LinkedIn';
      if (/twitter|x\.com/.test(host))   return 'Twitter/X';
      if (/youtube/.test(host))          return 'YouTube';
      if (/whatsapp/.test(host))         return 'WhatsApp';
      return host;
    } catch(e) { return ref.slice(0,40); }
  }
  function horaStr() {
    return new Date().toLocaleString('es-MX', {
      day:'2-digit', month:'2-digit', year:'numeric',
      hour:'2-digit', minute:'2-digit', second:'2-digit'
    });
  }
  function getVersion() {
    var path = window.location.pathname || '';
    if (path.indexOf('_mobile') !== -1) return 'Mobile';
    return window.innerWidth <= 768 ? 'Mobile' : 'Desktop';
  }
  function getConnectionType() {
    try {
      var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (c) return (c.effectiveType || c.type || 'N/A').toUpperCase();
    } catch(e) {}
    return 'N/A';
  }

  /* 3. STORAGE CLOUD + LOCAL */
  function getLocal() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) { return []; }
  }
  function saveLocal(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
  }
  function cloudGet(cb) {
    fetch(JSONBIN_URL + '/latest', {
      headers: { 'X-Master-Key': JSONBIN_KEY, 'X-Bin-Meta': 'false' }
    })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var data = Array.isArray(d.record) ? d.record : (Array.isArray(d) ? d : []);
      var local = getLocal();
      var ids = {};
      data.forEach(function(v) { ids[v.id] = true; });
      local.forEach(function(v) { if (!ids[v.id]) data.push(v); });
      saveLocal(data);
      cb(data);
    })
    .catch(function() { cb(getLocal()); });
  }
  function cloudPut(visitors, cb) {
    if (visitors.length > 500) visitors = visitors.slice(-500);
    saveLocal(visitors);
    fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_KEY },
      body: JSON.stringify(visitors)
    })
    .then(function() { if (cb) cb(); })
    .catch(function() { if (cb) cb(); });
  }

  /* 4. SCROLL DEPTH */
  var maxScrollPct = 0;
  function updateScrollDepth() {
    var docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight);
    var winH = window.innerHeight;
    var scrollY = window.scrollY || window.pageYOffset;
    var pct = docH > winH ? Math.round((scrollY + winH) / docH * 100) : 100;
    if (pct > maxScrollPct) maxScrollPct = pct;
  }
  window.addEventListener('scroll', updateScrollDepth, { passive: true });

  /* 5. REGISTRO INICIAL */
  var miRegistro = {
    id:           SESSION_ID,
    fecha:        horaStr(),
    sessionStart: SESSION_START,
    dispositivo:  getDevice() + ' / ' + getOS() + ' / ' + getBrowser(),
    resolucion:   window.screen.width + 'x' + window.screen.height,
    ventana:      window.innerWidth + 'x' + window.innerHeight,
    dpr:          (window.devicePixelRatio || 1).toFixed(1) + 'x',
    idioma:       navigator.language || 'N/A',
    conexion:     getConnectionType(),
    pais:         'Obteniendo...',
    ciudad:       '',
    ip:           'N/A',
    horaLocal:    horaStr(),
    origen:       getOrigen(),
    version:      getVersion(),
    paginas:      '',
    duracion:     '0s',
    scrollDepth:  '0%',
    eventos:      0,
    formEnviado:  false,
    formServicio: ''
  };

  cloudGet(function(visitors) {
    var existe = false;
    for (var i = 0; i < visitors.length; i++) {
      if (visitors[i].id === SESSION_ID) { existe = true; break; }
    }
    if (!existe) { visitors.push(miRegistro); cloudPut(visitors); }
    _restaurarPaginas(visitors);
  });

  /* 6. PÁGINAS VISITADAS */
  var ID_BLACKLIST = {
    'sysHUD':true,'hudBody':true,'hudDevice':true,'hudRes':true,'hudLang':true,
    'hudGeo':true,'hudTime':true,'hudRef':true,'hudVersion':true,'hudNavLog':true,
    'diagPanel':true,'diagBar':true,'hPart':true,'cur':true,'cur2':true,
    'ariaPanel':true,'apMsgs':true,'chatMsgs':true,'emailModal':true,'acuseModal':true,
    'emTo':true,'emSubject':true,'emBodyTxt':true,'navbar':true,'topbar':true,'drawer':true,
    'cf_error':true,'cf_name':true,'cf_email':true,'cf_phone':true,
    'cf_service':true,'cf_message':true,'cf_btn':true,'acuse_folio':true,
    'acuse_fecha':true,'acuse_nombre':true,'acuse_email':true,
    'acuse_phone':true,'acuse_service':true,'acuse_msg':true
  };
  var paginasSet = {};
  var paginasList = [];
  var totalEventos = 0;

  function _restaurarPaginas(visitors) {
    for (var i = 0; i < visitors.length; i++) {
      if (visitors[i].id === SESSION_ID && visitors[i].paginas) {
        visitors[i].paginas.split(' | ').forEach(function(entrada) {
          entrada = entrada.trim();
          if (!entrada) return;
          var nombre = entrada.replace(/^\d{2}:\d{2}\s*>\s*/, '').trim();
          if (nombre && !paginasSet[nombre]) { paginasSet[nombre] = true; paginasList.push(entrada); }
        });
        break;
      }
    }
  }

  function trackPage(nombre) {
    nombre = (nombre || '').trim().slice(0, 60);
    if (!nombre) return;
    if (ID_BLACKLIST[nombre]) return;
    // Solo bloquear palabras-ID técnicas (sin espacio, minúscula, sin emoji) cuando NO son botones
    if (!/^🖱/.test(nombre) &&
        /^[a-z][a-zA-Z]{3,}$/.test(nombre) && !/\s/.test(nombre) && nombre !== 'Inicio') return;
    if (nombre === '/' || nombre === '' ||
        nombre === 'index.html' || nombre === 'index_mobile.html') nombre = 'Inicio';
    // Para páginas/secciones: no duplicar. Para botones (🖱): sí permitir repetición con timestamp
    if (!/^🖱/.test(nombre)) {
      if (paginasSet[nombre]) return;
      paginasSet[nombre] = true;
    }
    totalEventos++;
    var hhmm = new Date().toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' });
    paginasList.push(hhmm + ' > ' + nombre);
    flushToStorage();
  }

  /* 7. FLUSH */
  var _flushTimer = null;
  function flushToStorage() {
    if (_flushTimer) clearTimeout(_flushTimer);
    _flushTimer = setTimeout(doFlush, 2000);
  }
  function doFlush() {
    cloudGet(function(visitors) {
      var idx = -1;
      for (var i = 0; i < visitors.length; i++) {
        if (visitors[i].id === SESSION_ID) { idx = i; break; }
      }
      if (idx < 0) { visitors.push(miRegistro); idx = visitors.length - 1; }
      visitors[idx].paginas     = paginasList.join(' | ');
      visitors[idx].duracion    = Math.round((Date.now() - SESSION_START) / 1000) + 's';
      visitors[idx].horaLocal   = horaStr();
      visitors[idx].scrollDepth = maxScrollPct + '%';
      visitors[idx].eventos     = totalEventos;
      visitors[idx].ventana     = window.innerWidth + 'x' + window.innerHeight;
      visitors[idx].conexion    = getConnectionType();
      cloudPut(visitors);
    });
    try { localStorage.setItem(SESSION_KEY, JSON.stringify({ id: SESSION_ID, ts: Date.now() })); } catch(e) {}
  }
  function flushImmediate() {
    if (_flushTimer) clearTimeout(_flushTimer);
    doFlush();
  }

  /* 8. PAÍS / IP / CIUDAD */
  fetch('https://ipapi.co/json/', { mode:'cors' })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      cloudGet(function(visitors) {
        for (var i = 0; i < visitors.length; i++) {
          if (visitors[i].id === SESSION_ID) {
            visitors[i].pais   = d.country_name || 'Desconocido';
            visitors[i].ciudad = d.city         || '';
            visitors[i].ip     = d.ip           || 'N/A';
            break;
          }
        }
        cloudPut(visitors);
      });
    })
    .catch(function() {});

  /* 9. FORMULARIO ENVIADO — llamar desde sendContactForm */
  window._dsMarkFormSent = function(servicio) {
    cloudGet(function(visitors) {
      for (var i = 0; i < visitors.length; i++) {
        if (visitors[i].id === SESSION_ID) {
          visitors[i].formEnviado  = true;
          visitors[i].formServicio = servicio || 'General';
          visitors[i].formFecha    = horaStr();
          break;
        }
      }
      cloudPut(visitors);
    });
    trackPage('🖱 Formulario: ' + (servicio || 'General'));
  };

  /* 10. HOOKS NAVEGACIÓN */
  var SECCIONES_VALIDAS = {
    'servicios':   'Servicios',
    'contacto':    'Contacto',
    'plataformas': 'Plataformas'
  };
  var PAGINAS_MAP = {
    'analisis_datos_datasys.html':'Análisis de Datos',
    'biotecnologia_inversores_datasys.html':'Biotecnología',
    'apps_datasys.html':'Apps & Software',
    'bolsa_us_datasys.html':'Bolsa de Valores',
    'automatizacion_datasys.html':'Automatización',
    'inventario_virtual_datasys.html':'Inventario Virtual',
    'ciberseguridad_datasys.html':'Ciberseguridad',
    'consultoria_datasys.html':'Consultoría',
    'revista_datasys.html':'Revista Tech',
    'index.html':'Inicio','./index.html':'Inicio',
    'index_mobile.html':'Inicio','./index_mobile.html':'Inicio',
    'analisis_datos_datasys_mobile.html':'Análisis de Datos',
    'biotecnologia_inversores_datasys_mobile.html':'Biotecnología',
    'apps_datasys_mobile.html':'Apps & Software',
    'bolsa_us_datasys_mobile.html':'Bolsa de Valores',
    'automatizacion_datasys_mobile.html':'Automatización',
    'inventario_virtual_datasys_mobile.html':'Inventario Virtual',
    'ciberseguridad_datasys_mobile.html':'Ciberseguridad',
    'consultoria_datasys_mobile.html':'Consultoría',
    'revista_datasys_mobile.html':'Revista Tech',
    'clientes_datasys.html':'Área de Clientes',
    'clientes_datasys_mobile.html':'Área de Clientes',
    'crm.html':'CRM Dashboard'
  };

  function hookLogNav() {
    if (typeof window.logNav !== 'function') { setTimeout(hookLogNav, 200); return; }
    var _orig = window.logNav;
    window.logNav = function(seccion) {
      _orig.apply(this, arguments);
      if (!seccion || /^(Apps|Biotecnol|Análisis|Bolsa|Autom|Inventario|Ciber|Consult|Revista)/.test(seccion)) return;
      trackPage(seccion);
    };
  }
  function hookIntersection() {
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        if (SECCIONES_VALIDAS[id]) trackPage(SECCIONES_VALIDAS[id]);
      });
    }, { threshold: 0.4 });
    Object.keys(SECCIONES_VALIDAS).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }
  window.addEventListener('hashchange', function() {
    var hash = window.location.hash.replace(/^#/, '');
    if (hash && SECCIONES_VALIDAS[hash]) trackPage(SECCIONES_VALIDAS[hash]);
  });

  /* 11. CLICS */
  var CLASES_MOBILE = ['aria-fab','dr-item','hc','plat-card','h-cta','btn-m',
    'banner-cta','tb-menu-btn','ft-link-m','qb','dr-aria','ap-send','ap-close'];
  function esElementoInteractivo(el) {
    if (!el || el === document.body) return false;
    var tag = (el.tagName || '').toUpperCase();
    if (tag === 'A' || tag === 'BUTTON') return true;
    if (el.getAttribute('role') === 'button') return true;
    if (el.getAttribute('onclick')) return true;
    for (var c = 0; c < CLASES_MOBILE.length; c++) {
      if (el.classList && el.classList.contains(CLASES_MOBILE[c])) return true;
    }
    return false;
  }
  document.addEventListener('click', function(e) {
    var el = e.target;
    for (var i = 0; i < 6; i++) {
      if (!el || el === document.body) break;
      if (esElementoInteractivo(el)) break;
      el = el.parentElement;
    }
    if (!el || el === document.body) return;
    if (!esElementoInteractivo(el)) return;
    var tag = (el.tagName || '').toUpperCase();
    var destino = el.getAttribute('data-track') || '';
    if (!destino && tag === 'A') {
      var href = el.getAttribute('href') || '';
      if (href && href !== '#' && href !== 'javascript:void(0)') {
        if (/^#/.test(href)) {
          var sec = href.replace('#','');
          destino = SECCIONES_VALIDAS[sec] || ('#' + sec);
        } else {
          var fileName = href.split('/').pop().split('?')[0].split('#')[0];
          if (PAGINAS_MAP[fileName]) {
            destino = PAGINAS_MAP[fileName];
          } else {
            try {
              var urlObj = new URL(href, window.location.href);
              destino = urlObj.hostname !== window.location.hostname
                ? '🔗 ' + urlObj.hostname
                : (urlObj.pathname.split('/').pop() || urlObj.pathname);
            } catch(ex) { destino = href.split('/').pop().slice(0,50) || href.slice(0,50); }
          }
        }
      }
    }
    if (!destino && el.getAttribute('onclick')) {
      var oc = el.getAttribute('onclick');
      var mQa = oc.match(/qa\(['"]([^'"]+)['"]/);
      if (mQa) {
        var qaMap = {datos:'Análisis de Datos',bio:'Biotecnología',apps:'Apps & Software',
          bolsa:'Bolsa de Valores',auto:'Automatización',inv:'Inventario Virtual',
          cyber:'Ciberseguridad',consul:'Consultoría',revista:'Revista Tech'};
        destino = qaMap[mQa[1]] || mQa[1];
      } else if (/toggleAria/.test(oc))        { destino = 'ARIA Chatbot'; }
        else if (/toggleMenu/.test(oc))        { destino = 'Menú'; }
        else if (/sendContactForm/.test(oc))   { destino = 'Enviar Formulario'; }
        else if (/sendChat/.test(oc))          { destino = 'Enviar Chat'; }
    }
    if (!destino) destino = el.getAttribute('aria-label') || '';
    if (!destino) {
      // Recopilar texto limpio del botón (incluyendo textos cortos >= 2 chars)
      var txt = (el.textContent || '').trim().replace(/[›»→]/g,'').trim().slice(0,50);
      if (txt && txt.length >= 2) destino = txt;
    }
    if (!destino && el.title) destino = el.title.trim().slice(0, 50);
    if (!destino && el.id) destino = el.id;
    destino = (destino || '').trim();
    if (!destino) return;
    trackPage('🖱 ' + destino);
    if (tag === 'A') {
      var href2 = el.getAttribute('href') || '';
      if (href2 && href2 !== '#' && !/^javascript/.test(href2) && !/^#/.test(href2)) {
        flushImmediate();
      }
    }
  }, true);

  /* 12. FLUSH PERIÓDICO */
  setInterval(flushImmediate, 15000);
  window.addEventListener('beforeunload', flushImmediate);
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') flushImmediate();
  });

  /* 13. INIT */
  function init() {
    var currentFile = window.location.pathname.split('/').pop().split('?')[0] || '';
    var initPage = PAGINAS_MAP[currentFile] || 'Inicio';
    trackPage(initPage);
    setTimeout(function() { hookLogNav(); hookIntersection(); }, 300);
    setTimeout(updateScrollDepth, 800);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  window.DATASYS_STORAGE_KEY = STORAGE_KEY;
  window.DATASYS_cloudPut    = cloudPut;
  window.DATASYS_cloudGet    = cloudGet;

  /* Escuchar evento de borrado desde el CRM para resetear sesión local */
  window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY && (e.newValue === '[]' || e.newValue === null)) {
      try { localStorage.removeItem(SESSION_KEY); } catch(ex) {}
    }
  });

})();
