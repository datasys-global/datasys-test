/* ARIA — Base de conocimiento: Apps & Software (03) — v3.1
   ORDEN DE PRIORIDAD: los bloques más específicos van PRIMERO.
   El motor busca de arriba hacia abajo y devuelve el primer match.
   Regla: frases largas/exactas arriba → genéricas abajo.
*/
var ARIA_apps = [

    /* ══════════════════════════════════════
       PRIORIDAD ALTA — frases específicas de botones
       Deben ir ANTES que los bloques genéricos para evitar
       que palabras como "diseño" o "proceso" disparen otra respuesta.
    ══════════════════════════════════════ */

    /* ── EXPERIENCIA: caso de éxito ── */
    { claves:["caso de éxito","caso de exito","resolviste","problema real","negocio real","capturas","muéstrame","muestrame","demostrar","demostracion","prueba","evidencia","cfesicl","perdía","perdia"],
      respuesta:"En el proyecto <b>cfesicl</b>, el cliente perdía al <b>28% de sus productos</b>. Diseñamos un flujo dinámico que simplificó la interfaz operativa por completo.<br><br>📊 <b>Resultado:</b> La tasa de pérdida bajó al <b>1% en el primer mes</b>.<br><br>Este es un ejemplo de cómo el diseño inteligente resuelve problemas de negocio reales, no solo mejora la estética. ¿Quieres ver más casos aplicados a tu industria?" },

    /* ── EXPERIENCIA: industria / competidores ── */
    { claves:["mi industria","industria antes","competidores","estándares ux","estandares ux","han diseñado","han disenado","diseñado para","disenado para","mi sector"],
      respuesta:"Hemos diseñado apps para sectores como <b>logística, retail, salud, fintech e industria</b>. Conocemos los estándares UX que muchos competidores ignoran, como la navegación con una mano, tiempos de carga por red móvil y accesibilidad. Cuéntanos tu industria y te mostramos qué está haciendo mal tu competencia. Escríbenos: <a href='mailto:contacto@datasys.mx' style='color:var(--cyan)'>contacto@datasys.mx</a>" },

    /* ── ESTRATEGIA: validar diseño con usuarios ── */
    { claves:["validas que el diseño","validar que el diseño","gustar a mis usuarios","usuarios finales","prototipo interactivo","prototipo de alta fidelidad","pruebas con usuarios","5 usuarios","usuarios reales","usabilidad"],
      respuesta:"Antes de programar, creamos un <b>prototipo interactivo de alta fidelidad</b>. Lo probamos con <b>5 usuarios reales</b> para identificar dónde se confunden.<br><br>💡 Es <b>10 veces más barato</b> corregir un error en diseño que en código. Este proceso nos ahorra un <b>30% en cambios futuros</b> y garantiza que la app sea intuitiva desde el día uno." },

    /* ── ESTRATEGIA: presupuesto limitado / MVP prioridades ── */
    { claves:["presupuesto limitado","fase 2","mvp funciones","funciones prioritarias","qué dejar para después","camino crítico","camino critico","primero lanzar","salir al mercado","recuperar inversión","recuperar inversion","qué recomiendas dejar","funciones para el mvp","qué funciones recomiendas"],
      respuesta:"Priorizamos el <b>'camino crítico'</b>: lo que genera dinero hoy.<br><br>Por ejemplo, si tu app es de ventas, primero el carrito y el pago. El modo oscuro o animaciones complejas esperan a la fase 2.<br><br>El objetivo es que <b>salgas rápido al mercado</b> para recuperar tu inversión antes de escalar. ¿Quieres que analicemos juntos qué va en el MVP y qué en fases posteriores?" },

    /* ── TÉCNICO: entrega de archivos a developers ── */
    { claves:["archivos a desarrolladores","design system","entrega a programadores","entrega a developers","handoff","css exacto","assets svg","sesión handoff","especificaciones técnicas","especificaciones tecnicas","se vea exactamente","vea exactamente como el diseño","archivos al programador"],
      respuesta:"No entregamos solo imágenes. Usamos <b>Figma</b> con un <b>Design System completo</b>:<br>• Colores, fuentes y componentes documentados<br>• Códigos CSS exportables<br>• Assets en SVG con medidas exactas<br>• Sesión de <b>Handoff</b> para explicar la lógica de animaciones a los desarrolladores<br><br>Esto elimina los errores de interpretación y garantiza que la app final se vea exactamente como el diseño." },

    /* ── TÉCNICO: guías nativas iOS / Android ── */
    { claves:["human interface","material design","guías nativas","guias nativas","ios guidelines","android guidelines","sentirse fluida","fluida en el teléfono","fluida en el telefono","romper las guías","romper las guias","nativo vs web","seguirlas o romperlas"],
      respuesta:"Sí conocemos y aplicamos las <b>Human Interface Guidelines</b> (Apple) y <b>Material Design</b> (Google).<br><br>Seguirlas garantiza que la app se sienta <b>fluida y nativa</b>, no como un sitio web pegado al teléfono. Sin embargo, las rompemos estratégicamente cuando el branding del cliente lo requiere, documentando siempre por qué se tomó esa decisión." },

    /* ── TÉCNICO: proceso completo paso a paso ── */
    { claves:["proceso multidisciplinario","crear una app","cómo se crea","como se crea","pasos para crear","qué necesito para crear","construir una app","desarrollar desde cero","desde cero","fases del desarrollo","etapas del desarrollo"],
      respuesta:"Crear una app es un proceso multidisciplinario que va más allá del código:<br><br>🧠 <b>1. Estrategia:</b> MVP, modelo de negocio, propuesta de valor<br>👥 <b>2. Equipo:</b> PM, Diseñador UX/UI, Desarrolladores Frontend/Backend, QA Tester<br>⚙️ <b>3. Stack tecnológico:</b> Flutter o React Native (multiplataforma recomendado), AWS/Firebase<br>🎨 <b>4. Diseño:</b> Wireframes → Prototipo → Diseño visual en Figma<br>🛡️ <b>5. Legal:</b> Cuentas de desarrollador (Apple $99/año, Google $25 único), política de privacidad<br>🚀 <b>6. Lanzamiento:</b> Beta testing, ASO, mantenimiento continuo<br><br>En DataSys cubrimos todo este proceso para ti. ¿Por dónde quieres empezar?" },

    /* ── CONFIANZA: propiedad intelectual ── */
    { claves:["dueño de los archivos","propietario","propiedad intelectual","derechos","a quién pertenece","a quien pertenece","código fuente","codigo fuente","dependencia","depender de datasys","archivos fuente son míos","archivos fuente son mios"],
      respuesta:"<b>Los archivos y derechos son totalmente tuyos.</b><br><br>Al finalizar el proyecto y liquidar el último pago, transferimos la propiedad de todos los archivos fuente en Figma y los derechos de uso sin restricciones.<br><br>Nuestro objetivo es entregarte una herramienta lista para que tu negocio crezca, <b>sin que dependas de nosotros para siempre</b>. El código fuente, diseños y assets son tuyos." },

    /* ── CONFIANZA: iteraciones post-lanzamiento ── */
    { claves:["iteraciones","flujo confuso","después del lanzamiento","despues del lanzamiento","cambios posteriores","ajustes post","post-lanzamiento","mejoras tras el lanzamiento"],
      respuesta:"Nuestro proceso incluye una fase de <b>prototipado interactivo</b> con 5 usuarios reales <b>antes</b> de gastar un solo peso en programación. Esto reduce los cambios futuros en un <b>30%</b>.<br><br>Además, todos los proyectos incluyen <b>garantía de 90 días</b> post-entrega. Si después del lanzamiento detectamos que un flujo confunde a los usuarios, lo ajustamos dentro de la garantía." },

    /* ── LOGÍSTICA: cuentas de developer ── */
    { claves:["cuentas de desarrollador","cuenta apple","cuenta google","apple developer","google developer","cuánto cuesta publicar","cuanto cuesta publicar","requisitos para publicar","99 usd","25 usd"],
      respuesta:"Para publicar en las tiendas necesitas:<br>• <b>Apple App Store:</b> ~$99 USD anuales (Apple Developer Program)<br>• <b>Google Play Store:</b> ~$25 USD pago único<br><br>Nos encargamos del proceso completo de alta y envío. Solo necesitas autorizarnos como administrador de la cuenta. Incluimos configuración, optimización ASO y gestión de revisiones." },

    /* ── LOGÍSTICA: requisitos legales ── */
    { claves:["política de privacidad","politica de privacidad","términos y condiciones","terminos y condiciones","registro de marca","marca registrada","rgpd","lfpdppp","cumplimiento legal","protección de datos","proteccion de datos","requisitos legales"],
      respuesta:"Los requisitos legales son obligatorios para publicar en tiendas:<br>• <b>Política de Privacidad:</b> Exigida por Apple, Google y leyes como RGPD y LFPDPPP (México)<br>• <b>Términos y Condiciones:</b> Protección legal ante el uso de la app<br>• <b>Registro de Marca:</b> Recomendado para proteger nombre y logo<br><br>Te orientamos en estos requerimientos como parte del proceso de lanzamiento." },

    /* ── LOGÍSTICA: ASO ── */
    { claves:["aso","app store optimization","posicionamiento en tienda","aparecer en búsquedas","aparecer en busquedas","primeros resultados de búsqueda","primeros resultados de busqueda","visibilidad en tienda","keywords app"],
      respuesta:"Incluimos <b>ASO (App Store Optimization)</b> en el lanzamiento:<br>• Investigación de palabras clave relevantes<br>• Descripción optimizada para conversión<br>• Capturas de pantalla diseñadas para causar impacto<br>• Categorías y metadatos correctos<br><br>El objetivo es que tu app <b>aparezca en los primeros resultados</b> de búsqueda orgánica en ambas tiendas." },

    /* ── LOGÍSTICA: beta testing ── */
    { claves:["beta","pruebas beta","beta testing","testflight","testers","usuarios de prueba","prueba antes de lanzar"],
      respuesta:"Antes del lanzamiento oficial realizamos <b>pruebas Beta</b>:<br>• En iOS usamos <b>TestFlight</b> (hasta 10,000 testers externos)<br>• En Android usamos <b>Google Play Testing Tracks</b><br>• Recopilamos feedback real de usuarios antes del estreno masivo<br>• Corregimos errores críticos antes de que lleguen a todos tus clientes<br><br>Esta fase evita malas reseñas iniciales que pueden dañar el lanzamiento." },

    /* ══════════════════════════════════════
       PRIORIDAD NORMAL — bloques genéricos
    ══════════════════════════════════════ */

    /* ── SALUDO ── */
    { claves:["hola","buenas","buen día","buen dia","saludos","hey","buenos días","buenos dias","qué tal","que tal"],
      respuesta:"¡Hola! Soy ARIA, asistente de <b>DataSys Apps &amp; Software</b>. Puedo ayudarte con información sobre desarrollo de apps, precios, tecnologías, tiempos y cómo contratar. ¿En qué te puedo apoyar?" },

    /* ── AGRADECIMIENTOS ── */
    { claves:["gracias","perfecto","ok","listo","entendido","excelente","genial","bien","claro","entiendo"],
      respuesta:"Con mucho gusto 😊 Si tienes más preguntas o quieres arrancar tu proyecto, escríbenos a <a href='mailto:contacto@datasys.mx' style='color:var(--cyan)'>contacto@datasys.mx</a> o llámanos al <b>+52 (55) 1017-6436</b>. ¡Estamos para ayudarte!" },

    /* ── QUÉ HACEN / SERVICIOS ── */
    { claves:["aplicación","aplicacion","móvil","movil","software","desarrollan","hacen","ofrecen","plataforma","servicio","servicios","qué es","que es","cuéntame","cuentame","info","información","informacion"],
      respuesta:"Desarrollamos <b>Apps iOS, Android y PWA</b> con integración nativa IoT y cloud enterprise. Soluciones móviles para startups, PYMES y corporativos. <a href='Desktop/apps_datasys.html' style='color:var(--cyan)'>Ver plataforma completa →</a>" },

    /* ── PRECIOS / COSTOS ── */
    { claves:["precio","costo","cuánto cuesta","cuanto cuesta","vale","cobran","tarifa","presupuesto","inversión","inversion","cotización","cotizacion","cobra","pagan","cuestan"],
      respuesta:"El desarrollo de una App profesional inicia en <b>$1,500 USD</b> para apps simples, hasta <b>$15,000+ USD</b> para soluciones enterprise. El precio varía según funcionalidades, plataformas y complejidad. Escríbenos a <a href='mailto:contacto@datasys.mx' style='color:var(--cyan)'>contacto@datasys.mx</a> para un presupuesto personalizado sin costo." },

    /* ── TIEMPOS / PLAZOS ── */
    { claves:["tiempo","plazo","demora","cuándo","cuando","tarda","duración","duracion","entrega","semanas","meses","rápido","rapido","urgente"],
      respuesta:"Una App estándar se entrega en <b>2 a 4 meses</b>. Proyectos enterprise con integraciones complejas requieren de <b>4 a 8 meses</b>. Para proyectos urgentes ofrecemos metodología <b>Agile Sprint</b> con entregas parciales cada 2 semanas." },

    /* ── IOT / SMART CITY ── */
    { claves:["iot","smartcity","smart city","sensor","sensores","dispositivo","dispositivos","industrial","conectividad","conectar","hardware"],
      respuesta:"Nuestras apps se integran nativamente con <b>dispositivos IoT</b>, sensores industriales, PLCs y plataformas SmartCity. Ideal para monitoreo en tiempo real, automatización de procesos y dashboards operacionales 24/7." },

    /* ── CÓMO CONTRATAR ── */
    { claves:["contratar","iniciar","empezar","arrancar","comenzar","contactar","hablar","reunión","reunion","agenda","agendar"],
      respuesta:"Para arrancar tu app con DataSys:<br>1. Escríbenos a <a href='mailto:contacto@datasys.mx' style='color:var(--cyan)'>contacto@datasys.mx</a><br>2. Agendamos sesión de requerimientos (sin costo)<br>3. Entregamos propuesta técnica + presupuesto en 48 hrs<br>4. Firmamos contrato y arrancamos el desarrollo<br>5. Entregas por sprint cada 2 semanas" },

    /* ── GARANTÍA / SOPORTE ── */
    { claves:["garantia","garantía","soporte","mantenimiento","bugs","errores","fallas","actualizaciones"],
      respuesta:"Todos los proyectos incluyen:<br>• <b>Garantía de 90 días</b> sobre bugs post-entrega<br>• Soporte técnico por correo y WhatsApp<br>• Planes de <b>mantenimiento mensual</b> desde $150 USD/mes<br>• Actualizaciones de seguridad y compatibilidad con nuevas versiones de iOS/Android" },

    /* ── TECNOLOGÍAS ── */
    { claves:["tecnologia","tecnología","lenguaje","framework","react","flutter","swift","kotlin","stack","backend","frontend","firebase","node"],
      respuesta:"Desarrollamos con tecnologías líderes:<br>• <b>Móvil:</b> Flutter, React Native, Swift (iOS), Kotlin (Android)<br>• <b>Web/PWA:</b> React, Vue.js, Next.js<br>• <b>Backend:</b> Node.js, Python, Firebase, AWS, Google Cloud<br>• <b>Bases de datos:</b> PostgreSQL, MongoDB, Firestore<br>Elegimos la mejor stack según tu proyecto y presupuesto." },

    /* ── TIPOS DE APPS ── */
    { claves:["tipo","tipos","ecommerce","tienda","comercio","delivery","pedidos","mapa","gps","redes sociales","streaming","educación","educacion","salud","health","fintech"],
      respuesta:"Desarrollamos todo tipo de apps:<br>• <b>E-commerce</b> y marketplaces con pasarelas de pago<br>• <b>Delivery</b> y logística con GPS en tiempo real<br>• <b>Fintech</b> y wallets digitales<br>• <b>HealthTech</b> y telemedicina<br>• <b>EdTech</b> y plataformas de aprendizaje<br>• <b>Enterprise</b> con integración a ERP/CRM<br>• <b>IoT &amp; SmartCity</b> con dashboards operacionales" },

    /* ── iOS / ANDROID / PWA ── */
    { claves:["ios","iphone","apple","android","google play","pwa","web app","progressive","multiplataforma","multi","ambas"],
      respuesta:"Desarrollamos para <b>todas las plataformas</b>:<br>• <b>iOS</b> (iPhone, iPad) — publicamos en App Store<br>• <b>Android</b> — publicamos en Google Play<br>• <b>PWA</b> (Progressive Web App) — funciona en cualquier dispositivo sin instalar<br>• Opción <b>multiplataforma</b> con Flutter o React Native para reducir costos hasta un 40%" },

    /* ── PUBLICACIÓN EN TIENDAS ── */
    { claves:["publicar","publicación","publicacion","app store","play store","subir","lanzar","lanzamiento"],
      respuesta:"Nos encargamos de <b>todo el proceso de publicación</b>:<br>• Creación y configuración de cuentas de desarrollador<br>• Optimización ASO (App Store Optimization)<br>• Capturas de pantalla y materiales gráficos<br>• Envío y gestión de revisiones<br>• El tiempo de aprobación es de <b>1 a 5 días hábiles</b> en ambas tiendas" },

    /* ── INTEGRACIÓN CON SISTEMAS ── */
    { claves:["integración","integracion","integrar","erp","crm","api","sap","salesforce","stripe","paypal","notificaciones","push"],
      respuesta:"Realizamos integraciones con cualquier sistema o servicio:<br>• <b>Pagos:</b> Stripe, PayPal, Conekta, OpenPay, MercadoPago<br>• <b>CRM/ERP:</b> Salesforce, SAP, HubSpot, Odoo<br>• <b>Mensajería:</b> WhatsApp Business API, notificaciones push<br>• <b>APIs REST/GraphQL</b> propias o de terceros<br>• <b>Autenticación:</b> Google, Apple, Facebook ID, biometría" },

    /* ── DISEÑO UI/UX genérico ── */
    { claves:["diseño","diseno","ux","ui","interfaz","pantallas","wireframe","figma","bonita","visual","look","apariencia"],
      respuesta:"Incluimos <b>diseño UI/UX profesional</b> en todos los proyectos:<br>• Research de usuarios y competencia<br>• Wireframes y prototipos interactivos en Figma<br>• Diseño visual con branding de tu empresa<br>• Pruebas de usabilidad antes del desarrollo<br>• Entregamos los archivos de diseño como activo tuyo" },

    /* ── SEGURIDAD ── */
    { claves:["seguridad","cifrado","encriptación","encriptacion","datos seguros","privacidad","gdpr","protección","proteccion"],
      respuesta:"Aplicamos <b>mejores prácticas de seguridad</b> en cada app:<br>• Cifrado de datos en tránsito (TLS 1.3) y en reposo (AES-256)<br>• Autenticación multifactor (MFA)<br>• Cumplimiento con <b>GDPR, LFPDPPP</b> (México) y estándares OWASP Mobile Top 10<br>• Pruebas de seguridad antes del lanzamiento" },

    /* ── STARTUP / EMPRENDEDOR ── */
    { claves:["startup","emprendedor","emprendedora","mvp","producto mínimo","producto minimo","nueva empresa","negocio","idea","validar"],
      respuesta:"Tenemos un programa especial para <b>startups y emprendedores</b>:<br>• <b>MVP</b> (Producto Mínimo Viable) desde <b>$1,500 USD</b><br>• Asesoría gratuita de 1 hora para validar tu idea<br>• Desarrollo ágil con entregas cada 2 semanas<br>• Escalabilidad garantizada cuando crezcas<br>Escríbenos: <a href='mailto:contacto@datasys.mx' style='color:var(--cyan)'>contacto@datasys.mx</a>" },

    /* ── CONTACTO ── */
    { claves:["contacto","correo","email","teléfono","telefono","llamar","número","numero","dirección","direccion","dónde","donde","ubicación","ubicacion"],
      respuesta:"Puedes contactarnos por:<br>• <b>Email:</b> <a href='mailto:contacto@datasys.mx' style='color:var(--cyan)'>contacto@datasys.mx</a><br>• <b>Teléfono/WhatsApp:</b> +52 (55) 1017-6436<br>• <b>Sede:</b> Ciudad de México<br>Respondemos en menos de <b>24 horas hábiles</b>." },

    /* ── PAGOS / FACTURACIÓN ── */
    { claves:["factura","facturación","facturacion","anticipo","mensualidad","plan de pago","financiamiento"],
      respuesta:"Manejamos esquemas de pago flexibles:<br>• <b>50% anticipo</b> al inicio del proyecto<br>• <b>25%</b> en entrega de diseño aprobado<br>• <b>25%</b> en entrega final<br>Emitimos <b>facturas CFDI</b> por cada pago. Aceptamos transferencia, tarjeta y PayPal." },

    /* ── COMPARATIVA / DIFERENCIAL ── */
    { claves:["mejor","diferencia","por qué elegirnos","ventaja","ventajas","diferencial","elegir","recomienda","recomendación","recomendacion","vs","versus","competencia"],
      respuesta:"Las principales ventajas de desarrollar con DataSys:<br>• <b>Equipo propio</b> — sin outsourcing ni subcontratos<br>• <b>Código fuente tuyo</b> — te entregamos todo al final<br>• Integración nativa con <b>IoT y cloud enterprise</b><br>• <b>Garantía real</b> de 90 días post-entrega<br>• Soporte continuo y planes de mantenimiento<br>• +5 años de experiencia en el mercado mexicano" },

    /* ── EXPERIENCIA / AÑOS ── */
    { claves:["años de experiencia","cuantos años","5 años","trayectoria","portafolio","portfolio","proyectos anteriores","proyectos previos","referencias","clientes anteriores","han hecho","han desarrollado","casos","ejemplos","experiencia"],
      respuesta:"DataSys tiene más de <b>5 años</b> desarrollando apps con clientes en México, EUA y Latinoamérica. Hemos trabajado con startups, PYMES y corporativos en sectores como fintech, logística, salud, retail e IoT. Contáctanos para ver casos de éxito relevantes a tu industria: <a href='mailto:contacto@datasys.mx' style='color:var(--cyan)'>contacto@datasys.mx</a>" },

    /* ── ESTRATEGIA / PLANIFICACIÓN genérica ── */
    { claves:["estrategia","planificación","planificacion","propuesta de valor","modelo de negocio","user personas","público objetivo","publico objetivo","estudio de mercado"],
      respuesta:"Una app exitosa empieza con estrategia sólida:<br>• <b>Idea y Propuesta de Valor:</b> ¿Qué problema resuelve y por qué es mejor que la competencia?<br>• <b>Estudio de Mercado:</b> Análisis de competidores y User Personas<br>• <b>Definición del MVP:</b> Solo las funciones esenciales para lanzar sin gastar de más<br>• <b>Modelo de Negocio:</b> ¿Freemium, suscripción, pago único?<br>Esto lo definimos contigo en la sesión de requerimientos sin costo." },

];

/* ══════════════════════════════════════════════════════════
   ARIA CHAT UI — Apps & Software v3.0
   5 botones: Experiencia · Estrategia · Servicio Técnico ·
               Confianza · Logística
══════════════════════════════════════════════════════════ */
(function () {

    /* ── CATEGORÍAS CON SUS PREGUNTAS ── */
    var categorias = [
        {
            label: "Experiencia",
            icon: "🏆",
            preguntas: [
                { label: "Caso de éxito real",    pregunta: "¿Puedes mostrarme un caso de éxito donde el diseño haya resuelto un problema de negocio real?" },
                { label: "Mi industria",           pregunta: "¿Has diseñado para mi industria? ¿Cuáles son los estándares UX que mis competidores ignoran?" },
                { label: "Años en el mercado",     pregunta: "¿Cuánta experiencia tienen y qué proyectos han desarrollado?" }
            ]
        },
        {
            label: "Estrategia",
            icon: "🎯",
            preguntas: [
                { label: "Validar diseño",         pregunta: "¿Cómo validan que el diseño le va a gustar a mis usuarios finales?" },
                { label: "Presupuesto limitado",   pregunta: "Si mi presupuesto es limitado, ¿qué funciones me recomiendan para el MVP?" },
                { label: "Propuesta de valor",     pregunta: "¿Cómo definen la estrategia y modelo de negocio de una app?" }
            ]
        },
        {
            label: "Servicio Técnico",
            icon: "⚙️",
            preguntas: [
                { label: "Entrega a developers",   pregunta: "¿Cómo entregan los archivos a los desarrolladores para que la app final se vea como el diseño?" },
                { label: "iOS y Android nativo",   pregunta: "¿Conocen las guías nativas de iOS y Android? ¿Por qué seguirlas o romperlas?" },
                { label: "Crear una app paso a paso", pregunta: "¿Cuáles son los pasos para crear una aplicación móvil desde cero?" }
            ]
        },
        {
            label: "Confianza",
            icon: "🤝",
            preguntas: [
                { label: "Propiedad del código",   pregunta: "¿Quién es el dueño de los archivos fuente y la propiedad intelectual al terminar?" },
                { label: "Cambios post-lanzamiento", pregunta: "¿Qué pasa si después del lanzamiento descubrimos que un flujo de usuario es confuso?" }
            ]
        },
        {
            label: "Logística",
            icon: "🚀",
            preguntas: [
                { label: "Cuentas de developer",   pregunta: "¿Cuánto cuesta publicar en App Store y Google Play? ¿Qué cuentas necesito?" },
                { label: "Requisitos legales",     pregunta: "¿Qué requisitos legales necesito para publicar mi app?" },
                { label: "ASO y posicionamiento",  pregunta: "¿Qué es el ASO y cómo ayudan a posicionar la app en las tiendas?" }
            ]
        }
    ];

    /* ── ESTILOS ── */
    var css = `
        #aria-chat-wrap *{box-sizing:border-box;margin:0;padding:0;}
        #aria-chat-wrap{
            max-width:480px;
            font-family:'Segoe UI',system-ui,sans-serif;
            border-radius:16px;
            overflow:hidden;
            border:1px solid rgba(0,0,0,.08);
            box-shadow:0 8px 32px rgba(0,0,0,.12);
        }

        /* Header */
        #aria-chat-header{
            background:linear-gradient(135deg,#0F6E56 0%,#1A9B78 100%);
            padding:14px 18px;
            display:flex;align-items:center;gap:12px;
        }
        .ar-avatar{
            width:40px;height:40px;border-radius:50%;
            background:rgba(255,255,255,.2);
            display:flex;align-items:center;justify-content:center;
            font-size:14px;font-weight:700;color:#fff;flex-shrink:0;
            border:2px solid rgba(255,255,255,.3);
        }
        .ar-info .ar-name{font-size:15px;font-weight:700;color:#fff;letter-spacing:.2px;}
        .ar-info .ar-status{font-size:11px;color:rgba(255,255,255,.75);margin-top:1px;display:flex;align-items:center;gap:5px;}
        .ar-dot{width:7px;height:7px;border-radius:50%;background:#4DFFBE;animation:ar-pulse 2s ease-in-out infinite;flex-shrink:0;}
        @keyframes ar-pulse{0%,100%{opacity:1;}50%{opacity:.4;}}

        /* Body */
        #aria-chat-body{
            background:#f5f7f6;
            min-height:280px;max-height:320px;
            overflow-y:auto;
            padding:16px 14px;
            display:flex;flex-direction:column;gap:12px;
            scroll-behavior:smooth;
        }
        #aria-chat-body::-webkit-scrollbar{width:3px;}
        #aria-chat-body::-webkit-scrollbar-thumb{background:rgba(15,110,86,.25);border-radius:4px;}

        /* Mensajes */
        .ar-msg{display:flex;gap:9px;align-items:flex-end;max-width:92%;}
        .ar-msg.ar-bot{align-self:flex-start;}
        .ar-msg.ar-user{align-self:flex-end;flex-direction:row-reverse;}
        .ar-bubble{
            padding:10px 14px;
            border-radius:16px;
            font-size:13.5px;
            line-height:1.6;
        }
        .ar-msg.ar-bot .ar-bubble{
            background:#fff;color:#1a1a1a;
            border-bottom-left-radius:4px;
            border:1px solid rgba(0,0,0,.07);
            box-shadow:0 1px 4px rgba(0,0,0,.05);
        }
        .ar-msg.ar-user .ar-bubble{
            background:linear-gradient(135deg,#0F6E56,#1A9B78);
            color:#fff;
            border-bottom-right-radius:4px;
        }
        .ar-msg.ar-bot .ar-bubble a{color:#0F6E56;font-weight:600;}
        .ar-msg.ar-user .ar-bubble a{color:#9FE1CB;}
        .ar-mini-av{
            width:28px;height:28px;border-radius:50%;
            background:linear-gradient(135deg,#0F6E56,#1A9B78);
            display:flex;align-items:center;justify-content:center;
            font-size:9px;font-weight:700;color:#fff;flex-shrink:0;
        }

        /* Typing */
        .ar-typing-wrap{display:flex;gap:9px;align-items:center;align-self:flex-start;}
        .ar-typing{display:flex;gap:4px;padding:10px 14px;align-items:center;
            background:#fff;border-radius:16px;border-bottom-left-radius:4px;
            border:1px solid rgba(0,0,0,.07);}
        .ar-typing span{width:6px;height:6px;border-radius:50%;background:#bbb;animation:ar-blink 1.2s infinite;}
        .ar-typing span:nth-child(2){animation-delay:.2s;}
        .ar-typing span:nth-child(3){animation-delay:.4s;}
        @keyframes ar-blink{0%,80%,100%{opacity:.25}40%{opacity:1}}

        /* Footer */
        #aria-chat-footer{
            background:#fff;
            border-top:1px solid rgba(0,0,0,.07);
            padding:12px 14px;
            display:flex;flex-direction:column;gap:10px;
        }

        /* Categorías (fila 1) */
        #ar-cat-row{
            display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;
        }
        #ar-cat-row::-webkit-scrollbar{height:2px;}
        #ar-cat-row::-webkit-scrollbar-thumb{background:rgba(15,110,86,.2);border-radius:2px;}
        .ar-cat-btn{
            font-size:11.5px;padding:5px 11px;
            border-radius:20px;
            border:1.5px solid rgba(15,110,86,.25);
            background:#f5f7f6;
            color:#0F6E56;
            cursor:pointer;
            white-space:nowrap;
            font-weight:600;
            letter-spacing:.2px;
            transition:all .18s ease;
            flex-shrink:0;
            display:flex;align-items:center;gap:4px;
        }
        .ar-cat-btn:hover{background:#E1F5EE;border-color:#0F6E56;}
        .ar-cat-btn.ar-cat-active{
            background:linear-gradient(135deg,#0F6E56,#1A9B78);
            color:#fff;border-color:transparent;
            box-shadow:0 2px 8px rgba(15,110,86,.35);
        }

        /* Preguntas rápidas (fila 2) */
        #ar-quick-row{
            display:flex;flex-wrap:wrap;gap:5px;
            min-height:0;
            overflow:hidden;
            transition:all .2s ease;
        }
        #ar-quick-row.ar-hidden{display:none;}
        .ar-qbtn{
            font-size:12px;padding:5px 11px;
            border-radius:20px;
            border:1px solid rgba(0,0,0,.1);
            background:#f0f4f2;
            color:#333;
            cursor:pointer;
            transition:all .15s;
            line-height:1.4;
        }
        .ar-qbtn:hover{background:#E1F5EE;border-color:#0F6E56;color:#0F6E56;}

        /* Input */
        #ar-input-row{display:flex;gap:8px;align-items:center;}
        #ar-user-input{
            flex:1;font-size:13px;padding:9px 14px;
            border-radius:22px;border:1.5px solid rgba(0,0,0,.1);
            outline:none;background:#f5f7f6;color:#1a1a1a;
            transition:border-color .2s;
        }
        #ar-user-input::placeholder{color:#aaa;}
        #ar-user-input:focus{border-color:#0F6E56;background:#fff;}
        #ar-send-btn{
            width:36px;height:36px;border-radius:50%;
            background:linear-gradient(135deg,#0F6E56,#1A9B78);
            border:none;cursor:pointer;
            display:flex;align-items:center;justify-content:center;
            flex-shrink:0;
            box-shadow:0 2px 8px rgba(15,110,86,.3);
            transition:transform .15s,box-shadow .15s;
        }
        #ar-send-btn:hover{transform:scale(1.06);box-shadow:0 4px 12px rgba(15,110,86,.4);}
        #ar-send-btn svg{fill:white;}
    `;

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    var container = document.getElementById('aria-apps-chat');
    if (!container) {
        container = document.createElement('div');
        container.id = 'aria-apps-chat';
        document.body.appendChild(container);
    }

    /* ── BUILD HTML ── */
    var catBtnsHtml = categorias.map(function(c, idx){
        return '<button class="ar-cat-btn" data-cat="'+idx+'" onclick="ARIA_selectCat('+idx+')">'
            + c.icon + ' ' + c.label
            + '</button>';
    }).join('');

    container.innerHTML =
        '<div id="aria-chat-wrap">'
        + '<div id="aria-chat-header">'
        +   '<div class="ar-avatar">AR</div>'
        +   '<div class="ar-info">'
        +     '<div class="ar-name">ARIA — DataSys Apps</div>'
        +     '<div class="ar-status"><span class="ar-dot"></span>Asistente virtual · En línea</div>'
        +   '</div>'
        + '</div>'
        + '<div id="aria-chat-body"></div>'
        + '<div id="aria-chat-footer">'
        +   '<div id="ar-cat-row">' + catBtnsHtml + '</div>'
        +   '<div id="ar-quick-row" class="ar-hidden"></div>'
        +   '<div id="ar-input-row">'
        +     '<input id="ar-user-input" type="text" placeholder="Escribe tu pregunta..." />'
        +     '<button id="ar-send-btn">'
        +       '<svg width="14" height="14" viewBox="0 0 16 16"><path d="M2 1l13 7-13 7V9.5l9-1.5-9-1.5V1z"/></svg>'
        +     '</button>'
        +   '</div>'
        + '</div>'
        + '</div>';

    document.getElementById('ar-send-btn').addEventListener('click', function(){ ARIA_chat_handleSend(); });
    document.getElementById('ar-user-input').addEventListener('keydown', function(e){ if(e.key==='Enter') ARIA_chat_handleSend(); });

    /* ── SELECCIONAR CATEGORÍA ── */
    window.ARIA_selectCat = function(idx){
        // Toggle: si ya está activa, deseleccionar
        var btns = document.querySelectorAll('.ar-cat-btn');
        var isActive = btns[idx] && btns[idx].classList.contains('ar-cat-active');

        btns.forEach(function(b){ b.classList.remove('ar-cat-active'); });

        var quickRow = document.getElementById('ar-quick-row');
        if(isActive){
            quickRow.innerHTML = '';
            quickRow.classList.add('ar-hidden');
            return;
        }

        btns[idx].classList.add('ar-cat-active');

        var cat = categorias[idx];
        var html = cat.preguntas.map(function(p){
            return '<button class="ar-qbtn" onclick="ARIA_chat_sendQ(\''
                + p.pregunta.replace(/'/g,"\\'")
                + '\')">' + p.label + '</button>';
        }).join('');

        quickRow.innerHTML = html;
        quickRow.classList.remove('ar-hidden');
    };

    /* ── MENSAJES ── */
    function addMsg(text, from, isHTML) {
        var body = document.getElementById('aria-chat-body');
        var wrap = document.createElement('div');
        wrap.className = 'ar-msg ar-' + from;
        if (from === 'bot') {
            var av = document.createElement('div');
            av.className = 'ar-mini-av';
            av.textContent = 'AR';
            wrap.appendChild(av);
        }
        var bub = document.createElement('div');
        bub.className = 'ar-bubble';
        if (isHTML) bub.innerHTML = text; else bub.textContent = text;
        wrap.appendChild(bub);
        body.appendChild(wrap);
        body.scrollTop = body.scrollHeight;
    }

    function showTyping(cb) {
        var body = document.getElementById('aria-chat-body');
        var wrap = document.createElement('div');
        wrap.className = 'ar-typing-wrap';
        wrap.id = 'ar-typing';

        var av = document.createElement('div');
        av.className = 'ar-mini-av';
        av.textContent = 'AR';

        var bub = document.createElement('div');
        bub.className = 'ar-typing';
        bub.innerHTML = '<span></span><span></span><span></span>';

        wrap.appendChild(av);
        wrap.appendChild(bub);
        body.appendChild(wrap);
        body.scrollTop = body.scrollHeight;

        setTimeout(function(){
            var t = document.getElementById('ar-typing');
            if(t) t.remove();
            cb();
        }, 900);
    }

    function getAnswer(txt) {
        var low = txt.toLowerCase();
        for (var i = 0; i < ARIA_apps.length; i++) {
            var item = ARIA_apps[i];
            for (var j = 0; j < item.claves.length; j++) {
                if (low.indexOf(item.claves[j]) !== -1) return item.respuesta;
            }
        }
        return "Para una atención personalizada escríbenos a <a href='mailto:contacto@datasys.mx' style='color:#0F6E56;font-weight:600'>contacto@datasys.mx</a> o al <b>+52 (55) 1017-6436</b>. ¡Con gusto te apoyamos con los detalles de tu proyecto!";
    }

    window.ARIA_chat_sendQ = function(text) {
        addMsg(text, 'user', false);
        showTyping(function(){ addMsg(getAnswer(text), 'bot', true); });
    };

    window.ARIA_chat_handleSend = function() {
        var inp = document.getElementById('ar-user-input');
        var val = inp.value.trim();
        if (!val) return;
        inp.value = '';
        addMsg(val, 'user', false);
        showTyping(function(){ addMsg(getAnswer(val), 'bot', true); });
    };

    /* ── BIENVENIDA ── */
    setTimeout(function(){
        showTyping(function(){
            addMsg(
                '¡Hola! Soy <b>ARIA</b>, asistente de <b>DataSys Apps &amp; Software</b>. '
                + 'Selecciona una categoría para explorar o escribe tu pregunta directamente. '
                + '¿En qué te puedo apoyar?',
                'bot', true
            );
        });
    }, 400);

})();
