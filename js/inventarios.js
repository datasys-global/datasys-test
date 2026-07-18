/* ══════════════════════════════════════════════════
   ARIA — Base de conocimiento: INVENTARIOS
   DATASYS · js/inventarios.js
   ══════════════════════════════════════════════════ */

var ARIA_inventarios = [

  /* ── ¿QUÉ ES / PRESENTACIÓN ── */
  {
    claves: ["qué es","que es","inventario","inventarios","plataforma","explica","cuéntame","cuentame","información","informacion"],
    respuesta: "<img src='https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:160px;'><b>Plataforma de Inventarios DATASYS</b> — control total de existencias, movimientos y almacenes en tiempo real.<br><br>📦 <b>Incluye:</b><br>• Control de entradas y salidas<br>• Múltiples almacenes y ubicaciones<br>• Alertas de stock mínimo y máximo<br>• Trazabilidad por lote, serie o caducidad<br>• Reportes de valuación y rotación<br><br><a href='Desktop/inventarios_datasys.html' style='display:inline-block;margin-top:8px;padding:5px 14px;border:1px solid var(--cyan);color:var(--cyan);text-decoration:none;font-size:.8rem;'>→ Ver plataforma completa</a>"
  },

  /* ── ENTRADAS Y SALIDAS ── */
  {
    claves: ["entrada","entradas","salida","salidas","movimiento","movimientos","recepción","recepcion","despacho","transferencia"],
    respuesta: "<div style='margin-bottom:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='175' src='https://www.youtube-nocookie.com/embed/jp3Tt8IeW-A' frameborder='0' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con video propio de tu proceso de recepción/despacho --><span style='opacity:.45;font-size:.75em;'>▲ Cómo funciona el control de entradas y salidas</span><br><br>📥📤 <b>Movimientos registrados:</b><br>• Entradas: compras, devoluciones, producción terminada<br>• Salidas: surtido a producción, ventas, transferencias<br>• Lectura por código de barras o QR (cámara del celular)<br>• Historial completo auditable por movimiento"
  },

  /* ── STOCK / EXISTENCIAS ── */
  {
    claves: ["stock","existencia","existencias","saldo","saldos","disponible","disponibilidad","cantidad","cuánto hay","cuanto hay"],
    respuesta: "<img src='https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:150px;'><!-- 🔧 SUSTITUYE con screenshot real de tu vista de stock --><b>Control de Existencias en tiempo real:</b><br><br>• Stock por artículo, almacén o categoría<br>• Vista consolidada de todas las ubicaciones<br>• Stock reservado vs. disponible<br>• Indicadores de cobertura (días de inventario)<br><br><div style='display:flex;gap:8px;margin-top:8px;font-size:.78rem;'><span style='background:rgba(255,80,80,.1);border:1px solid rgba(255,80,80,.3);padding:4px 10px;border-radius:4px;color:#e05050;'>🔴 Stock crítico</span><span style='background:rgba(240,192,64,.08);border:1px solid rgba(240,192,64,.3);padding:4px 10px;border-radius:4px;color:#f0c040;'>🟡 Stock bajo</span><span style='background:rgba(0,255,136,.08);border:1px solid rgba(0,255,136,.3);padding:4px 10px;border-radius:4px;color:#00ff88;'>🟢 Normal</span></div>"
  },

  /* ── ALERTAS DE STOCK ── */
  {
    claves: ["alerta","alertas","mínimo","minimo","máximo","maximo","reorden","agotado","reabastecimiento"],
    respuesta: "🔔 <b>Alertas de Inventario:</b><br><br>• Stock mínimo y máximo por artículo<br>• Alerta automática al bajar del mínimo<br>• Notificación por correo, app o WhatsApp al comprador<br>• Sugerencia automática de cantidad a reponer<br>• Alerta de artículos obsoletos o sin movimiento<br>• Alerta de caducidad próxima<br><br><audio controls style='width:100%;margin-top:10px;accent-color:#00e5ff;'><source src='audio/demo_inventarios.mp3' type='audio/mpeg'></audio><!-- 🔧 CREA: audio/demo_inventarios.mp3 con una nota de voz sobre el sistema de alertas --><span style='opacity:.45;font-size:.75em;'>▲ Nota de voz: sistema de alertas de stock</span><br><br>Nunca vuelvas a parar producción por falta de material."
  },

  /* ── ALMACENES Y UBICACIONES ── */
  {
    claves: ["almacén","almacen","almacenes","ubicación","ubicaciones","bodega","rack","pasillo","zona"],
    respuesta: "<img src='https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:150px;'><!-- 🔧 SUSTITUYE con foto real de tu almacén o bodega --><b>Gestión de Almacenes y Ubicaciones:</b><br><br>• Múltiples almacenes: planta, externo, tránsito, consigna<br>• Estructura: zona → rack → nivel → posición<br>• Asignación automática FIFO, FEFO o LIFO<br>• Mapa visual del almacén con ocupación en tiempo real<br>• Transferencias entre almacenes con trazabilidad<br><br><a href='Desktop/inventarios_datasys.html#almacenes' style='color:var(--cyan);font-size:.82rem;'>→ Ver módulo de almacenes</a>"
  },

  /* ── TRAZABILIDAD ── */
  {
    claves: ["trazabilidad","lote","lotes","serie","número de serie","caducidad","vencimiento","rastrear","rastreo"],
    respuesta: "<div style='margin-bottom:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='175' src='https://www.youtube-nocookie.com/embed/RFV6gIaiCBs' frameborder='0' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con video propio de trazabilidad --><span style='opacity:.45;font-size:.75em;'>▲ Trazabilidad de inventario por lote y serie</span><br><br>🔎 <b>Trazabilidad completa:</b><br>• Por número de lote, serie o fecha de caducidad<br>• ¿De dónde vino? ¿A dónde fue? ¿Quién lo movió?<br>• Trazabilidad hacia atrás (recall) y hacia adelante<br>• Compatible con ISO, BPM y FDA"
  },

  /* ── INVENTARIO FÍSICO ── */
  {
    claves: ["inventario físico","inventario fisico","conteo","cíclico","ciclico","levantamiento","ajuste","diferencias","conciliación","conciliacion"],
    respuesta: "<img src='https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:150px;'><!-- 🔧 SUSTITUYE con foto de tu equipo haciendo conteo físico --><b>Inventario Físico y Conteos Cíclicos:</b><br><br>• Conteos programados por categoría, zona o artículo<br>• Captura en tablet o celular con código de barras o QR<br>• Comparativo automático: sistema vs. físico<br>• Flujo de autorización para ajustes<br>• Historial para auditoría<br><br>Reduce el tiempo de inventario físico hasta un <b>60%</b> vs. el método manual."
  },

  /* ── REPORTES ── */
  {
    claves: ["reporte","reportes","valuación","valuacion","costo","valor","rotación","rotacion","análisis","analisis","exportar"],
    respuesta: "📄 <b>Reportes de Inventario:</b><br><br>• Valuación: costo promedio, PEPS o precio estándar<br>• Rotación por artículo (veces que rota al mes/año)<br>• Antigüedad de inventario (artículos sin movimiento)<br>• ABC de inventario por valor e impacto<br>• Exportación a Excel · PDF · Power BI<br><br><img src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' style='width:100%;border-radius:6px;margin-top:8px;object-fit:cover;max-height:130px;'><!-- 🔧 SUSTITUYE con screenshot real de tus reportes --><br><span style='opacity:.45;font-size:.75em;'>▲ Dashboard de reportes de inventario</span>"
  },

  /* ── INTEGRACIÓN ── */
  {
    claves: ["erp","integración","integracion","sap","oracle","compras","ventas","producción","produccion","api","conectar"],
    respuesta: "🔗 <b>Integraciones de Inventarios:</b><br><br>• <b>Producción DATASYS</b>: consumo automático de materiales<br>• <b>SAP / Oracle / Dynamics</b>: artículos, movimientos, saldos<br>• <b>E-commerce</b>: stock en tienda online en tiempo real<br>• <b>Código de barras / RFID</b><br>• <b>API REST</b> abierta<br><br><div style='background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.2);border-radius:6px;padding:10px;margin-top:8px;font-size:.8rem;'>💬 ¿Con qué sistema conectas tu inventario?<br><a href='mailto:contacto@datasys.mx' style='color:var(--cyan);'>contacto@datasys.mx</a> · +52 (55) 1017-6436</div>"
  },

  /* ── PRECIOS ── */
  {
    claves: ["precio","precios","costo","cuánto","cuanto","tarifa","presupuesto","cotización","cotizacion","inversión","inversion","plan"],
    respuesta: "💰 <b>Planes de Inventarios DATASYS:</b><br><br><div style='border:1px solid rgba(0,229,255,.2);border-radius:6px;overflow:hidden;margin:8px 0;font-size:.8rem;'><div style='padding:8px 12px;border-bottom:1px solid rgba(0,229,255,.1);'><b style='color:var(--cyan);'>🔹 BÁSICO</b> — 1 almacén · hasta 500 artículos</div><div style='padding:8px 12px;border-bottom:1px solid rgba(0,229,255,.1);'><b style='color:var(--cyan);'>🔷 PROFESIONAL</b> — multi-almacén · trazabilidad · ERP</div><div style='padding:8px 12px;'><b style='color:var(--cyan);'>💎 ENTERPRISE</b> — ilimitado · RFID · BI · soporte 24/7</div></div>📧 <a href='mailto:contacto@datasys.mx' style='color:var(--cyan);'>contacto@datasys.mx</a> · 📞 +52 (55) 1017-6436<br><span style='opacity:.5;font-size:.78em;'>Implementación y capacitación incluidas en todos los planes.</span>"
  },

  /* ── DEMO / INICIAR ── */
  {
    claves: ["demo","demostración","demostracion","prueba","gratis","contratar","iniciar","empezar","arrancar","implementar"],
    respuesta: "🚀 <b>Cómo iniciar con Inventarios DATASYS:</b><br><br>1. Diagnóstico gratuito de tu catálogo y procesos<br>2. Demo en vivo con tus artículos<br>3. Carga inicial desde Excel (tu inventario actual)<br>4. Capacitación al equipo de almacén en 1–2 días<br>5. <b>Go-live en menos de 1 semana</b> para operaciones estándar<br><br><audio controls style='width:100%;margin-top:10px;accent-color:#00e5ff;'><source src='audio/bienvenida_inventarios.mp3' type='audio/mpeg'></audio><!-- 🔧 CREA: audio/bienvenida_inventarios.mp3 con mensaje de bienvenida al módulo --><span style='opacity:.45;font-size:.75em;'>▲ Mensaje de bienvenida al módulo</span><br><br><a href='mailto:contacto@datasys.mx' style='display:inline-block;margin-top:8px;padding:6px 16px;border:1px solid var(--cyan);color:var(--cyan);text-decoration:none;font-size:.82rem;'>→ Agendar demo gratuita</a>"
  }

];
