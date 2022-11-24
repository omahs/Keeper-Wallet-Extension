import { extension } from 'lib/extension';

import allLocales from '../copied/_locales/index.json';

const existingLocaleCodes = allLocales.map(locale =>
  locale.code.toLowerCase().replace('_', '-')
);

export async function getFirstLangCode() {
  const langCodes = await new Promise<string[]>(resolve => {
    extension.i18n.getAcceptLanguages(resolve);
  });

  return langCodes
    .map(code => code.toLowerCase())
    .find(code => existingLocaleCodes.includes(code));
}
