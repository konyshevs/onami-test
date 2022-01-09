// STATE
import { runAfterDate, runBeforeDate } from "./helpers.js";
import { END_DATE, START_DATE } from "./config.js";
import makiImg from "../img/maki.jpg";
import temakiImg from "../img/temaki.jpg";
import irodoriImg from "../img/irodori.jpg";
import nigiriImg from "../img/nigiri.jpg";
import inariImg from "../img/inari.jpg";
import inariSpeciaImg from "../img/inarispecial.jpg";

export const menuList = {};

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
  "ארוחה עסקית מוגשת בימי חול בלבד א'- ה',<br> בין בשעות 12:00-18:00, ביום ו' בין השעות 12:00-16:00<br> ארוחה עסקית כוללת: מנה ראשונה ומנה עיקרית<br> בנוסף, קוקטייל צהריים על בסיס סאקה ופירות&nbspטריים&nbsp-&nbsp&nbsp₪&nbsp32 <br> כוס יין צהריים לבן / אדום / רוזה - 32 ₪";

const lunchDescriptionEN =
  "Lunch Menu is served from Sunday to Thursday, 12:00-18:00<br>and on Friday, 12:00-16:00 (exclude holidays)<br>Lunch menu includes: first course & main course<br>In addition, noon cocktail based on sake & fruits - 32 ₪<br>wine of the month red / white / rose 32 ₪";

export const state = {
  specials: {
    titleHE: "ספיישלים 2022",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Specials 2022",
    descriptionEN: "",
    postScriptumEN: "",
    types: [
      { titleHE: "ספיישל ראשונות", titleEN: "Special Appetisers", dishes: [] },
      { titleHE: "ספיישל עיקריות", titleEN: "Special Main Dishes", dishes: [] },
      { titleHE: "", titleEN: "", dishes: [] },
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
    types: {
      aperitif: {
        titleHE: "אפריטיף",
        titleEN: "Aperitif",
        dishes: [],
      },
      vodka: {
        titleHE: "וודקה",
        titleEN: "Vodka",
        dishes: [],
      },
      rum: {
        titleHE: "רום",
        titleEN: "Rum",
        dishes: [],
      },
      gin: {
        titleHE: "ג'ין",
        titleEN: "Gin",
        dishes: [],
      },
      tequila: {
        titleHE: "טקילה",
        titleEN: "Tequila",
        dishes: [],
      },
      anise: {
        titleHE: "אניס",
        titleEN: "Anise",
        dishes: [],
      },
      cognac: {
        titleHE: "קוניאק",
        titleEN: "Cognac",
        dishes: [],
      },
      liqueur: {
        titleHE: "ליקרים",
        titleEN: "Liqueur",
        dishes: [],
      },
      digestif: {
        titleHE: "דיז'סטיף",
        titleEN: "Aperitif",
        dishes: [],
      },
      scotch: {
        titleHE: "ויסקי סקוטי",
        titleEN: "Whisky Scotch",
        dishes: [],
      },
      american: {
        titleHE: "ויסקי אמריקאי",
        titleEN: "American Whiskey",
        dishes: [],
      },
      irish: {
        titleHE: "ויסקי אירי",
        titleEN: "Irish Whiskey",
        dishes: [],
      },
      single: {
        titleHE: "ויסקי סינגל מאלט",
        titleEN: "Whisky Malt Single",
        dishes: [],
      },
    },
    dishes: [],
  },
  // whisky: {
  //   titleHE: "",
  //   descriptionHE: "",
  //   postScriptumHE: "",
  //   titleEN: "Whisky",
  //   descriptionEN: "",
  //   postScriptumEN: "",
  //   types: {},
  //   dishes: [],
  // },
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

class Menu {
  constructor(
    titleHE = "",
    descriptionHE = "",
    titleEN = "",
    descriptionEN = "",
    price,
    isVegi
  ) {
    this.titleHE = titleHE;
    this.descriptionHE = descriptionHE;
    this.titleEN = titleEN;
    this.descriptionEN = descriptionEN;
    this.price = price;
    this.isVegi = isVegi;
    this.isActive = true;
    this.addID();
    this._isFavorite();
    menuList[this.id] = this;
  }

  addID() {
    if (this.titleEN) this.id = this.titleEN.toLowerCase().replaceAll(" ", "_");
    else this.id = this.descriptionEN.toLowerCase().replaceAll(" ", "_");
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
    this.category = "coldAappetiser";
  }
}

class HotAppetiser extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.appetisers[1].dishes.push(this);
    this.category = "hotAppetiser";
  }
}

class Skewer extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.skewers.dishes.push(this);
    this.category = "skewer";
  }
}

class MainDish extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.mainDishes.dishes.push(this);
    this.category = "mainDishe";
  }
}

class Dessert extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[0].dishes.push(this);
    this.category = "dessert";
  }
}

class Coffee extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[1].dishes.push(this);
    this.category = "coffee";
  }
}

class TeaInfusion extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[2].dishes.push(this);
    this.category = "teaInfusion";
  }
}

class Tea extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[3].dishes.push(this);
    this.category = "tea";
  }
}

class Port extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[4].dishes.push(this);
    this.category = "port";
  }
}

class SeshimiNigiri extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.seshimi[0].types[type].dishes.push(this);
    state.seshimi[0].dishes.push(this);
    this.category = "seshimiNigiri";
    this.type = type;
  }
}

class SeshimiSpecial extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.seshimi[1].dishes.push(this);
    this.category = "seshimiSpecial";
  }
}

class InariGunkan extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.inari[0].dishes.push(this);
    this.category = "inariGunkan";
  }
}

class InariSpecial extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.inari[1].dishes.push(this);
    this.category = "inariSpecial";
  }
}

class Hosomaki extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.hosomaki[0].dishes.push(this);
    this.category = "hosomaki";
  }
}

class HosomakiIngredient extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.hosomaki[1].dishes.push(this);
    this.category = "hosomakiIngredient";
  }

  addID() {
    this.id =
      this.descriptionEN.toLowerCase().replaceAll(" ", "_") + "_ingredient";
  }
}

class Temaki extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.temaki.dishes.push(this);
    this.category = "temaki";
  }
}

class Irodori extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.irodori[0].dishes.push(this);
    this.category = "irodori";
  }
}

class IrodoriIngredient extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.irodori[1].dishes.push(this);
    this.category = "irodoriIngredient";
  }
  addID() {
    this.id =
      this.descriptionEN.toLowerCase().replaceAll(" ", "_") + "_ingredient_out";
  }
}

class Cocktail extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    state.coctails.dishes.push(this);
    this.category = "cocktail";
  }
}

class Beer extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    state.sake[0].dishes.push(this);
    this.category = "beer";
  }
}

class Sake extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    state.sake[1].dishes.push(this);
    this.category = "sake";
  }
}

class SoftDrink extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price);
    state.softDrinks.dishes.push(this);
    this.category = "softDrink";
  }
}

class Spirit extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    this.category = "spirit";
    this.type = type;
    state.spirits.dishes.push(this);
    state.spirits.types[type].dishes.push(this);
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

class WineGlass extends Wine {
  constructor(
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    type,
    vintage
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    this.type = type;
    state.wine[0].dishes.push(this);
    state.wine[0].types[type].dishes.push(this);
    this.category = "wineGlass";
  }
  addID() {
    this.id = `${this.titleEN
      .toLowerCase()
      .replaceAll(" ", "_")}_${this.descriptionEN
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll(",", "")}_glass`;
  }
}

// class GlassWineWhite extends WineGlass {
//   constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
//     super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
//     state.wine[0].types[0].dishes.push(this);
//   }
// }

// class GlassWineRose extends WineGlass {
//   constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
//     super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
//     state.wine[0].types[1].dishes.push(this);
//   }
// }

// class GlassWineRed extends WineGlass {
//   constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
//     super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
//     state.wine[0].types[2].dishes.push(this);
//   }
// }

class WineBottle extends Wine {
  constructor(
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    type,
    vintage
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[1].dishes.push(this);
    state.wine[1].types[type].dishes.push(this);
    this.type = type;
    this.category = "wineBottle";
  }
  addID() {
    this.id = `${this.titleEN
      .toLowerCase()
      .replaceAll(" ", "_")}_${this.descriptionEN
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll(",", "")}_bottle`;
  }
}

// class WineRed extends WineBottle {
//   constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
//     super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
//     state.wine[1].types[2].dishes.push(this);
//   }
// }

// class WineWhite extends WineBottle {
//   constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
//     super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
//     state.wine[1].types[0].dishes.push(this);
//   }
// }

// class WineRose extends WineBottle {
//   constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
//     super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
//     state.wine[1].types[1].dishes.push(this);
//   }
// }

class WineCellar extends Wine {
  constructor(
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    vintage
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[2].dishes.push(this);
  }
  addID() {
    this.id = `${this.titleEN
      .toLowerCase()
      .replaceAll(" ", "_")}_${this.descriptionEN
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll(",", "")}_cellar`;
  }
}

class Special extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    this.category = "special";
    this.type = type;
    state.specials.dishes.push(this);
    state.specials.types[type].dishes.push(this);
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

new ColdAppetiser(
  "סלט הרוסאמה",
  "אטריות תפוחי אדמה, בצל ירוק וסלמון ברוטב וואפו (ניתן לבקש טבעוני, ניתן לבקש ללא גלוטן)",
  "Harusame Salad",
  "Cold potato noodles, scallion & salmon served with Wafu sauce",
  36
);

new ColdAppetiser(
  "סלט שורשים",
  "סלק, גזר, קולורבי, פפאיה ירוקה, וואסבי קראנץ', שקדים קלויים, עלי מיקרו ברוטב וואפו (טבעוני, ניתן לבקש ללא גלוטן)",
  "Root vegetables salad",
  "Beetroot, carrot, kohlrabi, green papaya, wasabi crunch, roasted almonds, micro green leaves with Wafu sauce",
  42,
  true
);

new ColdAppetiser(
  "סלט מידורי",
  "סלט עלי חסה, רוקט, צנונית, מלפפון, תפוח, בצל ושקדים קלויים ברוטב למון ג'ויו (טבעוני, ללא גלוטן)",
  "Midori Salad",
  "Lettuce, rocket leaves, radish, cucumber, apple, onion, roasted almonds served with lemon jouyo sauce",
  58,
  true
);

new ColdAppetiser(
  "איוואגקי",
  "אוייסטר מוגש על קרח כתוש בליווי רוטב ספייסי פונזו",
  "Iwa Gaki",
  "Fresh oyster on crushed ice served with spicy ponzu sauce",
  38
);

// const bottargaSoba = new ColdAppetiser(
//   "בוטרגה סובה",
//   "אטריות סובה עם בוטרגה, חלמון מגורד ואיקורה",
//   "Bottarga Soba",
//   "Soba noodles with bottarga, grated egg yolk & ikura",
//   58
// );

new ColdAppetiser(
  "בורה יוזו אבורה דושי",
  "סשימי בורי בחיתוך דק צרוב בשמן שומשום חם ויוזו, סויה וג'ינג'ר",
  "Bora Yuzu Abura Doushi",
  "Grey mullet sashimi thinly sliced, seared with hot sesame oil, yuzu, soy sauce & ginger",
  58
);

new ColdAppetiser(
  "סאקה אבוקדו קוקטייל",
  "טרטר סלמון ואבוקדו עם סויה, ווסאבי קראנץ' בעיטור ביצי סלמון",
  "Sake & Avocado Cocktail",
  "Diced salmon & avocado tartar with wasabi seasoned beans & soy sauce topped with salmon roe",
  62
);

new ColdAppetiser(
  "מגורו יוקה",
  "טרטר טונה וחלמון ביצת שליו נא",
  "Maguro Yukke",
  "Tuna tartar served with quail egg yolk",
  72
);

new ColdAppetiser(
  "מגורו טטאקי",
  "סשימי טונה צרובה, רוטב ספייסי פונזו וג'ינג'ר טרי",
  "Maguro Tataki",
  "Lightly seared & sliced tuna sashimi served with spicy ginger ponzu sauce",
  72
);

new ColdAppetiser(
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

new HotAppetiser(
  "אומיסו שירו",
  "מרק מיסו עם אצות וואקאמה, טופו ובצל ירוק",
  "Omiso Shiru",
  "Miso soup with wakame seaweed, fresh tofu & scallion",
  32
);

new HotAppetiser(
  "אגדאשי דופו",
  "קוביות טופו פריכות ברוטב טנצויו חם, צנון כתוש, בצל ירוק ופטריות נמקו (ניתן לבקש טבעוני)",
  "Agedashi Doufu",
  "Crispy tofu cubes in hot tentsuyu sauce with nameko mushrooms, minced radish & scallion",
  [40, 48]
);

new HotAppetiser(
  "אבי טמפורה",
  "שרימפ טמפורה בליווי רוטב טנצויו חם, צנון וג'ינג'ר כתושים",
  "Ebi Tempura",
  "Shrimp tempura served with tentsuyu sauce, minced radish & ginger",
  44
);

new HotAppetiser(
  "איקה ג׳סו",
  "ראשי קלמארי פריכים עם מיונז יפני",
  "Ika Geso",
  "Crispy squid tentacles",
  44
);

new HotAppetiser(
  "סקאנה באטר שואיו",
  "נתחי בורי בחמאה, שום, סויה, סאקה, ג'ינג'ר ומירין",
  "Zakana Butter Shoyu",
  "Sautéed grey mullet with soy sauce, sake, mirin, butter, garlic & ginger",
  62
);

new HotAppetiser(
  "קאיסן באטר שואיו",
  "פירות ים בחמאה, שום, סויה, סאקה, ג'ינג'ר ומירין",
  "Kaisen Butter Shoyu",
  "Sautéed sea food with soy sauce, sake, mirin, butter, garlic & ginger",
  64
);

new HotAppetiser(
  "קורו אודון",
  "אטריות אודון שחורות עם שרימפ בחמאה, צ'ילי ושום",
  "Kuro Udon",
  "Black udon noodles with shrimp, butter, chili & garlic",
  62
);

// SKEWERS
new Skewer(
  "נגימה",
  "פרגית עם בצל ירוק ברוטב יאקיטורי טארה",
  "Negima",
  "Spring chicken & scallion with yakitori tare sauce",
  28
);

new Skewer(
  "סאקה יאקי",
  "סלמון ברוטב יאקיטורי טארה",
  "Sake Yaki",
  "Salmon fillet with yakitori tare sauce",
  28
);

new Skewer("אבי יאקי", "שרימפ", "Ebi Yaki", "Shrimp", 28);

new Skewer(
  "אספרה בייקון",
  "אספרגוס עטוף בייקון",
  "Aspara Bacon",
  "Asparagus wrapped with bacon",
  34
);

new Skewer(
  "הוטטה בייקון",
  "סקלופ עטוף בייקון ברוטב יקיטורי טרה",
  "Hotate Bacon",
  "Scallop wrapped with bacon with yakitori tare sauce",
  42
);

// MAID DISHES

new MainDish(
  "אינגן דופו",
  "טופו מוקפץ עם שעועית ירוקה, פטריות שמפניון ובצל לבן ברוטב יאקיניקו (טבעוני)",
  "Ingen Doufu",
  "Stir fried tofu, green beans, champignon mushrooms & onion with yakiniku sauce",
  58,
  true
);

new MainDish(
  "סוזוקי אגדאשי",
  " פילה בס ובצל פריך מוגש לצד רוטב טנצויו חם ושבבי בוניטו",
  "Suzuki Agedashi",
  "Crispy bass and onion served with tentsuyu sauce and bonito flakes",
  74
);

new MainDish(
  "קאיסן שוגה איטמה",
  "סקלופ, שרימפ, קלמארי ומולים מוקפצים עם אטריות הרוסאמה בסאקה, ג'ינג'ר, שום וסויה",
  "Kaisen Shouga Itame",
  "Harusame noodles, scallop, shrimp, calamari & mussels stir fried with sake, soy sauce, ginger & garlic",
  98
);

new MainDish(
  "סקאנה צ'יראשי",
  "סשימי סלמון, דניס, טונה, שרימפ, ביצי סלמון ואומלט יפני על אורז סושי בעיטור בצל ירוק ושומשום קלוי",
  "Zakana Chirashi",
  "Sashimi of salmon, sea bream, tuna, shrimp, salmon roe, japanese omelet on sushi rice, topped with scallion & roasted sesame seeds",
  98
);

new MainDish(
  "קורודאי סוגטאיאקי",
  "דניס שלם על הגריל במלח מוגש עם רוטב פונזו ואורז שום",
  "Kurodai Sugatayaki",
  "Grilled & salted sea bream served with minced radish, ponzu sauce & garlic rice",
  120
);

new MainDish(
  "סקאמושי",
  "פילה לברק וירקות מאודים בסאקה. מוגש עם אורז מאודה",
  "Sakamushi",
  "Sea bass fillete with vegetables, steamed in sake",
  128
);

new MainDish(
  "וואפו הירה סטייק",
  "פילה בקר בגריל",
  "Wafu Hire Steak",
  "Grilled beef fillet",
  170
);

// DESSERTS

new Dessert(
  "מאצ'ה ברולה",
  "ברולה תה ירוק ושוקולד לבן (ללא גלוטן)",
  "Matcha Brulee",
  "Greem tea brulee with white chocolate (Gluten free)",
  48
);

// const lemonTart = new Dessert(
//   "טארט לימון מפורק",
//   "קרם לימון, קראמבל, שמנת חמוצה ודובדבן אמרנה",
//   "Lemon Tart",
//   "Lemon cream, crumble, sour cream & amarena cherry",
//   48
// );

new Dessert(
  "צ׳וקורטו",
  "מוס שוקולד, דפי פילו, קראנץ' שוקולד,  ושקדים מקורמלים",
  "Chocoreto",
  "Chocolate mousse, filo dough, chocolate crunch, and caramelized almonds",
  48,
  true
);

new Dessert(
  "טארט צנוברים",
  "בצק פריך, פיננסייר צנוברים, קרמל מלוח, קרם ריקוטה וסירופ תפוזים",
  "Pine nut tart",
  "Tart dough, pine nut financier, salted caramel, ricotta cream & orange syrup",
  52
);

// new Dessert(
//   "פנה קוטה",
//   "פנה קוטה למון גראס וג׳ינג׳ר, אגס מבושל ביין ושטרויזל חלב",
//   "Panna cotta",
//   "Panna cotta lemongrass & ginger, pear cooked in wine and milk streusel",
//   52
// );

new Dessert(
  "טירמיסו",
  "קרם מסקרפונה, זביונה, ביסקוטי, ליקר קלואה, אספרסו וטוויל קקאו",
  "Tiramisu",
  "Mascarpone cream, zabaione, biscotti, Kahlua liqueur, espresso",
  52
);

new Dessert("גלידת מאצ'ה", "כדור", "Matcha icecream", "", 16);

new Dessert("סורבה פירות", "כדור", "Fruit sorbet", "", 16, true);

// HOT DRINKS
new Coffee("", "אספרסו", "", "Espresso", [12, 14]);
new Coffee("", "אמריקנו", "", "Americano", 14);
new Coffee("", "הפוך", "", "Cappuccino", [14, 16]);

new TeaInfusion("", "תה ירוק יפני", "", "Japanese Green Tea", 24);
new Tea("", "אינגליש ברקפסט", "", "English Breakfast", 12);
new Tea("", "ארל גריי", "", "Earl Grey", 12);
new Tea("", "ירוק פירות טרופים", "", "Green tea with Fruits", 12);
new Tea("", "ירוק יסמין", "", "Green tea with Jasmine", 12);
new Tea("", "תפוח עץ", "", "Apple Tea", 12);
new Tea("", "פירות יער", "", "Wild Berries Tea", 12);
new Tea("", "קמומיל (ללא&nbspקפאין)", "", "Chamomile (caffeine free)", 12);
new Tea(
  "",
  "רויבוש תות (ללא&nbspקפאין)",
  "",
  "Rooibush Strawberry Cream (caffeine free)",
  12
);
// new Tea("", "ג'ינסנג (ללא&nbspקפאין)", "", "Ginseng (caffeine free)", 12);

new Port("", "אוטימה 10", "", "Otima 10", 36);
new Port("", "דון גוידו פדרו חימנז", "", "Don Guido Pedro Ximenez", 44);

// SESHIMI
new SeshimiNigiri("סאקה", "סלמון", "Sake", "Salmon", [20, 36], false, 0);

new SeshimiNigiri(
  "סאקה טריאקי",
  "סלמון מבושל ברוטב טריאקי",
  "Sake Teriyaki",
  "Cooked in teriyaki",
  ["-", 22],
  false,
  0
);

new SeshimiNigiri(
  "בני טורו",
  "סלמון שמן",
  "Beni Toro",
  "Fatty salmon",
  [20, 36],
  false,
  0
);

new SeshimiNigiri(
  "קורודאי",
  "דניס",
  "Kurodai",
  "Sea bream",
  [20, 40],
  false,
  0
);

new SeshimiNigiri(
  "שירוגוצ‘י",
  "מוסר ים",
  "Shiroguchi",
  "Croaker",
  [20, 40],
  false,
  0
);

new SeshimiNigiri("מגורו", "טונה", "Maguro", "Tuna", [24, 50], false, 0);

new SeshimiNigiri(
  "המאצ'י",
  "ילוטייל",
  "Hamachi",
  "Yellowtail",
  [24, 50],
  false,
  0
);

new SeshimiNigiri("בורה", "בורי", "Bora", "Mullet", [18, 34], false, 1);

new SeshimiNigiri("סוזוקי", "בס", "Suzuki", "Bass", [18, 34], false, 1);

new SeshimiNigiri(
  "אונאגי",
  "צלופח מבושל ברוטב טריאקי",
  "Unagi",
  "Eel cooked in teriyaki",
  ["-", 30],
  false,
  1
);

new SeshimiNigiri(
  "אבי",
  "שרימפ מאודה",
  "Ebi",
  "Steamed shrimp",
  [16, 30],
  false,
  2
);

new SeshimiNigiri("הוטטה", "סקלופ", "Hotate", "Scallop", [24, 42], false, 2);

new SeshimiNigiri(
  "הוטטה טריאקי",
  "סקלופ מבושל ברוטב טריאקי",
  "Hotate Teriyaki",
  "Cooked in teriyaki",
  ["-", 26],
  false,
  2
);

new SeshimiNigiri("אבוקדו", "", "Avocado", "", ["-", 14], true, 3);

new SeshimiNigiri(
  "טמאגו",
  "אומלט יפני",
  "Tamago",
  "Japanese omelet",
  [16, 22],
  false,
  3
);

new SeshimiNigiri(
  "שימה אג'י",
  "טרחון",
  "Shima-Aji",
  "Yellow jack",
  [22, 44],
  false,
  4
);

new SeshimiNigiri(
  "היראמאסה",
  "אינטיאס",
  "Hiramasa",
  "Amberjack",
  [22, 46],
  false,
  4
);

new SeshimiNigiri("מאדאי", "פרידה", "Madai", "Red snapper", [28, 56], false, 4);

new SeshimiNigiri(
  "או טורו",
  "טונה שמנה",
  "Oh-Toro",
  "Fatty tuna",
  [30, 66],
  false,
  4
);

// SESHIMI SPECIAL
new SeshimiSpecial(
  "סאקה אוסוזוקורי יוזופון",
  "סשימי סלמון בחיתוך דק, בצל ירוק ושומשום. מוגש עם רוטב פונזו",
  "Sake Usuzukuri Yuzupon",
  "Salmon sashimi thinly sliced, topped with scallion & sesame seeds. Served with ponzu sauce",
  48
);

new SeshimiSpecial(
  "קורודאי יוזו אבורה דושי",
  "סשימי דניס בחיתוך דק מוגש עם שמן שומשום חם ויוזו, סויה וג'ינג'ר",
  "Kurodai Yuzu Abura Doushi",
  "Sea bream sashimi thinly sliced, seared with hot sesame oil, yuzu, soy sauce & ginger",
  64
);
new SeshimiSpecial(
  "סאקה נורימאקי",
  "רול של סשימי סלמון עטוף בנורי ובמילוי ג'ינג'ר מוחמץ, בצל ירוק, גזר ושיטקה (חתוך&nbspל-6)",
  "Sake  Norimaki",
  "Salmon sashimi rolled in nori with shiitake, scallion, ginger & carrot (cut&nbspinto&nbsp6)",
  52
);
new SeshimiSpecial(
  "מגורו נורימאקי",
  "רול של סשימי טונה עטוף בנורי ובמילוי ג'ינג'ר מוחמץ, בצל ירוק, גזר ושיטקה (חתוך&nbspל-6)",
  "Maguro Norimaki",
  "Tuna sashimi rolled in nori with shiitake, scallion,	ginger & carrot (cut&nbspinto&nbsp6)",
  72
);
new SeshimiSpecial(
  "מגורו רוקט",
  "רול של סשימי טונה במילוי רוקט טרי (חתוך&nbspל-4)",
  "Maguro Rocket",
  "Tuna sashimi roll filled with fresh rocket (cut&nbspinto&nbsp4)",
  72
);
new SeshimiSpecial(
  "מאטסוקאווה זוקורי",
  "סשימי פרידה צרובה  בסאקה בליווי רוטב פונזו לימונים	(עונתי)",
  "Matsukawa Zukuri",
  "Broiled red snapper slices with lemon ponzu sauce (Only in season)",
  72
);

// INARI GUNKAN
new InariGunkan(
  "יאסאי קוקטייל",
  "אספרגוס טמפורה, אבוקדו, צנון מוחמץ, בצל ירוק, שומשום, שקדים קלויים וטריאקי (טבעוני)",
  "Yasai Cocktail",
  "Asparagus tempura, avocado, pickled radish, scallion, sesame seeds, roasted almonds & teriyaki",
  [16, 20],
  true
);

new InariGunkan(
  "צמחוני",
  "שיטאקה, אבוקדו, מלפפון, גזר, בצל ירוק, ספייסי מיונז וטריאקי",
  "Vegetarian",
  "Shiitake, avocado, cucumber, carrot, scallion, asparagus tempura, spicy mayonnaise & Teriyaki",
  [16, 20]
);

new InariGunkan(
  "סאקה מיקס",
  "סלמון קצוץ, ביצי סלמון, בצל ירוק, ושמן צ'ילי",
  "Sake Mix",
  "Salmon, salmon roe, scallion & chili oil",
  [24, 28]
);

new InariGunkan(
  "שירו סקאנה מיקס",
  "דגים לבנים קצוצים, אבוקדו, שקדים קלויים, בצל ירוק וספייסי מיונז",
  "Shiro Zakana Mix",
  "White fish mix, avocado, roasted almonds, scallion & spicy mayonnaise",
  [26, 30]
);

new InariGunkan(
  "קאיסן קוקטייל",
  "שרימפ, סקלופ וקלמארי קצוצים, ביצי סלמון, בצל ירוק, ספייסי מיונז וטריאקי",
  "Kaisen Cocktail",
  "Shrimp, scallop, calamari, salmon roe, scallion, spicy mayonnaise & teriyaki",
  [26, 30]
);

new InariGunkan(
  "טוביקו אוזורה",
  "ביצי דג דאון וחלמון ביצת שליו",
  "Tobiko Uzura",
  "Flying fish roe & quail egg yolk",
  [28, 32]
);

new InariGunkan(
  "ספייסי טקה",
  "טונה קצוצה עם בצל ירוק ושמן צ'ילי",
  "Spicy Tekka",
  "Tuna with scallion & chili oil",
  [34, 38]
);

new InariGunkan(
  "אונאגי מיקס",
  "צלופח מבושל בטריאקי קצוץ, אבוקדו, אושינקו, שקדים קלויים, בצל ירוק ושומשום לבן",
  "Unagi Mix Teriyaki",
  "Eel cooked in teriyaki, avocado, sesame seeds, roasted almonds, pickled radish & chili oil",
  [34, 38]
);

new InariGunkan(
  "איקורה אוזורה",
  "ביצי סלמון וחלמון ביצת שליו",
  "Ikura Uzura",
  "Salmon roe & quail egg yolk",
  [34, 38]
);

new InariGunkan(
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
new InariSpecial(
  "אינארי ספיישל יאסאי קוקטייל",
  "אינארי טמפורה, אספרגוס טמפורה, אבוקדו, צנון מוחמץ, בצל ירוק, שומשום, שקדים קלויים וטריאקי (טבעוני)",
  "Inari Special Yasai Cocktail",
  "Inari tempura, asparagus tempura, avocado, pickled radish, scallion, sesame seeds, roasted almonds & teriyaki",
  24,
  true
);

new InariSpecial(
  "אינארי ספיישל צמחוני",
  "אינארי טמפורה, שיטאקה, אבוקדו, מלפפון, גזר, בצל ירוק, אספרגוס טמפורה, ספייסי מיונז וטריאקי",
  "Inari Special Vegetarian",
  "Inari tempura, shiitake, avocado, cucumber, carrot, scallion, asparagus tempura, spicy mayonnaise & Teriyaki",
  24
);

new InariSpecial(
  "אינארי ספיישל סאקה",
  "אינארי טמפורה, סלמון קצוץ, ביצי סלמון, אספרגוס טמפורה, בצל ירוק ושמן צ'ילי",
  "Inari Special Sake",
  "Inari tempura, salmon, salmon roe, asparagus tempura, scallion & chili oil",
  30
);

new InariSpecial(
  "אינארי ספיישל קורומה",
  "אינארי טמפורה, ג'מבו שרימפ קצוץ, אבוקדו, בצל ירוק, שומשום שחור, אספרגוס, טמפורה, טריאקי וספייסי מיונז",
  "Inari Special Kuruma",
  "Inari tempura, prawn, avocado, black sesame seeds, scallion, spicy mayonnaise & teriyaki",
  32
);
new InariSpecial(
  "אינארי ספיישל שירו סקאנה",
  "אינארי טמפורה, דגים לבנים קצוצים, בצל ירוק, ביצי סלמון, אספרגוס טמפורה וספייסי מיונז",
  "Inari Special Shiro Zakana",
  "Inari tempura, white fish mix, scallion, salmon roe, asparagus tempura & spicy mayonnaise",
  34
);
new InariSpecial(
  "אינארי ספיישל אונאגי",
  "אינארי טמפורה, צלופח מבושל בטריאקי קצוץ, אבוקדו, אושינקו, שקדים קלויים, בצל ירוק ושומשום לבן",
  "Inari Unagi Mix",
  "Inari tempura, eel cooked in teriyaki, asparagus tempura, avocado, sesame seeds, roasted almonds, pickled radish & chili oil",
  38
);

new InariSpecial(
  "אינארי ספיישל ספייסי טקה",
  "אינארי טמפורה, טונה קצוצה עם בצל ירוק, אספרגוס טמפורה ושמן צ'ילי",
  "Inari Spicy Tekka",
  "Inari tempura , tuna with scallion, asparagus tempura & chili oil",
  38
);

new InariSpecial(
  "אינארי ספיישל טוביקו",
  "אינארי טמפורה, סלמון וטונה קצוצים, טוביקו וואסאבי, דלעת ממותקת, צנון מוחמץ, בצל סגול, בצל ירוק, אספרגוס טמפורה, טריאקי וספייסי מיונז",
  "Inari Special Tobiko",
  "Inari tempura, salmon, tuna, wasabi tobiko, seasoned pumpkin, pickled radish, red onion, scallion, asparagus tempura, teriyaki & spicy mayonnaise",
  40
);

// HOSOMAKI

new Hosomaki("אבוקדו מאקי", "אבוקדו", "Avocado Maki", "Avocado", 18, true);

new Hosomaki(
  "קאנפיו טמאגו מאקי",
  "דלעת ממותקת ואומלט יפני",
  "Kanpyo Tamago Maki",
  "Seasoned pumpkin & Japanese omelet",
  18
);

new Hosomaki(
  "אספרה מאקי",
  "אספרגוס ושומשום",
  "Aspara Maki",
  "Asparagus & sesame seeds",
  18,
  true
);

new Hosomaki(
  "שיטאקה מאקי",
  "פטריות שיטאקה ושומשום",
  "Shiitake Maki",
  "Japanese mushroom & sesame seeds",
  18,
  true
);

new Hosomaki(
  "אביקיו מאקי",
  "שרימפ מאודה / בטמפורה ומלפפון",
  "Ebikyu Maki",
  "Steamed shrimp & cucumber",
  26
);

new Hosomaki(
  "סאקה קאווה מאקי",
  "סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ומלפפון (לא קריספי)",
  "Sakekawa Maki",
  "Chopped salmon skin, spicy mayonnaise, scallion & cucumber (not crispy)",
  28
);

new Hosomaki(
  "קליפורניה מאקי",
  "סלמון, אבוקדו ומלפפון",
  "California Maki",
  "Salmon, avocado & cucumber",
  28
);

new Hosomaki(
  "טורוטאקו מאקי",
  "סלמון שמן וצנון מוחמץ",
  "Torotaku Maki",
  "Fatty salmon & pickled radish",
  28
);

new Hosomaki(
  "נגי שירו סקאנה מאקי",
  "דגים לבנים קצוצים, בצל ירוק, מלפפון וגזר",
  "Negi Shiro Zakana Maki",
  "White fish mix, scallion, cucumber & carrot",
  30
);

new Hosomaki(
  "הוקאיי מאקי",
  "שרימפ ואספרגוס טמפורה ",
  "Hokkai Maki",
  "Shrimp & asparagus tempura",
  32
);

new Hosomaki(
  "אבי סאקה קאווה מאקי",
  "שרימפ טמפורה, סלמון סקין ואבוקדו",
  "Ebi Sakekawa Maki",
  "Shrimp tempura, salmon skin & avocado",
  32
);

new Hosomaki("טקה מאקי", "טונה", "Tekka Maki", "Tuna", 34);

new Hosomaki(
  "ספייסי טקה מאקי",
  "טונה ובצל ירוק קצוצים, שמן צ'ילי ומלפפון",
  "Spicy Tekka Maki",
  "Minced tuna & scallion, chili oil & cucumber",
  34
);

new Hosomaki(
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
new Temaki(
  "קליפורניה טמאקי",
  "סלמון, אבוקדו ומלפפון",
  "California Temaki",
  "Salmon, avocado & cucumber",
  30
);

new Temaki(
  "סאקמורי טמאקי",
  "סלמון, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי), אבוקדו ומלפפון",
  "Sakemori Temaki",
  "Salmon, salmon skin, avocado & cucumber",
  30
);

new Temaki(
  "קאיסן קוקטייל טמאקי",
  "שרימפ, סקלופ וקלמארי קצוצים, ביצי סלמון, בצל ירוק, ספייסי מיונז וטריאקי",
  "Kaisen Cocktail Temaki",
  "Shrimp, scallop, calamari, salmon roe, scallion, spicy mayonnaise & teriyaki",
  32
);

new Temaki(
  "נגי שירו סקאנה טמאקי",
  "דגים לבנים קצוצים, בצל ירוק, מלפפון וגזר",
  "Negi Shiro Zakana Temaki",
  "White fish mix, scallion, cucumber & carrot",
  32
);

new Temaki(
  "סאקה מיקס טמאקי",
  "סלמון קצוץ, ביצי סלמון, בצל ירוק, ושמן צ'ילי",
  "Sake Mix Temaki",
  "Salmon, salmon roe, scallion & chili oil",
  32
);

new Temaki(
  "הוקאיי טמאקי",
  "שרימפ ואספרגוס טמפורה עם אבוקדו",
  "Hokkai Temaki",
  "Shrimp & asparagus tempura with avocado",
  34
);

new Temaki(
  "אבי סאקה קאווה טמאקי",
  "שרימפ טמפורה, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ואבוקדו",
  "Ebi Sakekawa Temaki",
  "Shrimp tempura, salmon skin & avocado",
  38
);

new Temaki(
  "ספייסי טקה טמאקי",
  "טונה ובצל ירוק קצוצים, שמן צ'ילי ומלפפון",
  "Spicy Tekka Temaki",
  "Minced tuna & scallion, chili oil & cucumber",
  42
);

new Temaki(
  "אונמי טמאקי",
  "שרימפ טמפורה, סלמון, טונה ומלפפון",
  "Onami Temaki",
  "Shrimp tempura, salmon, tuna & cucumber",
  44
);

new Temaki(
  "אונאגי אבי טמאקי",
  "צלופח מבושל בטריאקי, שרימפ ואספרגוס בטמפורה, ביצי סלמון וספייסי מיונז",
  "Unagi Ebi Temaki",
  "Teriyaki eel, shrimp & asparagus tempura, salmon roe & spicy mayonnaise",
  50
);

// IRODORI
new Irodori(
  "רול צמחוני",
  "אבוקדו, שיטאקה, בצל ירוק, מלפפון, גזר, ספייסי מיונז וטריאקי",
  "Vegetarian Roll",
  "Shiitake, avocado, cucumber, carrot, scallion, spicy mayonnaise & teriyaki",
  24
);

new Irodori(
  "מידורי רול",
  "אספרגוס, אבוקדו, רוקט, מיונז, במעטפת ווסאבי קראנץ'",
  "Midori Roll",
  "Asparagus, avocado, rocket, mayonnaise & wasabi crunch outside",
  26
);

new Irodori(
  "יאסאי קוקטייל רול",
  "אספרגוס טמפורה, אבוקדו, צנון מוחמץ, שקדים קלויים, שומשום, בצל ירוק וטריאקי",
  "Yasai Cocktail Roll",
  "Asparagus tempura, avocado, sesame seeds, scallion, pickled radish, roasted almonds & teriyaki",
  26,
  true
);

new Irodori(
  "סאקמורי רול",
  "סלמון, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי), אבוקדו ומלפפון",
  "Sakemori Roll",
  "Salmon, salmon skin, avocado & cucumber",
  30
);

new Irodori(
  "קליפורניה רול",
  "סלמון, אבוקדו ומלפפון",
  "California Roll",
  "Salmon, avocado & cucumber",
  30
);

new Irodori(
  "בני טורו רול",
  "סלמון שמן, מלפפון ובצל ירוק",
  "Beni Toro Roll",
  "Fatty salmon, cucumber & scallion",
  30
);

new Irodori(
  "אביקיו רול",
  "שרימפ מאודה, דלעת ממותקת, אבוקדו, בצל ירוק וספייסי מיונז",
  "Ebikyu Roll",
  "Steamed shrimp, avocado, seasoned pumpkin, spicy mayonnaise & scallion",
  32
);

new Irodori(
  "אבי סאקה קאווה רול",
  "שרימפ טמפורה, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ואבוקדו",
  "Ebi Sakekawa Roll",
  "Shrimp tempura, salmon skin & avocado",
  38
);

new Irodori(
  "שירו סקאנה רול",
  "דגים לבנים קצוצים, בצל ירוק, אבוקדו וספייסי מיונז עטוף בסשימי סלמון",
  "Shiro Zakana Roll",
  "White fish mix, avocado, spicy mayonnaise & scallion with salmon outside",
  42
);

new Irodori(
  "ספייסי טקה רול",
  "טונה ובצל ירוק קצוצים, שמן צ'ילי, אבוקדו ואספרגוס",
  "Spicy Tekka Roll",
  "Minced tuna & scallion, chili oil, avocado & asparagus",
  42
);

new Irodori(
  "הוטטה טוביקו רול",
  "סקלופ, אספרגוס, צנון מוחמץ, ביצי דג דאון וספייסי מיונז",
  "Hotate Tobiko Roll",
  "Scallop, asparagus, pickled radish, spicy mayonnaise & flying fish roe",
  44
);

new Irodori(
  "אונמי רול",
  "שרימפ טמפורה, סלמון, טונה ומלפפון",
  "Onami Roll",
  "Shrimp tempura, salmon, tuna & cucumber",
  44
);

new Irodori(
  "אונאגי אבי רול",
  "צלופח מבושל בטריאקי, שרימפ ואספרגוס בטמפורה, ביצי סלמון וספייסי מיונז",
  "Unagi Ebi Roll",
  "Teriyaki eel, shrimp & asparagus tempura, salmon roe & spicy mayonnaise",
  50
);

new Irodori(
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

new Menu(
  "נגי שירו סקאנה רול",
  "דגים לבנים קצוצים, בצל ירוק, מלפפון וגזר",
  "Negi Shiro Zakana Roll",
  "White fish mix, scallion, cucumber & carrot",
  28
);

new Menu(
  "בורה מאקי",
  "בורי, אבוקדו ובצל ירוק",
  "Bora Maki",
  "Mullet, avocado & scallion",
  0
);

new Menu(
  "קאיסן קוקטייל מאקי",
  "שרימפ, סקלופ וקלמארי קצוצים, ביצי סלמון, בצל ירוק, ספייסי מיונז וטריאקי",
  "Kaisen Cocktail Maki",
  "Shrimp, scallop, calamari, salmon roe, scallion, spicy mayonnaise & teriyaki",
  30
);

new Menu(
  "מיקס צמחוני מאקי",
  "שיטאקה, אבוקדו, מלפפון, גזר, בצל ירוק, ספייסי מיונז וטריאקי",
  "Vegetarian Mix Maki",
  "Shiitake, avocado, cucumber, carrot, scallion, asparagus tempura, spicy mayonnaise & Teriyaki",
  0
);

new Menu(
  "אבי פוראי",
  "שרימפ פריך בציפוי פאנקו בליווי מיונז יפני",
  "Ebi Furai",
  "Crispy shrimp coated in panko served with mayonnaise",
  0
);

new Menu(
  "יאסאי קארי רייס",
  "קארי יפני, טופו, תפוח אדמה, גזר ובצל. מוגש עם אורז מאודה ובצל ירוק",
  "Yasai Curry Rice",
  "Golden curry, tofu, potato, carrot & onion. Served with steamed rice & scallion",
  58,
  true
);

new Menu(
  "טורי קארי רייס",
  "קארי יפני, פרגית, תפוח אדמה, גזר ובצל. מוגש עם אורז מאודה ובצל ירוק",
  "Tori Curry Rice",
  "Golden curry, spring chicken, potato, carrot & onion. Served with steamed rice & scallion",
  68
);

new Menu(
  "קאיסן קארי רייס",
  "קארי יפני, שרימפ, קלמארי, תפוח אדמה, גזר ובצל. מוגש עם אורז מאודה ובצל ירוק",
  "Kaisen Curry Rice",
  "Golden curry, shrimp, calamari, potato, carrot & onion. Served with steamed rice & scallion",
  62
);

new Menu(
  "יאסאי קארה אודון",
  "אטריות קמח חיטה, שעועית ירוקה, גזר ונבטים מוקפצים ברוטב קארי יפני חריף (טבעוני)",
  "Yasai Kare Udon",
  "Stir fried wheat flour noodles, carrot, sprouts & green beans with spicy japanese curry sauce",
  0,
  true
);

new Menu(
  "יאסאי אודון",
  "מרק עם אטריות אודון, ברוקולי, שמפיניון, גזר, וואקמה, ביצה חצי קשה ובצל ירוק",
  "Yasai Udon",
  "Noodles soup with broccoli, mushrooms, carrot, Wakame seaweed, boiled egg & scallion",
  0
);

new Menu(
  "טורי קארה אודון",
  "אטריות קמח חיטה, עוף, שעועית ירוקה, גזר ונבטים מוקפצים ברוטב קארי יפני חריף",
  "Tori Kare Udon",
  "Stir fried wheat flour noodles,spring chicken, carrot, sprouts & green beans with spicy japanese curry sauce",
  0
);

new Menu(
  "וואקאדורי גריל",
  "פרגית בגריל עם בצל מוקפץ ואורז שום",
  "Wakadori Grill",
  "Grilled spring chicken, served with sautéed onion & garlic rice",
  0
);

new Menu(
  "יאקיניקו לוסוג'יו",
  "נתחי אנטריקוט מוקפצים עם בצל ברוטב יאקיניקו בעיטור בצל ירוק ושומשום. מוגש על אורז מאודה",
  "Yakiniku Lousujyu",
  "Beef strips with yakiniku sauce on steamed rice",
  0
);

new Menu(
  "טורי ראמן",
  "ציר עוף, אטריות ראמן, פרגית, נבטים, ביצה חצי קשה, פטריית אוזן ובצל ירוק",
  "Tori Ramen",
  "Noodles soup with spring chicken, kikurage mushroom, sprouts, boiled egg & scallion",
  0
);

new Menu(
  "קאיסן אודון",
  "מרק אטריות אודון, שרימפ, סקלופ, קלמארי, ברוקולי, פטריות שמפיניון, אצות וואקאמה, ביצה חצי קשה ובצל ירוק",
  "Kaisen Udon",
  "Noodles soup with shrimp, scallop, calamari, broccoli, mushrooms, carrot, Wakame seaweed, boiled egg & scallion",
  0
);

new Menu(
  "סאקה סטייק",
  "פילה סלמון בגריל",
  "Sake Steak",
  "Grilled salmon fillet",
  100
);

new Menu(
  "אבי סאקה קאווה טמאקי",
  "קונוס עם שרימפ טמפורה, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ואבוקדו",
  "Ebi Sake kawa Temaki",
  "Hand roll with shrimp tempura, salmon skin & avocado",
  38
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

// COMBINATIONS
const combiTypeGunkan = { HE: "גונקן", EN: "Gunkan" };
const combiTypeNigiri = { HE: "ניגירי", EN: "Nigiri" };

state.combinations.types[0].dishes = [
  [menuList.inari_special_vegetarian, { HE: "2&nbspיח'", EN: "2&nbsppieces" }],
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
  "קטל ואן ציטרון, פסיפלורה, ג'ינג'ר ביר וכוסברה",
  "Gridi",
  "Ketel One Citroen, passion fruit, ginger beer & coriander",
  48
);

new Cocktail(
  "פיצג'רלד",
  "ג'ין, מיץ לימון טרי, אנגוסטורה וסירופ קנה סוכר",
  "Fitzgerald",
  "Gin, lemon juice, Angostura bitters, sugar cane syrup",
  48
);

// new Cocktail(
//   "מרטיני וואסאבי",
//   "סטולי, סירופ וואסאבי ומיץ לימון טרי",
//   "Wasabi Martini",
//   "Stoli, homemade wasabi syrup & lemon juice",
//   48
// );

new Cocktail(
  "מרגריטה הדרים",
  " קטל ואן ציטרון, טקילה רפוסדו, סירופ אשכולית וליים",
  "Citrus Margarita",
  "Ketel One Citroen, Tequila Reposado, grapefruit syrup & lime juice",
  48
);

new Cocktail(
  "ביטלג'וס",
  "ג'ין, טקילה רפוסדו, קיווי ופסיפלורה",
  "Beetlejuice",
  "Gin, Tequila Reposado, kiwi & passion fruit",
  52
);

new Cocktail(
  "מינט ג'ולפ",
  "ברבן, מיץ לימון טרי, סודה, נענע ואנגוסטורה",
  "Mint julep",
  "Bourbon, mint, Angostura bitters, lemon juice & soda",
  52
);

new Cocktail(
  "ג'אנגל בירד",
  "רום פלנטיישן, קמפרי, אננס, סירופ אשכולית אדומה",
  "Jungle Bird",
  "Plantation rum, Campari, pineapple, red grapefruit syrup",
  54
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

// SAKE

new Sake(
  "קיקוסוי ג'ונמאי שו",
  'קנקן סאקה חם (120 מ"ל)',
  "Kikusui Junmai shu",
  "Hot sake jar (120 ml)",
  34
);

new Sake(
  "אומשו צ'ויה",
  'שיכר שזיפים (90/650 מ"ל)',
  "Umeshu Choya",
  "(90/650 ml)",
  [34, 200]
);

new Sake(
  "שיראיוקי ג'ונמאי",
  'יבש, רך וחלק (180 מ"ל)',
  "Shirayuki Junmai",
  "Dry, soft and smooth (180 ml)",
  44
);

new Sake(
  "שוקון ג'ונמאי גינג'ו",
  'חצי יבש, קליל ומאוזן (180 מ"ל)',
  "Shukon Junmai Ginjo",
  "Light, semi-dry (180 ml)",
  48
);
new Sake(
  "ביזן אומאצ'י ג'ונמאי דאיגינג'ו ",
  'שיוף האורז ל 50%, off dry, מאוזן , בעל סיומת מרעננת (180/500 מ"ל)',
  "Bizen Omachi Junmai Daiginjo",
  "Rice is polished to 50%, off dry, balanced, refreshing ending (180/500 ml)",
  [85, 190]
);
new Sake(
  "שלג מושלם",
  'סאקה ניגורי לא מסונן, מתקתק, בעל גוף מלא ודומיננטי בטעמים (300 מ"ל)',
  "Perfect Snow",
  "Unfiltered Nigori sake, sweet, full-bodied with dominant flavors (300 ml)",
  80
);
new Sake(
  "קיקוסוי ג'ונמאי גינג'ו ",
  'בעל יובש מעודן ונעים (300 מ"ל)',
  "Kikusui Junmai Ginjo",
  "Refined and pleasant dryness (300 ml)",
  95
);
new Sake(
  "דסאי 45 ג'ונמאי דאיגינג'ו",
  'אולטרה פרימיום סאקה בעל גוף בינוני, ארומאטי ועגול (300 מ"ל)',
  "Dassai 45 Junmai Daiginjo",
  "Ultra premium sake, medium-bodied, aromatic with round ending (300 ml)",
  120
);
new Sake(
  "דסאי 39 ג'ונמאי דאיגינג'ו ",
  'אולטרה פרימיום סאקה מאורז נישיקי, מופת של איזון והרמוניה (300 מ"ל)',
  "Dassai 39 Junmai Daiginjo",
  "Ultra premium sake, made from Nishiki rice. A masterpiece of balance and harmony (300 ml)",
  185
);
new Sake(
  "היאשיבורי ג'ונמאי דאיגינג'ו ",
  'פירותי,יבש ואלגנטי (720 מ"ל)',
  "Hiyashibori Junmai Daiginjo",
  "Dry, fruity and elegant (720 ml)",
  170
);

//WINE

// Glass
new WineGlass(
  "מוסקדה",
  "גפנים בוגרות, שרו קארה, צרפת",
  "Muscadet",
  "Comte Leloup, Chereau-Carre, France",
  38,
  0,
  2018
);
//  new WineGlass(
//  "גוורצטרמינר",
//  "פלטר, ישראל",
//  "Gewurztraminer",
//  "Pelter, Israel",
//  44,
//  0,
//  2020
//  );

new WineGlass(
  "גוורצטרמינר",
  "פפאפנהיים, צרפת",
  "Gewurztraminer",
  "Pfaffenheim, France",
  44,
  0,
  2018
);

//  new WineGlass(
//  "גוורצטרמינר",
//  "ירדן, רמת הגולן, ישראל",
//  "Gewurztraminer",
//  "Pelter, Golan Heights, Israel",
//  44,
//  0,
//  2020
//  );

new WineGlass(
  "גראז' דה פאפא לבן",
  "לוינסון, ישראל",
  "Garage De Papa Blanc",
  "Lewinsohn, Israel",
  52,
  0,
  2020
);

new WineGlass(
  "סנסר",
  "דומיין ושרון, צרפת",
  "Sancerre",
  "Domaine Vacheron, France",
  58,
  0,
  2020
);

// new WineGlass(
//   "דומיניק קורנה",
//   "מקון-שאנטרה, צרפת",
//   "Dominique Cornin",
//   "Mâcon-Chaintré, France",
//   52,
//   0,
//   2020
// );

new WineGlass(
  "קרמאן דה לואר ל'אקסטרא",
  "לאנגלואה שאטו, צרפת",
  "Cremant De Loire L'Extra",
  "Langlois Chateau, France",
  38,
  1
);
new WineGlass(
  "רוזה מאליז",
  "דומיין קארטרון, צרפת",
  "Rose Malyse",
  "Domaine Carteyron, France",
  40,
  1,
  2020
);

new WineGlass(
  "מנוט",
  "מאס מרטינט, ספרד",
  "Menut",
  "Mas Martinet, Spain",
  38,
  2,
  2019
);
// new WineGlass(
//   "גראז' דה פאפא אדום",
//   "לוינסון, ישראל",
//   "Garage De Papa Rouge",
//   "Lewinsohn, Israel",
//   56,
//   2,
//   2020
// );

new WineGlass(
  "סירה",
  "קלו דה גת, הראל, ישראל",
  "Sirah",
  "Clos de Gat, Harel, Israel",
  52,
  2,
  2017
);

new WineGlass(
  "סימון ביז",
  "בורגון פרייר, צרפת",
  "Simon Bize",
  "Bourgogne Perrieres",
  64,
  2,
  2017
);

// Bottles
new WineBottle(
  "ריזלינג",
  'בסטהיים, צרפת  (375 מ"ל)',
  "Riesling",
  "Bestheim, France  (375 ml)",
  75,
  0,
  2018
);

new WineBottle(
  "פינו גריג'יו",
  'לה טונלה, איטליה (375 מ"ל)',
  "Pinot Grigio",
  "LaTunella, Italy (375 ml)",
  85,
  0,
  2020
);

new WineBottle(
  "מוסקדה",
  "גפנים בוגרות, שרו קארה, צרפת",
  "Muscadet",
  "Comte Leloup, Chereau-Carre, France",
  155,
  0,
  2018
);
new WineBottle(
  "ריזלינג",
  'וילה בורקלין, ד"ר בורקלין וולף, גרמניה',
  "Riesling",
  "Villa Buerklin, Dr Buerklin Wolf, Germany",
  170,
  0,
  2018
);

//new WineBottle(
//  "גוורצטרמינר",
//  "פלטר, ישראל",
//  "Gewurztraminer",
//  "Pelter, Israel",
//  180,
//  0,
//  2020
//);

//  new WineBottle(
//  "גוורצטרמינר",
//  "ירדן, רמת הגולן, ישראל",
//  "Gewurztraminer",
//  "Pelter, Golan Heights, Israel",
//  180,
//  0,
//  2020
//  );

new WineBottle(
  "גוורצטרמינר",
  "פפאפנהיים, צרפת",
  "Gewurztraminer",
  "Pfaffenheim, France",
  180,
  0,
  2018
);

new WineBottle(
  "שנסון",
  "קלו דה גת , ישראל",
  "Chanson",
  "Clos De Gat, Israel",
  190,
  0,
  2020
);

new WineBottle(
  "שבלי פרימייר קרו",
  "דומיין פורי, צרפת",
  "Chablis Premier Cru",
  "Domaine Fourrey, France",
  220,
  0,
  2020
);
new WineBottle(
  "רוסאן-ויונייה",
  "אחת, ישראל",
  "Roussanne-Viogniers",
  "Ahat, Israel",
  230,
  0,
  2019
);

// new WineBottle(
//   "דומיניק קורנה",
//   "מקון-שאנטרה, צרפת",
//   "Dominique Cornin",
//   "Mâcon-Chaintré, France",
//   230,
//   0,
//   2020
// );

new WineBottle(
  "גראז' דה פאפא לבן ",
  "לוינסון, ישראל",
  "Garage De Papa Blanc",
  "Lewinsohn, Israel",
  235,
  0,
  2020
);

new WineBottle(
  "סאנסר",
  "דומיין ושרון, צרפת",
  "Sancerre",
  "Domaine Vacheron, France",
  260,
  0,
  2020
);

new WineBottle(
  "רוזה מאליז",
  "דומיין קארטרון, צרפת",
  "Rose Malyse",
  "Domaine Carteyron, France",
  170,
  1,
  2020
);

new WineBottle("רוזה", "מיראבל, צרפת", "Rose", "Miraval, France", 220, 1, 2020);

new WineBottle(
  "קרמאן דה לואר ל'אקסטרא",
  "לאנגלואה שאטו, צרפת",
  "Cremant De Loire L'Extra",
  "Langlois Chateau, France",
  170,
  1
);

new WineBottle(
  "מואט&שנדו",
  "אימפריאל ברוט, צרפת",
  "Moet & Chandon",
  "Imperial Brut, France",
  430,
  1
);

new WineBottle(
  "בולינג'ר",
  "ספיישל קווה, צרפת",
  "Bollinger",
  "Special Cuvee, France",
  620,
  1
);

new WineBottle(
  "קוט דו רון בלרוש",
  'שאפוטייה, צרפת (375 מ"ל)',
  "Belleruche",
  "Cotes Du Rhone, France (375 ml)",
  80,
  2,
  2019
);

new WineBottle(
  "מנוט",
  "מאס מרטינט, ספרד",
  "Menut",
  "Mas Martinet, Spain",
  170,
  2,
  2019
);

// new WineBottle(
//   "פינו נואר",
//   "ויתקין, ישראל",
//   "Pinot Noir",
//   "Vitkin, Israel",
//   185,
//   2,
//   2019
// );

new WineBottle(
  "סירה",
  "קלו דה גת, הראל, ישראל",
  "Sirah",
  "Clos de Gat, Harel, Israel",
  195,
  2,
  2017
);

new WineBottle(
  "מרלו",
  "הראל, קלו דה גת, ישראל",
  "Merlot",
  "Har'el, Clos De Gat, Israel",
  210,
  2,
  2018
);

// new WineBottle(
//   "גראז' דה פאפא אדום",
//   "לוינסון, ישראל",
//   "Garage De Papa Rouge",
//   "Lewinsohn, Israel",
//   235,
//   2,
//   2020
// );

new WineBottle(
  "אמרונה",
  'טומאסי, איטליה (375 מ"ל)',
  "Amarone",
  "Tommasi, Italy (375 ml)",
  240,
  2,
  2016
);

new WineBottle(
  "סימון ביז",
  "בורגון פרייר, צרפת",
  "Simon Bize",
  "Bourgogne Perrieres",
  290,
  2,
  2017
);

new WineBottle(
  "אמרונה",
  "טומאסי, איטליה",
  "Amarone",
  "Tommasi, Italy",
  360,
  2,
  2016
);

// Wine from the cellar
new WineCellar(
  "עמק איילון",
  "קלו דה גת, ישראל",
  "Ayalon Valley",
  "Clos De Gat, Israel",
  590,
  false,
  2004
);
new WineCellar(
  "מרלו סיקרא",
  "קלו דה גת, ישראל",
  "Merlot Sycra",
  "Clos De Gat, Israel",
  650,
  false,
  2006
);
new WineCellar(
  "אמרונה",
  "טומאסי, איטליה",
  "Amarone",
  "Tomassi, Italy",
  [750, 650],
  false,
  "2006/2007"
);
new WineCellar(
  "גואדו אל טאסו בולגרי",
  "אנטינורי, איטליה",
  "Guado al Tasso Bolgheri",
  "Antinori, Italy",
  820,
  false,
  2005
);
new WineCellar(
  "קברנה סוביניון ירדן",
  "רמת הגולן,ישראל",
  "Cabernet Sauvignon Yarden",
  "Golan Heights, Israel",
  850,
  false,
  2004
);
new WineCellar(
  "גראן וין",
  "קסטל, ישראל",
  "Grand Vin",
  "Domaine du Castel, Israel",
  850,
  false,
  2007
);
new WineCellar(
  "אליון וגה סיציליה",
  "ספרד",
  "Alion Vega Sicilia",
  "Spain",
  920,
  false,
  2005
);
new WineCellar(
  "יער יתיר",
  "יתיר, ישראל",
  "Yatir Forest",
  "Yatir, Israel",
  950,
  false,
  2008
);
new WineCellar(
  "רום ירדן",
  "רמת הגולן, ישראל",
  "Rom Yarden",
  "Golan Heights, Israel",
  1350,
  false,
  2006
);
new WineCellar(
  "סולאייה אנטינורי",
  "טוסקנה, איטליה",
  "Solaia Antinori",
  "Toscany, Italy",
  1800,
  false,
  2004
);
new WineCellar(
  "קצרין",
  "רמת הגולן, ישראל",
  "Katzrin",
  "Golan Heights, Israel",
  [1800, 1500],
  false,
  "2007/2008"
);

// aperitif: {

// vodka: {

// rum: {

// gin: {

// tequila: {

// anise: {

// cognac: {

// liqueur: {

// digestif: {

// scotch: {

// american: {

// irish: {

// single: {

// Spirits
new Spirit("אפרול", "", "Aperol", "", 28, false, "aperitif");
new Spirit("סטוליצ'ניה", "", "Stolichnaya", "", 32, false, "vodka");
new Spirit("בקרדי", "", "Bacardi", "", 32, false, "rum");
new Spirit("גורדונ'ס", "", "Gordon`s", "", 32, false, "gin");
new Spirit("מילאגרו בלאנקו", "", "Milagro Blanco", "", 44, false, "tequila");
new Spirit("עראק אשקלון", "", "Arak Ashkalon", "", 28, false, "anise");
new Spirit("הנסי V.S", "", "Hennessy V.S", "", 48, false, "cognac");
new Spirit(
  "אמרטו דיסארונו",
  "",
  "Amaretto Disaronno",
  "",
  34,
  false,
  "liqueur"
);
new Spirit("אוורנה", "", "Averna", "", 34, false, "digestif");
new Spirit(
  "ג'וני ווקר רד לייבל",
  "",
  "Jhonnie Walker Red",
  "",
  34,
  false,
  "scotch"
);
new Spirit("ג'ים בים לבן", "", "Jim Beam White", "", 38, false, "american");
new Spirit("ג'יימסון", "", "Jameson", "", 36, false, "irish");
new Spirit(
  "גלנמורנג'י 10 שנים",
  "",
  "Glenmorangie 10",
  "",
  56,
  false,
  "single"
);

// Specials

new Special(
  "איוואגקי",
  "אוייסטר ג׳ילרדו עם ספייסי פונזו",
  "Iwagaki",
  "Oyster served on crushed ice with spicy ponzu sauce",
  38,
  false,
  2
);

new Special(
  "טאקויאקי",
  "כדורי פנקייק יפניים במילוי תמנון, ג׳ינג׳ר כבוש ובצל ירוק. מוגש עם בוניטו, מיונז יפני וטריאקי",
  "Takoyaki ",
  "Japanese sphere shaped pancakes filled with octopus, beni shoga, scallion. Served with bonito, mayonnaise, teriyaki",
  48,
  false,
  2
);

new Special(
  "סאקה און דה רוקס",
  "סלמון קצוץ, איקורה, טוביקו שחור, בצל ירוק, שמן צ׳ילי על מאקי סלמון סקין קריספי ואבוקדו",
  "Sake on the Rocks",
  "Chopped salmon, salmon roe, flying fish roe, scallion, chili oil on salmon skin crispy & avocado maki",
  88,
  false,
  2
);

new Special(
  "6 צרובים",
  "שש יח' ניגירי צרובים בלהבה. טונה, יילו טייל, וסלמון",
  "6 Nigiri",
  "6 pcs' of charred nigiri with an open flame. Tuna, yellow tail & salmon",
  120,
  false,
  2
);

new Special(
  "סשימי יוזו אבורה דושי ספיישל",
  "סשימי טונה, סלמון, מוסר ים, דניס ובורי צרובים בשמן שומשום/צ׳ילי ברוטב סויה-יוזו",
  "Sashimi Yuzu Abura Doushi Special",
  "Sashimi of tuna, croaker, salmon, sea bream & grey mullet seared with hot sesame oil, yuzu & soy sauce",
  128,
  false,
  2
);

new Special(
  "נורימאקי  צמחוני",
  "אבוקדו מגולגל עם אצת נורי במילוי מלפפון, שקדים קלויים, ווסאבי קרנץ׳, מיונז יפני וטריאקי",
  "Vegi Norimaki",
  "Avocado rolled with nori, cucumber, wasabi crunch, roasted almonds, teriyaki & mayonnaise ",
  88,
  false,
  2
);

new Special(
  "ג'אנגל בירד",
  "רום פלנטיישן, קמפרי, אננס, סירופ אשכולית אדומה",
  "Jungle Bird",
  "Plantation rum, Campari, pineapple, red grapefruit syrup",
  54,
  false,
  3
);

new Special(
  "מרטיני תותים",
  "תותים, קטל ואן ציטרון, וקרמו דה לואר",
  "Strawberry Martini",
  "Strawberry, Ketel One Citroen & Cremant De Loire",
  54,
  false,
  3
);

export const dishConstructors = {
  special: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Special(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  coldAappetiser: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new ColdAppetiser(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  hotAppetiser: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new HotAppetiser(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  skewer: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Skewer(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  mainDishe: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new MainDish(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  dessert: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Dessert(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  coffee: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Coffee(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  teaInfusion: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new TeaInfusion(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  tea: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Tea(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  port: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Port(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  seshimiNigiri: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new SeshimiNigiri(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  seshimiSpecial: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new SeshimiSpecial(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  inariGunkan: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new InariGunkan(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  inariSpecial: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new InariSpecial(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  hosomaki: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Hosomaki(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  hosomakiIngredient: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new HosomakiIngredient(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  temaki: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Temaki(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  irodori: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Irodori(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  irodoriIngredient: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new IrodoriIngredient(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  wineGlass: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new WineGlass(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  wineBottle: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new WineBottle(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  wineCellar: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new WineCellar(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  beer: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Beer(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  sake: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Sake(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  cocktail: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Cocktail(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  softDrink: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new SoftDrink(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
  spirit: (
    titleHE,
    descriptionHE,
    titleEN,
    descriptionEN,
    price,
    isVegi,
    type,
    vintage
  ) =>
    new Spirit(
      titleHE,
      descriptionHE,
      titleEN,
      descriptionEN,
      price,
      isVegi,
      type,
      vintage
    ),
};

//Made by konyshevs
