/* ══════════════════════════════════════════════════
   ARIA — Base de conocimiento: LOGÍSTICA
   DATASYS · js/logistica.js
   ══════════════════════════════════════════════════ */

var ARIA_logistica = [

  /* ── ¿QUÉ ES / PRESENTACIÓN ── */
  {
    claves: ["qué es","que es","logística","logistica","plataforma","explica","cuéntame","cuentame","información","informacion"],
    respuesta: "<img src='https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:160px;'><b>Plataforma de Logística DATASYS</b> — del despacho a la entrega, todo controlado en tiempo real.<br><br>🚚 <b>Incluye:</b><br>• Gestión de pedidos y embarques<br>• Optimización de rutas de entrega<br>• Seguimiento GPS en tiempo real<br>• Prueba de entrega digital (firma + foto)<br>• KPIs de servicio: OTIF, nivel de servicio<br><br><a href='Desktop/logistica_datasys.html' style='display:inline-block;margin-top:8px;padding:5px 14px;border:1px solid var(--cyan);color:var(--cyan);text-decoration:none;font-size:.8rem;'>→ Ver plataforma completa</a>"
  },

  /* ── RUTAS Y OPTIMIZACIÓN ── */
  {
    claves: ["ruta","rutas","optimización","optimizacion","optimizar","planificación","planificacion","recorrido","zona","zonificación","zonificacion"],
    respuesta: "<div style='margin-bottom:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='175' src='https://www.youtube.com/embed/lLlLnMYQqBY' frameborder='0' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con video de tu sistema de optimización de rutas --><span style='opacity:.45;font-size:.75em;'>▲ Optimización de rutas de entrega</span><br><br>🗺️ <b>Optimización de Rutas:</b><br>• Planificación automática por zona, capacidad y ventanas de entrega<br>• Reduce hasta un <b>30% el kilometraje</b><br>• Ajuste dinámico ante cancelaciones o pedidos de último momento<br>• Visualización en mapa de todas las rutas del día"
  },

  /* ── SEGUIMIENTO GPS ── */
  {
    claves: ["gps","seguimiento","tracking","rastreo","ubicación","ubicacion","tiempo real","localizar","dónde está","donde esta","monitoreo"],
    respuesta: "<img src='https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:150px;'><!-- 🔧 SUSTITUYE con screenshot de tu mapa de seguimiento GPS --><b>Seguimiento GPS en Tiempo Real:</b><br><br>• Posición en vivo de cada vehículo o repartidor<br>• Historial de recorrido por fecha y unidad<br>• Alertas de desvío de ruta o exceso de velocidad<br>• ETA actualizado automáticamente<br>• Notificación al cliente cuando el pedido está próximo<br>• Link de rastreo para el cliente final<br><br><a href='Desktop/logistica_datasys.html#gps' style='color:var(--cyan);font-size:.82rem;'>→ Ver mapa de seguimiento en vivo</a>"
  },

  /* ── PEDIDOS Y EMBARQUES ── */
  {
    claves: ["pedido","pedidos","embarque","embarques","orden","órdenes","envío","envio","despacho","picking","packing","preparación","preparacion"],
    respuesta: "<div style='margin-bottom:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='175' src='https://www.youtube.com/embed/ZJThFmUdYHo' frameborder='0' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con video de tu proceso de picking/packing --><span style='opacity:.45;font-size:.75em;'>▲ Proceso de preparación y despacho de pedidos</span><br><br>📦 <b>Estado en tiempo real:</b><br><span style='font-size:.8rem;'>Recibido → Preparando → Listo → En ruta → <b style='color:#00ff88;'>Entregado ✓</b></span><br><br>• Verificación por código de barras (0 errores de surtido)<br>• Generación automática de guías y remisiones<br>• Consolidación de pedidos por ruta o cliente"
  },

  /* ── PRUEBA DE ENTREGA ── */
  {
    claves: ["entrega","entregas","firma","comprobante","evidencia","foto","fotografía","fotografia","pod","prueba de entrega","confirmación","confirmacion"],
    respuesta: "<img src='https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:140px;'><!-- 🔧 SUSTITUYE con screenshot de tu app de POD --><b>Prueba de Entrega Digital (POD):</b><br><br>• Firma del receptor en el celular del repartidor<br>• Foto del producto entregado o punto de entrega<br>• Registro de hora, fecha y geolocalización exacta<br>• Notificación automática al cliente y a facturación<br>• Evidencias consultables desde la web<br><br><audio controls style='width:100%;margin-top:10px;accent-color:#00e5ff;'><source src='audio/demo_pod.mp3' type='audio/mpeg'></audio><!-- 🔧 CREA: audio/demo_pod.mp3 explicando el proceso de prueba de entrega --><span style='opacity:.45;font-size:.75em;'>▲ Nota de voz: cómo funciona la prueba de entrega digital</span>"
  },

  /* ── FLOTILLA Y TRANSPORTISTAS ── */
  {
    claves: ["flotilla","vehículo","vehiculo","camión","camion","transportista","chofer","operador","unidad","flota"],
    respuesta: "<img src='https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:150px;'><!-- 🔧 SUSTITUYE con foto real de tu flotilla --><b>Control de Flotilla y Transportistas:</b><br><br>• Catálogo de vehículos propios y transportistas externos<br>• Capacidad de carga por unidad (peso, volumen, piezas)<br>• Asignación automática según disponibilidad<br>• Control de licencias y documentos con alertas de vencimiento<br>• Ranking de desempeño de choferes por nivel de servicio<br>• Control de gastos: combustible, casetas, mantenimiento"
  },

  /* ── KPIs Y NIVEL DE SERVICIO ── */
  {
    claves: ["kpi","métrica","metricas","nivel de servicio","otif","on time","puntualidad","retraso","retrasos","cumplimiento"],
    respuesta: "📊 <b>KPIs de Logística:</b><br><br>• <b>OTIF</b>: On Time In Full — entregas a tiempo y completas<br>• <b>Entrega perfecta</b>: sin daños, sin errores, con documentos<br>• <b>Tiempo promedio de entrega</b>: desde despacho hasta POD<br>• <b>Costo por entrega</b>: desglosado por ruta y zona<br>• <b>Entregas fallidas</b>: % y motivos<br><br><div style='margin-top:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='170' src='https://www.youtube.com/embed/ZJThFmUdYHo' frameborder='0' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con video de tu dashboard de KPIs --><span style='opacity:.45;font-size:.75em;'>▲ Dashboard de KPIs logísticos en tiempo real</span>"
  },

  /* ── ÚLTIMA MILLA ── */
  {
    claves: ["última milla","ultima milla","last mile","domicilio","cliente final","b2c","ecommerce","e-commerce","tienda en línea","tienda en linea"],
    respuesta: "<div style='margin-bottom:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='175' src='https://www.youtube.com/embed/mIa_rFm7DaI' frameborder='0' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con video propio de última milla --><span style='opacity:.45;font-size:.75em;'>▲ Logística de última milla para e-commerce</span><br><br>🏠 <b>Última Milla:</b><br>• Rutas urbanas optimizadas para domicilio<br>• Notificaciones automáticas: 'tu pedido va en camino'<br>• Reagendamiento de entregas fallidas desde portal del cliente<br>• Integración con Shopify, MercadoLibre, WooCommerce<br>• Soporte para entregas en mismo día y próximo día"
  },

  /* ── REPORTES ── */
  {
    claves: ["reporte","reportes","informe","análisis","analisis","exportar","excel","pdf","estadística","estadistica"],
    respuesta: "📄 <b>Reportes de Logística:</b><br><br>• Entregas del día: programadas vs. realizadas vs. fallidas<br>• OTIF semanal y mensual por cliente y zona<br>• Costos de distribución por ruta y unidad<br>• Incidencias: daños, rechazos, devoluciones<br>• Ranking de choferes y transportistas<br>• Exportación: Excel · PDF · Power BI<br><br><img src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' style='width:100%;border-radius:6px;margin-top:8px;object-fit:cover;max-height:130px;'><!-- 🔧 SUSTITUYE con screenshot real de tus reportes de logística --><br><span style='opacity:.45;font-size:.75em;'>▲ Ejemplo de reporte de logística</span>"
  },

  /* ── INTEGRACIÓN ── */
  {
    claves: ["erp","integración","integracion","sap","oracle","wms","inventario","ventas","api","conectar","sistema","ecommerce"],
    respuesta: "🔗 <b>Integraciones de Logística:</b><br><br>• <b>Inventarios DATASYS</b>: descuento automático al confirmar entrega<br>• <b>SAP / Oracle / Dynamics</b>: pedidos, remisiones y facturación<br>• <b>Shopify · MercadoLibre · Amazon</b><br>• <b>Google Maps / Waze</b>: navegación para repartidores<br>• <b>WhatsApp Business</b>: notificaciones al cliente<br>• <b>API REST</b> abierta<br><br><div style='background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.2);border-radius:6px;padding:10px;margin-top:8px;font-size:.8rem;'>💬 ¿Con qué sistema de ventas o e-commerce necesitas conectar?<br><a href='mailto:contacto@datasys.mx' style='color:var(--cyan);'>contacto@datasys.mx</a> · +52 (55) 1017-6436</div>"
  },

  /* ── PRECIOS ── */
  {
    claves: ["precio","precios","costo","costos","cuánto","cuanto","tarifa","presupuesto","cotización","cotizacion","inversión","inversion","plan"],
    respuesta: "💰 <b>Planes de Logística DATASYS:</b><br><br><div style='border:1px solid rgba(0,229,255,.2);border-radius:6px;overflow:hidden;margin:8px 0;font-size:.8rem;'><div style='padding:8px 12px;border-bottom:1px solid rgba(0,229,255,.1);'><b style='color:var(--cyan);'>🔹 BÁSICO</b> — hasta 50 entregas/mes · GPS · POD</div><div style='padding:8px 12px;border-bottom:1px solid rgba(0,229,255,.1);'><b style='color:var(--cyan);'>🔷 PROFESIONAL</b> — hasta 500 entregas · rutas optimizadas · ERP</div><div style='padding:8px 12px;'><b style='color:var(--cyan);'>💎 ENTERPRISE</b> — ilimitado · última milla · WhatsApp · soporte 24/7</div></div>📧 <a href='mailto:contacto@datasys.mx' style='color:var(--cyan);'>contacto@datasys.mx</a> · 📞 +52 (55) 1017-6436"
  },

  /* ── DEMO / INICIAR ── */
  {
    claves: ["demo","demostración","demostracion","prueba","gratis","contratar","iniciar","empezar","arrancar","implementar"],
    respuesta: "<div style='margin-bottom:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='175' src='https://www.youtube.com/embed/bHQqvYy5KYo' frameborder='0' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con el ID de tu video demo real de logística en YouTube --><span style='opacity:.45;font-size:.75em;'>▲ Demo — Plataforma de Logística DATASYS</span><br><br>🚀 <b>Cómo iniciar:</b><br>1. Diagnóstico gratuito de tus rutas y volúmenes<br>2. Demo simulando una jornada de entregas con tus datos<br>3. Piloto con una ruta o zona<br>4. Implementación: <b>1–3 semanas</b><br><br><a href='mailto:contacto@datasys.mx' style='display:inline-block;margin-top:6px;padding:6px 16px;border:1px solid var(--cyan);color:var(--cyan);text-decoration:none;font-size:.82rem;'>→ Agendar demo gratuita</a>"
  }

];
