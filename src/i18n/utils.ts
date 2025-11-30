import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as Lang;
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: keyof typeof ui[typeof defaultLang]): string {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function getLocalizedPath(path: string, lang: Lang): string {
	// Remove any existing language prefix
	const cleanPath = path.replace(/^\/(en|tr)/, '');
	// Add the new language prefix
	return `/${lang}${cleanPath || '/'}`;
}

export function getAlternateLanguage(lang: Lang): Lang {
	return lang === 'en' ? 'tr' : 'en';
}

export function getDateLocale(lang: Lang): string {
	return lang === 'tr' ? 'tr-TR' : 'en-US';
}

export function formatDate(date: Date, lang: Lang): string {
	return date.toLocaleDateString(getDateLocale(lang), {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}
