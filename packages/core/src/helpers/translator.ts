import DefaultDictionary from '../translations/en.js';
import { TranslationKeys } from "../types.js";
import { safeGet } from './inline_object_getter.js';

export default class Translator {
  public static dictionaries: Map<string, Partial<TranslationKeys>> = new Map();

  public static activeLang = 'en';

  public static translate(
    dictKey: string,
    params?: {[key: string]: string|number},
    defaultValue?: string
  ): string {
    if (this.dictionaries.size === 0 || !this.dictionaries.has('en')) {
      this.dictionaries.set('en', DefaultDictionary as Partial<TranslationKeys>);
    }

    let found = safeGet(this.dictionaries.get(this.activeLang) as Partial<TranslationKeys>|undefined, dictKey, defaultValue ?? '');

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        found = found.replace(`%${key}%`, String(value));
      }
    }

    return found;
  }
}
