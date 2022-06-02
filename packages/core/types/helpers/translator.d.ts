import { TranslationKeys } from "../types.js";
export default class Translator {
    static dictionaries: Map<string, Partial<TranslationKeys>>;
    static activeLang: string;
    static translate(dictKey: string, params?: {
        [key: string]: string | number;
    }, defaultValue?: string): string;
}
