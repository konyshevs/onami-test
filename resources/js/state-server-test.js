// STATE
import { runAfterDate, runBeforeDate, AJAX } from "./helpers.js";
import { END_DATE, START_DATE, SERVER_URL } from "./config.js";

import makiImg from "../img/maki.jpg";
import temakiImg from "../img/temaki.jpg";
import irodoriImg from "../img/irodori.jpg";
import nigiriImg from "../img/nigiri.jpg";
import inariImg from "../img/inari.jpg";
import inariSpeciaImg from "../img/inarispecial.jpg";

export const menuList = {};
export let favorits = [];
export let config = {};

const init = async function () {
  const storage = localStorage.getItem("favorits");
  if (storage) favorits = JSON.parse(storage);
};
init();

const clearDishes = () => {
  for (let key in map) {
    category = map[key];

    category.dishes = [];
    if (category.types) {
      category.types.forEach(type => (type.dishes = []));
    }
  }
  console.log("Dishes cleared");
};

export const sortDishes = category => {
  const compare = (a, b) => {
    let priceA, priceB;
    priceA = Number(Array.isArray(a.price) ? a.price[0] : a.price);
    priceB = Number(Array.isArray(b.price) ? b.price[0] : b.price);
    return priceA - priceB;
  };

  const sortCategories = category => {
    map[category].dishes.sort(compare);

    if (map[category].types) {
      map[category].types.forEach(type => type.dishes.sort(compare));
    }
  };

  if (category) {
    sortCategories(category);
    console.log(`Category ${category} sorted`);
  } else {
    for (let category in map) {
      sortCategories(category);
    }
    console.log("All dishes sorted");
  }
};

export const pushDishesToState = () => {
  clearDishes();
  createCombitanions();
  createLunch();

  for (let key in menuList) {
    const dish = menuList[key];
    if (dish.deleted) continue;
    if (favorits.includes(dish.id)) {
      dish.isFavorite = true;
      favoritesCount++;
    }
    if (!dish.category) continue;
    map[dish.category].dishes.push(dish);
    if (dish.type || dish.type === 0) {
      map[dish.category].types[dish.type].dishes.push(dish);
    }
  }
  sortDishes();
  console.log("Sorted dishes pushed to the emty state");
};

export let favoritesCount = 0;

export function changeFavoritesCount(operator) {
  if (operator === "+") favoritesCount++;
  if (operator === "-") favoritesCount--;
}

const lunchDescriptionHE =
  "ארוחה עסקית מוגשת בימי חול בלבד א'- ה',<br> בין בשעות 12:00-18:00, ביום ו' בין השעות 12:00-16:00<br> ארוחה עסקית כוללת: מנה ראשונה ומנה עיקרית<br> בנוסף, קוקטייל צהריים על בסיס סאקה ופירות&nbspטריים&nbsp-&nbsp&nbsp₪&nbsp32 <br> כוס יין צהריים לבן / אדום / רוזה - 32 ₪";

const lunchDescriptionEN =
  "Lunch Menu is served from Sunday to Thursday, 12:00-18:00<br>and on Friday, 12:00-16:00 (exclude holidays)<br>Lunch menu includes: first course & main course<br>In addition, noon cocktail based on sake & fruits - 32 ₪<br>wine of the month red / white / rose 32 ₪";

export const state = {
  specials: {
    titleHE: "ספיישלים",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Specials",
    descriptionEN: "",
    postScriptumEN: "",
    types: [
      // { titleHE: "ספיישל ראשונות", titleEN: "Special Appetisers", dishes: [] },
      // { titleHE: "ספיישל עיקריות", titleEN: "Special Main Dishes", dishes: [] },
      { titleHE: "", titleEN: "", dishes: [] },
      { titleHE: "קינוחים", titleEN: "Desserts", dishes: [] },
      { titleHE: "קוקטיילים", titleEN: "Coctails", dishes: [] },
    ],
    dishes: [],
  },
  appetisers: [
    {
      titleHE: "ראשונות קרות",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Cold Appetisers",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "ראשונות חמות",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Hot Appetisers",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
  ],
  skewers: {
    titleHE: "שיפודי עץ על הגריל",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Skewers",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },
  mainDishes: {
    titleHE: "מנות עיקריות",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Main Dishes",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },

  desserts: [
    {
      titleHE: "קינוחים",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Desserts",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "קפה",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Coffee",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "תה חליטה",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Infusion Tea",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "תיונים",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Tea Bags",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "פורט & שרי",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Port & Sherry",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
  ],
  seshimi: [
    {
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
      imageUrl: nigiriImg,
      dishes: [],
      types: [
        { titleHE: "דגי ים", titleEN: "SEA FISH", dishes: [] },
        { titleHE: "מים מתוקים", titleEN: "SWEET WATER FISH", dishes: [] },
        { titleHE: "פירות ים", titleEN: "SEA FOOD", dishes: [] },
        { titleHE: "שונות", titleEN: "OTHERS", dishes: [] },
        { titleHE: "רק בעונה", titleEN: "ONLY IN SEASON", dishes: [] },
      ],
    },
    {
      titleHE: "סשימי ספיישל",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Seshimi Special",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
  ],
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
      imageUrl: inariImg,
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
      imageUrl: inariSpeciaImg,
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
      imageUrl: makiImg,
      dishes: [],
    },
    {
      titleHE: "תוספות אפשריות למאקי",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Optional Ingredients",
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
    descriptionEN: "Hand Roll",
    postScriptumEN: "",
    imageUrl: temakiImg,
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
      imageUrl: irodoriImg,
      dishes: [],
    },
    {
      titleHE: "תוספות אפשריות (בחוץ)",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Optional Ingredients (outside)",
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
        imageUrl: "",
      },
      {
        titleHE: "סקאנה",
        titleEN: "SAKANA",
        price: 210,
        dishes: [],
        imageUrl: "",
      },
      {
        titleHE: "קאיסן",
        titleEN: "KAISEN",
        price: 230,
        dishes: [],
        imageUrl: "",
      },
    ],
  },
  lunch: {
    dishes: [],
    titleHE: "רק בעסקיות",
    titleEN: "Lunch only",
    descriptionHE: "",
    postScriptumHE: "",
    descriptionEN: "",
    postScriptumEN: "",
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
    {
      titleHE: "יינות מתיישנים",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "FROM THE CELLAR",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
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
    titleEN: "Soft Drinks",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },
  spirits: {
    titleHE: "אלכוהול",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Spirits",
    descriptionEN: "",
    postScriptumEN: "",
    types: [
      {
        titleHE: "אפריטיף",
        titleEN: "Aperitif",
        dishes: [],
      },
      {
        titleHE: "וודקה",
        titleEN: "Vodka",
        dishes: [],
      },
      {
        titleHE: "רום",
        titleEN: "Rum",
        dishes: [],
      },
      {
        titleHE: "ג'ין",
        titleEN: "Gin",
        dishes: [],
      },
      {
        titleHE: "טקילה",
        titleEN: "Tequila",
        dishes: [],
      },
      {
        titleHE: "אניס",
        titleEN: "Anise",
        dishes: [],
      },
      {
        titleHE: "קוניאק",
        titleEN: "Cognac",
        dishes: [],
      },
      {
        titleHE: "ליקרים",
        titleEN: "Liqueur",
        dishes: [],
      },
      {
        titleHE: "דיז'סטיף",
        titleEN: "Dejestiv",
        dishes: [],
      },
      {
        titleHE: "ויסקי בלנדד",
        titleEN: "Blended Whisky",
        dishes: [],
      },
      {
        titleHE: "ויסקי אמריקאי",
        titleEN: "American Whiskey",
        dishes: [],
      },
      {
        titleHE: "ויסקי סינגל מאלט",
        titleEN: "Whisky Malt Single",
        dishes: [],
      },
    ],
    dishes: [],
  },
  favorites: [],
};

// Adding skewers to appetisers
state.appetisers.push(state.skewers);

// Adding menus to favorites
state.favorites.push(
  state.specials,
  state.appetisers[0],
  state.appetisers[1],
  state.skewers,
  state.mainDishes,
  state.desserts[0],
  state.seshimi[0],
  state.seshimi[1],
  state.inari[0],
  state.inari[1],
  state.hosomaki[0],
  state.temaki,
  state.irodori[0],
  state.wine[0],
  state.wine[1],
  state.wine[2],
  state.sake[0],
  state.sake[1],
  state.coctails,
  state.spirits
);

const map = {
  coldAppetiser: state.appetisers[0],
  hotAppetiser: state.appetisers[1],
  skewer: state.skewers,
  mainDishe: state.mainDishes,
  dessert: state.desserts[0],
  coffee: state.desserts[1],
  teaInfusion: state.desserts[2],
  tea: state.desserts[3],
  port: state.desserts[4],
  seshimiNigiri: state.seshimi[0],
  seshimiSpecial: state.seshimi[1],
  inariGunkan: state.inari[0],
  inariSpecial: state.inari[1],
  hosomaki: state.hosomaki[0],
  hosomakiIngredient: state.hosomaki[1],
  temaki: state.temaki,
  irodori: state.irodori[0],
  irodoriIngredient: state.irodori[1],
  cocktail: state.coctails,
  beer: state.sake[0],
  sake: state.sake[1],
  softDrink: state.softDrinks,
  spirit: state.spirits,
  wineGlass: state.wine[0],
  wineBottle: state.wine[1],
  wineCellar: state.wine[2],
  special: state.specials,
  lunch: state.lunch,
};

// const dishCategories = {
//   coldAppetiser: [],
//   hotAppetiser: [],
//   skewer: [],
//   mainDishe: [],
//   dessert: [],
//   coffee: [],
//   teaInfusion: [],
//   tea: [],
//   port: [],
//   seshimiNigiri: [],
//   seshimiSpecial: [],
//   inariGunkan: [],
//   inariSpecial: [],
//   hosomaki: [],
//   hosomakiIngredient: [],
//   temaki: [],
//   irodori: [],
//   irodoriIngredient: [],
//   cocktail: [],
//   beer: [],
//   sake: [],
//   softDrink: [],
//   spirit: [],
//   wineGlass: [],
//   wineBottle: [],
//   wineCellar: [],
//   special: [],
// };

export class Dish {
  constructor({
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage,
    isActive,
    category,
  }) {
    this.titleHE = titleHE || "";
    this.descriptionHE = descriptionHE || "";
    this.titleEN = titleEN || "";
    this.descriptionEN = descriptionEN || "";
    this.price = price || 0;
    this.isVegi = isVegi;
    this.isActive = isActive;
    this.category = category || "global";
    this.updated = true;
    this.createDate = new Date();
    if (vintage) this.vintage = vintage;
    if (type) this.type = type;
    this.addID();
    menuList[this.id] = this;
  }

  addID() {
    this.id = this.titleEN.toLowerCase().replaceAll(" ", "_") + this.category;
  }
}

// LUNCH
const createLunch = () => {
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
    menuList.omiso_shiru,
    menuList.harusame_salad,
    menuList.root_vegetables_salad,
    menuList.ebi_furai,
    menuList.agedashi_doufu,
    menuList.sakemori_roll,
    menuList.ebi_sake_kawa_temaki,
  ];
  state.lunch75.types[1].dishes = [
    menuList.yasai_curry_rice,
    menuList.yasai_kare_udon,
    menuList.ingen_doufu,
    menuList.yasai_udon,
  ];
  state.lunch75.types[2].dishes = [
    menuList.midori_roll,
    menuList.yasai_cocktail_roll,
    menuList.vegetarian_mix_maki,
    menuList.shiitake_maki,
    menuList.aspara_maki,
    menuList.kanpyo_tamago_maki,
  ];

  state.lunch90.types[0].dishes = state.lunch75.types[0].dishes;
  state.lunch90.types[1].dishes = [
    menuList.tori_curry_rice,
    menuList.tori_kare_udon,
    menuList.wakadori_grill,
    menuList.yakiniku_lousujyu,
    menuList.tori_ramen,
  ];
  state.lunch90.types[2].dishes = [
    menuList.negi_shiro_zakana_maki,
    menuList.california_maki,
    menuList.bora_maki,
    menuList.sakemori_roll,
    menuList.ebikyu_roll,
    menuList.kaisen_cocktail_maki,
  ];

  state.lunch105.types[0].dishes = [
    ...state.lunch75.types[0].dishes,
    menuList.ebi_tempura,
    menuList.wafu_yukke,
  ];
  state.lunch105.types[1].dishes = [
    menuList.kaisen_curry_rice,
    menuList.kaisen_shouga_itame,
    menuList.kaisen_udon,
    menuList.sake_steak,
    menuList.kurodai_sugatayaki,
  ];
  state.lunch105.types[2].dishes = [
    lunchSushiTypeNigiri,
    menuList.sake,
    menuList.beni_toro,
    menuList.kurodai,
    menuList.suzuki,
    menuList.bora,
    menuList.shiroguchi,
    menuList.tamago,
    menuList.ebi,

    lunchSushiTypeSeshimi,
    menuList.sake,
    menuList.beni_toro,
    menuList.kurodai,
    menuList.suzuki,
    menuList.bora,
    menuList.shiroguchi,
    menuList.tamago,
    menuList.ebi,

    lunchSushiTypeIrodori,
    menuList.california_roll,
    menuList.negi_shiro_zakana_roll,
    menuList.ebikyu_roll,
    menuList.sakemori_roll,

    lunchSushiTypeHosomaki,
    menuList.spicy_tekka_maki,
    menuList.california_maki,
    menuList.hokkai_maki,
    menuList.ebi_sakekawa_maki,

    lunchSushiTypeTemaki,
    menuList.california_temaki,
    menuList.negi_shiro_zakana_temaki,
    menuList.ebi_sakekawa_temaki,
    menuList.kaisen_cocktail_temaki,

    lunchSushiTypeGunkan,
    menuList.kaisen_cocktail,
    menuList.sake_mix,
    menuList.shiro_zakana_mix,
  ];
};

// COMBINATIONS
const createCombitanions = () => {
  const combiTypeGunkan = { HE: "גונקן", EN: "Gunkan" };
  const combiTypeNigiri = { HE: "ניגירי", EN: "Nigiri" };

  state.combinations.types[0].dishes = [
    [
      menuList.inari_special_vegetarian,
      { HE: "2&nbspיח'", EN: "2&nbsppieces" },
    ],
    [
      menuList.yasai_cocktail,
      { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeGunkan },
    ],
    [
      menuList.tamago,
      { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeNigiri },
    ],
    [menuList.midori_roll, { HE: "4&nbspיח'", EN: "4&nbsppieces" }],
    [menuList.kanpyo_tamago_maki, { HE: "8&nbspיח'", EN: "8&nbsppieces" }],
  ];

  state.combinations.types[1].dishes = [
    [menuList.inari_special_sake, { HE: "2&nbspיח'", EN: "2&nbsppieces" }],
    [
      menuList.shiro_zakana_mix,
      { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeGunkan },
    ],
    [
      menuList.kurodai,
      { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeNigiri },
    ],
    [menuList.shiro_zakana_roll, { HE: "4&nbspיח'", EN: "4&nbsppieces" }],
    [menuList.spicy_tekka_maki, { HE: "8&nbspיח'", EN: "8&nbsppieces" }],
  ];

  state.combinations.types[2].dishes = [
    [menuList.inari_special_kuruma, { HE: "2&nbspיח'", EN: "2&nbsppieces" }],
    [
      menuList.sake_mix,
      { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeGunkan },
    ],
    [
      menuList.unagi,
      { HE: "2&nbspיח'", EN: "2&nbsppieces", type: combiTypeNigiri },
    ],
    [menuList.hotate_tobiko_roll, { HE: "4&nbspיח'", EN: "4&nbsppieces" }],
    [menuList.hokkai_maki, { HE: "8&nbspיח'", EN: "8&nbsppieces" }],
  ];
};

export const getMenu = async () => {
  try {
    const data = JSON.parse(await AJAX(SERVER_URL));
    config = data.config;
    delete config._id;
    data.menu.forEach(dish => {
      menuList[dish.id] = dish;
      delete menuList[dish.id]._id;
    });
    pushDishesToState();
    return menuList;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
