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

    "footer.desc": "Premium pet carriers and pet supplies, wholesale to retailers and brands worldwide. Low MOQ, custom branding and reliable shipping.",
    "footer.products": "Products", "footer.company": "Company", "footer.connect": "Contact",
    "footer.aboutus": "About us", "footer.blog": "Blog", "footer.contact": "Contact",
    "footer.getquote": "Get a quote", "footer.cookie": "Cookie Policy",
    "footer.email": "Email", "footer.whatsapp": "WhatsApp / WeChat",
    "footer.rights": "Poteho. All rights reserved.",
    "footer.slogan": "Poteho — your pet's best friend",

    "cat.all": "All", "cat.bags": "Carrier", "cat.bed": "Bed",
    "cat.apparel": "Apparel", "cat.leashes": "Leashes", "cat.feeding": "Feeding",
    "cat.others": "Others", "opt.custom": "Custom project",
    "cat.bags.sub": "Travel in comfort →", "cat.bed.sub": "Rest in comfort →",
    "cat.apparel.sub": "Dressed for any weather →", "cat.leashes.sub": "Walk in style →",
    "cat.feeding.sub": "Hydration & meals →", "cat.others.sub": "Much more →",
    "cat.viewall": "View all products →", "cat.soon": "Coming soon",

    "form.name": "Name *", "form.company": "Company", "form.email": "Email *",
    "form.interest": "Product interest *", "form.select": "Select a category…",
    "form.qty": "Estimated quantity", "form.qtyPh": "e.g. 1,000 units",
    "form.message": "Message", "form.msgPh": "Target market, customization, timeline...",
    "form.send": "Send Inquiry",
    "form.note": "Your inquiry goes straight to our team. We'll reply within one business day.",
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

    "hero.eyebrow": "Pet Supplies · Wholesale Supplier",
    "hero.h1": "Premium pet products, built for happy homes",
    "hero.p": "From travel carriers to everyday essentials, Poteho helps retailers and brands source reliable pet gear with low MOQs, custom branding and worldwide shipping.",
    "hero.browse": "Browse Products", "hero.quote": "Request Wholesale Price",
    "hero.stat1": "Founded", "hero.stat2": "Years export experience", "hero.stat3": "Export countries",

    "why.eyebrow": "Why Poteho", "why.h2": "A sourcing partner, not just a supplier",
    "why.p": "Choosing a supplier comes down to trust. We've made pet supplies since 2020, ship to 30+ countries, and check every product piece by piece. Order a sample or a full container — you'll get quality you can trust and friendly, dependable service.",
    "feat1t": "Quality checked", "feat1p": "Every product is checked piece by piece by our own QC team before it leaves the factory.",
    "feat2t": "Custom branding", "feat2p": "Custom colors, packaging and logo. Bring your brand, we build the product.",
    "feat3t": "Global shipping", "feat3p": "Flexible by air or sea, with full documentation for smooth customs clearance.",
    "feat4t": "Real support", "feat4p": "A dedicated rep replies within one business day, from quote to delivery.",

    "shop.eyebrow": "Shop by category", "shop.h2": "Everything your customers' pets need",
    "best.eyebrow": "Best sellers", "best.h2": "Featured products",
    "best.p": "Our most-requested items from retailers around the world.",
    "best.all": "View all products",
    "blogsec.eyebrow": "From the blog", "blogsec.h2": "Stories from life with pets",

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
    "num.founded": "Founded", "num.brands": "Years export experience",
    "num.countries": "Export countries", "num.ontime": "On-time delivery",
    "abcta.h2": "Let's build your next product line",
    "abcta.p": "Tell us what you're planning — we'll show you how to get there.",
    "abcta.btn": "Get in Touch",

    "ct.eyebrow": "Get a quote", "ct.h2": "Tell us what you need",
    "ct.p": "Fill in the form and we'll send a tailored quote within one business day.",
    "ct.reach": "Reach us directly", "ct.email": "Email", "ct.wa": "WhatsApp / WeChat",
    "ct.factory": "Factory", "ct.response": "Response time", "ct.within24": "Within 24 hours",
    "ct.prefer": "Prefer email? Just send your product interest, target quantity and market — we'll take it from there.",

    "bl.eyebrow": "Journal", "bl.h2": "Stories and guides about life with pets",
    "bl.p": "Notes on cats, dogs, and the everyday life we share with them.",
    "bl.readmore": "Read article →", "bl.back": "← Back to all articles"
  },

  /* ---------------- Русский ---------------- */
  ru: {
    "nav.home": "Главная", "nav.products": "Продукция", "nav.blog": "Блог",
    "nav.about": "О нас", "nav.contact": "Контакты", "nav.quote": "Запросить цену",

    "footer.desc": "Премиальные переноски и товары для животных — оптом для розничных магазинов и брендов по всему миру. Низкий минимальный заказ, брендирование и надёжная доставка.",
    "footer.products": "Продукция", "footer.company": "Компания", "footer.connect": "Контакты",
    "footer.aboutus": "О нас", "footer.blog": "Блог", "footer.contact": "Контакты",
    "footer.getquote": "Запросить цену", "footer.cookie": "Политика cookie",
    "footer.email": "Email", "footer.whatsapp": "WhatsApp / WeChat",
    "footer.rights": "Poteho. Все права защищены.",
    "footer.slogan": "Poteho — лучший друг вашего питомца",

    "cat.all": "Все", "cat.bags": "Переноски", "cat.bed": "Лежанки",
    "cat.apparel": "Одежда", "cat.leashes": "Поводки", "cat.feeding": "Кормление",
    "cat.others": "Другое", "opt.custom": "Индивидуальный проект",

    "form.name": "Имя *", "form.company": "Компания", "form.email": "Email *",
    "form.interest": "Интересующий товар *", "form.select": "Выберите категорию…",
    "form.qty": "Ориентировочное количество", "form.qtyPh": "напр. 1 000 шт.",
    "form.message": "Сообщение", "form.msgPh": "Рынок, кастомизация, сроки...",
    "form.send": "Отправить запрос",
    "form.note": "Ваш запрос сразу поступает нашей команде. Ответим в течение одного рабочего дня.",
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

    "hero.eyebrow": "Товары для животных · Оптовый поставщик",
    "hero.h1": "Премиальные товары для питомцев — для счастливых домов",
    "hero.p": "От переносок до товаров на каждый день: Poteho помогает ритейлерам и брендам закупать надёжные товары для животных с низким MOQ, кастомизацией под ваш бренд и доставкой по всему миру.",
    "hero.browse": "Смотреть продукцию", "hero.quote": "Запросить оптовую цену",
    "hero.stat1": "год основания", "hero.stat2": "лет экспортного опыта", "hero.stat3": "стран экспорта",

    "why.eyebrow": "Почему Poteho", "why.h2": "Партнёр по закупкам, а не просто поставщик",
    "why.p": "Выбор поставщика — это вопрос доверия. Мы делаем товары для животных с 2020 года, поставляем в более чем 30 стран и проверяем каждое изделие поштучно. Закажите образец или целый контейнер — вы получите качество, которому можно доверять, и дружелюбный, надёжный сервис.",
    "feat1t": "Проверка качества", "feat1p": "Каждое изделие перед отгрузкой проверяется нашей собственной службой контроля качества.",
    "feat2t": "Брендирование", "feat2p": "Цвета, упаковка и логотип под ваш бренд — вы приносите бренд, мы делаем продукт.",
    "feat3t": "Доставка по миру", "feat3p": "Авиа или море, с полным пакетом документов для таможни.",
    "feat4t": "Живая поддержка", "feat4p": "Персональный менеджер отвечает в течение одного рабочего дня — от расчёта до поставки.",

    "shop.eyebrow": "Выбирайте по категориям", "shop.h2": "Всё, что нужно питомцам ваших клиентов",
    "best.eyebrow": "Хиты продаж", "best.h2": "Избранные товары",
    "best.p": "Самые востребованные позиции у ритейлеров по всему миру.",
    "best.all": "Смотреть все товары",
    "blogsec.eyebrow": "Из блога", "blogsec.h2": "Истории из жизни с питомцами",

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
    "num.founded": "Год основания", "num.brands": "лет экспортного опыта",
    "num.countries": "Стран поставки", "num.ontime": "Поставок точно в срок",
    "abcta.h2": "Создадим вашу следующую линейку",
    "abcta.p": "Расскажите о планах — мы покажем, как их реализовать.",
    "abcta.btn": "Связаться",

    "ct.eyebrow": "Запросить цену", "ct.h2": "Расскажите, что вам нужно",
    "ct.p": "Заполните форму — мы пришлём персональный расчёт в течение одного рабочего дня.",
    "ct.reach": "Свяжитесь с нами напрямую", "ct.email": "Email", "ct.wa": "WhatsApp / WeChat",
    "ct.factory": "Завод", "ct.response": "Время ответа", "ct.within24": "В течение 24 часов",
    "ct.prefer": "Удобнее по почте? Просто отправьте интересующий товар, количество и рынок — дальше мы всё сделаем сами.",

    "bl.eyebrow": "Журнал", "bl.h2": "Истории и гайды о жизни с питомцами",
    "bl.p": "О кошках, собаках и нашей повседневной жизни вместе с ними.",
    "bl.readmore": "Читать статью →", "bl.back": "← Все статьи"
  },

  /* ---------------- Español ---------------- */
  es: {
    "nav.home": "Inicio", "nav.products": "Productos", "nav.blog": "Blog",
    "nav.about": "Nosotros", "nav.contact": "Contacto", "nav.quote": "Pedir cotización",

    "footer.desc": "Transportines y artículos premium para mascotas, al por mayor para minoristas y marcas de todo el mundo. Pedido mínimo bajo, marca personalizada y envío fiable.",
    "footer.products": "Productos", "footer.company": "Empresa", "footer.connect": "Contacto",
    "footer.aboutus": "Sobre nosotros", "footer.blog": "Blog", "footer.contact": "Contacto",
    "footer.getquote": "Pedir cotización", "footer.cookie": "Política de cookies",
    "footer.email": "Correo", "footer.whatsapp": "WhatsApp / WeChat",
    "footer.rights": "Poteho. Todos los derechos reservados.",
    "footer.slogan": "Poteho — el mejor amigo de tu mascota",

    "cat.all": "Todos", "cat.bags": "Transportines", "cat.bed": "Camas",
    "cat.apparel": "Ropa", "cat.leashes": "Correas", "cat.feeding": "Alimentación",
    "cat.others": "Otros", "opt.custom": "Proyecto personalizado",

    "form.name": "Nombre *", "form.company": "Empresa", "form.email": "Correo *",
    "form.interest": "Producto de interés *", "form.select": "Selecciona una categoría…",
    "form.qty": "Cantidad estimada", "form.qtyPh": "p. ej. 1 000 unidades",
    "form.message": "Mensaje", "form.msgPh": "Mercado objetivo, personalización, plazos...",
    "form.send": "Enviar consulta",
    "form.note": "Tu consulta llega directamente a nuestro equipo. Responderemos en un día laborable.",
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

    "hero.eyebrow": "Artículos para mascotas · Proveedor mayorista",
    "hero.h1": "Productos premium para mascotas, pensados para hogares felices",
    "hero.p": "Desde transportines hasta artículos de diario, Poteho ayuda a minoristas y marcas a comprar productos fiables con MOQ bajos, marca personalizada y envío mundial.",
    "hero.browse": "Ver productos", "hero.quote": "Pedir precio mayorista",
    "hero.stat1": "fundación", "hero.stat2": "años de experiencia exportando", "hero.stat3": "países de exportación",

    "why.eyebrow": "Por qué Poteho", "why.h2": "Un socio de abastecimiento, no solo un proveedor",
    "why.p": "Elegir un proveedor es cuestión de confianza. Fabricamos artículos para mascotas desde 2020, enviamos a más de 30 países y revisamos cada producto pieza por pieza. Pide una muestra o un contenedor completo: tendrás calidad en la que confiar y un servicio cercano y fiable.",
    "feat1t": "Control de calidad", "feat1p": "Cada producto se revisa pieza por pieza con nuestro propio equipo de calidad antes de salir de fábrica.",
    "feat2t": "Marca personalizada", "feat2p": "Colores, empaques y logotipo personalizados. Tú traes la marca, nosotros creamos el producto.",
    "feat3t": "Envío mundial", "feat3p": "Flexible por aire o mar, con documentación completa para un despacho aduanero sin problemas.",
    "feat4t": "Soporte real", "feat4p": "Un ejecutivo dedicado responde en un día laborable, desde la cotización hasta la entrega.",

    "shop.eyebrow": "Compra por categoría", "shop.h2": "Todo lo que las mascotas de tus clientes necesitan",
    "best.eyebrow": "Más vendidos", "best.h2": "Productos destacados",
    "best.p": "Los artículos más solicitados por minoristas de todo el mundo.",
    "best.all": "Ver todos los productos",
    "blogsec.eyebrow": "Del blog", "blogsec.h2": "Historias de la vida con mascotas",

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
    "num.founded": "Fundación", "num.brands": "años de experiencia exportando",
    "num.countries": "Países de exportación", "num.ontime": "Entregas a tiempo",
    "abcta.h2": "Creemos tu próxima línea de productos",
    "abcta.p": "Cuéntanos qué planeas — te mostraremos cómo lograrlo.",
    "abcta.btn": "Contactarnos",

    "ct.eyebrow": "Pedir cotización", "ct.h2": "Cuéntanos qué necesitas",
    "ct.p": "Rellena el formulario y te enviaremos una cotización a medida en un día laborable.",
    "ct.reach": "Contacta directamente", "ct.email": "Correo", "ct.wa": "WhatsApp / WeChat",
    "ct.factory": "Fábrica", "ct.response": "Tiempo de respuesta", "ct.within24": "En 24 horas",
    "ct.prefer": "¿Prefieres el correo? Envíanos el producto de interés, cantidad objetivo y mercado — nosotros nos encargamos del resto.",

    "bl.eyebrow": "Revista", "bl.h2": "Historias y guías sobre la vida con mascotas",
    "bl.p": "Notas sobre gatos, perros y el día a día que compartimos con ellos.",
    "bl.readmore": "Leer artículo →", "bl.back": "← Volver a todos los artículos"
  },

  /* ---------------- 中文 ---------------- */
  zh: {
    "nav.home": "首页", "nav.products": "产品中心", "nav.blog": "博客",
    "nav.about": "关于我们", "nav.contact": "联系我们", "nav.quote": "获取报价",

    "footer.desc": "优质宠物外出包与宠物用品，面向全球零售商和品牌批发。低起订量、支持定制品牌、发货可靠。",
    "footer.products": "产品分类", "footer.company": "公司", "footer.connect": "联系方式",
    "footer.aboutus": "关于我们", "footer.blog": "博客", "footer.contact": "联系我们",
    "footer.getquote": "获取报价", "footer.cookie": "Cookie 政策",
    "footer.email": "邮箱", "footer.whatsapp": "WhatsApp / 微信",
    "footer.rights": "Poteho 版权所有。",
    "footer.slogan": "Poteho — 您宠物的最佳伙伴",

    "cat.all": "全部", "cat.bags": "外出包", "cat.bed": "宠物床",
    "cat.apparel": "衣服", "cat.leashes": "牵引绳", "cat.feeding": "喂养",
    "cat.others": "其他", "opt.custom": "定制项目",
    "cat.bags.sub": "舒适出行 →", "cat.bed.sub": "安心休憩 →",
    "cat.apparel.sub": "四季有衣 →", "cat.leashes.sub": "遛宠有型 →",
    "cat.feeding.sub": "饮水喂食 →", "cat.others.sub": "更多品类 →",
    "cat.viewall": "查看全部产品 →", "cat.soon": "即将上线",

    "form.name": "姓名 *", "form.company": "公司", "form.email": "邮箱 *",
    "form.interest": "感兴趣的产品 *", "form.select": "请选择分类…",
    "form.qty": "预计数量", "form.qtyPh": "如 1,000 个",
    "form.message": "留言", "form.msgPh": "目标市场、定制需求、时间安排...",
    "form.send": "发送询盘",
    "form.note": "您的询盘会直接送达我们团队，我们会在一个工作日内回复。",
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

    "hero.eyebrow": "宠物用品 · 批发供应商",
    "hero.h1": "优质宠物用品，为快乐的家庭而生",
    "hero.p": "从外出包到日常必需品，Poteho 帮助零售商和品牌以低起订量、定制品牌服务与全球配送，采购可靠的宠物用品。",
    "hero.browse": "浏览产品", "hero.quote": "获取批发价",
    "hero.stat1": "成立年份", "hero.stat2": "年出口经验", "hero.stat3": "出口国家",

    "why.eyebrow": "为什么选择 Poteho", "why.h2": "采购伙伴，而不只是供应商",
    "why.p": "选择供应商，关键看信任。我们自 2020 年起生产宠物用品，产品出口 30 多个国家，每一件都经我们逐件检查。无论下样品单还是整柜订单，你都能得到值得信赖的品质，以及友好可靠的服务。",
    "feat1t": "品质把关", "feat1p": "每件产品出厂前，都由我们自己的质检团队逐件检查。",
    "feat2t": "品牌定制", "feat2p": "定制颜色、包装和logo。您带来品牌，我们做出产品。",
    "feat3t": "全球发货", "feat3p": "空运海运灵活安排，单证齐全，清关顺畅。",
    "feat4t": "贴心服务", "feat4p": "专属业务员一个工作日内回复，从报价到交付全程跟进。",

    "shop.eyebrow": "按分类选购", "shop.h2": "客户宠物需要的一切，这里都有",
    "best.eyebrow": "热销爆款", "best.h2": "推荐产品",
    "best.p": "全球零售商最常采购的款式。",
    "best.all": "查看全部产品",
    "blogsec.eyebrow": "来自博客", "blogsec.h2": "陪伴宠物的日常故事",

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
    "num.founded": "创立年份", "num.brands": "年出口经验",
    "num.countries": "出口国家", "num.ontime": "准时交付率",
    "abcta.h2": "一起打造您的下一条产品线",
    "abcta.p": "说说您的计划 — 我们告诉您怎么实现。",
    "abcta.btn": "联系我们",

    "ct.eyebrow": "获取报价", "ct.h2": "告诉我们您的需求",
    "ct.p": "填写表单，我们会在一个工作日内发送专属报价。",
    "ct.reach": "直接联系我们", "ct.email": "邮箱", "ct.wa": "WhatsApp / 微信",
    "ct.factory": "工厂", "ct.response": "响应时间", "ct.within24": "24 小时内",
    "ct.prefer": "更习惯发邮件？直接发送感兴趣的产品、目标数量和市场 — 剩下的交给我们。",

    "bl.eyebrow": "专栏", "bl.h2": "关于与宠物相伴的故事与指南",
    "bl.p": "关于猫、狗，以及我们与它们共同生活的日常。",
    "bl.readmore": "阅读全文 →", "bl.back": "← 返回全部文章"
  }
};

/* =========================================================
   Poteho — FAQ content (GEO / AI-search optimization)
   Used by js/main.js renderFAQ(): visible FAQ blocks AND
   FAQPage structured data so AI assistants (ChatGPT,
   Perplexity, Google AI Overviews) can cite the answers.
   Keys: faq.<page>N.q / faq.<page>N.a
   ========================================================= */
const FAQ = {
  en: {
    "faq.eyebrow": "FAQ",
    "faq.h2.home": "Frequently asked questions",
    "faq.h2.about": "More about Poteho",
    "faq.h2.wholesale": "Wholesale & ordering FAQ",

    "faq.home1.q": "What does Poteho make?",
    "faq.home1.a": "Poteho designs and manufactures premium pet supplies — carriers, beds, apparel, leashes, feeding gear and more — for retailers and brands worldwide.",
    "faq.home2.q": "What is your minimum order quantity (MOQ)?",
    "faq.home2.a": "MOQs are flexible and set per product, typically from 200 to 500 units for most items. Tell us your target volume and we will confirm the exact MOQ for the products you need.",
    "faq.home3.q": "Do you offer custom branding and private label (OEM/ODM)?",
    "faq.home3.a": "Yes. We provide full custom branding — logo, colors, packaging and hangtags — and both OEM and ODM development, taking your product from a sketch to a finished, shelf-ready item.",
    "faq.home4.q": "Which countries do you ship to?",
    "faq.home4.a": "We ship to 30+ countries across North America, Europe, the Middle East, Oceania and Asia, by air or sea, with full export documentation for smooth customs clearance.",
    "faq.home5.q": "Can I order samples before a bulk order?",
    "faq.home5.a": "Absolutely. We encourage a sample order first so you can check quality, materials and branding before committing to a full production run.",

    "faq.about1.q": "When was Poteho founded?",
    "faq.about1.a": "Poteho was founded in 2020 and has served retailers and brands across 30+ countries since.",
    "faq.about2.q": "Are you a manufacturer or a trading company?",
    "faq.about2.a": "We are a pet products manufacturer with our own production and an in-house QC team that checks every item piece by piece before shipment.",
    "faq.about3.q": "What quality control do you have?",
    "faq.about3.a": "Every product passes piece-by-piece inspection by our QC team, and we support third-party inspections and relevant certifications on request.",
    "faq.about4.q": "Where is Poteho located?",
    "faq.about4.a": "Our team is based in Beijing, China, and we ship worldwide through major sea and air ports.",
    "faq.about5.q": "Can you develop a custom product for my brand?",
    "faq.about5.a": "Yes. From a sketch or an idea, our team handles structure, materials, sampling and packaging — taking your product from concept to container.",

    "faq.wholesale1.q": "How do I request a wholesale quote?",
    "faq.wholesale1.a": "Use the contact form or email info@poteho.com with the products, quantities and target market you have in mind. We reply with a tailored quote within one business day.",
    "faq.wholesale2.q": "Do you support OEM, ODM and private label?",
    "faq.wholesale2.a": "Yes — logo, colors, materials, packaging and hangtags can all be customized, and we develop new products from your ideas (ODM) or your specifications (OEM).",
    "faq.wholesale3.q": "What are your typical lead times?",
    "faq.wholesale3.a": "Sampling usually takes 7–14 days, and bulk production about 25–40 days depending on order size and customization. We confirm exact timelines with every quote.",
    "faq.wholesale4.q": "What shipping terms and Incoterms do you offer?",
    "faq.wholesale4.a": "We ship by air or sea and support common Incoterms including EXW, FOB, CIF and DDP, with full export documentation for smooth customs clearance.",
    "faq.wholesale5.q": "What payment methods do you accept?",
    "faq.wholesale5.a": "We commonly work with T/T (bank transfer) and can discuss terms such as a deposit plus balance against shipping documents, depending on the order.",
    "faq.wholesale6.q": "Do you provide product certificates and testing?",
    "faq.wholesale6.a": "Yes. We can supply material and safety documentation and arrange third-party testing (such as SGS) to meet your market's requirements."
  },

  zh: {
    "faq.eyebrow": "常见问题",
    "faq.h2.home": "常见问题",
    "faq.h2.about": "更多关于 Poteho",
    "faq.h2.wholesale": "批发与下单常见问题",

    "faq.home1.q": "Poteho 生产哪些产品？",
    "faq.home1.a": "Poteho 设计并生产优质宠物用品——外出包、宠物床、衣服、牵引绳、喂食用品等——面向全球零售商与品牌。",
    "faq.home2.q": "起订量（MOQ）是多少？",
    "faq.home2.a": "起订量按产品灵活设定，多数产品为 200–500 件。请告知您的目标数量，我们会确认具体产品的起订量。",
    "faq.home3.q": "是否支持品牌定制与贴牌（OEM/ODM）？",
    "faq.home3.a": "支持。我们提供完整的品牌定制——logo、配色、包装与吊牌——以及 OEM / ODM 开发，从草图到可直接上架的成品。",
    "faq.home4.q": "你们发货到哪些国家？",
    "faq.home4.a": "我们出口 30 多个国家，覆盖北美、欧洲、中东、大洋洲与亚洲，支持空运与海运，单证齐全。",
    "faq.home5.q": "大货之前可以先拿样品吗？",
    "faq.home5.a": "当然。我们建议先下样品单，确认品质、材料与定制效果后再下大货订单。",

    "faq.about1.q": "Poteho 成立于哪一年？",
    "faq.about1.a": "Poteho 创立于 2020 年，迄今已服务 30 多个国家的零售商与品牌。",
    "faq.about2.q": "你们是工厂还是贸易公司？",
    "faq.about2.a": "我们是宠物用品生产制造商，拥有自有产线与专属质检团队，每件产品出厂前逐件检查。",
    "faq.about3.q": "你们有哪些品质管控？",
    "faq.about3.a": "每件产品均由质检团队逐件检验，并可根据需求安排第三方验货及相关认证。",
    "faq.about4.q": "Poteho 位于哪里？",
    "faq.about4.a": "团队位于中国北京，通过主要海运与空运港口向全球发货。",
    "faq.about5.q": "能否为我的品牌开发定制产品？",
    "faq.about5.a": "可以。从草图或想法出发，我们的团队负责结构、材料、打样与包装，把您的产品从概念送到集装箱。",

    "faq.wholesale1.q": "如何获取批发报价？",
    "faq.wholesale1.a": "填写联系表单或发邮件至 info@poteho.com，说明产品、数量与目标市场，我们会在一个工作日内给出专属报价。",
    "faq.wholesale2.q": "是否支持 OEM、ODM 与贴牌？",
    "faq.wholesale2.a": "支持——logo、配色、材料、包装与吊牌均可定制，并可根据您的创意（ODM）或规格（OEM）开发新品。",
    "faq.wholesale3.q": "生产周期大概多久？",
    "faq.wholesale3.a": "打样通常 7–14 天，大货生产约 25–40 天，视订单量与定制程度而定。具体交期会在报价时确认。",
    "faq.wholesale4.q": "提供哪些运输条款与 Incoterms？",
    "faq.wholesale4.a": "支持空运与海运，提供 EXW、FOB、CIF、DDP 等常见贸易条款，单证齐全，清关顺畅。",
    "faq.wholesale5.q": "接受哪些付款方式？",
    "faq.wholesale5.a": "常用 T/T（电汇），可根据订单协商定金＋见单尾款等付款方式。",
    "faq.wholesale6.q": "能否提供产品认证与检测？",
    "faq.wholesale6.a": "可以。我们可提供材料与安全说明，并安排第三方检测（如 SGS）以满足目标市场要求。"
  },

  ru: {
    "faq.eyebrow": "FAQ",
    "faq.h2.home": "Часто задаваемые вопросы",
    "faq.h2.about": "Подробнее о Poteho",
    "faq.h2.wholesale": "Вопросы по опту и заказам",

    "faq.home1.q": "Что производит Poteho?",
    "faq.home1.a": "Poteho разрабатывает и производит премиальные товары для животных — переноски, лежанки, одежду, поводки, товары для кормления и многое другое — для розничных магазинов и брендов по всему миру.",
    "faq.home2.q": "Каков ваш минимальный объём заказа (MOQ)?",
    "faq.home2.a": "MOQ гибкий и устанавливается для каждого товара, обычно от 200 до 500 единиц. Сообщите нам нужный объём, и мы подтвердим точный MOQ.",
    "faq.home3.q": "Предлагаете ли вы брендирование и частную марку (OEM/ODM)?",
    "faq.home3.a": "Да. Мы предлагаем полное брендирование — логотип, цвета, упаковку и бирки — а также разработку OEM и ODM: от эскиза до готового товара.",
    "faq.home4.q": "В какие страны вы поставляете?",
    "faq.home4.a": "Мы поставляем в 30+ стран Северной Америки, Европы, Ближнего Востока, Океании и Азии авиа- или морским транспортом с полным пакетом документов.",
    "faq.home5.q": "Можно ли заказать образцы до крупной партии?",
    "faq.home5.a": "Конечно. Мы рекомендуем сначала заказать образцы, чтобы проверить качество, материалы и брендирование до крупной партии.",

    "faq.about1.q": "Когда была основана Poteho?",
    "faq.about1.a": "Poteho основана в 2020 году и с тех пор обслуживает розничные магазины и бренды в 30+ странах.",
    "faq.about2.q": "Вы производитель или торговая компания?",
    "faq.about2.a": "Мы — производитель товаров для животных с собственным производством и отделом контроля качества, который проверяет каждое изделие поштучно перед отгрузкой.",
    "faq.about3.q": "Какой у вас контроль качества?",
    "faq.about3.a": "Каждое изделие проходит поштучную проверку нашей командой ОТК, а по запросу — стороннюю инспекцию и необходимые сертификаты.",
    "faq.about4.q": "Где находится Poteho?",
    "faq.about4.a": "Наша команда базируется в Пекине, Китай, и мы отправляем товары по всему миру через основные морские и воздушные порты.",
    "faq.about5.q": "Можете ли вы разработать товар для моего бренда?",
    "faq.about5.a": "Да. От эскиза или идеи наша команда берёт на себя конструкцию, материалы, образцы и упаковку — от концепции до контейнера.",

    "faq.wholesale1.q": "Как запросить оптовую котировку?",
    "faq.wholesale1.a": "Заполните форму или напишите на info@poteho.com, указав товары, количество и рынок — ответим расчётом в течение одного рабочего дня.",
    "faq.wholesale2.q": "Поддерживаете ли вы OEM, ODM и частную марку?",
    "faq.wholesale2.a": "Да — логотип, цвета, материалы, упаковку и бирки можно настроить, а также разработать товары по вашей идее (ODM) или спецификации (OEM).",
    "faq.wholesale3.q": "Какие у вас обычные сроки производства?",
    "faq.wholesale3.a": "Образцы обычно 7–14 дней, серийное производство около 25–40 дней в зависимости от объёма и кастомизации. Точные сроки подтверждаем в расчёте.",
    "faq.wholesale4.q": "Какие условия поставки и Incoterms вы предлагаете?",
    "faq.wholesale4.a": "Отправляем авиа- или морским транспортом и поддерживаем условия EXW, FOB, CIF, DDP с полным пакетом документов для таможни.",
    "faq.wholesale5.q": "Какие способы оплаты вы принимаете?",
    "faq.wholesale5.a": "Обычно работаем по T/T (банковский перевод) и можем обсудить условия, например предоплата плюс остаток по документам.",
    "faq.wholesale6.q": "Предоставляете ли вы сертификаты и тестирование?",
    "faq.wholesale6.a": "Да. Мы можем предоставить документы по материалам и безопасности и организовать сторонние испытания (например, SGS) под требования вашего рынка."
  },

  es: {
    "faq.eyebrow": "FAQ",
    "faq.h2.home": "Preguntas frecuentes",
    "faq.h2.about": "Más sobre Poteho",
    "faq.h2.wholesale": "Preguntas de mayoreo y pedidos",

    "faq.home1.q": "¿Qué fabrica Poteho?",
    "faq.home1.a": "Poteho diseña y fabrica artículos premium para mascotas — transportines, camas, ropa, correas, utensilios de alimentación y más — para minoristas y marcas de todo el mundo.",
    "faq.home2.q": "¿Cuál es su pedido mínimo (MOQ)?",
    "faq.home2.a": "El MOQ es flexible y se fija por producto, normalmente de 200 a 500 unidades. Díganos su volumen objetivo y le confirmaremos el MOQ exacto.",
    "faq.home3.q": "¿Ofrecen marca personalizada y marca privada (OEM/ODM)?",
    "faq.home3.a": "Sí. Ofrecemos marca personalizada completa — logotipo, colores, embalaje y etiquetas — y desarrollo OEM/ODM, desde un boceto hasta un producto listo para la venta.",
    "faq.home4.q": "¿A qué países envían?",
    "faq.home4.a": "Enviamos a más de 30 países de Norteamérica, Europa, Oriente Medio, Oceanía y Asia, por aire o mar, con toda la documentación de exportación.",
    "faq.home5.q": "¿Puedo pedir muestras antes del pedido grande?",
    "faq.home5.a": "Por supuesto. Recomendamos pedir muestras primero para comprobar calidad, materiales y marca antes del pedido grande.",

    "faq.about1.q": "¿Cuándo se fundó Poteho?",
    "faq.about1.a": "Poteho se fundó en 2020 y desde entonces sirve a minoristas y marcas de más de 30 países.",
    "faq.about2.q": "¿Son fabricantes o una empresa comercial?",
    "faq.about2.a": "Somos fabricantes de artículos para mascotas con producción propia y un equipo de control de calidad interno que revisa cada producto pieza por pieza antes del envío.",
    "faq.about3.q": "¿Qué control de calidad tienen?",
    "faq.about3.a": "Cada producto pasa una inspección pieza por pieza de nuestro equipo de calidad, y bajo pedido gestionamos inspecciones de terceros y certificaciones.",
    "faq.about4.q": "¿Dónde está Poteho?",
    "faq.about4.a": "Nuestro equipo está en Pekín, China, y enviamos a todo el mundo por los principales puertos marítimos y aéreos.",
    "faq.about5.q": "¿Pueden desarrollar un producto para mi marca?",
    "faq.about5.a": "Sí. A partir de un boceto o una idea, nuestro equipo se encarga de la estructura, materiales, muestras y embalaje: de la concepción al contenedor.",

    "faq.wholesale1.q": "¿Cómo solicito una cotización de mayoreo?",
    "faq.wholesale1.a": "Use el formulario de contacto o escriba a info@poteho.com con los productos, cantidades y mercado; le respondemos con una cotización en un día laborable.",
    "faq.wholesale2.q": "¿Apoyan OEM, ODM y marca privada?",
    "faq.wholesale2.a": "Sí: logotipo, colores, materiales, embalaje y etiquetas se personalizan, y desarrollamos productos desde su idea (ODM) o especificación (OEM).",
    "faq.wholesale3.q": "¿Cuáles son sus plazos habituales?",
    "faq.wholesale3.a": "Las muestras suelen tardar 7–14 días y la producción en serie unos 25–40 días según el pedido. Confirmamos plazos exactos en cada cotización.",
    "faq.wholesale4.q": "¿Qué términos de envío e Incoterms ofrecen?",
    "faq.wholesale4.a": "Enviamos por aire o mar y admitimos Incoterms EXW, FOB, CIF y DDP, con toda la documentación para la aduana.",
    "faq.wholesale5.q": "¿Qué métodos de pago aceptan?",
    "faq.wholesale5.a": "Solemos trabajar con T/T (transferencia bancaria) y podemos acordar condiciones como depósito más saldo contra documentos.",
    "faq.wholesale6.q": "¿Ofrecen certificados y pruebas de producto?",
    "faq.wholesale6.a": "Sí. Podemos entregar documentación de materiales y seguridad y gestionar pruebas de terceros (como SGS) según su mercado."
  }
};

/* ---------- Runtime helpers (shared with main.js) ---------- */
function i18nGetLang() {
  const saved = localStorage.getItem("poteho-lang");
  return I18N_LANGS.includes(saved) ? saved : "en";
}
function t(key) {
  const lang = i18nGetLang();
  return (I18N[lang] && I18N[lang][key])
      || I18N.en[key]
      || (FAQ[lang] && FAQ[lang][key])
      || (FAQ.en && FAQ.en[key])
      || key;
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
