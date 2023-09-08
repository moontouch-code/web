import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from "@/store";

import enLocale from './en'
import jaLocale from './ja'

const messages = {
    en: {
        ...enLocale
    },
    ja: {
        ...jaLocale
    }
}

export function getLanguage() {
    const language = store.getters.language
    if (language) return language

    const language2 = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language2.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'en'
}
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: getLanguage() || 'ja',
    messages
})
export default i18n