// STATE
export const menuList = [];
export let favorits = [];

const init = function () {
  const storage = localStorage.getItem("favorits");
  if (storage) favorits = JSON.parse(storage);
};
init();

export let favoritesCount = 0;
export function changeFavoritesCount(operator) {
  if (operator === "+") favoritesCount++;
  if (operator === "-") favoritesCount--;
}

const lunchDescriptionHE =
  "ארוחה עסקית מוגשת בימי חול בלבד א'- ה',<br> בין בשעות 12:00-18:00, ביום ו' בין השעות 12:00-16:00<br> ארוחה עסקית כוללת: מנה ראשונה ומנה עיקרית<br> בנוסף, קוקטייל צהריים על בסיס סאקה ופירות טריים-  ₪ 32 <br> כוס יין צהריים לבן / אדום / רוזה- 32 ₪";

const lunchDescriptionEN =
  "Lunch Menu is served from Sunday to Thursday, 12:00-18:00<br>and on Friday, 12:00-16:00 (exclude holidays)<br>Lunch menu includes: first course & main course<br>In addition, noon cocktail based on sake & fruits - 32 ₪<br>wine of the month red / white / rose 32 ₪";

export const state = {
  appetisers: [
    {
      titleHE: "ראשונות קרות",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Cold appetisers",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "ראשונות חמות",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Hot appetisers",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
  ],
  skewers: {
    titleHE: "שיפודי עץ על הגריל",
    descriptionHE: "",
    postScriptumHE: "שף <b>עידו כהן צדק</b>",
    titleEN: "Skewers",
    descriptionEN: "",
    postScriptumEN: "Chef <b>Ido Cohen Zedek</b>",
    dishes: [],
  },
  mainDishes: {
    titleHE: "מנות עיקריות",
    descriptionHE: "",
    postScriptumHE: "שף <b>עידו כהן צדק</b>",
    titleEN: "Main dishes",
    descriptionEN: "",
    postScriptumEN: "Chef <b>Ido Cohen Zedek</b>",
    dishes: [],
  },

  desserts: {
    titleHE: "קינוחים",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Desserts",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },
  seshimi: {
    titleHE: "סשימי / ניגירי",
    descriptionHE:
      "סשימי - פילה דג או פרי ים ללא אורז<br> ניגירי - כדור אורז ועליו נתח דג / פרי ים / ירק",
    postScriptumHE: "",
    priceHE: "סשימי/ניגירי",
    titleEN: "Nigiri / Seshimi",
    descriptionEN:
      "Nigiri - rice ball topped with fish or seafood<br>Seshimi - fish or seafood fillet without rice",
    postScriptumEN: "",
    priceEN: "Nigiri/Seshimi",
    dishes: [],
    types: [
      { titleHE: "דגי ים", titleEN: "SEA FISH", dishes: [] },
      { titleHE: "מים מתוקים", titleEN: "SWEET WATER FISH", dishes: [] },
      { titleHE: "פירות ים", titleEN: "SEA FOOD", dishes: [] },
      { titleHE: "שונות", titleEN: "OTHERS", dishes: [] },
      { titleHE: "רק בעונה", titleEN: "ONLY IN SEASON", dishes: [] },
    ],
  },
  inari: [
    {
      titleHE: "אינרי / גונקן",
      descriptionHE:
        "אינרי - כיס טופו מתקתק במילוי אורז, דג / פרי ים / ירקות<br>גונקן - כדור אורז עטוף באצה במילוי דג / פרי ים / ירקות",
      postScriptumHE: "",
      priceHE: "אינרי/גונקן",
      titleEN: "Gunkan / Inari",
      descriptionEN:
        "Gunkan - rice ball wrapped with Nori & filled with fish / seafood / vegetables<br>Inari - sweet tofu pocket filled with rice, fish / seafood / vegetables",
      postScriptumEN: "",
      priceEN: "Gunkan/Inari",
      dishes: [],
    },
    {
      titleHE: "אינארי ספיישל",
      descriptionHE:
        "כדור אורז עטוף אינארי בטמפורה ואצת נורי במילוי דג / פרי ים / ירקות",
      postScriptumHE: "",
      titleEN: "Inari Special",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
  ],

  hosomaki: [
    {
      titleHE: "הוסומקי",
      descriptionHE: "אצת נורי במילוי אורז, דג / פרי ים / ירקות (חתוך ל-8))",
      postScriptumHE: "",
      titleEN: "Hosomaki",
      descriptionEN: "Thin roll (Cut into 8)",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "תוספות אפשריות למאקי",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Optional ingredients",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
  ],
  temaki: {
    titleHE: "טמקי - קונוס",
    descriptionHE: "קונוס נורי במילוי אורז / דג / פרי ים / ירקות",
    postScriptumHE: "",
    titleEN: "Temaki",
    descriptionEN: "Hand roll",
    postScriptumEN: "",
    dishes: [],
  },
  irodori: [
    {
      titleHE: "אירודורי - IO",
      descriptionHE: "אורז עוטף אצה במילוי ירק / פרי ים / דג (חתוך ל-4)",
      postScriptumHE: "",
      titleEN: "Irodori i/o",
      descriptionEN: "Inside-Out roll - cut into 4",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "תוספות אפשריות (בחוץ)",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Optional ingredients (outside)",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
  ],
  combinations: {
    titleHE: "קומבינציות",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Combinations",
    descriptionEN: "",
    postScriptumEN: "",
    types: [
      {
        titleHE: "צמחונית",
        titleEN: "VEGETARIAN",
        price: 140,
        dishes: [],
      },
      {
        titleHE: "סקאנה",
        titleEN: "SAKANA",
        price: 210,
        dishes: [],
      },
      {
        titleHE: "קאיסן",
        titleEN: "KAISEN",
        price: 230,
        dishes: [],
      },
    ],
  },
  lunch75: {
    titleHE: "עסקית 80 ₪",
    descriptionHE: lunchDescriptionHE,
    postScriptumHE: "",
    titleEN: "Lunch 80 ₪",
    descriptionEN: lunchDescriptionEN,
    postScriptumEN: "",
    types: [
      {
        titleHE: "מנה ראשונה",
        descriptionHE: "",
        titleEN: "FIRST COURSE",
        descriptionEN: "",
        dishes: [],
      },
      {
        titleHE: "מנה עיקרית מהמטבח ",
        descriptionHE: "",
        titleEN: "MAIN COURSE. KITCHEN",
        descriptionEN: "",
        dishes: [],
      },
      {
        titleHE: "מנה עיקרית סושי ",
        descriptionHE:
          "המנה מורכבת מ-3 רולים (רול I/O חתוך ל-4 ומאקי חתוך ל-8) לבחירתך:",
        titleEN: "MAIN COURSE. SUSHI",
        descriptionEN: "Sushi Combination 3 rolls of your choice",
        dishes: [],
      },
    ],
  },
  lunch90: {
    titleHE: "עסקית 95 ₪",
    descriptionHE: lunchDescriptionHE,
    postScriptumHE: "",
    titleEN: "Lunch 95 ₪",
    descriptionEN: lunchDescriptionEN,
    postScriptumEN: "",
    types: [
      {
        titleHE: "מנה ראשונה",
        descriptionHE: "",
        titleEN: "FIRST COURSE",
        descriptionEN: "",
        dishes: [],
      },
      {
        titleHE: "מנה עיקרית מהמטבח ",
        descriptionHE: "",
        titleEN: "MAIN COURSE. KITCHEN",
        descriptionEN: "",
        dishes: [],
      },
      {
        titleHE: "מנה עיקרית סושי ",
        descriptionHE:
          "המנה מורכבת מ-3 רולים (רול I/O חתוך ל-4 ומאקי חתוך ל-8) לבחירתך:",
        titleEN: "MAIN COURSE. SUSHI",
        descriptionEN: "Sushi Combination 3 rolls of your choice",
        dishes: [],
      },
    ],
  },
  lunch105: {
    titleHE: "עסקית 110 ₪",
    descriptionHE: lunchDescriptionHE,
    postScriptumHE: "",
    titleEN: "Lunch 110 ₪",
    descriptionEN: lunchDescriptionEN,
    postScriptumEN: "",
    types: [
      {
        titleHE: "מנה ראשונה",
        descriptionHE: "",
        titleEN: "FIRST COURSE",
        descriptionEN: "",
        dishes: [],
      },
      {
        titleHE: "מנה עיקרית מהמטבח ",
        descriptionHE: "",
        titleEN: "MAIN COURSE. KITCHEN",
        descriptionEN: "",
        dishes: [],
      },
      {
        titleHE: "מנה עיקרית סושי ",
        descriptionHE: "4 פריטים לבחירה (פריט אחד מכל קבוצה)",
        titleEN: "MAIN COURSE. SUSHI",
        descriptionEN:
          "Sushi Combination. 4 items of your choice - one item per section",
        dishes: [],
      },
    ],
  },
  wine: [
    {
      titleHE: "יין בכוסות",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "WINE BY THE GLASS",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
      types: [
        {
          titleHE: "לבן",
          titleEN: "White",
          dishes: [],
        },
        {
          titleHE: "מבעבע ורוזה",
          titleEN: "Sparkling & Rose",
          dishes: [],
        },
        {
          titleHE: "אדום",
          titleEN: "Red",
          dishes: [],
        },
      ],
    },
    {
      titleHE: "יין בבקבוק",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "WINE BY THE BOTTLE",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
      types: [
        {
          titleHE: "לבן",
          titleEN: "White",
          dishes: [],
        },
        {
          titleHE: "מבעבע ורוזה",
          titleEN: "Sparkling & Rose",
          dishes: [],
        },
        {
          titleHE: "אדום",
          titleEN: "Red",
          dishes: [],
        },
      ],
    },
  ],
  sake: [
    {
      titleHE: "בירות",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "BEER",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "סאקה ואומשו",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "UMESHU & SAKE",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
  ],
  coctails: {
    titleHE: "קוקטיילים",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Coctails",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },
  softDrinks: {
    titleHE: "שתייה קלה",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Soft drinks",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },
  favorites: [],
};

// Adding skewers to appetisers
state.appetisers.push(state.skewers);

// Adding menus to favorites
state.favorites.push(
  state.appetisers[0],
  state.appetisers[1],
  state.skewers,
  state.mainDishes,
  state.desserts,
  state.seshimi,
  state.inari[0],
  state.inari[1],
  state.hosomaki[0],
  state.temaki,
  state.irodori[0],
  state.wine[0],
  state.wine[1],
  state.sake[0],
  state.sake[1],
  state.coctails
);

class Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    this.titleHE = titleHE;
    this.descriptionHE = descriptionHE;
    this.titleEN = titleEN;
    this.descriptionEN = descriptionEN;
    this.price = price;
    this.isVegi = isVegi;
    this._addID();
    this._isFavorite();
    menuList.push(this);
  }

  _addID() {
    this.id = this.titleEN.toLowerCase().replaceAll(" ", "_");
  }

  _isFavorite() {
    if (favorits.includes(this.id)) {
      this.isFavorite = true;
      favoritesCount++;
    }
  }
}
class ColdAppetiser extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.appetisers[0].dishes.push(this);
  }
}

class HotAppetiser extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.appetisers[1].dishes.push(this);
  }
}

class Skewer extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.skewers.dishes.push(this);
  }
}

class MainDish extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.mainDishes.dishes.push(this);
  }
}

class Dessert extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts.dishes.push(this);
  }
}

class SeshimiNigiri extends Menu {
  constructor(
    type,
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.seshimi.types[type].dishes.push(this);
    state.seshimi.dishes.push(this);
  }
}

class InariGunkan extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.inari[0].dishes.push(this);
  }
}

class InariSpecial extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.inari[1].dishes.push(this);
  }
}

class Hosomaki extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.hosomaki[0].dishes.push(this);
  }
}

class HosomakiIngredient extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.hosomaki[1].dishes.push(this);
  }
}

class Temaki extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.temaki.dishes.push(this);
  }
}

class Irodori extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.irodori[0].dishes.push(this);
  }
}

class IrodoriIngredient extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.irodori[1].dishes.push(this);
  }
}

class Cocktail extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    state.coctails.dishes.push(this);
  }
}

class Beer extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    state.sake[0].dishes.push(this);
  }
}

class Sake extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    state.sake[1].dishes.push(this);
  }
}

class SoftDrink extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    state.softDrinks.dishes.push(this);
  }
}

// Classes of Wine

class Wine extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    vintage = ""
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    this.vintage = vintage;
  }
}

class GlassWineWhite extends Wine {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[0].types[0].dishes.push(this);
    state.wine[0].dishes.push(this);
  }
}

class GlassWineRose extends Wine {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[0].types[1].dishes.push(this);
    state.wine[0].dishes.push(this);
  }
}

class GlassWineRed extends Wine {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[0].types[2].dishes.push(this);
    state.wine[0].dishes.push(this);
  }
}

class WineRed extends Wine {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[1].types[2].dishes.push(this);
    state.wine[1].dishes.push(this);
  }
}

class WineWhite extends Wine {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[1].types[0].dishes.push(this);
    state.wine[1].dishes.push(this);
  }
}

class WineRose extends Wine {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[1].types[1].dishes.push(this);
    state.wine[1].dishes.push(this);
  }
}

// COLD APPETISERS

// const wakameSalad = new ColdAppetiser(
//   "סלט וואקאמה",
//   "אצות וואקאמה, צנונית, מלפפון ובצל ברוטב וואפו (ניתן לבקש ללא גלוטן)",
//   "Wakame Salad",
//   "Wakame seaweed, radish, cucumber & onion served with Wafu sauce",
//   24,
//   true
// );

const harusameSalad = new ColdAppetiser(
  "סלט הרוסאמה",
  "אטריות תפוחי אדמה, בצל ירוק וסלמון ברוטב וואפו (ניתן לבקש ללא גלוטן)",
  "Harusame Salad",
  "Cold potato noodles, scallion & salmon served with Wafu sauce",
  36
);

const midoriSalad = new ColdAppetiser(
  "סלט מידורי",
  "סלט עלי חסה, רוקט, צנונית, מלפפון, תפוח, בצל ושקדים קלויים ברוטב למון ג'ויו (טבעוני, ללא גלוטן)",
  "Midori Salad",
  "Lettuce, rocket leaves, radish, cucumber, apple, onion, roasted almonds served with lemon jouyo sauce",
  58,
  true
);

// const bottargaSoba = new ColdAppetiser(
//   "בוטרגה סובה",
//   "אטריות סובה עם בוטרגה, חלמון מגורד ואיקורה",
//   "Bottarga Soba",
//   "Soba noodles with bottarga, grated egg yolk & ikura",
//   58
// );

// const iwaGaki = new ColdAppetiser(
//   "איוואגקי",
//   "אוייסטר מוגש על קרח כתוש בליווי רוטב ספייסי פונזו",
//   "Iwa Gaki",
//   "Fresh oyster on crushed ice served with spicy ponzu sauce",
//   36
// );

const boraYuzuAburaDoushi = new ColdAppetiser(
  "בורה יוזו אבורה דושי",
  "סשימי בורי בחיתוך דק צרוב בשמן שומשום חם ויוזו, סויה וג'ינג'ר",
  "Bora Yuzu Abura Doushi",
  "Grey mullet sashimi thinly sliced, seared with hot sesame oil, yuzu, soy sauce & ginger",
  58
);

const sakeAvocadoCocktail = new ColdAppetiser(
  "סאקה אבוקדו קוקטייל",
  "טרטר סלמון ואבוקדו עם סויה, ווסאבי קראנץ' בעיטור ביצי סלמון",
  "Sake & Avocado Cocktail",
  "Diced salmon & avocado tartar with wasabi seasoned beans & soy sauce topped with salmon roe",
  62
);

const maguroYukke = new ColdAppetiser(
  "מגורו יוקה",
  "טרטר טונה מתובל בסויה, עירית וחלמון ביצת שליו נא",
  "Maguro Yukke",
  "Tuna tartar seasoned with chive & soy sauce, served with quail egg yolk",
  72
);

const maguroTataki = new ColdAppetiser(
  "מגורו טטאקי",
  "סשימי טונה צרובה, רוטב ספייסי פונזו וג'ינג'ר טרי",
  "Maguro Tataki",
  "Lightly seared & sliced tuna sashimi served with spicy ginger ponzu sauce",
  72
);

const wafuYukke = new ColdAppetiser(
  "וואפו יוקה",
  "טרטר בקר וחלמון ביצת שליו נא",
  "Wafu Yukke",
  "Beef tartar served with quail egg yolk",
  72
);

// HOT APPETISERS
// const spicyEdamame = new HotAppetiser(
//   "ספייסי אדה ממה",
//   "פולי סויה חלוטים ומומלחים עם צ'ילי גרוס (טבעוני ללא גלוטן)",
//   "Spicy Edamame",
//   "",
//   26,
//   true
// );

const omisoShiru = new HotAppetiser(
  "אומיסו שירו",
  "מרק מיסו עם אצות וואקאמה, טופו ובצל ירוק",
  "Omiso Shiru",
  "Miso soup with wakame seaweed, fresh tofu & scallion",
  32
);

const agedashiDoufu = new HotAppetiser(
  "אגדאשי דופו",
  "קוביות טופו פריכות ברוטב טנצויו חם, צנון כתוש, בצל ירוק ופטריות נמקו (ניתן לבקש טבעוני)",
  "Agedashi Doufu",
  "Crispy tofu cubes in hot tentsuyu sauce with nameko mushrooms, minced radish & scallion",
  [40, 48]
);

const ebiTempura = new HotAppetiser(
  "אבי טמפורה",
  "שרימפ טמפורה בליווי רוטב טנצויו חם, צנון וג'ינג'ר כתושים",
  "Ebi Tempura",
  "Shrimp tempura served with tentsuyu sauce, minced radish & ginger",
  44
);

const ikaGeso = new HotAppetiser(
  "איקה ג׳סו",
  "ראשי קלמארי פריכים עם מיונז יפני",
  "Ika Geso",
  "Crispy squid tentacles",
  44
);

const zakanaButterShoyu = new HotAppetiser(
  "סקאנה באטר שואיו",
  "נתחי בורי בחמאה, שום, סויה, סאקה, ג'ינג'ר ומירין",
  "Zakana Butter Shoyu",
  "Sautéed grey mullet with soy sauce, sake, mirin, butter, garlic & ginger",
  62
);

const kaisenButterShoyu = new HotAppetiser(
  "קאיסן באטר שואיו",
  "פירות ים בחמאה, שום, סויה, סאקה, ג'ינג'ר ומירין",
  "Kaisen Butter Shoyu",
  "Sautéed sea food with soy sauce, sake, mirin, butter, garlic & ginger",
  64
);

const kuroUdon = new HotAppetiser(
  "קורו אודון",
  "אטריות אודון שחורות עם שרימפ בחמאה, צ'ילי ושום",
  "Kuro Udon",
  "Black udon noodles with shrimp, butter, chili & garlic",
  62
);

// SKEWERS
const negima = new Skewer(
  "נגימה",
  "פרגית עם בצל ירוק",
  "Negima",
  "Spring chicken & scallion",
  28
);

const sakeYaki = new Skewer(
  "סאקה יאקי",
  "סלמון",
  "Sake Yaki",
  "Salmon fillet",
  28
);

const ebiYaki = new Skewer("אבי יאקי", "שרימפ", "Ebi Yaki", "Shrimp", 28);

// MAID DISHES

const ingenDofu = new MainDish(
  "אינגן דופו",
  "טופו מוקפץ עם שעועית ירוקה, פטריות שמפניון ובצל לבן ברוטב יאקיניקו (טבעוני)",
  "Ingen Doufu",
  "Stir fried tofu, green beans, champignon mushrooms & onion with yakiniku sauce",
  58,
  true
);

const suzukiAgedashi = new MainDish(
  "סוזוקי אגדאשי",
  " פילה בס ובצל פריך מוגש לצד רוטב טנצויו חם ושבבי בוניטו",
  "Suzuki Agedashi",
  "Crispy bass and onion served with tentsuyu sauce and bonito flakes",
  74
);

const kaisenShougaItame = new MainDish(
  "קאיסן שוגה איטמה",
  "סקלופ, שרימפ, קלמארי ומולים מוקפצים עם אטריות הרוסאמה בסאקה, ג'ינג'ר, שום וסויה",
  "Kaisen Shouga Itame",
  "Harusame noodles, scallop, shrimp, calamari & mussels stir fried with sake, soy sauce, ginger & garlic",
  98
);

const zakanaChirashi = new MainDish(
  "סקאנה צ'יראשי",
  "סשימי סלמון, דניס, טונה, שרימפ, ביצי סלמון ואומלט יפני על אורז סושי בעיטור בצל ירוק ושומשום קלוי",
  "Zakana Chirashi",
  "Sashimi of salmon, sea bream, tuna, shrimp, salmon roe, japanese omelet on sushi rice, topped with scallion & roasted sesame seeds",
  98
);

const kurodaiSugatayaki = new MainDish(
  "קורודאי סוגטאיאקי",
  "דניס שלם על הגריל במלח מוגש עם רוטב פונזו ואורז שום",
  "Kurodai Sugatayaki",
  "Grilled & salted sea bream served with minced radish, ponzu sauce & garlic rice",
  120
);

const sakamushi = new MainDish(
  "סקאמושי",
  "פילה לברק וירקות מאודים בסאקה. מוגש עם אורז מאודה",
  "Sakamushi",
  "Sea bass fillete with vegetables, steamed in sake",
  128
);

const wafuHireSteak = new MainDish(
  "וואפו הירה סטייק",
  "פילה בקר בגריל",
  "Wafu Hire Steak",
  "Grilled beef fillet",
  170
);

// DESSERTS
const gomaParfait = new Dessert(
  "גומא פרפה",
  "פרפה חלווה בציפוי שוקולד לבן על רוטב חלווה ומחית פיסטוק",
  "Goma Parfait",
  "Halva & white chocolate parfait, halva sauce & pistachio puree",
  48
);

const matchaBrulee = new Dessert(
  "מאצ'ה ברולה",
  "ברולה תה ירוק ושוקולד לבן (ללא גלוטן)",
  "Matcha Brulee",
  "Greem tea brulee with white chocolate (Gluten free)",
  48
);

const lemonTart = new Dessert(
  "טארט לימון",
  "טארט לימון, שמנת חמוצה ודובדבן אמרנה",
  "Lemon Tart",
  "Lemon tart, sour cream & amarena cherry",
  48
);

const chocoreto = new Dessert(
  "צ׳וקורטו",
  "מוס שוקולד מריר, קרם פרלינה, שינקובה טראפל, קראמבל מיסו וטוויל קקאו",
  "Chocoreto",
  "Chocolate mousse, praline cream, shinkobe truffle, miso crumble & coco tuiles",
  58
);

// SESHIMI
const sake = new SeshimiNigiri(0, "סאקה", "סלמון", "Sake", "Salmon", [20, 36]);

const sakeTeriyaki = new SeshimiNigiri(
  0,
  "סאקה טריאקי",
  "סלמון מבושל ברוטב טריאקי",
  "Sake Teriyaki",
  "Cooked in teriyaki",
  ["-", 22]
);

const beniToro = new SeshimiNigiri(
  0,
  "בני טורו",
  "סלמון שמן",
  "Beni-Toro",
  "Fatty salmon",
  [20, 36]
);

const kurodai = new SeshimiNigiri(
  0,
  "קורודאי",
  "דניס",
  "Kurodai",
  "Sea bream",
  [20, 40]
);
const shiroguchi = new SeshimiNigiri(
  0,
  "שירוגוצ‘י",
  "מוסר ים",
  "Shiroguchi",
  "Croaker",
  [20, 40]
);

const maguro = new SeshimiNigiri(
  0,
  "מגורו",
  "טונה",
  "Maguro",
  "Tuna",
  [24, 50]
);

const hamachi = new SeshimiNigiri(
  0,
  "המאצ'י",
  "ילוטייל",
  "Hamachi",
  "Yellowtail",
  [24, 50]
);

const bora = new SeshimiNigiri(1, "בורה", "בורי", "Bora", "Mullet", [18, 34]);

const suzuki = new SeshimiNigiri(1, "סוזוקי", "בס", "Suzuki", "Bass", [18, 34]);

const unagi = new SeshimiNigiri(
  1,
  "אונאגי",
  "צלופח מבושל ברוטב טריאקי",
  "Unagi",
  "Eel cooked in teriyaki",
  ["-", 30]
);

const ebi = new SeshimiNigiri(
  2,
  "אבי",
  "שרימפ מאודה",
  "Ebi",
  "Steamed shrimp",
  [16, 30]
);

const hotate = new SeshimiNigiri(
  2,
  "הוטטה",
  "סקלופ",
  "Hotate",
  "Scallop",
  [24, 42]
);

const hotateTeriyaki = new SeshimiNigiri(
  2,
  "הוטטה טריאקי",
  "סקלופ מבושל ברוטב טריאקי",
  "Hotate Teriyaki",
  "Cooked in teriyaki",
  ["-", 26]
);

const avocado = new SeshimiNigiri(
  3,
  "אבוקדו",
  "",
  "Avocado",
  "",
  ["-", 14],
  true
);

const tamago = new SeshimiNigiri(
  3,
  "טמאגו",
  "אומלט יפני",
  "Tamago",
  "Japanese omelet",
  [16, 22]
);

const shimaAji = new SeshimiNigiri(
  4,
  "שימה אג'י",
  "טרחון",
  "Shima-Aji",
  "Yellow jack",
  [22, 44]
);

const hiramasa = new SeshimiNigiri(
  4,
  "היראמאסה",
  "אינטיאס",
  "Hiramasa",
  "Amberjack",
  [22, 46]
);

const madai = new SeshimiNigiri(
  4,
  "מאדאי",
  "פרידה",
  "Madai",
  "Red snapper",
  [28, 56]
);

const ohToro = new SeshimiNigiri(
  4,
  "או טורו",
  "טונה שמנה",
  "Oh-Toro",
  "Fatty tuna",
  [30, 66]
);

// INARI GUNKAN
const gunkanYasay = new InariGunkan(
  "יאסאי קוקטייל",
  "אספרגוס טמפורה, אבוקדו, צנון מוחמץ, בצל ירוק, שומשום, שקדים קלויים וטריאקי (טבעוני)",
  "Yasai Cocktail",
  "Asparagus tempura, avocado, pickled radish, scallion, sesame seeds, roasted almonds & teriyaki",
  [16, 20],
  true
);

const gunkanVegetarian = new InariGunkan(
  "צמחוני",
  "שיטאקה, אבוקדו, מלפפון, גזר, בצל ירוק, ספייסי מיונז וטריאקי",
  "Vegetarian",
  "Shiitake, avocado, cucumber, carrot, scallion, asparagus tempura, spicy mayonnaise & Teriyaki",
  [16, 20]
);

const gunkanSakeMix = new InariGunkan(
  "סאקה מיקס",
  "סלמון קצוץ, ביצי סלמון, בצל ירוק, ושמן צ'ילי",
  "Sake Mix",
  "Salmon, salmon roe, scallion & chili oil",
  [24, 28]
);

const gunkanShiroZakanaMix = new InariGunkan(
  "שירו סקאנה מיקס",
  "דגים לבנים קצוצים, אבוקדו, שקדים קלויים, בצל ירוק וספייסי מיונז",
  "Shiro Zakana Mix",
  "White fish mix, avocado, roasted almonds, scallion & spicy mayonnaise",
  [26, 30]
);

const gunkanKaisenCocktail = new InariGunkan(
  "קאיסן קוקטייל",
  "שרימפ, סקלופ וקלמארי קצוצים, ביצי סלמון, בצל ירוק, ספייסי מיונז וטריאקי",
  "Kaisen Cocktail",
  "Shrimp, scallop, calamari, salmon roe, scallion, spicy mayonnaise & teriyaki",
  [26, 30]
);

const gunkanTobikoUzura = new InariGunkan(
  "טוביקו אוזורה",
  "ביצי דג דאון וחלמון ביצת שליו",
  "Tobiko Uzura",
  "Flying fish roe & quail egg yolk",
  [28, 32]
);

const gunkanSpicyTekka = new InariGunkan(
  "ספייסי טקה",
  "טונה קצוצה עם בצל ירוק ושמן צ'ילי",
  "Spicy Tekka",
  "Tuna with scallion & chili oil",
  [34, 38]
);

const gunkanUnagiMix = new InariGunkan(
  "אונאגי מיקס",
  "צלופח מבושל בטריאקי קצוץ, אבוקדו, אושינקו, שקדים קלויים, בצל ירוק ושומשום לבן",
  "Unagi Mix Teriyaki",
  "Eel cooked in teriyaki, avocado, sesame seeds, roasted almonds, pickled radish & chili oil",
  [34, 38]
);

const gunkanIkuraUzura = new InariGunkan(
  "איקורה אוזורה",
  "ביצי סלמון וחלמון ביצת שליו",
  "Ikura Uzura",
  "Salmon roe & quail egg yolk",
  [34, 38]
);

const gunkanKurumaMaguro = new InariGunkan(
  "קורומה מגורו",
  "ג'מבו שרימפ קצוץ, אבוקדו, בצל ירוק, שומשום שחור, טריאקי וספייסי מיונז עטוף בסשימי טונה",
  "Kuruma Maguro Gunkan",
  "Prawn, black sesame seeds, avocado, scallion, spicy mayonnaise & teriyaki, wrapped with tuna sashimi",
  ["-", 38]
);

// const gunkanNamaGaki = new InariGunkan(
//   "נמה גקי",
//   "אוייסטר",
//   "Nama Gaki",
//   "Oyster",
//   [36, 40]
// );

// INARI SPECIAL
const specialYasaiCocktail = new InariSpecial(
  "אינארי ספיישל יאסאי קוקטייל",
  "אינארי טמפורה, אספרגוס טמפורה, אבוקדו, צנון מוחמץ, בצל ירוק, שומשום, שקדים קלויים וטריאקי (טבעוני)",
  "Inari Special Yasai Cocktail",
  "Inari tempura, asparagus tempura, avocado, pickled radish, scallion, sesame seeds, roasted almonds & teriyaki",
  24,
  true
);

const specialVegitarian = new InariSpecial(
  "אינארי ספיישל צמחוני",
  "אינארי טמפורה, שיטאקה, אבוקדו, מלפפון, גזר, בצל ירוק, אספרגוס טמפורה, ספייסי מיונז וטריאקי",
  "Inari Special Vegetarian",
  "Inari tempura, shiitake, avocado, cucumber, carrot, scallion, asparagus tempura, spicy mayonnaise & Teriyaki",
  24
);

const specialSake = new InariSpecial(
  "אינארי ספיישל סאקה",
  "אינארי טמפורה, סלמון קצוץ, ביצי סלמון, אספרגוס טמפורה, בצל ירוק ושמן צ'ילי",
  "Inari Special Sake",
  "Inari tempura, salmon, salmon roe, asparagus tempura, scallion & chili oil",
  30
);

const specialKuruma = new InariSpecial(
  "אינארי ספיישל קורומה",
  "אינארי טמפורה, ג'מבו שרימפ קצוץ, אבוקדו, בצל ירוק, שומשום שחור, אספרגוס, טמפורה, טריאקי וספייסי מיונז",
  "Inari Special Kuruma",
  "Inari tempura, prawn, avocado, black sesame seeds, scallion, spicy mayonnaise & teriyaki",
  32
);

const specialShiroZakana = new InariSpecial(
  "אינארי ספיישל שירו סקאנה",
  "אינארי טמפורה, דגים לבנים קצוצים, בצל ירוק, ביצי סלמון, אספרגוס טמפורה וספייסי מיונז",
  "Inari Special Shiro Zakana",
  "Inari tempura, white fish mix, scallion, salmon roe, asparagus tempura & spicy mayonnaise",
  34
);

const specialUnagiMix = new InariSpecial(
  "אינארי ספיישל אונאגי",
  "אינארי טמפורה, צלופח מבושל בטריאקי קצוץ, אבוקדו, אושינקו, שקדים קלויים, בצל ירוק ושומשום לבן",
  "Inari Unagi Mix",
  "Inari tempura, eel cooked in teriyaki, asparagus tempura, avocado, sesame seeds, roasted almonds, pickled radish & chili oil",
  38
);

const specialSpicyTekka = new InariSpecial(
  "אינארי ספיישל ספייסי טקה",
  "אינארי טמפורה, טונה קצוצה עם בצל ירוק, אספרגוס טמפורה ושמן צ'ילי",
  "Inari Spicy Tekka",
  "Inari tempura , tuna with scallion, asparagus tempura & chili oil",
  38
);

const specialTobiko = new InariSpecial(
  "אינארי ספיישל טוביקו",
  "אינארי טמפורה, סלמון וטונה קצוצים, טוביקו וואסאבי, דלעת ממותקת, צנון מוחמץ, בצל סגול, בצל ירוק, אספרגוס טמפורה, טריאקי וספייסי מיונז",
  "Inari Special Tobiko",
  "Inari tempura, salmon, tuna, wasabi tobiko, seasoned pumpkin, pickled radish, red onion, scallion, asparagus tempura, teriyaki & spicy mayonnaise",
  40
);

// HOSOMAKI

const avocadoMaki = new Hosomaki(
  "אבוקדו מאקי",
  "אבוקדו",
  "Avocado Maki",
  "Avocado",
  18,
  true
);

const kanpyoTamagoMaki = new Hosomaki(
  "קאנפיו טמאגו מאקי",
  "דלעת ממותקת ואומלט יפני",
  "Kanpyo Tamago Maki",
  "Seasoned pumpkin & Japanese omelet",
  18
);

const asparaMaki = new Hosomaki(
  "אספרה מאקי",
  "אספרגוס ושומשום",
  "Aspara Maki",
  "Asparagus & sesame seeds",
  18,
  true
);

const shiitakeMaki = new Hosomaki(
  "שיטאקה מאקי",
  "פטריות שיטאקה ושומשום",
  "Shiitake Maki",
  "Japanese mushroom & sesame seeds",
  18,
  true
);

const ebikyuMaki = new Hosomaki(
  "אביקיו מאקי",
  "שרימפ מאודה / בטמפורה ומלפפון",
  "Ebikyu Maki",
  "Steamed shrimp & cucumber",
  26
);

const sakekawaMaki = new Hosomaki(
  "סאקה קאווה מאקי",
  "סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ומלפפון (לא קריספי)",
  "Sakekawa Maki",
  "Chopped salmon skin, spicy mayonnaise, scallion & cucumber (not crispy)",
  28
);

const californiaMaki = new Hosomaki(
  "קליפורניה מאקי",
  "סלמון, אבוקדו ומלפפון",
  "California Maki",
  "Salmon, avocado & cucumber",
  28
);

const torotakuMaki = new Hosomaki(
  "טורוטאקו מאקי",
  "סלמון שמן וצנון מוחמץ",
  "Torotaku Maki",
  "Fatty salmon & pickled radish",
  28
);

const negiShiroZakanaMaki = new Hosomaki(
  "נגי שירו סקאנה מאקי",
  "דגים לבנים קצוצים, בצל ירוק, מלפפון וגזר",
  "Negi Shiro Zakana Maki",
  "White fish mix, scallion, cucumber & carrot",
  30
);

const hokkaiMaki = new Hosomaki(
  "הוקאיי מאקי",
  "שרימפ ואספרגוס טמפורה ",
  "Hokkai Maki",
  "Shrimp & asparagus tempura",
  32
);

const ebiSakekawaMaki = new Hosomaki(
  "אבי סאקה קאווה מאקי",
  "שרימפ טמפורה, סלמון סקין ואבוקדו",
  "Ebi Sakekawa Maki",
  "Shrimp tempura, salmon skin & avocado",
  32
);

const tekkaMaki = new Hosomaki("טקה מאקי", "טונה", "Tekka Maki", "Tuna", 34);

const spicyTekkaMaki = new Hosomaki(
  "ספייסי טקה מאקי",
  "טונה ובצל ירוק קצוצים, שמן צ'ילי ומלפפון",
  "Spicy Tekka Maki",
  "Minced tuna & scallion, chili oil & cucumber",
  34
);

const unakyuMaki = new Hosomaki(
  "אונקיו מאקי",
  "צלופח מבושל בטריאקי ומלפפון",
  "Unakyu Maki",
  "Teriyaki eel & cucumber",
  38
);

// HOSOMAKI Ingredients
new HosomakiIngredient("", "צנון מוחמץ", "", "Pickled radish", 5);
new HosomakiIngredient("", "דלעת ממותקת", "", "Kanpyo", 5);
new HosomakiIngredient("", "טמאגו", "", "Tamago", 5);
new HosomakiIngredient("", "שקדים קלויים", "", "Roasted Almonds", 5);
new HosomakiIngredient("", "שיטאקה/אספרגוס", "", "Shiitake / Asparagus", 6);
new HosomakiIngredient("", "פולי וואסאבי קראנץ‘", "", "Wasabi crunch beans", 6);
new HosomakiIngredient("", "ביצי דג דאון", "", "Flying Fish roe", 12);
new HosomakiIngredient("", "ביצי סלמון", "", "Salmon roe", 14);

// TEMAKI
const californiaTemaki = new Temaki(
  "קליפורניה טמאקי",
  "סלמון, אבוקדו ומלפפון",
  "California Temaki",
  "Salmon, avocado & cucumber",
  30
);

const sakemoriTemaki = new Temaki(
  "סאקמורי טמאקי",
  "סלמון, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי), אבוקדו ומלפפון",
  "Sakemori Temaki",
  "Salmon, salmon skin, avocado & cucumber",
  30
);

const kaisenCocktailTemaki = new Temaki(
  "קאיסן קוקטייל טמאקי",
  "שרימפ, סקלופ וקלמארי קצוצים, ביצי סלמון, בצל ירוק, ספייסי מיונז וטריאקי",
  "Kaisen Cocktail Temaki",
  "Shrimp, scallop, calamari, salmon roe, scallion, spicy mayonnaise & teriyaki",
  32
);

const negiShiroZakanaTemaki = new Temaki(
  "נגי שירו סקאנה טמאקי",
  "דגים לבנים קצוצים, בצל ירוק, מלפפון וגזר",
  "Negi Shiro Zakana Temaki",
  "White fish mix, scallion, cucumber & carrot",
  32
);

const sakeMixTemaki = new Temaki(
  "סאקה מיקס טמאקי",
  "סלמון קצוץ, ביצי סלמון, בצל ירוק, ושמן צ'ילי",
  "Sake Mix Temaki",
  "Salmon, salmon roe, scallion & chili oil",
  32
);

const hokkaiTemaki = new Temaki(
  "הוקאיי טמאקי",
  "שרימפ ואספרגוס טמפורה עם אבוקדו",
  "Hokkai Temaki",
  "Shrimp & asparagus tempura with avocado",
  34
);

const ebiSakekawaTemaki = new Temaki(
  "אבי סאקה קאווה טמאקי",
  "שרימפ טמפורה, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ואבוקדו",
  "Ebi Sakekawa Temaki",
  "Shrimp tempura, Salmon skin & avocado",
  38
);

const spicyTekkaTemaki = new Temaki(
  "ספייסי טקה טמאקי",
  "טונה ובצל ירוק קצוצים, שמן צ'ילי ומלפפון",
  "Spicy Tekka Temaki",
  "Minced tuna & scallion, chili oil & cucumber",
  42
);

const onamiTemaki = new Temaki(
  "אונמי טמאקי",
  "שרימפ טמפורה, סלמון, טונה ומלפפון",
  "Onami Temaki",
  "Shrimp tempura, salmon, tuna & cucumber",
  44
);

const unagiEbiTemaki = new Temaki(
  "אונאגי אבי טמאקי",
  "צלופח מבושל בטריאקי, שרימפ ואספרגוס בטמפורה, ביצי סלמון וספייסי מיונז",
  "Unagi Ebi Temaki",
  "Teriyaki eel, shrimp & asparagus tempura, salmon roe & spicy mayonnaise",
  50
);

// IRODORI
const vegiterianRoll = new Irodori(
  "רול צמחוני",
  "אבוקדו, שיטאקה, בצל ירוק, מלפפון, גזר, ספייסי מיונז וטריאקי",
  "Vegetarian Roll",
  "Shiitake, avocado, cucumber, carrot, scallion, spicy mayonnaise & teriyaki",
  24
);

const midoriRoll = new Irodori(
  "מידורי רול",
  "אספרגוס, אבוקדו, רוקט, מיונז, במעטפת ווסאבי קראנץ'",
  "Midori Roll",
  "Asparagus, avocado, rocket, mayonnaise & wasabi crunch outside",
  26
);

const yasaiCocktailRoll = new Irodori(
  "יאסאי קוקטייל רול",
  "אספרגוס טמפורה, אבוקדו, צנון מוחמץ, שקדים קלויים, שומשום, בצל ירוק וטריאקי",
  "Yasai Cocktail Roll",
  "Asparagus tempura, avocado, sesame seeds, scallion, pickled radish, roasted almonds & teriyaki",
  26,
  true
);

const sakemoriRoll = new Irodori(
  "סאקמורי רול",
  "סלמון, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי), אבוקדו ומלפפון",
  "Sakemori Roll",
  "Salmon, salmon skin, avocado & cucumber",
  30
);

const californiaRoll = new Irodori(
  "קליפורניה רול",
  "סלמון, אבוקדו ומלפפון",
  "California Roll",
  "Salmon, avocado & cucumber",
  30
);

const beniToroRoll = new Irodori(
  "בני טורו רול",
  "סלמון שמן, מלפפון ובצל ירוק",
  "Beni Toro Roll",
  "Fatty salmon, cucumber & scallion",
  30
);

const ebikyuRoll = new Irodori(
  "אביקיו רול",
  "שרימפ מאודה, דלעת ממותקת, אבוקדו, בצל ירוק וספייסי מיונז",
  "Ebikyu Roll",
  "Steamed shrimp, avocado, seasoned pumpkin, spicy mayonnaise & scallion",
  32
);

const ebiSakekawaRoll = new Irodori(
  "אבי סאקה קאווה רול",
  "שרימפ טמפורה, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ואבוקדו",
  "Ebi Sakekawa Roll",
  "Shrimp tempura, Salmon skin & avocado",
  38
);

const shiroZakanaRoll = new Irodori(
  "שירו סקאנה רול",
  "דגים לבנים קצוצים, בצל ירוק, אבוקדו וספייסי מיונז עטוף בסשימי סלמון",
  "Shiro Zakana Roll",
  "White fish mix, avocado, spicy mayonnaise & scallion with salmon outside",
  42
);

const spicyTekkaRoll = new Irodori(
  "ספייסי טקה רול",
  "טונה ובצל ירוק קצוצים, שמן צ'ילי, אבוקדו ואספרגוס",
  "Spicy Tekka Roll",
  "Minced tuna & scallion, chili oil, avocado & asparagus",
  42
);

const hotateTobikoRoll = new Irodori(
  "הוטטה טוביקו רול",
  "סקלופ, אספרגוס, צנון מוחמץ, ביצי דג דאון וספייסי מיונז",
  "Hotate Tobiko Roll",
  "Scallop, asparagus, pickled radish, spicy mayonnaise & flying fish roe",
  44
);

const onamiRoll = new Irodori(
  "אונמי רול",
  "שרימפ טמפורה, סלמון, טונה ומלפפון",
  "Onami Roll",
  "Shrimp tempura, salmon, tuna & cucumber",
  44
);

const unagiEbiRoll = new Irodori(
  "אונאגי אבי רול",
  "צלופח מבושל בטריאקי, שרימפ ואספרגוס בטמפורה, ביצי סלמון וספייסי מיונז",
  "Unagi Ebi Roll",
  "Teriyaki eel, shrimp & asparagus tempura, salmon roe & spicy mayonnaise",
  50
);

const OnamiDream = new Irodori(
  "אונמי דרים",
  "אינארי טמפורה, שרימפ טמפורה, סלמון, ביצי סלמון, שיטאקה, טמאגו, צנון מוחמץ, אבוקדו, מלפפון וגזר",
  "Onami Dream",
  "Shrimp tempura, salmon, salmon roe, shiitake, tamago, pickled radish, cucumber, avocado & carrot wrapped with inari tempura",
  62
);

// IRODORI INGRIDIENTS
new IrodoriIngredient("", "שקדים קלויים", "", "Roasted almonds", 5);
new IrodoriIngredient("", "פולי וואסאבי קראנץ‘", "", "Wasabi crunch beans", 6);
new IrodoriIngredient("", "אבוקדו", "", "Avocado", 6);
new IrodoriIngredient("", "ביצי דג דאון", "", "Flying fish roe", 12);
new IrodoriIngredient("", "סלמון", "", "Salmon", 16);
new IrodoriIngredient("", "דניס", "", "Sea bream", 20);
new IrodoriIngredient("", "טונה", "", "Tuna", 26);

//LUNCH MENU

// const negiShiroZakanaRoll = new Menu(
//   "",
//   "",
//   "",
//   "",
//   0
// );

const negiShiroZakanaRoll = new Menu(
  "נגי שירו סקאנה רול",
  negiShiroZakanaTemaki.descriptionHE,
  "Negi Shiro Zakana Roll",
  negiShiroZakanaTemaki.descriptionEN,
  28
);

const boraMaki = new Menu(
  "בורה מאקי",
  "בורי, אבוקדו ובצל ירוק",
  "Bora Maki",
  "Mullet, avocado & scallion",
  0
);

const kaisenCocktaiMaki = new Menu(
  "קאיסן קוקטייל מאקי",
  kaisenCocktailTemaki.descriptionHE,
  "Kaisen Cocktail Maki",
  kaisenCocktailTemaki.descriptionEN,
  30
);

const vegetarianMixMaki = new Menu(
  "מיקס צמחוני מאקי",
  gunkanVegetarian.descriptionHE,
  "Vegetarian Mix Maki",
  gunkanVegetarian.descriptionEN,
  0
);

const ebiFurai = new Menu(
  "אבי פוראי",
  "שרימפ פריך בציפוי פאנקו בליווי מיונז יפני",
  "Ebi Furai",
  "Crispy shrimp coated in panko served with mayonnaise",
  0
);

// const yasaiGomaItame = new Menu(
//   "יאסאי גומה איטמה",
//   "ירקות העונה וטופו מוקפצים עם סאקה ומוגשים עם רוטב גומה אאה",
//   "Yasai Goma Itame",
//   "Vegetables and tofu stir fried with sake. Served with goma sauce",
//   0,
//   true
// );

const yasaiKareUdon = new Menu(
  "יאסאי קארה אודון",
  "אטריות קמח חיטה, שעועית ירוקה, גזר ונבטים מוקפצים ברוטב קארי יפני חריף (טבעוני)",
  "Yasai Kare Udon",
  "Stir fried wheat flour noodles, carrot, sprouts & green beans with spicy japanese curry sauce",
  0,
  true
);

const yasaiUdon = new Menu(
  "יאסאי אודון",
  "מרק עם אטריות אודון, ברוקולי, שמפיניון, גזר, וואקמה, ביצה חצי קשה ובצל ירוק",
  "Yasai Udon",
  "Noodles soup with broccoli, mushrooms, carrot, Wakame seaweed, boiled egg & scallion",
  0
);

const toriKareUdon = new Menu(
  "טורי קארה אודון",
  "אטריות קמח חיטה, עוף, שעועית ירוקה, גזר ונבטים מוקפצים ברוטב קארי יפני חריף",
  "Tori Kare Udon",
  "Stir fried wheat flour noodles,spring chicken, carrot, sprouts & green beans with spicy japanese curry sauce",
  0
);

const wakadoriGrill = new Menu(
  "וואקאדורי גריל",
  "פרגית בגריל עם בצל מוקפץ ואורז שום",
  "Wakadori Grill",
  "Grilled spring chicken, served with sautéed onion & garlic rice",
  0
);

const yakinikuLousujyu = new Menu(
  "יאקיניקו לוסוג'יו",
  "נתחי אנטריקוט מוקפצים עם בצל ברוטב יאקיניקו בעיטור בצל ירוק ושומשום. מוגש על אורז מאודה",
  "Yakiniku Lousujyu",
  "Beef strips with yakiniku sauce on steamed rice",
  0
);

const toriRamen = new Menu(
  "טורי ראמן",
  "ציר עוף, אטריות ראמן, פרגית, נבטים, ביצה חצי קשה, פטריית אוזן ובצל ירוק",
  "Tori Ramen",
  "Noodles soup with spring chicken, kikurage mushroom, sprouts, boiled egg & scallion",
  0
);

const kaisenUdon = new Menu(
  "קאיסן אודון",
  "מרק אטריות אודון, שרימפ, סקלופ, קלמארי, ברוקולי, פטריות שמפיניון, אצות וואקאמה, ביצה חצי קשה ובצל ירוק",
  "Kaisen Udon",
  "Noodles soup with shrimp, scallop, calamari, broccoli, mushrooms, carrot, Wakame seaweed, boiled egg & scallion",
  0
);

const sakeSteak = new Menu(
  "סאקה סטייק",
  "פילה סלמון בגריל",
  "Sake Steak",
  "Grilled salmon fillet",
  100
);

const lunchSushiTypeNigiri = {
  titleHE: "ניגירי (זוג):",
  titleEN: "Nigiri (a pair):",
  isTypeTitle: true,
};
const lunchSushiTypeSeshimi = {
  titleHE: "סשימי (מנת סשימי כוללת 2 פרוסות):",
  titleEN: "Sashimi (2 slices):",
  isTypeTitle: true,
};
const lunchSushiTypeIrodori = {
  titleHE: "אירודורי רול (I/O חתוך ל-4):",
  titleEN: "I/O Irodori Roll (cut into 4):",
  isTypeTitle: true,
};
const lunchSushiTypeHosomaki = {
  titleHE: "הוסומאקי (חתוך ל-8):",
  titleEN: "Hosomaki (cut into 8):",
  isTypeTitle: true,
};
const lunchSushiTypeTemaki = {
  titleHE: "טמאקי - קונוס:",
  titleEN: "Temaki - Hand Rol:",
  isTypeTitle: true,
};
const lunchSushiTypeGunkan = {
  titleHE: "גונקן- כדור אורז עטוף אצה:",
  titleEN: "Gunkan - Rice ball wrapped with Nori:",
  isTypeTitle: true,
};

state.lunch75.types[0].dishes = [
  omisoShiru,
  harusameSalad,
  ebiFurai,
  agedashiDoufu,
  sakemoriRoll,
  ebiSakekawaTemaki,
];
state.lunch75.types[1].dishes = [yasaiKareUdon, ingenDofu, yasaiUdon];
state.lunch75.types[2].dishes = [
  midoriRoll,
  yasaiCocktailRoll,
  vegetarianMixMaki,
  shiitakeMaki,
  asparaMaki,
  kanpyoTamagoMaki,
];

state.lunch90.types[0].dishes = state.lunch75.types[0].dishes;
state.lunch90.types[1].dishes = [
  toriKareUdon,
  wakadoriGrill,
  yakinikuLousujyu,
  toriRamen,
];
state.lunch90.types[2].dishes = [
  negiShiroZakanaMaki,
  californiaMaki,
  boraMaki,
  sakemoriRoll,
  ebikyuRoll,
  kaisenCocktaiMaki,
];

state.lunch105.types[0].dishes = [
  ...state.lunch75.types[0].dishes,
  ebiTempura,
  wafuYukke,
];
state.lunch105.types[1].dishes = [
  kaisenShougaItame,
  kaisenUdon,
  sakeSteak,
  kurodaiSugatayaki,
];
state.lunch105.types[2].dishes = [
  lunchSushiTypeNigiri,
  sake,
  beniToro,
  kurodai,
  suzuki,
  bora,
  shiroguchi,
  tamago,
  ebi,

  lunchSushiTypeSeshimi,
  sake,
  beniToro,
  kurodai,
  suzuki,
  bora,
  shiroguchi,
  tamago,
  ebi,

  lunchSushiTypeIrodori,
  californiaRoll,
  negiShiroZakanaRoll,
  ebikyuRoll,
  sakemoriRoll,

  lunchSushiTypeHosomaki,
  spicyTekkaMaki,
  californiaMaki,
  hokkaiMaki,
  ebiSakekawaMaki,

  lunchSushiTypeTemaki,
  californiaTemaki,
  negiShiroZakanaTemaki,
  ebiSakekawaTemaki,
  kaisenCocktailTemaki,

  lunchSushiTypeGunkan,
  gunkanKaisenCocktail,
  gunkanSakeMix,
  gunkanShiroZakanaMix,
];

// COMBINATIONS
const combiTypeGunkan = { HE: "גונקן", EN: "Gunkan" };
const combiTypeNigiri = { HE: "ניגירי", EN: "Nigiri" };

state.combinations.types[0].dishes = [
  [specialVegitarian, { HE: "2&nbspיח'", EN: "2&nbsppieces" }],
  [gunkanYasay, { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeGunkan }],
  [tamago, { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeNigiri }],
  [midoriRoll, { HE: "4&nbspיח'", EN: "4&nbsppieces" }],
  [kanpyoTamagoMaki, { HE: "8&nbspיח'", EN: "8&nbsppieces" }],
];

state.combinations.types[1].dishes = [
  [specialSake, { HE: "2&nbspיח'", EN: "2&nbsppieces" }],
  [
    gunkanShiroZakanaMix,
    { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeGunkan },
  ],
  [kurodai, { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeNigiri }],
  [shiroZakanaRoll, { HE: "4&nbspיח'", EN: "4&nbsppieces" }],
  [spicyTekkaMaki, { HE: "8&nbspיח'", EN: "8&nbsppieces" }],
];

state.combinations.types[2].dishes = [
  [specialKuruma, { HE: "2&nbspיח'", EN: "2&nbsppieces" }],
  [
    gunkanSakeMix,
    { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeGunkan },
  ],
  [unagi, { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeNigiri }],
  [hotateTobikoRoll, { HE: "4&nbspיח'", EN: "4&nbsppieces" }],
  [hokkaiMaki, { HE: "8&nbspיח'", EN: "8&nbsppieces" }],
];

// COCTAILS
new Cocktail(
  "סאקה פירות",
  "קוקטייל על בסיס סאקה ומבחר פירות העונה",
  "Fruit sake",
  "Sake based cocktail with seasonal fruits",
  38
);

new Cocktail(
  "Maid in Cuba",
  "רום לבן, מלפפונים, מיץ לימון טרי ונענע",
  "Maid in Cuba",
  "White Rum, cucumber, lemon juice & mint",
  46
);

new Cocktail(
  "גרידי",
  "קטל ואן ציטרון, פסיפלורה, ג'ינג'ר אייל וכוסברה",
  "Gridi",
  "Ketel One Citroen, passion fruit, ginger ale & coriander",
  48
);

new Cocktail(
  "פיצג'רלד",
  "ג'ין, מיץ לימון טרי, אנגוסטורה וסירופ קנה סוכר",
  "Fitzgerald",
  "Gin, lemon juice, Angostura bitters, sugar cane syrup",
  48
);

new Cocktail(
  "מרטיני וואסאבי",
  "סטולי, סירופ וואסאבי ומיץ לימון טרי",
  "Wasabi Martini",
  "Stoli, homemade wasabi syrup & lemon juice",
  48
);

new Cocktail(
  "מרגריטה הדרים",
  " קטל ואן ציטרון, טקילה רפוסדו, סירופ אשכולית וליים",
  "Citrus Margarita",
  "Ketel One Citroen, Tequila Reposado, grapefruit syrup & lime juice",
  48
);

// new Cocktail(
//   "ביטלג'וס",
//   "ג'ין, טקילה רפוסדו, קיווי ופסיפלורה",
//   "Beetlejuice",
//   "Gin, Tequila Reposado, kiwi & passion fruit",
//   52
// );

new Cocktail(
  "מינט ג'ולפ",
  "ברבן, מיץ לימון טרי, סודה, נענע ואנגוסטורה",
  "Mint julep",
  "Bourbon, mint, Angostura bitters, lemon juice & soda",
  52
);

// BEER

new Beer(
  "קירין היצ'יבאן (חבית)",
  "לאגר בהיר 4.9% (יפן)",
  "Kirin Ichiban (Draft Beer)",
  "Lager 4.9% (Japan)",
  28
);
// new Beer(
//   "וויט אייל היטאצ'ינו",
//   "אייל חיטה 5.5% (יפן)	",
//   "Hitachino White Ale",
//   "Wheat ale 5.5% (Japan)",
//   34
// );
// new Beer(
//   "רד רייס היטאצ'ינו",
//   "אייל אורז אדום 7% (יפן)",
//   "Hitachino Red Rice",
//   "Red rice ale 7% (Japan)",
//   34
// );
new Beer(
  "מלכה בלונד",
  "אייל בהיר  6.5% (ישראל)",
  "Malka",
  "Blonde Ale 6.5% (Israel)",
  36
);

new Beer(
  "נגב IPA",
  " אינדיה פייל אייל  5.8% (ישראל)",
  "Negev IPA",
  "India Pale Ale 5.8% (Israel)",
  36
);

new Beer(
  "לה שוף",
  "אייל בהיר מסורתי  8% (בלגיה)",
  "La Chouffe",
  "Traditional Belgian ale 8% (Belgium)",
  36
);

// SAKE

new Sake("קנקן סאקה חם", '(120 מ"ל)', "Hot sake", "(120 ml)", 34);
// new Sake(
//   "אומשו קיוצ'י",
//   'שיכר שזיפים (75/500 מ"ל)',
//   "Umeshu Kiuchi",
//   "(75/500 ml)",
//   [34, 190]
// );
new Sake(
  "אומשו צ'ויה",
  'שיכר שזיפים (90/750 מ"ל)',
  "Umeshu Choya",
  "(90/750 ml)",
  [34, 200]
);
new Sake(
  "שוקון ג'ונמאי גינג'ו",
  'חצי יבש, קליל ומאוזן (180 מ"ל)',
  "Shukon Junmai Ginjo",
  "(180 ml)",
  48
);
new Sake(
  "שלג מושלם",
  'סאקה ניגורי לא מסונן, מתקתק, בעל גוף מלא ודומיננטי בטעמים (300 מ"ל)',
  "Perfect Snow",
  "Unfiltered Nigori sake (300 ml)",
  80
);
new Sake(
  "קיקוסוי ג'ונמאי גינג'ו",
  'בעל יובש מעודן ונעים (300 מ"ל)',
  "Kikusui Junmai ginjo",
  "(300 ml)",
  95
);
new Sake(
  "שוהו ג'ונמאי דאייגינג'ו",
  'סאקה יבש, עשיר, עגול ופירותי (300 מ"ל)',
  "Shuho Junmai daiginjo",
  "(300 ml)",
  110
);
new Sake(
  "היאשיבורי ג'ונמאי דאייגינג'ו",
  'פירותי ומרענן אך יבש ואלגנטי	(720 מ"ל)',
  "Hiyashibori Junmai daiginjo",
  "(720 ml)",
  160
);

// SOFT DRINKS

new SoftDrink("קוקה קולה", "", "Coca Cola", "", 14);
new SoftDrink("דיאט קוקה קולה", "", "Diet Coca Cola", "", 14);
new SoftDrink("קולה קולה זירו", "", "Coca Cola Zero", "", 14);
new SoftDrink("ספרייט ", "", "Sprite", "", 14);
new SoftDrink("ספרייט זירו", "", "Sprite Zero", "", 14);
new SoftDrink("קינלי סודה", "", "Kinley Soda Water", "", 12);
new SoftDrink("נביעות מים מינרלים", "", "Neviot mineral water", "", 12);
new SoftDrink("ג'ינג'ר אייל ", "", "Ginger ale", "", 14);
new SoftDrink("מי טוניק", "", "Tonic water", "", 14);
new SoftDrink("ג'ינג'ר ביר", "", "Ginger beer", "", 14);
new SoftDrink("לימונדה", "", "Lemonade", "", 12);
new SoftDrink("מיץ חמוציות", "", "Cranberry juice", "", 14);
new SoftDrink("מיץ עגבניות", "", "Tomato juice", "", 14);
new SoftDrink("סיידר צלול", "", "Apple juice", "", 15);
new SoftDrink("סיידר מוגז", "", "Sparkling apple juice", "", 15);
new SoftDrink("סאן פלגרינו", "", "San Pellegrino", "", [14, 28]);
new SoftDrink("אקווה פנה", "", "Acqua Panna", "", 28);

// WINE

// Glass
// new GlassWineWhite(
//   "סוביניון בלאן",
//   "וילה מריה, ניו-זילנד",
//   "Sauvignon Blanc",
//   "Villa Maria, New Zealand",
//   38,
//   2020
// );
new GlassWineWhite(
  "סוביניון בלאן",
  "סקורפיוס, אסטרולאב, ניו-זילנד",
  "Sauvignon Blanc",
  "Scorpius, Astrolabe, New Zealand",
  38,
  2020
);
new GlassWineWhite(
  "גוורצטרמינר",
  "פפאפנהיים, צרפת",
  "Gewurztraminer",
  "Pfaffenheim, France",
  44,
  2017
);
new GlassWineWhite(
  "שנסון",
  "קלו דה גת , ישראל",
  "Chanson",
  "Clos De Gat, Israel",
  48,
  2020
);

new GlassWineRose(
  "פרוסקו",
  "מאסקיו דיי קאבליירי, איטליה",
  "Prosecco",
  "Maschio Dei Cavalieri, Italy",
  36
);
new GlassWineRose(
  "רוזה",
  "וינייה דה ניקול,פול מאס,  צרפת",
  "Rose",
  "Vignes De Nicole, Paul Mas, France",
  40,
  2019
);

new GlassWineRed(
  "מסע ישראלי",
  "ויתקין, ישראל",
  "Israeli Journey",
  "Vitkin, Israel",
  38,
  2019
);
new GlassWineRed(
  "מאלבק",
  "אסטייט, פול מאס, צרפת",
  "Malbec",
  "Estate, Paul Mas, France",
  42,
  2019
);
new GlassWineRed(
  "סירה",
  "הראל, קלו דה גת,  ישראל",
  "Syrah",
  "Har'el, Clos De Gat, Israel",
  52,
  2016
);

// Bottles
new WineWhite(
  "שאבלי",
  'דומיין דה מאלאנד, צרפת (375 מ"ל)',
  "Chablis",
  "Domaine Des Malandes, France (375 ml)",
  115,
  2019
);
// new WineWhite(
//   "סוביניון בלאן",
//   "וילה מריה, ניו-זילנד",
//   "Sauvignon Blanc",
//   "Villa Maria, New Zealand",
//   150,
//   2020
// );
new WineWhite(
  "סוביניון בלאן",
  "סקורפיוס, אסטרולאב, ניו-זילנד",
  "Sauvignon Blanc",
  "Scorpius, Astrolabe, New Zealand",
  150,
  2020
);
new WineWhite(
  "ריזלינג",
  'וילה בורקלין, ד"ר בורקלין וולף, גרמניה',
  "Riesling",
  "Villa Buerklin, Dr Buerklin Wolf, Germany",
  160,
  2018
);
new WineWhite(
  "שרדונה",
  "ברבדו , ישראל",
  "Chardonnay",
  "Bravdo, Israel",
  170,
  2019
);
new WineWhite(
  "גוורצטרמינר",
  "פפאפנהיים, צרפת",
  "Gewurztraminer",
  "Pfaffenheim, France",
  170,
  2017
);
new WineWhite(
  "פינו בלאן",
  'אסטייט, ד"ר בורקלין וולף, גרמניה',
  "Pinot Blanc",
  "Dr Buerklin Wolf, Germany",
  170,
  2018
);
new WineWhite(
  "שנסון",
  "קלו דה גת , ישראל",
  "Chanson",
  "Clos De Gat, Israel",
  190,
  2020
);
new WineWhite(
  "סאנסר",
  "טראדיסיון, רולאן טיסייה, צרפת",
  "Sancerre",
  "Tradition, Roland Tissier, France",
  220,
  2018
);
new WineWhite(
  "שאבלי",
  "סאן פייר, רנייאר, צרפת",
  "Chablis",
  "Saint Pierre, Regnard, France",
  240,
  2018
);

new WineRose(
  "פרוסקו",
  "מאסקיו דיי קאבליירי, איטליה",
  "Prosecco",
  "Maschio Dei Cavalieri, Italy",
  150,
  ""
);
new WineRose(
  "רוזה",
  "וינייה דה ניקול,פול מאס,  צרפת",
  "Rose",
  "Vignes De Nicole, Paul Mas, France",
  155,
  2019
);

new WineRose(
  "בולינג'ר",
  "ספיישל קווה, שמפיין, צרפת",
  "Bollinger",
  "Special Cuvee, Champagne, France",
  590
);

new WineRed(
  "בלרוש",
  'קוט דו רון, שאפוטייה, צרפת (375 מ"ל)',
  "Belleruche",
  "Cotes Du Rhone, Chapoutier,  France (375 ml)",
  80,
  2018
);
new WineRed(
  "קברנה סובניון",
  'אסטייט, דלתון, ישראל (375 מ"ל)',
  "Cabernet Sauvignon",
  "Estate, Dalton, Israel (375 ml)",
  90,
  2018
);
new WineRed(
  "מסע ישראלי",
  "ויתקין, ישראל",
  "Israeli Journey",
  "Vitkin, Israel",
  150,
  2019
);
new WineRed(
  "מאלבק",
  "אסטייט, פול מאס, צרפת",
  "Malbec",
  "Estate, Paul Mas, France",
  165,
  2019
);
new WineRed(
  "פינו נואר",
  "ויתקין, ישראל",
  "Pinot Noir",
  "Vitkin, Israel",
  170,
  2019
);
new WineRed(
  "סירה",
  "הראל, קלו דה גת,  ישראל",
  "Syrah",
  "Har'el, Clos De Gat, Israel",
  200,
  2016
);
new WineRed(
  "קברנה פרנק",
  "ויתקין, ישראל",
  "Cabernet Franc",
  "Vitkin, Israel",
  205,
  2017
);
new WineRed(
  "קברנה סוביניון",
  "ברבדו, ישראל",
  "Cabernet Sauvignon",
  "Bravdo, Israel",
  210,
  2018
);
new WineRed(
  "מרלו",
  "הראל, קלו דה גת, ישראל",
  "Merlot",
  "Har'el, Clos De Gat, Israel",
  220,
  2018
);
new WineRed(
  "אמרונה",
  'טומאסי, איטליה (375 מ"ל)',
  "Amarone",
  "Tommasi, Italy (375 ml)",
  260,
  2015
);

//Made by konyshevs
