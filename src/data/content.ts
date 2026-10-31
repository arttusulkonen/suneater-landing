/**
 * Весь контент сайта в одном месте.
 *
 * Картинки лежат в `public/img/` и указываются от корня: '/img/имя-файла.png'.
 * Пустая строка или отсутствующий файл = автоматический плейсхолдер.
 *
 * Тексты проверены на соответствие Alkoholilaki § 50 и EU Food Info:
 * не добавляйте "gluteeniton", "luonnollinen/natural", "suomalaiset marjat"
 * и призывы к вечеринкам без повторной проверки.
 */

export type Lang = 'fi' | 'en';

/** Текст на обоих языках. */
export type Localized = Record<Lang, string>;

export interface Flavor {
  /** Уникальный ключ карточки. */
  id: string;
  /** false = карточка скрыта с сайта, но данные сохранены. */
  enabled: boolean;
  /** Путь к развёртке этикетки, например '/img/cherry.jpg'. */
  image: string;
  /** Цвет плейсхолдера этикетки и свечения карточки (hex). */
  accentColor: string;
  title: Localized;
  tagline: Localized;
  description: Localized;
  specs: Localized;
}

export interface SiteContent {
  defaultLang: Lang;
  brandName: string;
  /**
   * Путь к логотипу: светлый рисунок на прозрачном фоне (SVG или PNG).
   * Если файла нет, показывается текстовый логотип brandName.
   */
  logoImage: string;
  email: string;
  location: string;
  meta: {
    title: Localized;
    description: Localized;
  };
  hero: {
    /** Фоновое изображение Hero. Без него остаётся тёмный градиент. */
    image: string;
    /** true = английский слоган показывается и на финской версии. */
    useEnglishHeadlineForAllLanguages: boolean;
    headline: Localized;
    subheadline: Localized;
  };
  lineup: {
    heading: Localized;
    /**
     * Пропорции развёрток этикеток, ширина / высота (например '2 / 1' для 2400×1200 px).
     * Место под картинку резервируется заранее, поэтому страница не прыгает при загрузке.
     */
    labelAspectRatio: string;
    /** Строка под карточками, одинаковая для обоих языков. */
    comingSoon: string;
  };
  footer: {
    contactLabel: Localized;
  };
  /** Окно подтверждения возраста при первом визите. */
  ageGate: {
    /** false = окно не показывается. */
    enabled: boolean;
    question: Localized;
    note: Localized;
    confirm: Localized;
    decline: Localized;
    /** Сообщение после ответа «нет». */
    declined: Localized;
  };
  ui: {
    languageSwitcherLabel: Localized;
  };
  flavors: Flavor[];
}

// "\u00a0" = неразрывный пробел, чтобы "5 %" не разрывалось на мобильном.
const sessionSpecs: Localized = {
  fi: 'Session mead · noin 5\u00a0% · hiilihapotettu',
  en: 'Session mead · approx. 5\u00a0% ABV · sparkling',
};

export const content: SiteContent = {
  defaultLang: 'fi',
  brandName: 'Sun Eater',
  logoImage: '/img/logo-light.png',
  email: 'suneater@mead.fi',
  location: 'Uusimaa, Finland',

  meta: {
    title: {
      fi: 'Sun Eater · Modernit hiilihapotetut session mead -juomat',
      en: 'Sun Eater · Modern Sparkling Session Meads',
    },
    description: {
      fi: 'Sun Eater valmistaa moderneja hiilihapotettuja session mead -juomia Uudellamaalla. Tulossa 2027.',
      en: 'Sun Eater crafts modern sparkling session meads in Uusimaa, Finland. Coming 2027.',
    },
  },

  hero: {
    image: '/img/hero-bg.jpg',
    useEnglishHeadlineForAllLanguages: false,
    headline: {
      fi: 'Jotain poikkeuksellista on tekeillä.',
      en: 'Something extraordinary is brewing.',
    },
    subheadline: {
      fi: 'Modernit hiilihapotetut session mead -juomat — Uusimaa, Suomi',
      en: 'Modern Sparkling Session Meads — Crafted in Uusimaa, Finland',
    },
  },

  lineup: {
    heading: { fi: 'Ydinvalikoima', en: 'Core Lineup' },
    labelAspectRatio: '2 / 1',
    comingSoon: 'Tulossa 2027 · Coming 2027',
  },

  footer: {
    contactLabel: { fi: 'Yhteistyö ja HoReCa', en: 'Trade & HoReCa' },
  },

  ageGate: {
    enabled: true,
    question: { fi: 'Oletko vähintään 18-vuotias?', en: 'Are you at least 18 years old?' },
    note: {
      fi: 'Sivustolla esitellään alkoholijuomia.',
      en: 'This website presents alcoholic beverages.',
    },
    confirm: { fi: 'Kyllä, olen', en: 'Yes, I am' },
    decline: { fi: 'En ole', en: 'No' },
    declined: {
      fi: 'Valitettavasti sivusto on tarkoitettu vain täysi-ikäisille. Tervetuloa takaisin, kun olet täyttänyt 18 vuotta.',
      en: 'Sorry, this website is for adults only. You are welcome back once you have turned 18.',
    },
  },

  ui: {
    languageSwitcherLabel: { fi: 'Kieli', en: 'Language' },
  },

  flavors: [
    {
      id: 'black-currant',
      enabled: true,
      image: '/img/black-currant.jpg',
      accentColor: '#5b1f4a',
      title: { fi: 'MUSTAHERUKKA', en: 'BLACK CURRANT' },
      tagline: { fi: 'Kirpeä ja täyteläinen.', en: 'Tart and full-bodied.' },
      description: {
        fi: 'Mustaherukan syvä, marjainen kirpeys hunajan pehmeällä pohjalla. Raikas, kupliva ja kevyt.',
        en: 'The deep, tart fruit of black currant on a soft honey base. Crisp, sparkling and light.',
      },
      specs: sessionSpecs,
    },
    {
      id: 'bilberry-vanilla',
      enabled: true,
      image: '/img/bilberry-vanilla.jpg',
      accentColor: '#2e2f7a',
      title: { fi: 'MUSTIKKA & VANILJA', en: 'BILBERRY & VANILLA' },
      tagline: { fi: 'Metsäinen ja pehmeä.', en: 'Dark and smooth.' },
      description: {
        fi: 'Mustikan tumma, metsäinen maku kohtaa lempeän vaniljan ja hunajan. Kupliva ja kevyt, pehmeä jälkimaku.',
        en: 'Dark, foresty bilberry meets gentle vanilla and honey. Sparkling and light, with a smooth finish.',
      },
      specs: sessionSpecs,
    },
    {
      id: 'cherry',
      enabled: true,
      image: '/img/cherry.jpg',
      accentColor: '#7a1525',
      title: { fi: 'KIRSIKKA', en: 'CHERRY' },
      tagline: { fi: 'Kypsä ja raikas.', en: 'Ripe and bright.' },
      description: {
        fi: 'Kypsän kirsikan mehevyys ja raikas hapokkuus, hunajan pyöristämänä. Kupliva, kevyt ja puhdas.',
        en: 'Juicy ripe cherry and bright acidity, rounded with honey. Sparkling, light and clean.',
      },
      specs: sessionSpecs,
    },
    {
      id: 'raspberry',
      enabled: false,
      image: '/img/raspberry.jpg',
      accentColor: '#a3214f',
      title: { fi: 'VADELMA', en: 'RASPBERRY' },
      tagline: { fi: 'Mehevä ja kirkas.', en: 'Juicy and vivid.' },
      description: {
        fi: 'Vadelman makeanhapan aromi ja hunajan pehmeys. Kupliva, kevyt ja raikas.',
        en: 'The sweet-tart aroma of raspberry with the softness of honey. Sparkling, light and fresh.',
      },
      specs: sessionSpecs,
    },
  ],
};
