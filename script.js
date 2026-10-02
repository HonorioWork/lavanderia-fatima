/* ============================================================
   LAVANDERIA FÁTIMA - JAVASCRIPT PRINCIPAL
   ============================================================ */

(function() {
    'use strict';

    var WHATSAPP_NUMBER = '552122326565';
    var GA_MEASUREMENT_ID = 'G-BLH38H8S4E';
    var ANALYTICS_CONSENT_KEY = 'lf_analytics_consent';
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var currentLang = 'pt';

    // ============================================================
    // 0. ANALYTICS E CONSENTIMENTO
    // ============================================================
    function getAnalyticsConsent() {
        try {
            return window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
        } catch (error) {
            return null;
        }
    }

    function saveAnalyticsConsent(value) {
        try {
            window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
        } catch (error) {
            // O consentimento vale apenas para esta visita se o navegador bloquear o armazenamento.
        }
    }

    function loadAnalytics() {
        if (getAnalyticsConsent() !== 'granted' || document.querySelector('script[data-google-analytics]')) {
            return;
        }

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function() {
            window.dataLayer.push(arguments);
        };

        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
            anonymize_ip: true
        });

        var analyticsScript = document.createElement('script');
        analyticsScript.async = true;
        analyticsScript.dataset.googleAnalytics = 'true';
        analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
        document.head.appendChild(analyticsScript);
    }

    function setAnalyticsConsent(value) {
        saveAnalyticsConsent(value);
        var banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.hidden = true;
        }
        if (value === 'granted') {
            loadAnalytics();
        }
    }

    var cookieBanner = document.getElementById('cookieBanner');
    var analyticsConsent = getAnalyticsConsent();
    if (cookieBanner && !analyticsConsent) {
        cookieBanner.hidden = false;
    }

    var acceptAnalytics = document.getElementById('acceptAnalytics');
    var declineAnalytics = document.getElementById('declineAnalytics');
    if (acceptAnalytics) {
        acceptAnalytics.addEventListener('click', function() {
            setAnalyticsConsent('granted');
        });
    }
    if (declineAnalytics) {
        declineAnalytics.addEventListener('click', function() {
            setAnalyticsConsent('denied');
        });
    }

    loadAnalytics();

    // ============================================================
    // 1. WHATSAPP
    // ============================================================
    function buildWhatsAppLink(message) {
        var text = encodeURIComponent(message || 'Olá! Gostaria de mais informações.');
        if (!WHATSAPP_NUMBER) {
            return '#contato';
        }
        return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;
    }

    function updateWhatsAppLinks() {
        document.querySelectorAll('.js-whatsapp').forEach(function(el) {
            var localizedMessage = el.getAttribute('data-message-' + currentLang);
            var message = localizedMessage || el.getAttribute('data-message');
            el.setAttribute('href', buildWhatsAppLink(message));
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        });
    }

    updateWhatsAppLinks();

    document.querySelectorAll('.js-whatsapp').forEach(function(el) {
        el.addEventListener('click', function() {
            var label = el.getAttribute('data-whatsapp-label') || el.getAttribute('aria-label') || 'whatsapp';
            var section = el.closest('section') ? el.closest('section').id : 'site';

            if (typeof window.gtag === 'function') {
                window.gtag('event', 'whatsapp_click', {
                    event_category: 'contato',
                    event_label: label,
                    whatsapp_label: label,
                    page_section: section
                });
            }
        });
    });

    // ============================================================
    // 2. IDIOMA - TRADUÇÕES
    // ============================================================
    var translations = {
        pt: {
            servicos: 'Serviços',
            orcamentoNav: 'Orçamento',
            comoFunciona: 'Como funciona',
            localizacao: 'Localização',
            faq: 'Dúvidas',
            contato: 'Contato',
            solicitarOrcamento: 'Solicitar orçamento',
            heroTitle: 'Roupa limpa, cheirosa e pronta <br><em>sem complicação.</em>',
            heroLead: 'Cuidamos das suas roupas e peças especiais com todo o carinho, dedicação e atenção que elas merecem. Nosso compromisso é oferecer praticidade e cuidado em cada serviço, garantindo mais tranquilidade para o seu dia a dia.<br><br>Conheça nossos serviços abaixo e solicite seu orçamento pelo WhatsApp!',
            heroCta1: 'Pedir orçamento no WhatsApp',
            heroCta2: 'Conhecer serviços',
            heroInfoLocationTitle: 'Centro, RJ',
            heroInfoLocationDesc: 'Av. Nossa Sra. de Fátima, 50',
            heroInfoHoursTitle: 'Funcionamento',
            heroInfoHoursDesc: 'Segunda a sexta: 8h às 17:30h<br>Sábado: 8h às 14:30h',
            heroInfoQuoteTitle: 'Orçamento rápido',
            heroInfoQuoteDesc: 'Atendimento pelo WhatsApp',
            trust1: 'Atendimento fácil',
            trust2: 'Mais de 50 anos',
            trust3: 'Localização privilegiada',
            trust4: 'Cuidado por tipo de peça',
            scrollCue: 'Role a página',
            servicosEyebrow: 'O que fazemos',
            servicosTitle: 'Serviços para cada tipo de peça',
            servicosLead: 'Escolha o tipo de serviço e chame no WhatsApp. A resposta já vai com as informações certas para agilizar o orçamento.',
            serviceKicker: 'Serviço mais procurado',
            service1Title: 'Roupas do dia a dia',
            service1Desc: 'Roupas do dia a dia, peças íntimas, lençóis e toalhas, com lavagem, secagem e dobra cuidadosa.',
            service2Title: 'Roupas sociais',
            service2Desc: 'Cuidado especial para ternos, camisas e peças de trabalho, prontas para qualquer compromisso.',
            service3Title: 'Peças delicadas',
            service3Desc: 'Sedas, rendas e tecidos sensíveis tratados com técnicas específicas de lavagem.',
            service4Title: 'Cama, mesa ou banho',
            service4Desc: 'Lençóis, fronhas, toalhas de mesa, toalhas de banho, toalhas de rosto.',
            service5Title: 'Edredom, cobertor ou manta',
            service5Desc: 'Lavagem cuidadosa para peças volumosas, preservando o volume e a maciez.',
            service6Title: 'Passadoria',
            service6Desc: 'Acabamento impecável, vincos perfeitos e atenção em cada detalhe da peça.',
            service7Title: 'Lavagem especializada',
            service7Desc: 'Tratamento de manchas e peças que exigem atenção e técnica redobradas.',
            service8Title: 'Atendimento Personalizado',
            service8Desc: 'Você recebe orientação clara sobre o melhor tratamento para cada peça.',
            service9Title: 'Lavagem a seco',
            service9Desc: 'Cuidado específico para peças que não podem ser lavadas com água.',
            service10Title: 'Lavagem de tênis',
            service10Desc: 'Higienização cuidadosa de tênis, conforme o material e o estado do calçado.',
            service11Title: 'Lavagem de tapetes',
            service11Desc: 'Limpeza conforme o tamanho, o tecido e as condições de cada tapete.',
            service12Title: 'Lavagem de cortinas ou persianas',
            service12Desc: 'Serviço avaliado de acordo com o tecido e o tamanho.',
            pricingEyebrow: 'Orçamento sem enrolação',
            pricingTitle: 'Informe suas peças e receba o valor pelo WhatsApp',
            pricingLead: 'Cada roupa pode exigir um cuidado diferente. Por isso, o orçamento é feito com base no tipo de peça, quantidade e necessidade do tecido.',
            pricingPanelTitle: 'Orçamento rápido, sem tabela confusa.',
            pricingPanelDesc: 'Envie o tipo de peça, quantidade e qualquer observação importante. A lavanderia responde com o valor ideal para o serviço.',
            price1Title: 'Roupas do dia a dia',
            price1Desc: 'Roupas do dia a dia, peças íntimas, lençóis e toalhas',
            price2Title: 'Roupas sociais',
            price2Desc: 'Camisas, ternos, vestidos e peças de trabalho',
            price3Title: 'Edredom, cobertor ou manta',
            price3Desc: 'Lavagem cuidadosa de peças volumosas',
            price4Title: 'Cama, mesa ou banho',
            price4Desc: 'Lençóis, fronhas, toalhas de mesa, toalhas de banho, toalhas de rosto',
            price5Title: 'Peça Delicada',
            price5Desc: 'Seda, renda, linho',
            priceValueQuote: 'Pelo WhatsApp',
            price5Value: 'Seda, renda, linho',
            price6Title: 'Tingimento',
            price6Desc: 'Mediante avaliação da peça. Prazo de 15 a 20 dias',
            price7Title: 'Lavagem a seco',
            price7Desc: 'Informe o tipo de peça e o tecido',
            price8Title: 'Lavagem de tênis',
            price8Desc: 'Informe a quantidade e o modelo',
            price9Title: 'Lavagem de tapetes',
            price9Desc: 'Informe a quantidade e as medidas',
            price10Title: 'Lavagem de cortinas ou persianas',
            price10Desc: 'Informe o tipo e as medidas',
            pickupEyebrow: 'Mais praticidade',
            pickupTitle: 'Serviço de Coleta e Entrega',
            pickupIntro: 'Caso não consiga levar suas peças até a lavanderia, conte com o nosso serviço de Coleta e Entrega.',
            pickupRate: 'Entre em contato conosco e informe o seu endereço completo. A taxa é calculada de acordo com a localização.',
            pickupPrompt: 'Envie seu endereço para consultarmos a taxa de Coleta e Entrega.',
            pickupCta: 'Consultar taxa no WhatsApp',
            pricingCta: 'Orçar no WhatsApp',
            processEyebrow: 'Simples assim',
            processTitle: 'Como funciona',
            processLead: 'Da sua confiança à nossa entrega, um processo simples e cuidado.',
            process1Title: 'Leve suas roupas ou solicite a coleta',
            process1Desc: 'Traga suas peças até a loja ou envie seu endereço para consultarmos a taxa de coleta.',
            process2Title: 'Avaliação e prazo',
            process2Desc: 'O prazo padrão é de 3 dias úteis. Confirmamos se o serviço precisar de mais tempo.',
            process3Title: 'Tratamento adequado',
            process3Desc: 'Cada peça é separada e lavada de acordo com o seu tecido e necessidade.',
            process4Title: 'Receba ou retire limpo e pronto',
            process4Desc: 'Suas roupas impecáveis, passadas e dobradas, prontas para retirada ou entrega.',
            diffEyebrow: 'Por que a Fátima',
            diffTitle: 'O cuidado que faz a diferença',
            diffLead: 'O atendimento foi pensado para ser simples, claro e seguro desde o primeiro contato.',
            diff1Title: 'Atendimento direto',
            diff1Desc: 'WhatsApp e loja preparados para orçamento e dúvidas rápidas.',
            diff2Title: 'Produtos de alta qualidade',
            diff2Desc: 'Sabões e amaciantes selecionados para tecidos finos.',
            diff3Title: 'Cuidado com tecidos delicados',
            diff3Desc: 'Processos específicos para seda, linho, lã e renda.',
            diff4Title: 'Experiência no cuidado',
            diff4Desc: 'Cada peça é observada com atenção antes de seguir para lavagem ou passadoria.',
            diff5Title: 'Pontualidade na entrega',
            diff5Desc: 'O prazo combinado é o prazo cumprido — sempre.',
            diff6Title: 'Excelente custo-benefício',
            diff6Desc: 'Preço justo e transparente, sem surpresas.',
            diff7Title: 'Localização privilegiada',
            diff7Desc: 'No Centro do Rio, facilitando o acesso de clientes.',
            diffPanelKicker: 'Atendimento direto',
            diffPanelTitle: 'Ficou com alguma dúvida?',
            diffPanelDesc: 'Tire sua dúvida pelo WhatsApp sem compromisso.',
            diffPoint1: 'Atendimento direto',
            diffPoint2: 'Prazo combinado',
            diffPoint3: 'Cuidado por tecido',
            diffCtaTitle: 'Ficou com alguma dúvida?',
            diffCtaDesc: 'Tire sua dúvida pelo WhatsApp sem compromisso.',
            diffCtaBtn: 'Tirar dúvidas',
            locBadge: 'Onde estamos',
            locTitle: 'Estamos te esperando no Centro do Rio',
            locDesc: 'Traga suas peças até a nossa loja no Centro do Rio. O atendimento é direto, o orçamento é simples e o cuidado começa já na entrada das roupas.',
            locHoursTitle: 'Horário de funcionamento',
            locHoursDesc: 'Segunda a sexta, 8h às 17:30h. Sábado, 8h às 14:30h',
            locPaymentTitle: 'Formas de pagamento',
            locPaymentDesc: 'Pix, cartão ou dinheiro — como preferir',
            locCta: 'Entrar em contato',
            instagramCta: 'Seguir no Instagram',
            locMapLabel: 'Fácil acesso, perto de você',
            faqEyebrow: 'Dúvidas frequentes',
            faqTitle: 'Perguntas que recebemos com frequência',
            faq1Q: 'Qual o prazo para lavagem?',
            faq1A: 'O prazo padrão é de 3 dias úteis. Alguns serviços podem precisar de mais tempo. Se tiver urgência, avise no momento do orçamento.',
            faq2Q: 'Vocês lavam edredons, cobertores e mantas?',
            faq2A: 'Sim, fazemos lavagem especial de edredons, cobertores e mantas.',
            faq3Q: 'Lavam roupas sociais?',
            faq3A: 'Sim, temos cuidado redobrado com ternos, camisas e trajes sociais.',
            faq4Q: 'Fazem passadoria?',
            faq4A: 'Sim, serviço de passadoria impecável para todas as peças.',
            faq5Q: 'Quais formas de pagamento?',
            faq5A: 'Aceitamos Pix, cartão de débito, crédito e dinheiro.',
            faq6Q: 'Onde ficam localizados?',
            faq6A: 'Av. Nossa Senhora de Fátima, 50 – Loja C, Centro do Rio.',
            faq7Q: 'Informações importantes sobre tingimento',
            faq7A: '<li>O tingimento é indicado preferencialmente para peças 100% algodão.</li><li>Peças com poliéster ou outras fibras podem não absorver a tinta de forma uniforme. 100% poliéster não absorve a tinta.</li><li>Componentes plásticos podem derreter durante o processo e devem ser removidos, quando possível.</li><li>O tingimento é realizado em uma única cor e na peça inteira, não sendo possível manter duas cores diferentes.</li><li>Manchas de cloro podem ser corrigidas por tingimento somente na cor preta.</li><li>Para peças que não sejam 100% algodão, o procedimento será realizado mediante autorização do cliente, ciente da possibilidade de alterações ou danos à peça.</li><li>Serviço terceirizado: prazo de entrega de 15 a 20 dias.</li>',
            ctaEyebrow: 'Vamos cuidar das suas roupas',
            ctaTitle: 'Traga suas roupas e deixe o resto com a gente.',
            ctaDesc: 'Envie uma mensagem, informe suas peças e receba orientação para lavar, passar ou cuidar melhor das suas roupas.',
            ctaBtn: 'Entrar em contato',
            footerDesc: 'Cuidando da roupa de quem confia na gente, no Centro do Rio.',
            footerLinksTitle: 'Links rápidos',
            footerContactTitle: 'Contato',
            footerHoursTitle: 'Horário de funcionamento',
            hoursMonFri: 'Segunda a sexta',
            hoursMonFriTime: '8h – 17:30h',
            hoursSat: 'Sábado',
            hoursSatTime: '8h – 14:30h',
            hoursSun: 'Domingo',
            hoursClosed: 'Fechado',
            footerRights: 'Todos os direitos reservados.',
            footerCredit: 'Site desenvolvido com cuidado, do jeito que a gente trata cada peça.'
        },
        en: {
            servicos: 'Services',
            orcamentoNav: 'Quote',
            comoFunciona: 'How it works',
            localizacao: 'Location',
            faq: 'FAQ',
            contato: 'Contact',
            solicitarOrcamento: 'Request quote',
            heroTitle: 'Clean, fresh clothes ready <br><em>without complications.</em>',
            heroLead: 'We care for your clothes and special items with all the care, dedication and attention they deserve. Our commitment is to make every service practical and attentive, bringing more peace of mind to your day-to-day life.<br><br>Explore our services below and request a quote on WhatsApp!',
            heroCta1: 'Request quote on WhatsApp',
            heroCta2: 'See services',
            heroInfoLocationTitle: 'Downtown Rio',
            heroInfoLocationDesc: '50 Nossa Sra. de Fátima Ave.',
            heroInfoHoursTitle: 'Opening hours',
            heroInfoHoursDesc: 'Monday to Friday: 8 AM to 5:30 PM<br>Saturday: 8 AM to 2:30 PM',
            heroInfoQuoteTitle: 'Quick quote',
            heroInfoQuoteDesc: 'Service via WhatsApp',
            trust1: 'Easy service',
            trust2: 'Over 50 years',
            trust3: 'Prime location',
            trust4: 'Care by garment type',
            scrollCue: 'Scroll down',
            servicosEyebrow: 'What we do',
            servicosTitle: 'Services for every type of garment',
            servicosLead: 'Choose the service type and contact us on WhatsApp. Your message goes with the right details to speed up the quote.',
            serviceKicker: 'Most requested service',
            service1Title: 'Everyday clothes',
            service1Desc: 'Everyday clothes, underwear, sheets and towels, with careful washing, drying and folding.',
            service2Title: 'Formal wear',
            service2Desc: 'Special care for suits, shirts and work clothes, ready for any occasion.',
            service3Title: 'Delicate pieces',
            service3Desc: 'Silks, laces and sensitive fabrics treated with specific washing techniques.',
            service4Title: 'Bed, table or bath',
            service4Desc: 'Sheets, pillowcases, table linens, bath towels and face towels.',
            service5Title: 'Duvet, blanket or throw',
            service5Desc: 'Careful washing for bulky items while preserving volume and softness.',
            service6Title: 'Ironing',
            service6Desc: 'Impeccable finish, perfect creases and attention to every detail of the garment.',
            service7Title: 'Specialized washing',
            service7Desc: 'Stain treatment and pieces that require extra attention and technique.',
            service8Title: 'Personalized Service',
            service8Desc: 'Get clear guidance on the right treatment for each garment.',
            service9Title: 'Dry cleaning',
            service9Desc: 'Specific care for garments that cannot be washed with water.',
            service10Title: 'Sneaker cleaning',
            service10Desc: 'Careful sneaker cleaning according to material and condition.',
            service11Title: 'Rug cleaning',
            service11Desc: 'Cleaning based on the size, fabric and condition of each rug.',
            service12Title: 'Curtain or blind cleaning',
            service12Desc: 'Service assessed according to fabric and size.',
            pricingEyebrow: 'Simple quote',
            pricingTitle: 'Tell us your items and receive the price on WhatsApp',
            pricingLead: 'Each garment may require different care, so quotes are based on item type, quantity and fabric needs.',
            pricingPanelTitle: 'Quick quote, no confusing price table.',
            pricingPanelDesc: 'Send the garment type, quantity and any important note. The laundry will reply with the right value for the service.',
            price1Title: 'Everyday clothes',
            price1Desc: 'Everyday clothes, underwear, sheets and towels',
            price2Title: 'Formal wear',
            price2Desc: 'Shirts, suits, dresses and work clothes',
            price3Title: 'Duvet, blanket or throw',
            price3Desc: 'Careful cleaning for bulky items',
            price4Title: 'Bed, table or bath',
            price4Desc: 'Sheets, pillowcases, table linens, bath towels and face towels',
            price5Title: 'Delicate Piece',
            price5Desc: 'Silk, lace, linen',
            priceValueQuote: 'On WhatsApp',
            price5Value: 'Silk, lace, linen',
            price6Title: 'Dyeing',
            price6Desc: 'Subject to garment evaluation. 15 to 20 day deadline',
            price7Title: 'Dry cleaning',
            price7Desc: 'Tell us the item type and fabric',
            price8Title: 'Sneaker cleaning',
            price8Desc: 'Tell us the quantity and model',
            price9Title: 'Rug cleaning',
            price9Desc: 'Tell us the quantity and dimensions',
            price10Title: 'Curtain or blind cleaning',
            price10Desc: 'Tell us the type and dimensions',
            pickupEyebrow: 'More convenience',
            pickupTitle: 'Pickup and Delivery Service',
            pickupIntro: 'If you cannot bring your items to the laundry, count on our Pickup and Delivery Service.',
            pickupRate: 'Contact us and provide your full address. The fee is calculated according to the location.',
            pickupPrompt: 'Send your address so we can check the Pickup and Delivery fee.',
            pickupCta: 'Check the fee on WhatsApp',
            pricingCta: 'Quote on WhatsApp',
            processEyebrow: 'Simple as that',
            processTitle: 'How it works',
            processLead: 'From your trust to our delivery, a simple and careful process.',
            process1Title: 'Bring your clothes or request pickup',
            process1Desc: 'Bring your items to the store or send your address so we can check the pickup fee.',
            process2Title: 'Assessment and deadline',
            process2Desc: 'The standard turnaround time is 3 business days. We confirm if the service needs more time.',
            process3Title: 'Proper treatment',
            process3Desc: 'Each piece is separated and washed according to its fabric and need.',
            process4Title: 'Receive or pick up clean and ready',
            process4Desc: 'Your impeccable clothes, ironed and folded, ready for pickup or delivery.',
            diffEyebrow: 'Why Fátima',
            diffTitle: 'The care that makes the difference',
            diffLead: 'The service was designed to be simple, clear and reliable from the first contact.',
            diff1Title: 'Direct service',
            diff1Desc: 'WhatsApp and store support ready for quotes and quick questions.',
            diff2Title: 'High quality products',
            diff2Desc: 'Selected soaps and fabric softeners for delicate fabrics.',
            diff3Title: 'Care with delicate fabrics',
            diff3Desc: 'Specific processes for silk, linen, wool and lace.',
            diff4Title: 'Experienced care',
            diff4Desc: 'Each garment is checked carefully before washing or ironing.',
            diff5Title: 'Punctuality in delivery',
            diff5Desc: 'The agreed deadline is the met deadline — always.',
            diff6Title: 'Excellent cost-benefit',
            diff6Desc: 'Fair and transparent price, no surprises.',
            diff7Title: 'Prime location',
            diff7Desc: 'In downtown Rio, making it easy for customers to access.',
            diffPanelKicker: 'Direct service',
            diffPanelTitle: 'Do you have any questions?',
            diffPanelDesc: 'Ask us on WhatsApp with no commitment.',
            diffPoint1: 'Direct service',
            diffPoint2: 'Agreed deadline',
            diffPoint3: 'Fabric care',
            diffCtaTitle: 'Have any questions?',
            diffCtaDesc: 'Ask your question on WhatsApp with no commitment.',
            diffCtaBtn: 'Ask a question',
            locBadge: 'Where we are',
            locTitle: 'We are waiting for you in downtown Rio',
            locDesc: 'Bring your garments to our store in downtown Rio. Service is direct, quotes are simple and care starts as soon as the clothes arrive.',
            locHoursTitle: 'Opening hours',
            locHoursDesc: 'Monday to Friday, 8am to 5:30pm. Saturday, 8am to 2:30pm',
            locPaymentTitle: 'Payment methods',
            locPaymentDesc: 'Pix, card or cash — as you prefer',
            locCta: 'Contact us',
            instagramCta: 'Follow on Instagram',
            locMapLabel: 'Easy access, close to you',
            faqEyebrow: 'Frequently asked questions',
            faqTitle: 'Questions we often receive',
            faq1Q: 'What is the washing turnaround time?',
            faq1A: 'The standard turnaround time is 3 business days. Some services may require more time. If you need urgent service, let us know when requesting a quote.',
            faq2Q: 'Do you wash duvets, blankets and throws?',
            faq2A: 'Yes, we provide special cleaning for duvets, blankets and throws.',
            faq3Q: 'Do you wash formal clothes?',
            faq3A: 'Yes, we take extra care with suits, shirts and formal wear.',
            faq4Q: 'Do you do ironing?',
            faq4A: 'Yes, impeccable ironing service for all garments.',
            faq5Q: 'What payment methods do you accept?',
            faq5A: 'We accept Pix, debit card, credit card and cash.',
            faq6Q: 'Where are you located?',
            faq6A: 'Av. Nossa Senhora de Fátima, 50 – Loja C, downtown Rio.',
            faq7Q: 'Important information about dyeing',
            faq7A: '<li>Dyeing is preferably recommended for 100% cotton garments.</li><li>Pieces with polyester or other fibers may not absorb the dye evenly. 100% polyester does not absorb the dye.</li><li>Plastic components may melt during the process and should be removed whenever possible.</li><li>Dyeing is done in a single color and on the entire garment, so two different colors cannot be preserved.</li><li>Chlorine stains can only be corrected by dyeing in black.</li><li>For garments that are not 100% cotton, the procedure is carried out only with client authorization, aware of the possibility of changes or damage to the garment.</li><li>Outsourced service: delivery deadline of 15 to 20 days.</li>',
            ctaEyebrow: 'Let\'s take care of your clothes',
            ctaTitle: 'Bring your clothes and leave the rest to us.',
            ctaDesc: 'Send a message, tell us about your garments and receive guidance for washing, ironing or caring for your clothes.',
            ctaBtn: 'Contact us',
            footerDesc: 'Taking care of the clothes of those who trust us, in downtown Rio.',
            footerLinksTitle: 'Quick links',
            footerContactTitle: 'Contact',
            footerHoursTitle: 'Opening hours',
            hoursMonFri: 'Monday to Friday',
            hoursMonFriTime: '8am – 5:30pm',
            hoursSat: 'Saturday',
            hoursSatTime: '8am – 2:30pm',
            hoursSun: 'Sunday',
            hoursClosed: 'Closed',
            footerRights: 'All rights reserved.',
            footerCredit: 'Website developed with care, the way we treat each piece.'
        }
    };

    // ============================================================
    // 3. FUNÇÃO PARA ALTERAR IDIOMA
    // ============================================================
    function setLanguage(lang) {
        currentLang = lang;
        
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        document.querySelectorAll('[data-translate]').forEach(function(el) {
            var key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else if (el.tagName === 'BUTTON' || el.tagName === 'A') {
                    var textNode = Array.from(el.childNodes).find(function(node) {
                        return node.nodeType === 3;
                    });
                    if (textNode) {
                        textNode.textContent = translations[lang][key];
                    } else {
                        var span = document.createElement('span');
                        span.textContent = translations[lang][key];
                        el.appendChild(span);
                    }
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        document.documentElement.lang = lang;
        updateWhatsAppLinks();
    }

    // ============================================================
    // 4. EVENTOS DOS BOTÕES DE IDIOMA
    // ============================================================
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // ============================================================
    // 5. SCROLL FLUIDO
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var headerHeight = document.querySelector('.site-header').offsetHeight;
                var targetPosition = targetElement.getBoundingClientRect().top +
                    window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                if (document.body.classList.contains('nav-open')) { closeNav(); }
            }
        });
    });

    // ============================================================
    // 6. CABEÇALHO
    // ============================================================
    var header = document.getElementById('siteHeader');
    var heroSection = document.getElementById('inicio');
    var lastState = false;
    var headerTicking = false;

    function updateHeader() {
        var headerHeight = header ? header.offsetHeight : 0;
        var heroBottom = heroSection ? (heroSection.offsetTop + heroSection.offsetHeight) : 80;
        var transitionOffset = Math.max(150, headerHeight + 72);
        var scrolled = window.scrollY > Math.max(80, heroBottom - transitionOffset);
        if (scrolled !== lastState) {
            header.classList.toggle('is-scrolled', scrolled);
            lastState = scrolled;
        }
    }

    document.addEventListener('scroll', function() {
        if (headerTicking) return;
        headerTicking = true;
        requestAnimationFrame(function() {
            updateHeader();
            headerTicking = false;
        });
    }, { passive: true });
    window.addEventListener('resize', updateHeader, { passive: true });
    updateHeader();

    // ============================================================
    // 7. MENU MOBILE
    // ============================================================
    var navToggle = document.getElementById('navToggle');
    var navScrim = document.getElementById('navScrim');
    var navLinks = document.getElementById('navLinks');

    function closeNav() {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu');
        navToggle.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><use href="#icon-bars"/></svg>';
    }

    function toggleNav() {
        var isOpen = document.body.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        navToggle.innerHTML = isOpen 
            ? '<svg viewBox="0 0 24 24" width="22" height="22"><use href="#icon-xmark"/></svg>'
            : '<svg viewBox="0 0 24 24" width="22" height="22"><use href="#icon-bars"/></svg>';
    }

    navToggle.addEventListener('click', toggleNav);
    navScrim.addEventListener('click', closeNav);
    navLinks.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeNav();
    });

    // ============================================================
    // 8. REVEAL AO ROLAR
    // ============================================================
    var revealEls = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window && !reduceMotion) {
        var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var delay = parseInt(entry.target.style.getPropertyValue('--i')) * 100 || 0;
                    setTimeout(function() {
                        entry.target.classList.add('is-visible');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

        revealEls.forEach(function(el) {
            if (!el.style.getPropertyValue('--i')) {
                el.style.setProperty('--i', '0');
            }
            revealObserver.observe(el);
        });
    } else {
        revealEls.forEach(function(el) {
            el.classList.add('is-visible');
        });
    }

    // ============================================================
    // 9. TIMELINE
    // ============================================================
    var processTrack = document.getElementById('processTrack');
    if (processTrack) {
        if ('IntersectionObserver' in window) {
            var processObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        processObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            processObserver.observe(processTrack);
        } else {
            processTrack.classList.add('in-view');
        }
    }

    // ============================================================
    // 10. PARALLAX
    // ============================================================
    var heroMedia = document.getElementById('heroMedia');
    if (heroMedia && !reduceMotion && window.innerWidth > 680) {
        var parallaxTicking = false;
        function updateParallax() {
            var offset = Math.min(window.scrollY * 0.28, 160);
            heroMedia.style.transform = 'translateY(' + offset + 'px)';
        }
        document.addEventListener('scroll', function() {
            if (parallaxTicking) return;
            parallaxTicking = true;
            requestAnimationFrame(function() {
                updateParallax();
                parallaxTicking = false;
            });
        }, { passive: true });
    }

    // ============================================================
    // 12. FAQ
    // ============================================================
    document.querySelectorAll('.faq-item').forEach(function(item) {
        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function() {
            var isOpen = item.classList.contains('is-open');
            item.parentElement.querySelectorAll('.faq-item.is-open').forEach(function(openItem) {
                if (openItem !== item) {
                    openItem.classList.remove('is-open');
                    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    openItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            item.classList.toggle('is-open', !isOpen);
            question.setAttribute('aria-expanded', (!isOpen).toString());
            answer.style.maxHeight = !isOpen ? (answer.scrollHeight + 'px') : null;
        });
    });

    // ============================================================
    // 13. ANO RODAPÉ
    // ============================================================
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ============================================================
    // 14. SETA "ROLE A PÁGINA"
    // ============================================================
    var scrollCue = document.getElementById('scrollCue');
    if (scrollCue) {
        function handleScrollCue() {
            if (window.scrollY > 100) {
                scrollCue.style.opacity = '0';
                scrollCue.style.transform = 'translateX(-50%) translateY(-20px)';
                scrollCue.style.transition = 'all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)';
                window.removeEventListener('scroll', handleScrollCue);
            }
        }
        document.addEventListener('scroll', handleScrollCue, { passive: true });
    }

    // ============================================================

})();
