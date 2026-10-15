/* =========================================================
   Poteho — i18n (EN / RU / ES / 中文)
   - Pages keep English text in HTML (default + SEO fallback).
   - Elements with data-i18n="key" get their text swapped.
   - data-i18n-ph="key" swaps the placeholder attribute.
   - data-i18n-html="key" swaps innerHTML (for links inside).
   - Language choice is saved in localStorage ("poteho-lang").
   ========================================================= */

const I18N_LANGS = ["en", "ru", "es", "zh"];
const I18N_LABELS = { en: "EN", ru: "RU", es: "ES", zh: "中文" };

const I18N = {
  /* ---------------- English ---------------- */
  en: {
    "nav.home": "Home", "nav.products": "Products", "nav.blog": "Blog",
    "nav.about": "About", "nav.contact": "Contact", "nav.quote": "Get a Quote",

    "footer.desc": "Premium pet supplies manufacturer & wholesale partner for retailers and brands worldwide.",
    "footer.products": "Products", "footer.company": "Company", "footer.connect": "Connect",
    "footer.aboutus": "About us", "footer.blog": "Blog", "footer.contact": "Contact",
    "footer.getquote": "Get a quote", "footer.cookie": "Cookie Policy",
    "footer.email": "Email", "footer.whatsapp": "WhatsApp / WeChat",
    "footer.rights": "Poteho. All rights reserved.",
    "footer.slogan": "Poteho — your pet's best friend",

    "cat.all": "All", "cat.bags": "Bags & Trolley", "cat.toys": "Toys",
    "cat.apparel": "Apparel", "cat.leashes": "Leashes", "cat.feeding": "Feeding",
    "cat.others": "Others", "opt.custom": "Custom project",

    "form.name": "Name *", "form.company": "Company", "form.email": "Email *",
    "form.interest": "Product interest *", "form.select": "Select a category…",
    "form.qty": "Estimated quantity", "form.qtyPh": "e.g. 1,000 units",
    "form.message": "Message", "form.msgPh": "Target market, customization, timeline...",
    "form.send": "Send Inquiry",
    "form.note": "Demo form — connect it to your email/CRM by editing FORM_ENDPOINT in js/main.js.",
    "form.success": "Thanks! Your inquiry has been sent. We'll reply within one business day.",
    "form.required": "Fields marked * are required.", "form.wholesale": "Wholesale inquiry",

    "lead.title": "Quick quote on this item",
    "lead.sub": "Leave your details and we'll reply within one business day.",
    "lead.qty": "Quantity / MOQ", "lead.qtyPh": "e.g. 500 units",
    "lead.msgPh": "Target market, customization needs...",
    "lead.success": "Thanks! Your request has been received.",
    "lead.privacy": "We never share your information.",

    "prod.eyebrow": "Catalog", "prod.h2": "Pet supplies catalog",
    "prod.p": "Browse our most popular SKUs. Every item supports custom branding and flexible MOQs.",
    "prod.ctaH2": "Can't find what you need?",
    "prod.ctaP": "Send us your spec or idea — we develop custom pet products every week.",
    "prod.ctaBtn": "Start a Custom Project",
    "card.quote": "Request a Quote",

    "cpage.eyebrow": "Category", "cpage.count": "products in this category",
    "cpage.empty": "No products in this category yet — more coming soon.",

    "det.from": "From {p} / unit", "det.moq": "MOQ", "det.quote": "Request Wholesale Price",
    "bc.home": "Home", "bc.products": "Products",

    "spec.Material": "Material", "spec.Sizes": "Sizes", "spec.Size": "Size",
    "spec.Cover": "Cover", "spec.Care": "Care", "spec.Custom": "Customization",
    "spec.Lead time": "Lead time", "spec.Hardware": "Hardware", "spec.Capacity": "Capacity",
    "spec.Filter": "Filter", "spec.Set": "Set", "spec.Length": "Length",
    "spec.Wheels": "Wheels", "spec.Load": "Load capacity", "spec.Fabric": "Fabric",
    "spec.Feature": "Feature",

    "hero.eyebrow": "Pet Supplies · Wholesale Manufacturer",
    "hero.h1": "Premium pet products, built for happy homes",
    "hero.p": "From travel carriers to everyday essentials, Poteho helps retailers and brands source reliable pet gear with low MOQs, custom branding and worldwide shipping.",
    "hero.browse": "Browse Products", "hero.quote": "Request Wholesale Price",
    "hero.stat1": "Years manufacturing", "hero.stat2": "SKUs available", "hero.stat3": "Countries served",

    "why.eyebrow": "Why Poteho", "why.h2": "A sourcing partner, not just a supplier",
    "why.p": "We keep the boring parts simple so you can focus on selling.",
    "feat1t": "Quality assured", "feat1p": "Every batch is inspected and tested against international pet-safety standards.",
    "feat2t": "Custom branding", "feat2p": "Custom colors, packaging and logo. Bring your brand, we build the product.",
    "feat3t": "Global shipping", "feat3p": "Flexible by air or sea, with full documentation for smooth customs clearance.",
    "feat4t": "Real support", "feat4p": "A dedicated rep replies within one business day, from quote to delivery.",

    "shop.eyebrow": "Shop by category", "shop.h2": "Everything your customers' pets need",
    "best.eyebrow": "Best sellers", "best.h2": "Featured products",
    "best.p": "Our most-requested items from retailers around the world.",
    "best.all": "View all products",
    "blogsec.eyebrow": "From the blog", "blogsec.h2": "Pet care tips that help you sell",

    "homecta.h2": "Ready to stock premium pet gear?",
    "homecta.p": "Tell us what you need and get a tailored wholesale quote within one business day.",
    "homecta.btn1": "Get a Free Quote", "homecta.btn2": "Explore Catalog",

    "cookie.msg": "We use cookies to improve your experience and analyze traffic. See our",
    "cookie.policy": "Cookie Policy",
    "cookie.accept": "Accept", "cookie.decline": "Decline",

    "ab.eyebrow": "Our story", "ab.h1": "Built by people who actually love pets",
    "ab.p1": "Poteho was founded in 2020 with one simple idea: pet products should be safe, durable and nice to look at. In just a few years we've grown into a trusted partner for brands and retailers across the world.",
    "ab.p2": "We're still picky about materials, and we still treat every order — whether it's 100 units or 100,000 — like it matters. Because it does.",
    "ab.work": "Work with us",
    "abw.eyebrow": "What we do", "abw.h2": "From concept to container",
    "abf1t": "Product development", "abf1p": "Share a sketch or an idea; our team handles structure, materials and sampling.",
    "abf2t": "Branding & packaging", "abf2p": "Logo, hangtags, boxes and barcodes — your brand, shelf-ready.",
    "abf3t": "Manufacturing", "abf3p": "Reliable manufacturing with in-house QC at every stage of production.",
    "abf4t": "Logistics", "abf4p": "Air or sea, DDP or FOB, with paperwork handled for smooth clearance.",
    "abn.eyebrow": "By the numbers", "abn.h2": "A track record you can lean on",
    "num.founded": "Founded", "num.brands": "Brands served",
    "num.countries": "Export countries", "num.ontime": "On-time delivery",
    "abcta.h2": "Let's build your next product line",
    "abcta.p": "Tell us what you're planning — we'll show you how to get there.",
    "abcta.btn": "Get in Touch",

    "ct.eyebrow": "Get a quote", "ct.h2": "Tell us what you need",
    "ct.p": "Fill in the form and we'll send a tailored quote within one business day.",
    "ct.reach": "Reach us directly", "ct.email": "Email", "ct.wa": "WhatsApp / WeChat",
    "ct.factory": "Factory", "ct.response": "Response time", "ct.within24": "Within 24 hours",
    "ct.prefer": "Prefer email? Just send your product interest, target quantity and market — we'll take it from there.",

    "bl.eyebrow": "Journal", "bl.h2": "Guides, tips & sourcing notes",
    "bl.p": "Content built to help pet parents and retailers make better choices.",
    "bl.readmore": "Read article →"
  },

  /* ---------------- Русский ---------------- */
  ru: {
    "nav.home": "Главная", "nav.products": "Продукция", "nav.blog": "Блог",
    "nav.about": "О нас", "nav.contact": "Контакты", "nav.quote": "Запросить цену",

    "footer.desc": "Производитель премиальных товаров для животных и оптовый партнёр розничных торговцев и брендов по всему миру.",
    "footer.products": "Продукция", "footer.company": "Компания", "footer.connect": "Контакты",
    "footer.aboutus": "О нас", "footer.blog": "Блог", "footer.contact": "Контакты",
    "footer.getquote": "Запросить цену", "footer.cookie": "Политика cookie",
    "footer.email": "Email", "footer.whatsapp": "WhatsApp / WeChat",
    "footer.rights": "Poteho. Все права защищены.",
    "footer.slogan": "Poteho — лучший друг вашего питомца",

    "cat.all": "Все", "cat.bags": "Сумки и тележки", "cat.toys": "Игрушки",
    "cat.apparel": "Одежда", "cat.leashes": "Поводки", "cat.feeding": "Кормление",
    "cat.others": "Другое", "opt.custom": "Индивидуальный проект",

    "form.name": "Имя *", "form.company": "Компания", "form.email": "Email *",
    "form.interest": "Интересующий товар *", "form.select": "Выберите категорию…",
    "form.qty": "Ориентировочное количество", "form.qtyPh": "напр. 1 000 шт.",
    "form.message": "Сообщение", "form.msgPh": "Рынок, кастомизация, сроки...",
    "form.send": "Отправить запрос",
    "form.note": "Демо-форма — подключите её к своей почте/CRM, изменив FORM_ENDPOINT в js/main.js.",
    "form.success": "Спасибо! Запрос отправлен. Ответим в течение одного рабочего дня.",
    "form.required": "Поля со звёздочкой * обязательны.", "form.wholesale": "Оптовый запрос",

    "lead.title": "Быстрый расчёт цены",
    "lead.sub": "Оставьте контакты — ответим в течение одного рабочего дня.",
    "lead.qty": "Количество / MOQ", "lead.qtyPh": "напр. 500 шт.",
    "lead.msgPh": "Рынок, кастомизация...",
    "lead.success": "Спасибо! Ваш запрос получен.",
    "lead.privacy": "Мы не передаём ваши данные третьим лицам.",

    "prod.eyebrow": "Каталог", "prod.h2": "Каталог товаров для животных",
    "prod.p": "Самые востребованные позиции. Каждая — с возможностью брендирования и гибким MOQ.",
    "prod.ctaH2": "Не нашли нужное?",
    "prod.ctaP": "Пришлите спецификацию или идею — мы разрабатываем новые товары каждую неделю.",
    "prod.ctaBtn": "Обсудить индивидуальный проект",
    "card.quote": "Запросить цену",

    "cpage.eyebrow": "Категория", "cpage.count": "товаров в этой категории",
    "cpage.empty": "В этой категории пока нет товаров — скоро добавим.",

    "det.from": "От {p} / шт.", "det.moq": "MOQ", "det.quote": "Запросить оптовую цену",
    "bc.home": "Главная", "bc.products": "Продукция",

    "spec.Material": "Материал", "spec.Sizes": "Размеры", "spec.Size": "Размер",
    "spec.Cover": "Чехол", "spec.Care": "Уход", "spec.Custom": "Кастомизация",
    "spec.Lead time": "Срок производства", "spec.Hardware": "Фурнитура", "spec.Capacity": "Объём",
    "spec.Filter": "Фильтр", "spec.Set": "Комплект", "spec.Length": "Длина",
    "spec.Wheels": "Колёса", "spec.Load": "Нагрузка", "spec.Fabric": "Ткань",
    "spec.Feature": "Особенности",

    "hero.eyebrow": "Товары для животных · Оптовый производитель",
    "hero.h1": "Премиальные товары для питомцев — для счастливых домов",
    "hero.p": "От переносок до товаров на каждый день: Poteho помогает ритейлерам и брендам закупать надёжные товары для животных с низким MOQ, кастомизацией под ваш бренд и доставкой по всему миру.",
    "hero.browse": "Смотреть продукцию", "hero.quote": "Запросить оптовую цену",
    "hero.stat1": "лет производства", "hero.stat2": "доступных SKU", "hero.stat3": "стран поставки",

    "why.eyebrow": "Почему Poteho", "why.h2": "Партнёр по закупкам, а не просто поставщик",
    "why.p": "Мы берём на себя рутину, чтобы вы занимались продажами.",
    "feat1t": "Гарантия качества", "feat1p": "Каждая партия проверяется по международным стандартам безопасности для животных.",
    "feat2t": "Брендирование", "feat2p": "Цвета, упаковка и логотип под ваш бренд — вы приносите бренд, мы делаем продукт.",
    "feat3t": "Доставка по миру", "feat3p": "Авиа или море, с полным пакетом документов для таможни.",
    "feat4t": "Живая поддержка", "feat4p": "Персональный менеджер отвечает в течение одного рабочего дня — от расчёта до поставки.",

    "shop.eyebrow": "Выбирайте по категориям", "shop.h2": "Всё, что нужно питомцам ваших клиентов",
    "best.eyebrow": "Хиты продаж", "best.h2": "Избранные товары",
    "best.p": "Самые востребованные позиции у ритейлеров по всему миру.",
    "best.all": "Смотреть все товары",
    "blogsec.eyebrow": "Из блога", "blogsec.h2": "Советы, которые помогают продавать",

    "homecta.h2": "Готовы закупать премиальные товары?",
    "homecta.p": "Расскажите, что вам нужно, — и получите персональный оптовый расчёт в течение одного рабочего дня.",
    "homecta.btn1": "Получить расчёт", "homecta.btn2": "Смотреть каталог",

    "cookie.msg": "Мы используем cookie, чтобы улучшить ваш опыт и анализировать трафик. См.",
    "cookie.policy": "Политику cookie",
    "cookie.accept": "Принять", "cookie.decline": "Отклонить",

    "ab.eyebrow": "Наша история", "ab.h1": "Нас создали люди, которые по-настоящему любят питомцев",
    "ab.p1": "Poteho основана в 2020 году с простой идеей: товары для животных должны быть безопасными, долговечными и красивыми. Всего за несколько лет мы стали надёжным партнёром брендов и ритейлеров по всему миру.",
    "ab.p2": "Мы по-прежнему придирчивы к материалам и относимся к каждому заказу — от 100 до 100 000 штук — так, будто от этого всё зависит. Потому что так и есть.",
    "ab.work": "Работать с нами",
    "abw.eyebrow": "Чем мы занимаемся", "abw.h2": "От идеи до контейнера",
    "abf1t": "Разработка продукта", "abf1p": "Пришлите эскиз или идею — команда продумает конструкцию, материалы и образцы.",
    "abf2t": "Бренд и упаковка", "abf2p": "Логотип, бирки, коробки и штрихкоды — ваш бренд, готовый к полке.",
    "abf3t": "Производство", "abf3p": "Надёжное производство с собственным контролем качества на каждом этапе.",
    "abf4t": "Логистика", "abf4p": "Авиа или море, DDP или FOB, с полным пакетом документов для таможни.",
    "abn.eyebrow": "В цифрах", "abn.h2": "Результаты, на которые можно опереться",
    "num.founded": "Год основания", "num.brands": "Брендов-клиентов",
    "num.countries": "Стран поставки", "num.ontime": "Поставок точно в срок",
    "abcta.h2": "Создадим вашу следующую линейку",
    "abcta.p": "Расскажите о планах — мы покажем, как их реализовать.",
    "abcta.btn": "Связаться",

    "ct.eyebrow": "Запросить цену", "ct.h2": "Расскажите, что вам нужно",
    "ct.p": "Заполните форму — мы пришлём персональный расчёт в течение одного рабочего дня.",
    "ct.reach": "Свяжитесь с нами напрямую", "ct.email": "Email", "ct.wa": "WhatsApp / WeChat",
    "ct.factory": "Завод", "ct.response": "Время ответа", "ct.within24": "В течение 24 часов",
    "ct.prefer": "Удобнее по почте? Просто отправьте интересующий товар, количество и рынок — дальше мы всё сделаем сами.",

    "bl.eyebrow": "Журнал", "bl.h2": "Гайды, советы и заметки о закупках",
    "bl.p": "Контент, который помогает владельцам питомцев и ритейлерам выбирать лучше.",
    "bl.readmore": "Читать статью →"
  },

  /* ---------------- Español ---------------- */
  es: {
    "nav.home": "Inicio", "nav.products": "Productos", "nav.blog": "Blog",
    "nav.about": "Nosotros", "nav.contact": "Contacto", "nav.quote": "Pedir cotización",

    "footer.desc": "Fabricante de artículos premium para mascotas y socio mayorista de minoristas y marcas de todo el mundo.",
    "footer.products": "Productos", "footer.company": "Empresa", "footer.connect": "Conexión",
    "footer.aboutus": "Sobre nosotros", "footer.blog": "Blog", "footer.contact": "Contacto",
    "footer.getquote": "Pedir cotización", "footer.cookie": "Política de cookies",
    "footer.email": "Correo", "footer.whatsapp": "WhatsApp / WeChat",
    "footer.rights": "Poteho. Todos los derechos reservados.",
    "footer.slogan": "Poteho — el mejor amigo de tu mascota",

    "cat.all": "Todos", "cat.bags": "Bolsos y carritos", "cat.toys": "Juguetes",
    "cat.apparel": "Ropa", "cat.leashes": "Correas", "cat.feeding": "Alimentación",
    "cat.others": "Otros", "opt.custom": "Proyecto personalizado",

    "form.name": "Nombre *", "form.company": "Empresa", "form.email": "Correo *",
    "form.interest": "Producto de interés *", "form.select": "Selecciona una categoría…",
    "form.qty": "Cantidad estimada", "form.qtyPh": "p. ej. 1 000 unidades",
    "form.message": "Mensaje", "form.msgPh": "Mercado objetivo, personalización, plazos...",
    "form.send": "Enviar consulta",
    "form.note": "Forma de demostración — conéctala a tu correo/CRM editando FORM_ENDPOINT en js/main.js.",
    "form.success": "¡Gracias! Tu consulta ha sido enviada. Responderemos en un día laborable.",
    "form.required": "Los campos marcados con * son obligatorios.", "form.wholesale": "Consulta mayorista",

    "lead.title": "Cotización rápida de este artículo",
    "lead.sub": "Deja tus datos y te responderemos en un día laborable.",
    "lead.qty": "Cantidad / MOQ", "lead.qtyPh": "p. ej. 500 unidades",
    "lead.msgPh": "Mercado objetivo, personalización...",
    "lead.success": "¡Gracias! Hemos recibido tu solicitud.",
    "lead.privacy": "Nunca compartimos tu información.",

    "prod.eyebrow": "Catálogo", "prod.h2": "Catálogo de artículos para mascotas",
    "prod.p": "Nuestros artículos más solicitados. Todos admiten marca personalizada y MOQ flexibles.",
    "prod.ctaH2": "¿No encuentras lo que buscas?",
    "prod.ctaP": "Envíanos tu especificación o idea — desarrollamos nuevos productos cada semana.",
    "prod.ctaBtn": "Iniciar un proyecto personalizado",
    "card.quote": "Pedir cotización",

    "cpage.eyebrow": "Categoría", "cpage.count": "productos en esta categoría",
    "cpage.empty": "Todavía no hay productos en esta categoría — pronto añadiremos más.",

    "det.from": "Desde {p} / ud.", "det.moq": "MOQ", "det.quote": "Pedir precio mayorista",
    "bc.home": "Inicio", "bc.products": "Productos",

    "spec.Material": "Material", "spec.Sizes": "Tamaños", "spec.Size": "Tamaño",
    "spec.Cover": "Funda", "spec.Care": "Cuidado", "spec.Custom": "Personalización",
    "spec.Lead time": "Plazo de producción", "spec.Hardware": "Herrajes", "spec.Capacity": "Capacidad",
    "spec.Filter": "Filtro", "spec.Set": "Set", "spec.Length": "Longitud",
    "spec.Wheels": "Ruedas", "spec.Load": "Carga máxima", "spec.Fabric": "Tejido",
    "spec.Feature": "Característica",

    "hero.eyebrow": "Artículos para mascotas · Fabricante mayorista",
    "hero.h1": "Productos premium para mascotas, pensados para hogares felices",
    "hero.p": "Desde transportines hasta artículos de diario, Poteho ayuda a minoristas y marcas a comprar productos fiables con MOQ bajos, marca personalizada y envío mundial.",
    "hero.browse": "Ver productos", "hero.quote": "Pedir precio mayorista",
    "hero.stat1": "años fabricando", "hero.stat2": "SKUs disponibles", "hero.stat3": "países servidos",

    "why.eyebrow": "Por qué Poteho", "why.h2": "Un socio de abastecimiento, no solo un proveedor",
    "why.p": "Simplificamos la parte aburrida para que te concentres en vender.",
    "feat1t": "Calidad garantizada", "feat1p": "Cada lote se inspecciona según estándares internacionales de seguridad para mascotas.",
    "feat2t": "Marca personalizada", "feat2p": "Colores, empaques y logotipo personalizados. Tú traes la marca, nosotros creamos el producto.",
    "feat3t": "Envío mundial", "feat3p": "Flexible por aire o mar, con documentación completa para un despacho aduanero sin problemas.",
    "feat4t": "Soporte real", "feat4p": "Un ejecutivo dedicado responde en un día laborable, desde la cotización hasta la entrega.",

    "shop.eyebrow": "Compra por categoría", "shop.h2": "Todo lo que las mascotas de tus clientes necesitan",
    "best.eyebrow": "Más vendidos", "best.h2": "Productos destacados",
    "best.p": "Los artículos más solicitados por minoristas de todo el mundo.",
    "best.all": "Ver todos los productos",
    "blogsec.eyebrow": "Del blog", "blogsec.h2": "Consejos que te ayudan a vender",

    "homecta.h2": "¿Listo para surtirte con productos premium?",
    "homecta.p": "Cuéntanos qué necesitas y recibe una cotización mayorista a medida en un día laborable.",
    "homecta.btn1": "Cotización gratis", "homecta.btn2": "Explorar catálogo",

    "cookie.msg": "Usamos cookies para mejorar tu experiencia y analizar el tráfico. Consulta nuestra",
    "cookie.policy": "Política de cookies",
    "cookie.accept": "Aceptar", "cookie.decline": "Rechazar",

    "ab.eyebrow": "Nuestra historia", "ab.h1": "Creada por gente que de verdad quiere a las mascotas",
    "ab.p1": "Poteho se fundó en 2020 con una idea sencilla: los productos para mascotas deben ser seguros, duraderos y bonitos. En pocos años nos hemos convertido en un socio de confianza para marcas y minoristas de todo el mundo.",
    "ab.p2": "Seguimos siendo exigentes con los materiales y tratamos cada pedido — de 100 o de 100 000 unidades — como si importara. Porque importa.",
    "ab.work": "Trabaja con nosotros",
    "abw.eyebrow": "Qué hacemos", "abw.h2": "Del concepto al contenedor",
    "abf1t": "Desarrollo de producto", "abf1p": "Comparte un boceto o una idea; nuestro equipo se encarga de estructura, materiales y muestras.",
    "abf2t": "Marca y empaque", "abf2p": "Logotipo, colgantes, cajas y códigos de barras — tu marca, lista para la estantería.",
    "abf3t": "Fabricación", "abf3p": "Fabricación fiable con control de calidad propio en cada etapa.",
    "abf4t": "Logística", "abf4p": "Aéreo o marítimo, DDP o FOB, con papeleo resuelto para un despacho fluido.",
    "abn.eyebrow": "En cifras", "abn.h2": "Un historial en el que apoyarse",
    "num.founded": "Fundación", "num.brands": "Marcas atendidas",
    "num.countries": "Países de exportación", "num.ontime": "Entregas a tiempo",
    "abcta.h2": "Creemos tu próxima línea de productos",
    "abcta.p": "Cuéntanos qué planeas — te mostraremos cómo lograrlo.",
    "abcta.btn": "Contactarnos",

    "ct.eyebrow": "Pedir cotización", "ct.h2": "Cuéntanos qué necesitas",
    "ct.p": "Rellena el formulario y te enviaremos una cotización a medida en un día laborable.",
    "ct.reach": "Contacta directamente", "ct.email": "Correo", "ct.wa": "WhatsApp / WeChat",
    "ct.factory": "Fábrica", "ct.response": "Tiempo de respuesta", "ct.within24": "En 24 horas",
    "ct.prefer": "¿Prefieres el correo? Envíanos el producto de interés, cantidad objetivo y mercado — nosotros nos encargamos del resto.",

    "bl.eyebrow": "Revista", "bl.h2": "Guías, consejos y notas de abastecimiento",
    "bl.p": "Contenido para ayudar a dueños de mascotas y minoristas a decidir mejor.",
    "bl.readmore": "Leer artículo →"
  },

  /* ---------------- 中文 ---------------- */
  zh: {
    "nav.home": "首页", "nav.products": "产品中心", "nav.blog": "博客",
    "nav.about": "关于我们", "nav.contact": "联系我们", "nav.quote": "获取报价",

    "footer.desc": "优质宠物用品制造商，全球零售商与品牌的批发合作伙伴。",
    "footer.products": "产品分类", "footer.company": "公司", "footer.connect": "联系方式",
    "footer.aboutus": "关于我们", "footer.blog": "博客", "footer.contact": "联系我们",
    "footer.getquote": "获取报价", "footer.cookie": "Cookie 政策",
    "footer.email": "邮箱", "footer.whatsapp": "WhatsApp / 微信",
    "footer.rights": "Poteho 版权所有。",
    "footer.slogan": "Poteho — 您宠物的最佳伙伴",

    "cat.all": "全部", "cat.bags": "包和拉杆箱", "cat.toys": "玩具",
    "cat.apparel": "衣服", "cat.leashes": "牵引绳", "cat.feeding": "喂养",
    "cat.others": "其他", "opt.custom": "定制项目",

    "form.name": "姓名 *", "form.company": "公司", "form.email": "邮箱 *",
    "form.interest": "感兴趣的产品 *", "form.select": "请选择分类…",
    "form.qty": "预计数量", "form.qtyPh": "如 1,000 个",
    "form.message": "留言", "form.msgPh": "目标市场、定制需求、时间安排...",
    "form.send": "发送询盘",
    "form.note": "演示表单 — 在 js/main.js 中设置 FORM_ENDPOINT 即可接入您的邮箱/CRM。",
    "form.success": "感谢您的询盘！我们会在一个工作日内回复。",
    "form.required": "带 * 为必填项。", "form.wholesale": "批发询盘",

    "lead.title": "该产品快速询价",
    "lead.sub": "留下您的联系方式，我们会在一个工作日内回复。",
    "lead.qty": "数量 / 起订量", "lead.qtyPh": "如 500 个",
    "lead.msgPh": "目标市场、定制需求...",
    "lead.success": "感谢！您的询价已收到。",
    "lead.privacy": "我们绝不泄露您的信息。",

    "prod.eyebrow": "产品目录", "prod.h2": "宠物用品产品目录",
    "prod.p": "浏览我们最热销的产品，全部支持定制品牌与灵活起订量。",
    "prod.ctaH2": "没有找到想要的产品？",
    "prod.ctaP": "把您的规格或想法发给我们 — 我们每周都在开发新的宠物产品。",
    "prod.ctaBtn": "启动定制项目",
    "card.quote": "询价",

    "cpage.eyebrow": "产品分类", "cpage.count": "款产品",
    "cpage.empty": "该分类暂无产品 — 更多产品即将上架。",

    "det.from": "{p} / 个 起", "det.moq": "起订量", "det.quote": "获取批发价",
    "bc.home": "首页", "bc.products": "产品中心",

    "spec.Material": "材质", "spec.Sizes": "尺寸", "spec.Size": "尺寸",
    "spec.Cover": "外套", "spec.Care": "洗护", "spec.Custom": "定制",
    "spec.Lead time": "生产周期", "spec.Hardware": "五金件", "spec.Capacity": "容量",
    "spec.Filter": "滤芯", "spec.Set": "套装", "spec.Length": "长度",
    "spec.Wheels": "轮子", "spec.Load": "承重", "spec.Fabric": "面料",
    "spec.Feature": "特点",

    "hero.eyebrow": "宠物用品 · 批发制造商",
    "hero.h1": "优质宠物用品，为快乐的家庭而生",
    "hero.p": "从外出包到日常必需品，Poteho 帮助零售商和品牌以低起订量、定制品牌服务与全球配送，采购可靠的宠物用品。",
    "hero.browse": "浏览产品", "hero.quote": "获取批发价",
    "hero.stat1": "年制造经验", "hero.stat2": "在售 SKU", "hero.stat3": "出口国家",

    "why.eyebrow": "为什么选择 Poteho", "why.h2": "采购伙伴，而不只是供应商",
    "why.p": "我们把繁琐的环节变简单，让您专注于销售。",
    "feat1t": "品质保障", "feat1p": "每一批货都按国际宠物安全标准检验测试。",
    "feat2t": "品牌定制", "feat2p": "定制颜色、包装和logo。您带来品牌，我们做出产品。",
    "feat3t": "全球发货", "feat3p": "空运海运灵活安排，单证齐全，清关顺畅。",
    "feat4t": "贴心服务", "feat4p": "专属业务员一个工作日内回复，从报价到交付全程跟进。",

    "shop.eyebrow": "按分类选购", "shop.h2": "客户宠物需要的一切，这里都有",
    "best.eyebrow": "热销爆款", "best.h2": "推荐产品",
    "best.p": "全球零售商最常采购的款式。",
    "best.all": "查看全部产品",
    "blogsec.eyebrow": "来自博客", "blogsec.h2": "帮您卖货的宠物养护知识",

    "homecta.h2": "准备好采购优质宠物用品了吗？",
    "homecta.p": "告诉我们您的需求，一个工作日内获取专属批发报价。",
    "homecta.btn1": "免费获取报价", "homecta.btn2": "浏览产品目录",

    "cookie.msg": "我们使用 Cookie 来改善体验并分析流量。详见",
    "cookie.policy": "Cookie 政策",
    "cookie.accept": "接受", "cookie.decline": "拒绝",

    "ab.eyebrow": "我们的故事", "ab.h1": "由真正爱宠物的人创立",
    "ab.p1": "Poteho 创立于 2020 年，初心很简单：宠物产品应当安全、耐用又好看。短短几年，我们已成长为全球品牌与零售商信赖的合作伙伴。",
    "ab.p2": "我们依然对材料很挑剔，依然把每一个订单 — 无论是 100 个还是 10 万个 — 都当作大事来办。因为它确实重要。",
    "ab.work": "与我们合作",
    "abw.eyebrow": "我们做什么", "abw.h2": "从创意到集装箱",
    "abf1t": "产品开发", "abf1p": "发来草图或想法，我们的团队负责结构、材料与打样。",
    "abf2t": "品牌与包装", "abf2p": "logo、吊牌、彩盒与条码 — 让您的品牌直接上架。",
    "abf3t": "生产制造", "abf3p": "可靠生产，每一道工序都有自品质检。",
    "abf4t": "物流运输", "abf4p": "空运海运、DDP 或 FOB，单证齐全清关顺畅。",
    "abn.eyebrow": "数据说话", "abn.h2": "值得信赖的业绩",
    "num.founded": "创立年份", "num.brands": "服务品牌",
    "num.countries": "出口国家", "num.ontime": "准时交付率",
    "abcta.h2": "一起打造您的下一条产品线",
    "abcta.p": "说说您的计划 — 我们告诉您怎么实现。",
    "abcta.btn": "联系我们",

    "ct.eyebrow": "获取报价", "ct.h2": "告诉我们您的需求",
    "ct.p": "填写表单，我们会在一个工作日内发送专属报价。",
    "ct.reach": "直接联系我们", "ct.email": "邮箱", "ct.wa": "WhatsApp / 微信",
    "ct.factory": "工厂", "ct.response": "响应时间", "ct.within24": "24 小时内",
    "ct.prefer": "更习惯发邮件？直接发送感兴趣的产品、目标数量和市场 — 剩下的交给我们。",

    "bl.eyebrow": "专栏", "bl.h2": "指南、技巧与采购笔记",
    "bl.p": "帮助宠物主人和零售商做出更好选择的内容。",
    "bl.readmore": "阅读全文 →"
  }
};

/* ---------- Runtime helpers (shared with main.js) ---------- */
function i18nGetLang() {
  const saved = localStorage.getItem("poteho-lang");
  return I18N_LANGS.includes(saved) ? saved : "en";
}
function t(key) {
  const lang = i18nGetLang();
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}
/* Translate a data field that may be {en,zh,ru,es} or a plain string */
function tf(field) {
  if (field && typeof field === "object") {
    const lang = i18nGetLang();
    return field[lang] || field.en || "";
  }
  return field || "";
}

function i18nApply() {
  const lang = i18nGetLang();
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });

  // Language switcher state
  document.querySelectorAll("#langSwitch button").forEach(b => {
    b.classList.toggle("on", b.dataset.lang === lang);
  });
}

function i18nInitSwitcher() {
  const box = document.getElementById("langSwitch");
  if (!box || box.dataset.ready) return;
  box.dataset.ready = "1";
  box.innerHTML = I18N_LANGS.map(l =>
    `<button type="button" data-lang="${l}" title="${I18N_LABELS[l]}">${I18N_LABELS[l]}</button>`
  ).join("");
  box.addEventListener("click", e => {
    const btn = e.target.closest("button[data-lang]");
    if (!btn) return;
    localStorage.setItem("poteho-lang", btn.dataset.lang);
    i18nApply();
    if (typeof renderAll === "function") renderAll(); // re-render dynamic content
  });
  i18nApply();
}
