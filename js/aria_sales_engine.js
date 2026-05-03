/* ══════════════════════════════════════════════════
   ARIA — Motor de Ventas Inteligente v2.0
   DATASYS · js/aria_sales_engine.js

   Características:
   · Perfil progresivo del usuario (acumula datos reales)
   · Pricing dinámico según tamaño + urgencia + combo
   · Discurso de cierre personalizado con nombre + empresa
   · Señales de compra detectadas → escalada automática
   · Descuentos condicionales y urgencia real
   ══════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────
   PERFIL DE USUARIO — se construye durante la sesión
────────────────────────────────────────────────── */
var ARIA_USER = {
  nombre:        null,   // capturado por nombre detectado
  empresa:       null,   // capturado al mencionarlo
  tamaño:        null,   // "pequeña" | "mediana" | "grande"
  empleados:     null,   // string raw del usuario
  sector:        null,   // "manufactura" | "alimentos" | "retail" | etc.
  dolor:         [],     // problemas mencionados: ["mermas","paros","rutas"]
  interes:       [],     // secciones visitadas en sesión
  preguntasHechas: 0,
  señalesCompra: 0,      // counter: a 3+ → modo cierre
  ultimaSeccion: null,
  sesionInicio:  Date.now(),
  demoSolicitada: false
};

/* ──────────────────────────────────────────────────
   PRICING DINÁMICO
   Base · Descuento por combo · Urgencia
────────────────────────────────────────────────── */
var ARIA_PRICING = {
  produccion: {
    pequeña:  { base: 750,  label: "BÁSICO",       ahorro: "15%", plazo: "2-3 sem" },
    mediana:  { base: 800,  label: "PROFESIONAL",  ahorro: "20%", plazo: "3-4 sem" },
    grande:   { base: 1000, label: "ENTERPRISE",   ahorro: "25%", plazo: "4-6 sem" }
  },
  inventarios: {
    pequeña:  { base: 299, label: "BÁSICO",       ahorro: "90% precisión", plazo: "1 sem" },
    mediana:  { base: 299, label: "PROFESIONAL",  ahorro: "30% menos quiebres", plazo: "2 sem" },
    grande:   { base: 299, label: "ENTERPRISE",   ahorro: "99.9% exactitud", plazo: "3-4 sem" }
  },
  logistica: {
    pequeña:  { base: 299,  label: "BÁSICO",       ahorro: "15% más entregas", plazo: "1 sem" },
    mediana:  { base: 299,  label: "PROFESIONAL",  ahorro: "20% combustible", plazo: "2 sem" },
    grande:   { base: 299, label: "ENTERPRISE",   ahorro: "30% menos tiempos", plazo: "2-3 sem" }
  }
};

/* Descuentos */
var ARIA_DESCUENTOS = {
  combo2: 0.12,   // 2 módulos → 12% off
  combo3: 0.20,   // 3 módulos → 20% off
  urgente: 0.08,  // responde hoy → 8% adicional
  demo: 0.05      // si agenda demo en sesión → 5% adicional
};

/* ──────────────────────────────────────────────────
   DETECTOR DE SEÑALES DE COMPRA
────────────────────────────────────────────────── */
var SEÑALES_COMPRA = [
  "cuánto","cuanto","precio","costo","cotización","cotizacion","presupuesto","tarifa","inversión","inversion",
  "contratar","implementar","empezar","iniciar","arrancar","cuándo","cuando podemos","próximos pasos",
  "demo","prueba","piloto","mis datos","mi empresa","quiero","necesito","urge","urgente","ya","ahora"
];

var DOLORES_DETECTADOS = {
  "paro":"paros de máquina",
  "merma":"mermas de material",
  "retraso":"retrasos en entrega",
  "quiebre":"quiebres de stock",
  "manual":"procesos manuales",
  "excel":"dependencia de Excel",
  "visibili":"falta de visibilidad",
  "calidad":"problemas de calidad",
  "devoluc":"devoluciones de cliente",
  "ruta":"rutas ineficientes",
  "combusti":"gasto alto de combustible",
  "inventar":"descontrol de inventario",
  "lote":"trazabilidad de lotes",
  "auditor":"problemas de auditoría"
};

var SECTORES_DETECTADOS = {
  "aliment":"alimentos y bebidas",
  "farmac":"farmacéutico",
  "automo":"automotriz",
  "textil":"textil",
  "plástic":"plásticos",
  "electrón":"electrónica",
  "retail":"retail/comercio",
  "construc":"construcción",
  "químic":"químico",
  "logístic":"logística 3PL",
  "ecommerc":"e-commerce",
  "manufact":"manufactura general"
};

/* ──────────────────────────────────────────────────
   DETECTOR DE NOMBRE / EMPRESA EN TEXTO LIBRE
────────────────────────────────────────────────── */
function detectarContexto(texto) {
  var t = texto.toLowerCase();

  // Detectar nombre ("me llamo X", "soy X", "mi nombre es X")
  var nameMatch = texto.match(/(?:me llamo|soy|mi nombre es|llámame)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,})/i);
  if (nameMatch && !ARIA_USER.nombre) {
    ARIA_USER.nombre = nameMatch[1];
  }

  // Detectar empresa ("de [empresa]", "en [empresa]", "empresa [nombre]")
  var empMatch = texto.match(/(?:de la empresa|empresa|compañía|compania|trabajo en|soy de)\s+([A-Z][A-Za-záéíóúñ\s]{2,20})/i);
  if (empMatch && !ARIA_USER.empresa) {
    ARIA_USER.empresa = empMatch[1].trim();
  }

  // Detectar tamaño de empresa por número de empleados
  var empls = texto.match(/(\d+)\s*(?:empleados|personas|trabajadores|operadores)/i);
  if (empls) {
    var n = parseInt(empls[1]);
    ARIA_USER.empleados = empls[0];
    ARIA_USER.tamaño = n <= 20 ? "pequeña" : n <= 100 ? "mediana" : "grande";
  }

  // Detectar dolores
  Object.keys(DOLORES_DETECTADOS).forEach(function(k) {
    if (t.includes(k) && ARIA_USER.dolor.indexOf(DOLORES_DETECTADOS[k]) === -1) {
      ARIA_USER.dolor.push(DOLORES_DETECTADOS[k]);
    }
  });

  // Detectar sector
  Object.keys(SECTORES_DETECTADOS).forEach(function(k) {
    if (t.includes(k)) ARIA_USER.sector = SECTORES_DETECTADOS[k];
  });

  // Contar señales de compra
  SEÑALES_COMPRA.forEach(function(s) {
    if (t.includes(s)) ARIA_USER.señalesCompra++;
  });

  ARIA_USER.preguntasHechas++;
}

/* ──────────────────────────────────────────────────
   CALCULAR PRECIO PERSONALIZADO CON DESCUENTOS
────────────────────────────────────────────────── */
function calcularPrecio(seccion, tamano) {
  var t = tamano || ARIA_USER.tamaño || "mediana";
  var data = (ARIA_PRICING[seccion] || {})[t];
  if (!data) return null;

  var precio = data.base;
  var descuentosAplicados = [];
  var pct = 0;

  // Combo: visitó más de 1 sección
  var secciones = ARIA_USER.interes.filter(function(s, i, a){ return a.indexOf(s) === i; }).length;
  if (secciones >= 3) {
    pct += ARIA_DESCUENTOS.combo3;
    descuentosAplicados.push("20% combo 3 módulos");
  } else if (secciones >= 2) {
    pct += ARIA_DESCUENTOS.combo2;
    descuentosAplicados.push("12% combo 2 módulos");
  }

  // Demo agendada en sesión
  if (ARIA_USER.demoSolicitada) {
    pct += ARIA_DESCUENTOS.demo;
    descuentosAplicados.push("5% por demo agendada");
  }

  // Urgencia: sesión > 4 min y señales de compra ≥ 2
  var minutos = (Date.now() - ARIA_USER.sesionInicio) / 60000;
  var urgente = minutos > 4 && ARIA_USER.señalesCompra >= 2;
  if (urgente) {
    pct += ARIA_DESCUENTOS.urgente;
    descuentosAplicados.push("8% si confirmas hoy");
  }

  var precioFinal = Math.round(precio * (1 - pct));
  return {
    base: precio,
    final: precioFinal,
    ahorro: data.ahorro,
    label: data.label,
    plazo: data.plazo,
    descuentos: descuentosAplicados,
    pctTotal: Math.round(pct * 100),
    urgente: urgente
  };
}

/* ──────────────────────────────────────────────────
   GENERAR BLOQUE HTML DE COTIZACIÓN PERSONALIZADA
────────────────────────────────────────────────── */
function generarCotizacion(seccion, tamano) {
  var p = calcularPrecio(seccion, tamano);
  if (!p) return '';

  var sectores = {"produccion":"Producción","inventarios":"Inventarios","logistica":"Logística"};
  var secLabel = sectores[seccion] || seccion;

  var saludo = ARIA_USER.nombre ? ', <b>' + ARIA_USER.nombre + '</b>' : '';
  var empresa = ARIA_USER.empresa ? ' para <b>' + ARIA_USER.empresa + '</b>' : '';

  var descBlock = '';
  if (p.descuentos.length > 0) {
    descBlock = '<div style="margin:8px 0;padding:8px 10px;background:rgba(0,255,136,.06);border:1px solid rgba(0,255,136,.2);border-radius:4px;font-size:.78rem;">'
      + '🏷️ <b style="color:#00ff88;">Descuentos aplicados:</b><br>'
      + p.descuentos.map(function(d){ return '&nbsp;&nbsp;✓ ' + d; }).join('<br>')
      + '</div>';
  }

  var urgBlock = '';
  if (p.urgente) {
    urgBlock = '<div style="margin:8px 0;padding:8px 10px;background:rgba(240,192,64,.07);border:1px solid rgba(240,192,64,.3);border-radius:4px;font-size:.78rem;color:var(--gold);">'
      + '⏰ <b>Oferta válida hoy:</b> confirma antes de que cierre esta sesión para asegurar el precio.'
      + '</div>';
  }

  var ahorroBlock = p.pctTotal > 0
    ? '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:rgba(0,229,255,.04);border-radius:4px;margin-bottom:4px;">'
      + '<span style="font-size:.8rem;opacity:.6;">Precio base</span>'
      + '<span style="font-size:.85rem;text-decoration:line-through;opacity:.4;">$' + p.base.toLocaleString() + ' USD</span>'
      + '</div>'
    : '';

  return '<div style="background:rgba(6,15,28,.97);border:1px solid rgba(0,229,255,.3);border-radius:6px;padding:14px;margin-top:8px;">'
    + '<div style="font-family:\'Orbitron\',monospace;font-size:.5rem;letter-spacing:3px;color:var(--cyan);margin-bottom:10px;opacity:.7;">// COTIZACIÓN PERSONALIZADA' + empresa + '</div>'

    // Plan badge
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">'
    + '<span style="font-family:\'Orbitron\',monospace;font-size:.68rem;font-weight:700;color:var(--cyan);">' + secLabel + ' · ' + p.label + '</span>'
    + '<span style="font-family:\'Share Tech Mono\',monospace;font-size:.48rem;color:rgba(0,229,255,.4);">Implementación: ' + p.plazo + '</span>'
    + '</div>'

    + ahorroBlock

    // Precio final
    + '<div style="display:flex;align-items:baseline;gap:8px;margin:10px 0 6px;">'
    + '<span style="font-family:\'Orbitron\',monospace;font-size:1.3rem;font-weight:900;color:var(--cyan);text-shadow:0 0 20px rgba(0,229,255,.4);">$' + p.final.toLocaleString() + '</span>'
    + '<span style="font-size:.8rem;opacity:.5;">USD / mes</span>'
    + (p.pctTotal > 0 ? '<span style="background:rgba(0,255,136,.12);border:1px solid rgba(0,255,136,.3);color:#00ff88;font-size:.65rem;padding:2px 7px;border-radius:3px;font-family:\'Share Tech Mono\',monospace;">-' + p.pctTotal + '% hoy</span>' : '')
    + '</div>'

    // ROI
    + '<div style="font-size:.78rem;opacity:.55;margin-bottom:10px;">💡 Mejora esperada: <b style="opacity:.9;color:var(--white);">' + p.ahorro + '</b></div>'

    + descBlock + urgBlock

    // CTA
    + '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">'
    + '<button onclick="iniciarCierreVenta(\'' + seccion + '\')" style="flex:1;min-width:120px;padding:10px;font-family:\'Orbitron\',monospace;font-size:.52rem;font-weight:700;letter-spacing:2px;background:var(--cyan);color:var(--dark);border:none;cursor:pointer;">📅 AGENDAR DEMO</button>'
    + '<button onclick="enviarPregunta(\'Quiero ver más sobre el plan ' + p.label + '\')" style="flex:1;min-width:120px;padding:10px;font-family:\'Orbitron\',monospace;font-size:.52rem;font-weight:700;letter-spacing:2px;background:transparent;color:var(--cyan);border:1px solid var(--cyan);cursor:pointer;">¿QUÉ INCLUYE?</button>'
    + '</div>'
    + '</div>';
}

/* ──────────────────────────────────────────────────
   DISCURSO PERSONALIZADO DE VENTAS
   Genera texto que usa datos del usuario reales
────────────────────────────────────────────────── */
function discursoVentas(seccion) {
  var nombre = ARIA_USER.nombre ? ARIA_USER.nombre : null;
  var empresa = ARIA_USER.empresa;
  var sector = ARIA_USER.sector;
  var dolores = ARIA_USER.dolor;

  var saludo = nombre ? nombre + ', t' : 'T';
  var enEmpresa = empresa ? ' en <b>' + empresa + '</b>' : '';
  var enSector = sector ? ' del sector <b>' + sector + '</b>' : '';

  // Línea de dolor personalizada
  var dolorFrase = '';
  if (dolores.length > 0) {
    dolorFrase = 'Mencionaste que tienes retos con <b>' + dolores.slice(0,2).join('</b> y <b>') + '</b>. Exactamente eso es lo que resolvemos.<br><br>';
  }

  // Línea de sector
  var sectorFrase = '';
  var SECTOR_CASOS = {
    "alimentos y bebidas": "empresas de alimentos con trazabilidad y fechas de caducidad",
    "farmacéutico": "la industria farmacéutica con control de lotes y regulaciones",
    "automotriz": "la cadena automotriz con JIT y calidad zero defects",
    "retail/comercio": "retail omnicanal con inventario en tiempo real",
    "manufactura general": "manufactura discreta y por proceso"
  };
  if (sector && SECTOR_CASOS[sector]) {
    sectorFrase = 'Trabajamos con <b>' + SECTOR_CASOS[sector] + '</b>.<br><br>';
  }

  // Mensaje base por sección
  var base = {
    produccion: 'ofrece visibilidad total de tus líneas de producción, OEE en tiempo real y alertas automáticas antes de que ocurra un paro',
    inventarios: 'elimina los quiebres de stock, automatiza tus reabastecimientos y da trazabilidad completa por lote o serie',
    logistica: 'optimiza tus rutas, reduce hasta 30% el kilometraje y garantiza entregas perfectas con prueba digital'
  };

  return dolorFrase + sectorFrase
    + saludo + 'enemos la solución exacta' + enEmpresa + enSector + '.<br><br>'
    + 'La Plataforma de <b>' + {"produccion":"Producción","inventarios":"Inventarios","logistica":"Logística"}[seccion] + ' DATASYS</b> '
    + (base[seccion] || '') + '.<br><br>'
    + 'Con tu tamaño de operación, el ROI promedio es de <b>3-5 meses</b>.';
}

/* ──────────────────────────────────────────────────
   INICIAR CIERRE DE VENTA (desde botón cotización)
────────────────────────────────────────────────── */
function iniciarCierreVenta(seccion) {
  ARIA_USER.demoSolicitada = true;
  var secLabel = {"produccion":"Producción","inventarios":"Inventarios","logistica":"Logística"}[seccion] || seccion;

  // Pre-llenar el formulario con datos conocidos
  var html = generarFormularioCierre(seccion, secLabel);
  addBot(html);
}

function generarFormularioCierre(seccion, secLabel) {
  var nombre = ARIA_USER.nombre || '';
  var empresa = ARIA_USER.empresa || '';

  return '<div style="background:rgba(6,15,28,.98);border:1px solid rgba(0,229,255,.3);padding:18px;">'
    + '<div style="font-family:\'Orbitron\',monospace;font-size:.5rem;letter-spacing:3px;color:var(--cyan);margin-bottom:4px;opacity:.7;">// CONTÁCTANOS</div>'
    + '<div style="font-size:.86rem;margin-bottom:14px;opacity:.7;line-height:1.6;">Cuéntanos sobre tu proyecto y/o dudas, con gusto las responderemos en menos de 24 hrs.</div>'
    + '<div style="display:flex;flex-direction:column;gap:9px;">'

    + '<div><label style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;letter-spacing:2px;color:rgba(200,220,255,.5);display:block;margin-bottom:3px;">NOMBRE *</label>'
    + '<input id="af_name" type="text" value="' + nombre + '" placeholder="Tu nombre completo" style="width:100%;box-sizing:border-box;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.2);color:#fff;font-family:Rajdhani,sans-serif;font-size:.92rem;padding:9px 11px;outline:none;"></div>'

    + '<div><label style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;letter-spacing:2px;color:rgba(200,220,255,.5);display:block;margin-bottom:3px;">CORREO *</label>'
    + '<input id="af_email" type="email" placeholder="tu@empresa.com" style="width:100%;box-sizing:border-box;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.2);color:#fff;font-family:Rajdhani,sans-serif;font-size:.92rem;padding:9px 11px;outline:none;"></div>'

    + '<div><label style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;letter-spacing:2px;color:rgba(200,220,255,.5);display:block;margin-bottom:3px;">EMPRESA *</label>'
    + '<input id="af_empresa" type="text" value="' + empresa + '" placeholder="Nombre de tu empresa" style="width:100%;box-sizing:border-box;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.2);color:#fff;font-family:Rajdhani,sans-serif;font-size:.92rem;padding:9px 11px;outline:none;"></div>'

    + '<div><label style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;letter-spacing:2px;color:rgba(200,220,255,.5);display:block;margin-bottom:3px;">TELÉFONO (WhatsApp)</label>'
    + '<input id="af_phone" type="tel" placeholder="+52 55 0000 0000" style="width:100%;box-sizing:border-box;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.2);color:#fff;font-family:Rajdhani,sans-serif;font-size:.92rem;padding:9px 11px;outline:none;"></div>'

    + '<div><label style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;letter-spacing:2px;color:rgba(200,220,255,.5);display:block;margin-bottom:3px;">SERVICIO DE INTERÉS</label>'
    + '<input id="af_service" type="text" value="' + secLabel + '" readonly style="width:100%;box-sizing:border-box;background:rgba(0,229,255,.07);border:1px solid rgba(0,229,255,.35);color:var(--cyan);font-family:Rajdhani,sans-serif;font-size:.92rem;padding:9px 11px;outline:none;font-weight:700;"></div>'

    + '<div><label style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;letter-spacing:2px;color:rgba(200,220,255,.5);display:block;margin-bottom:3px;">¿QUÉ QUIERES MEJORAR? *</label>'
    + '<textarea id="af_message" rows="3" placeholder="Ej: ' + (ARIA_USER.dolor.length > 0 ? ARIA_USER.dolor[0] : 'Cuéntanos tu reto principal') + '..." style="width:100%;box-sizing:border-box;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.2);color:#fff;font-family:Rajdhani,sans-serif;font-size:.92rem;padding:9px 11px;outline:none;resize:vertical;"></textarea></div>'

    + '<div id="af_error" style="display:none;font-family:\'Share Tech Mono\',monospace;font-size:.48rem;color:#e05050;padding:7px 11px;border:1px solid rgba(200,40,40,.3);background:rgba(200,40,40,.06);"></div>'

    + '<button id="af_btn" onclick="sendAriaForm()" style="padding:13px;width:100%;font-family:\'Orbitron\',monospace;font-size:.6rem;font-weight:700;letter-spacing:3px;background:var(--cyan);color:var(--dark);border:none;cursor:pointer;">ENVIAR MENSAJE →</button>'

    + '<div style="text-align:center;font-family:\'Share Tech Mono\',monospace;font-size:.4rem;opacity:.35;margin-top:4px;">Sin compromiso · Respuesta en menos de 2 horas</div>'
    + '</div></div>';
}

/* ──────────────────────────────────────────────────
   RESPUESTA PERSONALIZADA — INVENTARIOS
   Usada para los 3 tamaños de empresa
────────────────────────────────────────────────── */
function _respuestaInventarios(tamano) {
  var nombre = ARIA_USER.nombre;
  var empresa = ARIA_USER.empresa;

  // Datos por tamaño
  var datos = {
    pequeña: {
      mejora: "90% de precisión en el primer mes de operación",
      plan: "BÁSICO",
      precioNormal: "$299 USD",
      precioOferta: "$1.99 USD"
    },
    mediana: {
      mejora: "95% de reducción de quiebres de stock en el primer mes",
      plan: "PROFESIONAL",
      precioNormal: "$299 USD",
      precioOferta: "$1.99 USD"
    },
    grande: {
      mejora: "99.9% de exactitud en inventario en el primer mes de operación",
      plan: "ENTERPRISE",
      precioNormal: "$299 USD",
      precioOferta: "$1.99 USD"
    }
  };

  var d = datos[tamano] || datos.grande;
  var saludo = nombre ? '<b>' + nombre + '</b>, t' : 'T';
  var enEmpresa = empresa ? ' para <b>' + empresa + '</b>' : '';

  return ''
    // Encabezado
    + saludo + 'enemos la solución exacta' + enEmpresa + '.<br><br>'

    // Descripción del sistema
    + '✅ Proporcionamos control de inventario por medio de <b>app móvil y página web</b>, '
    + 'donde puedes cargar <b>stock, entradas y salidas</b> desde cualquier dispositivo.<br><br>'

    // Producto
    + '<div style="background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.25);border-radius:6px;padding:14px;margin:8px 0;">'
    + '<div style="font-family:\'Orbitron\',monospace;font-size:.48rem;letter-spacing:3px;color:var(--cyan);margin-bottom:8px;opacity:.7;">// PRODUCTO RECOMENDADO</div>'
    + '<div style="font-size:1rem;font-weight:700;color:var(--white);margin-bottom:4px;">📦 Sistema de Control de Inventarios</div>'
    + '<div style="font-size:.82rem;opacity:.6;margin-bottom:10px;">Plan <b style="color:var(--cyan);">' + d.plan + '</b> · Uso inmediato · Sin instalaciones complejas</div>'

    // Beneficios clave
    + '<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;font-size:.82rem;">'
    + '<div>📱 <b>App móvil</b> — registra desde tu celular en tiempo real</div>'
    + '<div>🌐 <b>Página web</b> — panel de control desde cualquier navegador</div>'
    + '<div>⬆️ <b>Carga de stock</b> — entradas y salidas en segundos</div>'
    + '<div>⚡ <b>Uso inmediato</b> — operativo desde el primer día</div>'
    + '</div>'

    // Mejora esperada
    + '<div style="background:rgba(0,255,136,.07);border:1px solid rgba(0,255,136,.25);border-radius:4px;padding:9px 12px;">'
    + '<span style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;color:#00ff88;letter-spacing:2px;">MEJORA ESPERADA</span><br>'
    + '<span style="font-size:.95rem;font-weight:700;color:#00ff88;">' + d.mejora + '</span>'
    + '</div>'
    + '</div>'

    // Bloque de precio promocional
    + '<div style="margin:10px 0 12px;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.18);border-radius:6px;padding:10px 14px;">'
    + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">'
    + '<span style="font-family:\'Orbitron\',monospace;font-size:.85rem;font-weight:700;letter-spacing:1px;color:rgba(200,220,255,.35);text-decoration:line-through;">COSTO NORMAL ' + d.precioNormal + '</span>'
    + '<span style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);color:#ef4444;font-family:\'Orbitron\',monospace;font-size:.38rem;font-weight:700;letter-spacing:2px;padding:2px 8px;border-radius:3px;animation:pricePulse 2s ease-in-out infinite;">⏰ TIEMPO LIMITADO</span>'
    + '</div>'
    + '<div style="display:flex;align-items:baseline;gap:8px;">'
    + '<span style="font-family:\'Orbitron\',monospace;font-size:1.4rem;font-weight:900;color:#00ff88;text-shadow:0 0 20px rgba(0,255,136,.4);">' + d.precioOferta + '</span>'
    + '<span style="font-size:.75rem;opacity:.5;">precio de introducción</span>'
    + '</div>'
    + '<div style="font-size:.72rem;color:rgba(0,229,255,.5);margin-top:5px;">🎬 Videos ilustrativos · Fácil uso · Implementación incluida</div>'
    + '</div>'

    // 3 BOTONES EN UNA SOLA FILA — mismo estilo, icono grande a la izquierda
    + '<div style="display:flex;gap:6px;margin-top:4px;">'

    // Botón 1: COMPRAR
    + '<button onclick="iniciarCierreVenta(\'inventarios\')" title="Comprar ahora" style="'
    + 'flex:1;padding:10px 8px;font-family:\'Orbitron\',monospace;font-size:.46rem;font-weight:700;'
    + 'letter-spacing:2px;background:rgba(0,229,255,.06);color:rgba(0,229,255,.8);'
    + 'border:1px solid rgba(0,229,255,.3);cursor:pointer;'
    + 'clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);'
    + 'display:flex;align-items:center;justify-content:center;gap:8px;line-height:1.3;text-align:left;'
    + '">'
    + '<span style="font-size:1.6rem;line-height:1;flex-shrink:0;">🛒</span>'
    + '<span>COMPRAR<br>AHORA</span>'
    + '</button>'

    // Botón 2: CONTÁCTANOS
    + '<button onclick="iniciarCierreVenta(\'inventarios\')" title="Contáctanos" style="'
    + 'flex:1;padding:10px 8px;font-family:\'Orbitron\',monospace;font-size:.46rem;font-weight:700;'
    + 'letter-spacing:2px;background:rgba(0,229,255,.06);color:rgba(0,229,255,.8);'
    + 'border:1px solid rgba(0,229,255,.3);cursor:pointer;'
    + 'clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);'
    + 'display:flex;align-items:center;justify-content:center;gap:8px;line-height:1.3;text-align:left;'
    + '">'
    + '<span style="font-size:1.6rem;line-height:1;flex-shrink:0;">📩</span>'
    + '<span>CONTÁC-<br>TANOS</span>'
    + '</button>'

    // Botón 3: VER DEMO — iframe embebido en el chat
    + '<button onclick="abrirDemoInline()" title="Ver demo del sistema" style="'
    + 'flex:1;padding:10px 8px;font-family:\'Orbitron\',monospace;font-size:.46rem;font-weight:700;'
    + 'letter-spacing:2px;background:rgba(0,229,255,.06);color:rgba(0,229,255,.8);'
    + 'border:1px solid rgba(0,229,255,.3);cursor:pointer;'
    + 'clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);'
    + 'display:flex;align-items:center;justify-content:center;gap:8px;line-height:1.3;text-align:left;'
    + '">'
    + '<span style="font-size:1.6rem;line-height:1;flex-shrink:0;">▶</span>'
    + '<span>VER<br>DEMO</span>'
    + '</button>'

    + '</div>';
}

/* ──────────────────────────────────────────────────
   RESPUESTA PERSONALIZADA — LOGÍSTICA
────────────────────────────────────────────────── */
function _respuestaLogistica(tamano) {
  var nombre = ARIA_USER.nombre;
  var empresa = ARIA_USER.empresa;

  var datos = {
    pequeña: { mejora: "15% más entregas exitosas en el primer mes",     plan: "BÁSICO",      precioNormal: "$299 USD", precioOferta: "$1.99 USD" },
    mediana: { mejora: "20% de ahorro en combustible en el primer mes",  plan: "PROFESIONAL", precioNormal: "$299 USD", precioOferta: "$1.99 USD" },
    grande:  { mejora: "30% menos tiempos de entrega en el primer mes",  plan: "ENTERPRISE",  precioNormal: "$299 USD", precioOferta: "$1.99 USD" }
  };

  var d = datos[tamano] || datos.grande;
  var saludo = nombre ? '<b>' + nombre + '</b>, t' : 'T';
  var enEmpresa = empresa ? ' para <b>' + empresa + '</b>' : '';

  return ''
    + saludo + 'enemos la solución exacta' + enEmpresa + '.<br><br>'

    + '✅ Proporcionamos control total de tu <b>flotilla y logística</b> por medio de <b>app móvil y página web</b>: '
    + 'seguimiento GPS, control de unidades, vencimientos y alertas en tiempo real.<br><br>'

    + '<div style="background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.25);border-radius:6px;padding:14px;margin:8px 0;">'
    + '<div style="font-family:\'Orbitron\',monospace;font-size:.48rem;letter-spacing:3px;color:var(--cyan);margin-bottom:8px;opacity:.7;">// PRODUCTO RECOMENDADO</div>'
    + '<div style="font-size:1rem;font-weight:700;color:var(--white);margin-bottom:4px;">🚚 Sistema de Control de Flotilla</div>'
    + '<div style="font-size:.82rem;opacity:.6;margin-bottom:10px;">Plan <b style="color:var(--cyan);">' + d.plan + '</b> · Uso inmediato · Sin instalaciones complejas</div>'

    + '<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;font-size:.82rem;">'
    + '<div>📱 <b>App móvil</b> — gestión desde celular en tiempo real</div>'
    + '<div>🌐 <b>Página web</b> — panel de control desde cualquier navegador</div>'
    + '<div>📍 <b>Seguimiento GPS</b> — ubica cada unidad en tiempo real</div>'
    + '<div>🔔 <b>Alertas automáticas</b> — verificación, seguro, tenencia</div>'
    + '<div>⚡ <b>Uso inmediato</b> — operativo desde el primer día</div>'
    + '</div>'

    + '<div style="background:rgba(0,255,136,.07);border:1px solid rgba(0,255,136,.25);border-radius:4px;padding:9px 12px;">'
    + '<span style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;color:#00ff88;letter-spacing:2px;">MEJORA ESPERADA</span><br>'
    + '<span style="font-size:.95rem;font-weight:700;color:#00ff88;">' + d.mejora + '</span>'
    + '</div>'
    + '</div>'

    // Bloque de precio promocional
    + '<div style="margin:10px 0 12px;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.18);border-radius:6px;padding:10px 14px;">'
    + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">'
    + '<span style="font-family:\'Orbitron\',monospace;font-size:.85rem;font-weight:700;letter-spacing:1px;color:rgba(200,220,255,.35);text-decoration:line-through;">COSTO NORMAL ' + d.precioNormal + '</span>'
    + '<span style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);color:#ef4444;font-family:\'Orbitron\',monospace;font-size:.38rem;font-weight:700;letter-spacing:2px;padding:2px 8px;border-radius:3px;animation:pricePulse 2s ease-in-out infinite;">⏰ TIEMPO LIMITADO</span>'
    + '</div>'
    + '<div style="display:flex;align-items:baseline;gap:8px;">'
    + '<span style="font-family:\'Orbitron\',monospace;font-size:1.4rem;font-weight:900;color:#00ff88;text-shadow:0 0 20px rgba(0,255,136,.4);">' + d.precioOferta + '</span>'
    + '<span style="font-size:.75rem;opacity:.5;">precio de introducción</span>'
    + '</div>'
    + '<div style="font-size:.72rem;color:rgba(0,229,255,.5);margin-top:5px;">🎬 Videos ilustrativos · Fácil uso · Implementación incluida</div>'
    + '</div>'

    // 3 BOTONES EN FILA
    + '<div style="display:flex;gap:6px;margin-top:4px;">'

    + '<button onclick="iniciarCierreVenta(\'logistica\')" title="Comprar ahora" style="'
    + 'flex:1;padding:10px 8px;font-family:\'Orbitron\',monospace;font-size:.46rem;font-weight:700;'
    + 'letter-spacing:2px;background:rgba(0,229,255,.06);color:rgba(0,229,255,.8);'
    + 'border:1px solid rgba(0,229,255,.3);cursor:pointer;'
    + 'clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);'
    + 'display:flex;align-items:center;justify-content:center;gap:8px;line-height:1.3;text-align:left;">'
    + '<span style="font-size:1.6rem;line-height:1;flex-shrink:0;">🛒</span>'
    + '<span>COMPRAR<br>AHORA</span>'
    + '</button>'

    + '<button onclick="iniciarCierreVenta(\'logistica\')" title="Contáctanos" style="'
    + 'flex:1;padding:10px 8px;font-family:\'Orbitron\',monospace;font-size:.46rem;font-weight:700;'
    + 'letter-spacing:2px;background:rgba(0,229,255,.06);color:rgba(0,229,255,.8);'
    + 'border:1px solid rgba(0,229,255,.3);cursor:pointer;'
    + 'clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);'
    + 'display:flex;align-items:center;justify-content:center;gap:8px;line-height:1.3;text-align:left;">'
    + '<span style="font-size:1.6rem;line-height:1;flex-shrink:0;">📩</span>'
    + '<span>CONTÁC-<br>TANOS</span>'
    + '</button>'

    + '<button onclick="abrirDemoLogisticaInline()" title="Ver demo del sistema" style="'
    + 'flex:1;padding:10px 8px;font-family:\'Orbitron\',monospace;font-size:.46rem;font-weight:700;'
    + 'letter-spacing:2px;background:rgba(0,229,255,.06);color:rgba(0,229,255,.8);'
    + 'border:1px solid rgba(0,229,255,.3);cursor:pointer;'
    + 'clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);'
    + 'display:flex;align-items:center;justify-content:center;gap:8px;line-height:1.3;text-align:left;">'
    + '<span style="font-size:1.6rem;line-height:1;flex-shrink:0;">▶</span>'
    + '<span>VER<br>DEMO</span>'
    + '</button>'

    + '</div>';
}

/* ──────────────────────────────────────────────────
   SOLUCIONES POR TAMAÑO — versión mejorada con HTML rico
────────────────────────────────────────────────── */
var SOLUCIONES_TAMAÑO_V2 = {
  produccion: {
    pequeña: function(t) {
      var d = discursoVentas('produccion');
      var c = generarCotizacion('produccion', 'pequeña');
      return d + '<br>' + c;
    },
    mediana: function(t) {
      var d = discursoVentas('produccion');
      var c = generarCotizacion('produccion', 'mediana');
      return d + '<br>' + c;
    },
    grande: function(t) {
      var d = discursoVentas('produccion');
      var c = generarCotizacion('produccion', 'grande');
      return d + '<br>' + c;
    }
  },
  inventarios: {
    pequeña: function(t) {
      return _respuestaInventarios('pequeña');
    },
    mediana: function(t) {
      return _respuestaInventarios('mediana');
    },
    grande: function(t) {
      return _respuestaInventarios('grande');
    }
  },
  logistica: {
    pequeña: function(t) {
      return _respuestaLogistica('pequeña');
    },
    mediana: function(t) {
      return _respuestaLogistica('mediana');
    },
    grande: function(t) {
      return _respuestaLogistica('grande');
    }
  }
};

/* ──────────────────────────────────────────────────
   RESOLVER TAMAÑO desde texto
────────────────────────────────────────────────── */
function resolverTamanoTexto(texto) {
  var t = texto.toLowerCase();
  if (t.includes("1") && t.includes("20")) return "pequeña";
  if (t.includes("20") && t.includes("100")) return "mediana";
  if (t.includes("100") || t.includes("+ 100")) return "grande";
  // fallback por empleados detectados
  if (ARIA_USER.tamaño) return ARIA_USER.tamaño;
  return "mediana";
}

/* ──────────────────────────────────────────────────
   RESPUESTAS INTELIGENTES CONTEXTUALES
   Reemplaza / enriquece las respuestas de la base
────────────────────────────────────────────────── */
function respuestaInteligente(texto, seccion) {
  var t = texto.toLowerCase();

  // Detectar intención de cotización/precio → mostrar pricing dinámico
  if (["precio","costo","cuánto","cuanto","cotización","cotizacion","presupuesto","tarifa","inversión","inversion","plan","planes"].some(function(k){ return t.includes(k); })) {
    if (seccion && ARIA_USER.tamaño) {
      return generarCotizacion(seccion, ARIA_USER.tamaño);
    }
    if (seccion) {
      // No tiene tamaño aún → preguntar
      return '💰 Tengo precios personalizados según el tamaño de tu operación.<br><br>¿Cuántos empleados tienen en tu empresa?';
    }
  }

  // Detectar cierre de compra alta intención
  if (ARIA_USER.señalesCompra >= 3 && seccion && ARIA_USER.tamaño) {
    return discursoVentas(seccion) + '<br><br>' + generarCotizacion(seccion, ARIA_USER.tamaño);
  }

  return null; // no interceptar, dejar pasar a base local
}

/* ──────────────────────────────────────────────────
   PREGUNTAS DE DESCUBRIMIENTO (cuando no hay match)
   Hace preguntas inteligentes para calificar al lead
────────────────────────────────────────────────── */
var DISCOVERY_QUESTIONS = {
  produccion: [
    "¿Cuántas líneas de producción tienen actualmente?",
    "¿Actualmente miden el OEE o la eficiencia de sus líneas?",
    "¿Sus operadores registran los paros de forma manual o digital?"
  ],
  inventarios: [
    "¿Actualmente controlan su inventario en Excel o en un sistema?",
    "¿Cuántos artículos o SKUs manejan aproximadamente?",
    "¿Han tenido quiebres de stock que pararon su operación?"
  ],
  logistica: [
    "¿Cuántas entregas hacen al mes aproximadamente?",
    "¿Tienen flotilla propia o usan transportistas externos?",
    "¿Sus clientes pueden rastrear sus pedidos en tiempo real?"
  ]
};
var _discoveryIdx = { produccion: 0, inventarios: 0, logistica: 0 };

function siguientePreguntaDescubrimiento(seccion) {
  if (!seccion || !DISCOVERY_QUESTIONS[seccion]) return null;
  var preguntas = DISCOVERY_QUESTIONS[seccion];
  var idx = _discoveryIdx[seccion];
  if (idx >= preguntas.length) return null;
  _discoveryIdx[seccion]++;
  return preguntas[idx];
}

/* ──────────────────────────────────────────────────
   REGISTRO DE SECCIÓN VISITADA
────────────────────────────────────────────────── */
function registrarSeccion(seccion) {
  if (seccion && ARIA_USER.interes.indexOf(seccion) === -1) {
    ARIA_USER.interes.push(seccion);
  }
  ARIA_USER.ultimaSeccion = seccion;
}

/* ──────────────────────────────────────────────────
   DEMO PHONE MODAL — Sistema de Control de Inventarios
   Abre un phone mockup con demo/index_administracion.html
────────────────────────────────────────────────── */
function abrirDemoPhone() {
  // Si ya existe el modal, solo mostrarlo
  var existing = document.getElementById('demoPhoneModal');
  if (existing) {
    existing.style.display = 'flex';
    // Recargar iframe
    var iframe = document.getElementById('demoPhoneIframe');
    if (iframe) iframe.src = iframe.src;
    return;
  }

  // Crear modal completo
  var modal = document.createElement('div');
  modal.id = 'demoPhoneModal';
  modal.style.cssText = [
    'position:fixed','inset:0','z-index:99900',
    'display:flex','align-items:center','justify-content:center',
    'background:rgba(3,13,24,.96)',
    'backdrop-filter:blur(18px)',
    '-webkit-backdrop-filter:blur(18px)',
    'animation:demoModalIn .35s cubic-bezier(.22,1,.36,1) both'
  ].join(';');

  modal.innerHTML = [
    '<style>',
    '@keyframes demoModalIn{0%{opacity:0;transform:scale(.96);}100%{opacity:1;transform:scale(1);}}',
    '@keyframes demoPhoneFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}',
    '@keyframes demoBlink{0%,100%{opacity:1;}50%{opacity:.2;}}',
    '</style>',

    /* ── TOP BAR del modal ── */
    '<div style="position:absolute;top:0;left:0;right:0;height:50px;',
    'display:flex;align-items:center;justify-content:space-between;',
    'padding:0 28px;',
    'background:rgba(3,13,24,.9);border-bottom:1px solid rgba(0,229,255,.12);',
    'backdrop-filter:blur(16px);z-index:10;">',

      '<div style="display:flex;align-items:center;gap:10px;',
      'font-family:Orbitron,sans-serif;font-size:.62rem;letter-spacing:4px;color:#00e5ff;',
      'text-shadow:0 0 14px rgba(0,229,255,.5);">',
        '<div style="width:7px;height:7px;border-radius:50%;background:#00e5ff;',
        'box-shadow:0 0 10px #00e5ff;animation:demoBlink 2s ease-in-out infinite;"></div>',
        'DATASYS',
        '<span style="font-family:Share Tech Mono,monospace;font-size:.48rem;',
        'letter-spacing:3px;color:rgba(0,229,255,.5);font-weight:400;">',
        '· DEMO SISTEMA DE INVENTARIOS</span>',
      '</div>',

      '<div style="display:flex;gap:10px;align-items:center;">',
        '<span style="font-family:Share Tech Mono,monospace;font-size:.42rem;',
        'letter-spacing:2px;color:rgba(0,229,255,.4);">// VISTA MÓVIL · PREVIEW</span>',
        '<button onclick="document.getElementById(\'demoPhoneModal\').style.display=\'none\'" ',
        'style="padding:5px 16px;font-family:Share Tech Mono,monospace;font-size:.44rem;',
        'letter-spacing:2px;color:#00e5ff;background:transparent;',
        'border:1px solid rgba(0,229,255,.25);cursor:pointer;transition:all .2s;" ',
        'onmouseover="this.style.background=\'rgba(0,229,255,.08)\'" ',
        'onmouseout="this.style.background=\'transparent\'">✕ CERRAR</button>',
      '</div>',
    '</div>',

    /* ── SCENE ── */
    '<div style="position:absolute;inset:50px 0 0;display:flex;align-items:center;justify-content:center;">',

      /* Info panel izquierdo */
      '<div style="position:absolute;left:calc(50% - 222px - 200px);top:50%;transform:translateY(-50%);',
      'width:180px;display:flex;flex-direction:column;gap:16px;">',
        _infoPanelCard('// DISPOSITIVO', 'iPhone 15 Pro', '390 × 844 · 3x RETINA'),
        _infoPanelCard('// VIEWPORT', '390px', 'MOBILE · PORTRAIT'),
        _infoPanelCard('// MÓDULO', 'INVENTARIOS', 'DATASYS DEMO LIVE'),
      '</div>',

      /* Phone wrap */
      '<div style="position:relative;display:flex;align-items:center;justify-content:center;">',

        /* Glow trails */
        '<div style="position:absolute;top:20%;right:calc(100% - 10px);width:70px;height:60%;',
        'background:linear-gradient(90deg,transparent,rgba(0,229,255,.05));',
        'pointer-events:none;border-radius:40px;transform:scaleX(-1);"></div>',
        '<div style="position:absolute;top:20%;left:calc(100% - 10px);width:70px;height:60%;',
        'background:linear-gradient(90deg,transparent,rgba(0,229,255,.05));',
        'pointer-events:none;border-radius:40px;"></div>',

        /* Shell */
        '<div style="position:relative;width:418px;height:900px;',
        'background:linear-gradient(145deg,#1a2535 0%,#0c1624 40%,#060d18 100%);',
        'border-radius:52px;',
        'box-shadow:0 0 0 1px rgba(0,229,255,.2),0 0 0 2px rgba(0,20,40,.8),',
        '0 0 60px rgba(0,229,255,.14),0 40px 120px rgba(0,0,0,.7),',
        'inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.4);',
        'animation:demoPhoneFloat 6s ease-in-out infinite;">',

          /* Side buttons */
          '<div style="position:absolute;left:-4px;top:140px;width:4px;height:36px;',
          'background:linear-gradient(90deg,#0d1e30,#1a2e44);border-radius:3px;"></div>',
          '<div style="position:absolute;left:-4px;top:188px;width:4px;height:36px;',
          'background:linear-gradient(90deg,#0d1e30,#1a2e44);border-radius:3px;"></div>',
          '<div style="position:absolute;right:-4px;top:180px;width:4px;height:60px;',
          'background:linear-gradient(90deg,#1a2e44,#0d1e30);border-radius:3px;"></div>',

          /* Screen area */
          '<div style="position:absolute;top:14px;left:14px;right:14px;bottom:14px;',
          'border-radius:40px;overflow:hidden;background:#000;">',

            /* Status bar */
            '<div style="position:absolute;top:0;left:0;right:0;height:66px;z-index:50;',
            'display:flex;align-items:center;justify-content:space-between;padding:0 24px;',
            'pointer-events:none;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);">',
              '<span id="demoStatusTime" style="font-family:Orbitron,sans-serif;font-size:.55rem;',
              'font-weight:700;color:#fff;letter-spacing:1px;">9:41</span>',
              '<div style="display:flex;align-items:center;gap:4px;font-size:.5rem;',
              'color:#fff;font-family:Share Tech Mono,monospace;">',
                '<span>▲▲▲</span><span>WiFi</span>',
                '<div style="width:22px;height:11px;border:1px solid rgba(255,255,255,.6);',
                'border-radius:2px;padding:1.5px;position:relative;display:inline-flex;align-items:center;">',
                  '<div style="width:70%;height:100%;background:#fff;border-radius:1px;"></div>',
                  '<div style="position:absolute;right:-4px;width:3px;height:5px;',
                  'background:rgba(255,255,255,.5);border-radius:0 1px 1px 0;"></div>',
                '</div>',
              '</div>',
            '</div>',

            /* Dynamic island */
            '<div style="position:absolute;top:14px;left:50%;transform:translateX(-50%);',
            'width:120px;height:34px;background:#000;border-radius:20px;z-index:60;',
            'display:flex;align-items:center;justify-content:center;gap:10px;">',
              '<div style="width:12px;height:12px;border-radius:50%;background:#0a0a0a;',
              'border:1px solid #111;position:relative;">',
                '<div style="position:absolute;top:2px;left:2px;width:4px;height:4px;',
                'border-radius:50%;background:rgba(0,229,255,.2);"></div>',
              '</div>',
              '<div style="width:40px;height:4px;background:#111;border-radius:4px;"></div>',
            '</div>',

            /* IFRAME */
            '<iframe id="demoPhoneIframe" src="demo/index_administracion.html" ',
            'style="position:absolute;top:66px;left:0;right:0;bottom:20px;',
            'width:100%;height:calc(100% - 86px);border:none;background:#030d18;" ',
            'scrolling="yes" title="Demo Inventarios DATASYS"></iframe>',

            /* Reflection shimmer */
            '<div style="position:absolute;inset:0;',
            'background:linear-gradient(135deg,rgba(255,255,255,.04) 0%,transparent 40%);',
            'border-radius:40px;pointer-events:none;z-index:70;"></div>',

            /* Home indicator */
            '<div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);',
            'width:130px;height:5px;background:rgba(255,255,255,.18);border-radius:3px;',
            'z-index:70;pointer-events:none;"></div>',

          '</div>',/* /screen */

          /* Reflection below phone */
          '<div style="position:absolute;bottom:-38px;left:50%;transform:translateX(-50%);',
          'width:418px;height:38px;',
          'background:linear-gradient(180deg,rgba(0,229,255,.07) 0%,transparent 100%);',
          'filter:blur(8px);border-radius:50%;pointer-events:none;"></div>',

        '</div>',/* /shell */
      '</div>',/* /phone-wrap */

      /* Info panel derecho */
      '<div style="position:absolute;right:calc(50% - 222px - 200px);top:50%;transform:translateY(-50%);',
      'width:180px;display:flex;flex-direction:column;gap:16px;">',
        _infoPanelCard('// PÁGINAS', '9', 'PLATAFORMAS ACTIVAS'),
        _infoPanelCard('// ESTADO', '<span style="color:#00ff88;">LIVE</span>', 'PRODUCCIÓN · v2.6'),
        _infoPanelCard('// IA ASISTENTE', 'ARIA', '24/7 ONLINE'),
      '</div>',

    '</div>'/* /scene */
  ].join('');

  document.body.appendChild(modal);

  // Reloj en tiempo real dentro del modal
  function tickDemoClock() {
    var el = document.getElementById('demoStatusTime');
    if (!el) return;
    var n = new Date();
    el.textContent = String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
  }
  tickDemoClock();
  setInterval(tickDemoClock, 10000);

  // Cerrar con ESC
  document.addEventListener('keydown', function escClose(e) {
    if (e.key === 'Escape') {
      var m = document.getElementById('demoPhoneModal');
      if (m) m.style.display = 'none';
      document.removeEventListener('keydown', escClose);
    }
  });
}

/* Helper: tarjeta de info panel */
function _infoPanelCard(label, val, sub) {
  return [
    '<div style="background:rgba(0,229,255,.03);border:1px solid rgba(0,229,255,.12);padding:12px 14px;">',
      '<div style="font-family:Share Tech Mono,monospace;font-size:.38rem;letter-spacing:3px;',
      'color:rgba(0,229,255,.5);margin-bottom:5px;">' + label + '</div>',
      '<div style="font-family:Orbitron,sans-serif;font-size:.68rem;font-weight:700;',
      'color:#00e5ff;letter-spacing:1px;">' + val + '</div>',
      '<div style="font-family:Share Tech Mono,monospace;font-size:.36rem;letter-spacing:2px;',
      'color:rgba(142,184,204,.4);margin-top:3px;">' + sub + '</div>',
    '</div>'
  ].join('');
}

/* ──────────────────────────────────────────────────
   DEMO INLINE — iframe embebido directo en el chat
────────────────────────────────────────────────── */
function abrirDemoInline() {
  // Evitar duplicados
  if (document.getElementById('demoInlineWrap')) {
    var existing = document.getElementById('demoInlineWrap');
    existing.style.display = existing.style.display === 'none' ? 'block' : 'none';
    return;
  }

  // Crear burbuja bot nueva en el chat
  var msgs = document.getElementById('msgs');
  if (!msgs) return;

  var wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.style.cssText = 'align-self:flex-start;max-width:96%;width:96%;animation:msgIn .3s ease both;';

  wrap.innerHTML = [
    '<div class="msg-av">',
      '<img src="imagenes/logo.png" alt="AR" onerror="this.outerHTML=\'<span style=font-size:.8rem>⚡</span>\'">',
    '</div>',
    '<div class="bubble" style="width:100%;padding:0;overflow:hidden;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.2);">',

      // Header de la burbuja
      '<div style="display:flex;align-items:center;justify-content:space-between;',
      'padding:9px 14px;border-bottom:1px solid rgba(0,229,255,.12);',
      'background:rgba(0,229,255,.06);">',
        '<div style="display:flex;align-items:center;gap:8px;">',
          '<div style="width:6px;height:6px;border-radius:50%;background:#00ff88;',
          'box-shadow:0 0 8px #00ff88;animation:pulse-green 2s ease-in-out infinite;"></div>',
          '<span style="font-family:\'Orbitron\',monospace;font-size:.5rem;letter-spacing:3px;',
          'color:var(--cyan);">DEMO · SISTEMA DE INVENTARIOS</span>',
        '</div>',
        '<div style="display:flex;gap:6px;">',
          '<button onclick="var f=document.getElementById(\'demoInlineFrame\');f.src=f.src;" ',
          'title="Recargar" style="font-family:\'Share Tech Mono\',monospace;font-size:.45rem;',
          'letter-spacing:1px;color:rgba(0,229,255,.5);background:none;',
          'border:1px solid rgba(0,229,255,.15);padding:3px 9px;cursor:pointer;">↺</button>',
          '<button onclick="',
            'var w=document.getElementById(\'demoInlineWrap\');',
            'var f=document.getElementById(\'demoInlineFrame\');',
            'var btn=this;',
            'if(f.style.height===\'0px\'||f.style.height===\'\'){',
              'f.style.height=\'520px\';btn.textContent=\'▲ OCULTAR\';',
            '}else{f.style.height=\'0px\';btn.textContent=\'▼ MOSTRAR\';}" ',
          'style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;',
          'letter-spacing:1px;color:rgba(0,229,255,.5);background:none;',
          'border:1px solid rgba(0,229,255,.15);padding:3px 9px;cursor:pointer;">▲ OCULTAR</button>',
        '</div>',
      '</div>',

      // Iframe
      '<div id="demoInlineWrap">',
        '<iframe id="demoInlineFrame" src="demo/index_administracion.html" ',
        'style="display:block;width:100%;height:520px;border:none;',
        'background:#030d18;transition:height .35s ease;" ',
        'scrolling="yes" title="Demo Inventarios DATASYS"></iframe>',
      '</div>',

      // Footer
      '<div style="padding:7px 14px;border-top:1px solid rgba(0,229,255,.08);',
      'font-family:\'Share Tech Mono\',monospace;font-size:.4rem;',
      'letter-spacing:2px;color:rgba(0,229,255,.3);display:flex;justify-content:space-between;">',
        '<span>DATASYS · SISTEMA DE CONTROL DE INVENTARIOS</span>',
        '<span style="color:#00ff88;">● LIVE DEMO</span>',
      '</div>',

    '</div>'
  ].join('');

  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;

  // Scroll suave al iframe tras render
  setTimeout(function() {
    msgs.scrollTop = msgs.scrollHeight;
  }, 400);
}

/* ──────────────────────────────────────────────────
   DEMO INLINE — LOGÍSTICA (flotilla_cfe.html)
   iframe embebido directo en el chat
────────────────────────────────────────────────── */
function abrirDemoLogisticaInline() {
  var DEMO_ID   = 'demoLogisticaWrap';
  var IFRAME_ID = 'demoLogisticaFrame';

  // Toggle si ya existe
  if (document.getElementById(DEMO_ID)) {
    var ex = document.getElementById(DEMO_ID);
    ex.style.display = ex.style.display === 'none' ? 'block' : 'none';
    return;
  }

  var msgs = document.getElementById('msgs');
  if (!msgs) return;

  var wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.style.cssText = 'align-self:flex-start;max-width:96%;width:96%;animation:msgIn .3s ease both;';

  wrap.innerHTML = [
    '<div class="msg-av">',
      '<img src="imagenes/logo.png" alt="AR" onerror="this.outerHTML=\'<span style=font-size:.8rem>⚡</span>\'">',
    '</div>',
    '<div class="bubble" style="width:100%;padding:0;overflow:hidden;',
    'background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.2);">',

      // Header
      '<div style="display:flex;align-items:center;justify-content:space-between;',
      'padding:9px 14px;border-bottom:1px solid rgba(0,229,255,.12);',
      'background:rgba(0,229,255,.06);">',
        '<div style="display:flex;align-items:center;gap:8px;">',
          '<div style="width:6px;height:6px;border-radius:50%;background:#00ff88;',
          'box-shadow:0 0 8px #00ff88;animation:pulse-green 2s ease-in-out infinite;"></div>',
          '<span style="font-family:\'Orbitron\',monospace;font-size:.5rem;letter-spacing:3px;',
          'color:var(--cyan);">DEMO · SISTEMA DE CONTROL DE FLOTILLA</span>',
        '</div>',
        '<div style="display:flex;gap:6px;">',
          '<button onclick="var f=document.getElementById(\'' + IFRAME_ID + '\');f.src=f.src;" ',
          'title="Recargar" style="font-family:\'Share Tech Mono\',monospace;font-size:.45rem;',
          'letter-spacing:1px;color:rgba(0,229,255,.5);background:none;',
          'border:1px solid rgba(0,229,255,.15);padding:3px 9px;cursor:pointer;">↺</button>',
          '<button onclick="',
            'var f=document.getElementById(\'' + IFRAME_ID + '\');',
            'var btn=this;',
            'if(f.style.height===\'0px\'||f.style.height===\'\'){',
              'f.style.height=\'520px\';btn.textContent=\'▲ OCULTAR\';',
            '}else{f.style.height=\'0px\';btn.textContent=\'▼ MOSTRAR\';}" ',
          'style="font-family:\'Share Tech Mono\',monospace;font-size:.42rem;',
          'letter-spacing:1px;color:rgba(0,229,255,.5);background:none;',
          'border:1px solid rgba(0,229,255,.15);padding:3px 9px;cursor:pointer;">▲ OCULTAR</button>',
        '</div>',
      '</div>',

      // Iframe
      '<div id="' + DEMO_ID + '">',
        '<iframe id="' + IFRAME_ID + '" src="demo/flotilla_cfe.html" ',
        'style="display:block;width:100%;height:520px;border:none;',
        'background:#030d18;transition:height .35s ease;" ',
        'scrolling="yes" title="Demo Flotilla DATASYS"></iframe>',
      '</div>',

      // Footer
      '<div style="padding:7px 14px;border-top:1px solid rgba(0,229,255,.08);',
      'font-family:\'Share Tech Mono\',monospace;font-size:.4rem;',
      'letter-spacing:2px;color:rgba(0,229,255,.3);display:flex;justify-content:space-between;">',
        '<span>DATASYS · SISTEMA DE CONTROL DE FLOTILLA</span>',
        '<span style="color:#00ff88;">● LIVE DEMO</span>',
      '</div>',

    '</div>'
  ].join('');

  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(function() { msgs.scrollTop = msgs.scrollHeight; }, 400);
}
