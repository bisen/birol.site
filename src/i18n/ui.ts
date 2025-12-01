export const languages = {
	en: 'English',
	tr: 'Türkçe',
} as const;

export const defaultLang = 'en' as const;

export type Lang = keyof typeof languages;

export const ui = {
	en: {
		// Site
		'site.title': 'Birol Senturk',
		'site.description': 'Software developer specializing in modern web applications and AI-powered solutions. Building digital products that matter.',

		// Navigation
		'nav.services': 'Services',
		'nav.work': 'Work',
		'nav.blog': 'Blog',
		'nav.creative': 'Creative',
		'nav.photography': 'Photography',
		'nav.art': 'Art',
		'nav.contact': 'Contact',

		// Hero
		'hero.greeting': "Hello, I'm",
		'hero.title': 'Software Developer & Builder',
		'hero.description': 'I turn ideas into working software. Building web applications and AI-powered tools that solve real problems.',
		'hero.cta.contact': 'Get in Touch',
		'hero.cta.work': 'View Projects',

		// Services
		'services.label': 'What I Do',
		'services.title': 'Services',
		'services.web.title': 'Web Applications',
		'services.web.description': 'Custom web apps built with modern tools. React, Node, TypeScript — whatever fits your needs best.',
		'services.ai.title': 'AI Integration',
		'services.ai.description': 'Add intelligence to your product. LLM features, chatbots, and automation that actually works.',
		'services.consulting.title': 'Technical Consulting',
		'services.consulting.description': 'Architecture guidance, code reviews, and honest advice on technology decisions.',

		// Work
		'work.label': 'Selected Work',
		'work.title': 'Projects',
		'work.viewAll': 'View All Projects',
		'work.tag.active': 'Active',
		'work.tag.development': 'In Development',
		'work.tag.saas': 'SaaS',
		'work.tag.tool': 'Tool',
		'work.tag.ai': 'AI',
		'work.tag.logistics': 'Logistics',
		'work.tag.marketing': 'Marketing',
		'work.tag.branding': 'Branding',
		'work.4xdigital.description': 'Making digital advertising accessible to small and medium businesses through AI-powered campaign management.',
		'work.sevkio.description': 'Logistics management tool designed specifically for small businesses to streamline their shipping operations.',
		'work.forgekit.description': 'LLM-powered personal branding toolkit helping professionals craft their digital presence.',

		// Projects Page
		'projects.title': 'Projects',
		'projects.description': 'A collection of products and tools I\'ve built',
		'projects.label': 'All Work',
		'projects.intro': 'Products, tools, and experiments I\'ve built to solve real problems.',
		'projects.visit': 'Visit Project',
		'projects.count.singular': 'project',
		'projects.count.plural': 'projects',

		// Blog
		'blog.label': 'Insights',
		'blog.title': 'Writing',
		'blog.allPosts': 'All Posts',
		'blog.comingSoon': 'New posts coming soon.',

		// Creative
		'creative.label': 'Beyond Code',
		'creative.title': 'Creative Work',
		'creative.intro': "When I'm not building software, I explore the world through photography and art.",
		'creative.photography.title': 'Photography',
		'creative.photography.description': 'Capturing moments and perspectives through the lens.',
		'creative.art.title': 'Art',
		'creative.art.description': 'Blending technology with creative expression.',

		// Contact
		'contact.label': 'Get in Touch',
		'contact.title': 'Have a project?',
		'contact.description': "I'm always open to discussing new opportunities. Whether you have a clear vision or just an idea, let's talk about how I can help.",
		'contact.email': 'Email',
		'contact.linkedin': 'LinkedIn',
		'contact.github': 'GitHub',

		// Footer
		'footer.tagline': 'Building digital products that matter.',

		// Common
		'common.readMore': 'Read More',
		'common.backHome': 'Back to Home',
		'common.collection': 'Collection',
		'common.loading': 'Loading...',

		// Photography
		'photography.title': 'Photography',
		'photography.description': 'Photography portfolio by Birol Senturk',
		'photography.loading': 'Loading photographs...',
		'photography.empty': 'New photographs coming soon.',
		'photography.count.singular': 'photo',
		'photography.count.plural': 'photos',

		// Art
		'art.title': 'Art',
		'art.description': 'Art portfolio by Birol Senturk',
		'art.loading': 'Loading artworks...',
		'art.empty': 'New artworks coming soon.',
		'art.count.singular': 'piece',
		'art.count.plural': 'pieces',

		// About
		'about.title': 'About Me',
		'about.description': 'Learn more about Birol Senturk',
		'about.p1': "I'm a software developer with a passion for creating intuitive and efficient web applications. I enjoy working with modern technologies and frameworks to build solutions that make a difference.",
		'about.p2': "When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing my knowledge through writing and mentoring.",
		'about.p3': "Feel free to reach out if you'd like to connect or collaborate on interesting projects.",
	},
	tr: {
		// Site
		'site.title': 'Birol Senturk',
		'site.description': 'Modern web uygulamaları ve yapay zeka çözümleri konusunda uzmanlaşmış yazılım geliştirici. Fark yaratan dijital ürünler geliştiriyorum.',

		// Navigation
		'nav.services': 'Hizmetler',
		'nav.work': 'Projeler',
		'nav.blog': 'Blog',
		'nav.creative': 'Yaratıcı',
		'nav.photography': 'Fotoğraf',
		'nav.art': 'Sanat',
		'nav.contact': 'İletişim',

		// Hero
		'hero.greeting': 'Merhaba, ben',
		'hero.title': 'Yazılım Geliştirici',
		'hero.description': 'Fikirleri çalışan yazılımlara dönüştürüyorum. Gerçek sorunları çözen web uygulamaları ve yapay zeka araçları geliştiriyorum.',
		'hero.cta.contact': 'İletişime Geç',
		'hero.cta.work': 'Projeleri Gör',

		// Services
		'services.label': 'Ne Yapıyorum',
		'services.title': 'Hizmetler',
		'services.web.title': 'Web Uygulamaları',
		'services.web.description': 'Modern araçlarla özel web uygulamaları. React, Node, TypeScript — ihtiyaçlarınıza en uygun teknolojiler.',
		'services.ai.title': 'Yapay Zeka Entegrasyonu',
		'services.ai.description': 'Ürününüze zeka katın. LLM özellikleri, chatbotlar ve gerçekten çalışan otomasyon.',
		'services.consulting.title': 'Teknik Danışmanlık',
		'services.consulting.description': 'Mimari rehberlik, kod incelemeleri ve teknoloji kararlarında dürüst tavsiyeler.',

		// Work
		'work.label': 'Seçili Projeler',
		'work.title': 'Projeler',
		'work.viewAll': 'Tüm Projeleri Gör',
		'work.tag.active': 'Aktif',
		'work.tag.development': 'Geliştiriliyor',
		'work.tag.saas': 'SaaS',
		'work.tag.tool': 'Araç',
		'work.tag.ai': 'Yapay Zeka',
		'work.tag.logistics': 'Lojistik',
		'work.tag.marketing': 'Pazarlama',
		'work.tag.branding': 'Markalaşma',
		'work.4xdigital.description': 'Yapay zeka destekli kampanya yönetimi ile dijital reklamcılığı küçük ve orta ölçekli işletmeler için erişilebilir kılıyoruz.',
		'work.sevkio.description': 'Küçük işletmelerin sevkiyat operasyonlarını kolaylaştırmak için özel olarak tasarlanmış lojistik yönetim aracı.',
		'work.forgekit.description': 'Profesyonellerin dijital varlıklarını oluşturmalarına yardımcı olan LLM destekli kişisel marka araç seti.',

		// Projects Page
		'projects.title': 'Projeler',
		'projects.description': 'Geliştirdiğim ürün ve araçlar koleksiyonu',
		'projects.label': 'Tüm Çalışmalar',
		'projects.intro': 'Gerçek problemleri çözmek için geliştirdiğim ürünler, araçlar ve deneyler.',
		'projects.visit': 'Projeyi Ziyaret Et',
		'projects.count.singular': 'proje',
		'projects.count.plural': 'proje',

		// Blog
		'blog.label': 'Yazılar',
		'blog.title': 'Blog',
		'blog.allPosts': 'Tüm Yazılar',
		'blog.comingSoon': 'Yeni yazılar yakında.',

		// Creative
		'creative.label': 'Kodun Ötesinde',
		'creative.title': 'Yaratıcı Çalışmalar',
		'creative.intro': 'Yazılım geliştirmediğim zamanlarda fotoğraf ve sanatla dünyayı keşfediyorum.',
		'creative.photography.title': 'Fotoğraf',
		'creative.photography.description': 'Objektif aracılığıyla anları ve bakış açılarını yakalıyorum.',
		'creative.art.title': 'Sanat',
		'creative.art.description': 'Teknolojiyi yaratıcı ifadeyle birleştiriyorum.',

		// Contact
		'contact.label': 'İletişime Geç',
		'contact.title': 'Bir projeniz mi var?',
		'contact.description': 'Yeni fırsatları tartışmaya her zaman açığım. Net bir vizyonunuz veya sadece bir fikriniz olsun, nasıl yardımcı olabileceğimi konuşalım.',
		'contact.email': 'E-posta',
		'contact.linkedin': 'LinkedIn',
		'contact.github': 'GitHub',

		// Footer
		'footer.tagline': 'Fark yaratan dijital ürünler geliştiriyorum.',

		// Common
		'common.readMore': 'Devamını Oku',
		'common.backHome': 'Ana Sayfaya Dön',
		'common.collection': 'Koleksiyon',
		'common.loading': 'Yükleniyor...',

		// Photography
		'photography.title': 'Fotoğraf',
		'photography.description': 'Birol Senturk fotoğraf portföyü',
		'photography.loading': 'Fotoğraflar yükleniyor...',
		'photography.empty': 'Yeni fotoğraflar yakında.',
		'photography.count.singular': 'fotoğraf',
		'photography.count.plural': 'fotoğraf',

		// Art
		'art.title': 'Sanat',
		'art.description': 'Birol Senturk sanat portföyü',
		'art.loading': 'Eserler yükleniyor...',
		'art.empty': 'Yeni eserler yakında.',
		'art.count.singular': 'eser',
		'art.count.plural': 'eser',

		// About
		'about.title': 'Hakkımda',
		'about.description': 'Birol Senturk hakkında daha fazla bilgi',
		'about.p1': 'Sezgisel ve verimli web uygulamaları oluşturma tutkusu olan bir yazılım geliştiriciyim. Modern teknolojiler ve frameworklerle fark yaratan çözümler üretmekten keyif alıyorum.',
		'about.p2': 'Kod yazmadığım zamanlarda yeni teknolojileri keşfediyor, açık kaynak projelere katkıda bulunuyor veya yazarak ve mentorluk yaparak bilgimi paylaşıyorum.',
		'about.p3': 'Bağlantı kurmak veya ilginç projelerde işbirliği yapmak isterseniz benimle iletişime geçmekten çekinmeyin.',
	},
} as const;
