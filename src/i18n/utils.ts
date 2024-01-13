import { ui, defaultLang } from './ui';
import { meta } from './meta';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useMetaTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof meta)[typeof defaultLang]) {
    return meta[lang][key] || meta[defaultLang][key];
  };
}
