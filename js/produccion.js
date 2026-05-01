/* ══════════════════════════════════════════════════
   ARIA — Base de conocimiento: PRODUCCIÓN
   DATASYS · js/produccion.js
   ══════════════════════════════════════════════════ */

var ARIA_produccion = [

  /* ── ¿QUÉ ES / PRESENTACIÓN ── */
  {
    claves: ["qué es","que es","producción","produccion","plataforma","explica","cuéntame","cuentame","información","informacion"],
    respuesta: "<img src='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:160px;'><b>Plataforma de Producción DATASYS</b> — control total de tu manufactura en tiempo real.<br><br>📋 <b>Incluye:</b><br>• Control de líneas de producción<br>• Órdenes de trabajo digitales<br>• KPIs y OEE en tiempo real<br>• Alertas automáticas por paro o baja eficiencia<br>• Reportes diarios, semanales y mensuales<br><br><a href='Desktop/produccion_datasys.html' style='display:inline-block;margin-top:8px;padding:5px 14px;border:1px solid var(--cyan);color:var(--cyan);text-decoration:none;font-size:.8rem;'>→ Ver plataforma completa</a>"
  },

  /* ── KPIs Y MÉTRICAS ── */
  {
    claves: ["kpi","métrica","metricas","indicador","indicadores","rendimiento","eficiencia","oee","productividad"],
    respuesta: "📊 <b>KPIs que monitorea la plataforma:</b><br><br>• <b>OEE</b>: disponibilidad × rendimiento × calidad<br>• <b>Throughput</b>: unidades por hora/turno<br>• <b>Tiempo de ciclo</b>: real vs. estándar<br>• <b>Tasa de rechazo</b>: piezas defectuosas sobre total<br>• <b>Tiempo de paro</b>: planificado vs. no planificado<br><br><div style='margin-top:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='180' src='https://www.youtube.com/embed/T3mkLFGjQYk' frameborder='0' allowfullscreen style='display:block;'></iframe></div><span style='opacity:.45;font-size:.75em;'>▲ ¿Qué es OEE? — video explicativo</span><br><!-- 🔧 SUSTITUYE el iframe con tu video propio cuando lo tengas -->"
  },

  /* ── CONTROL DE CALIDAD ── */
  {
    claves: ["calidad","control de calidad","defecto","defectos","rechazo","rechazos","scrap","inspección","inspeccion","no conforme"],
    respuesta: "<img src='https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:150px;'><!-- 🔧 SUSTITUYE con: src='imagenes/calidad_produccion.png' --><b>Control de Calidad en Producción:</b><br><br>• Registro de no conformidades por línea, turno u operador<br>• Clasificación de defectos por tipo y causa raíz<br>• Alertas automáticas al superar umbral de rechazo<br>• Trazabilidad completa: lote → máquina → operador<br>• Reportes ISO 9001 y gráficas SPC<br><br><a href='Desktop/produccion_datasys.html#calidad' style='color:var(--cyan);font-size:.82rem;'>→ Ver módulo de calidad</a>"
  },

  /* ── ÓRDENES DE TRABAJO ── */
  {
    claves: ["orden","órdenes","ordenes","trabajo","ot","programación","programacion","plan","planificación","planificacion"],
    respuesta: "📋 <b>Gestión de Órdenes de Trabajo:</b><br><br>• Creación y asignación desde la plataforma o vía ERP<br>• Estado en tiempo real: pendiente → en proceso → terminada<br>• Tiempos reales vs. estándar por operación<br>• Notificaciones automáticas al completar o tener retraso<br><br><audio controls style='width:100%;margin-top:10px;accent-color:#00e5ff;'><source src='audio/demo_produccion.mp3' type='audio/mpeg'></audio><!-- 🔧 CREA: audio/demo_produccion.mp3 con una nota de voz explicando el módulo --><span style='opacity:.45;font-size:.75em;'>▲ Nota de voz: cómo funciona una orden de trabajo</span>"
  },

  /* ── PAROS Y MANTENIMIENTO ── */
  {
    claves: ["paro","paros","mantenimiento","falla","fallas","avería","averia","downtime","tiempo muerto","máquina parada"],
    respuesta: "<div style='margin-bottom:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='175' src='https://www.youtube.com/embed/j5TMrBB0zeE' frameborder='0' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con video propio sobre mantenimiento en tu planta --><span style='opacity:.45;font-size:.75em;'>▲ Mantenimiento predictivo en planta industrial</span><br><br>⚙️ <b>Control de Paros:</b><br>• Registro con causa, duración y equipo afectado<br>• Alertas al área de mantenimiento vía app<br>• Dashboard de disponibilidad en tiempo real<br>• Historial para mantenimiento predictivo<br><br>Reduce paros no planificados hasta un <b>40%</b>."
  },

  /* ── TURNOS Y OPERADORES ── */
  {
    claves: ["turno","turnos","operador","operadores","personal","trabajador","trabajadores","mano de obra"],
    respuesta: "<img src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' style='width:100%;border-radius:6px;margin-bottom:10px;object-fit:cover;max-height:150px;'><!-- 🔧 SUSTITUYE con foto real de tu equipo de planta --><b>Gestión de Turnos y Operadores:</b><br><br>• Turnos: matutino, vespertino, nocturno<br>• Producción individual por operador<br>• Comparativo de rendimiento entre turnos<br>• Reporte de productividad por persona<br><br>Identifica qué turno o línea necesita refuerzo o capacitación."
  },

  /* ── REPORTES ── */
  {
    claves: ["reporte","reportes","informe","informes","exportar","excel","pdf"],
    respuesta: "📄 <b>Reportes disponibles:</b><br><br>• Reporte diario por línea y turno<br>• Cumplimiento semanal de plan<br>• OEE y KPIs mensuales<br>• Calidad, defectos y paros<br>• Exportación: Excel · PDF · Power BI<br><br><img src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' style='width:100%;border-radius:6px;margin-top:8px;object-fit:cover;max-height:140px;'><!-- 🔧 SUSTITUYE con screenshot real de tus reportes --><br><span style='opacity:.45;font-size:.75em;'>▲ Ejemplo de dashboard de reportes</span>"
  },

  /* ── INTEGRACIÓN ERP ── */
  {
    claves: ["erp","integración","integracion","sap","oracle","sistema","conectar","api","sincronizar"],
    respuesta: "🔗 <b>Integraciones disponibles:</b><br><br>• SAP · Oracle · Microsoft Dynamics<br>• API REST para sistemas propios<br>• Power BI / Tableau / Excel<br>• Sensores IoT y PLCs de línea<br><br><div style='background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.2);border-radius:6px;padding:10px;margin-top:8px;font-size:.8rem;'>💬 <b>¿Qué sistema usas?</b> Evaluamos la integración sin costo.<br><a href='mailto:contacto@datasys.mx' style='color:var(--cyan);'>contacto@datasys.mx</a> · +52 (55) 1017-6436</div>"
  },

  /* ── PRECIOS ── */
  {
    claves: ["precio","precios","costo","costos","cuánto","cuanto","tarifa","presupuesto","cotización","cotizacion","inversión","inversion"],
    respuesta: "💰 <b>Planes de Producción DATASYS:</b><br><br><div style='border:1px solid rgba(0,229,255,.2);border-radius:6px;overflow:hidden;margin:8px 0;font-size:.8rem;'><div style='padding:8px 12px;border-bottom:1px solid rgba(0,229,255,.1);'><b style='color:var(--cyan);'>🔹 BÁSICO</b> — 1 línea · KPIs · órdenes · reportes</div><div style='padding:8px 12px;border-bottom:1px solid rgba(0,229,255,.1);'><b style='color:var(--cyan);'>🔷 PROFESIONAL</b> — hasta 5 líneas · calidad · ERP · IoT</div><div style='padding:8px 12px;'><b style='color:var(--cyan);'>💎 ENTERPRISE</b> — multi-planta · BI avanzado · soporte 24/7</div></div>📧 <a href='mailto:contacto@datasys.mx' style='color:var(--cyan);'>contacto@datasys.mx</a> · 📞 +52 (55) 1017-6436"
  },

  /* ── DEMO / INICIAR ── */
  {
    claves: ["demo","demostración","demostracion","prueba","gratis","contratar","iniciar","empezar","arrancar","implementar"],
    respuesta: "<div style='margin-bottom:10px;border-radius:6px;overflow:hidden;'><iframe width='100%' height='175' src='https://www.youtube.com/embed/bHQqvYy5KYo' frameborder='0' allowfullscreen style='display:block;'></iframe></div><!-- 🔧 SUSTITUYE con el ID de tu video demo real en YouTube --><span style='opacity:.45;font-size:.75em;'>▲ Demo — Plataforma de Producción DATASYS</span><br><br>🚀 <b>Cómo iniciar:</b><br>1. Diagnóstico gratuito de tu planta<br>2. Demo con tus datos reales<br>3. Propuesta en 48 hrs<br>4. Implementación: 2–4 semanas<br><br><a href='mailto:contacto@datasys.mx' style='display:inline-block;margin-top:6px;padding:6px 16px;border:1px solid var(--cyan);color:var(--cyan);text-decoration:none;font-size:.82rem;'>→ Agendar demo gratuita</a>"
  }

];
