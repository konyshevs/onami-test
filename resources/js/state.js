// STATE
import { runAfterDate, runBeforeDate } from "./helpers.js";
import { END_DATE, START_DATE } from "./config.js";
import makiImg from "../img/maki.jpg";
import temakiImg from "../img/temaki.jpg";
import irodoriImg from "../img/irodori.jpg";
import nigiriImg from "../img/nigiri.jpg";
import inariImg from "../img/inari.jpg";
import inariSpeciaImg from "../img/inarispecial.jpg";

// import { createDishDocument } from "./firebase/farebase.utils";

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
      titleEN: "Infusion tea",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [],
    },
    {
      titleHE: "תיונים",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Tea bags",
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
    state.desserts[0].dishes.push(this);
  }
}

class Coffee extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[1].dishes.push(this);
  }
}

class TeaInfusion extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[2].dishes.push(this);
  }
}

class Tea extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[3].dishes.push(this);
  }
}

class Port extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts[4].dishes.push(this);
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
    state.seshimi[0].types[type].dishes.push(this);
    state.seshimi[0].dishes.push(this);
  }
}

class SeshimiSpecial extends Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.seshimi[1].dishes.push(this);
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
  _addID() {
    this.id = `${this.titleEN
      .toLowerCase()
      .replaceAll(" ", "_")}_${this.descriptionEN
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll(",", "")}`;
  }
}

class WineGlass extends Menu {
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
    state.wine[0].dishes.push(this);
    this._addID();
  }
  _addID() {
    this.id = `${this.titleEN
      .toLowerCase()
      .replaceAll(" ", "_")}_${this.descriptionEN
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll(",", "")}_glass_${this.vintage}`;
  }
}

class GlassWineWhite extends WineGlass {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[0].types[0].dishes.push(this);
  }
}

class GlassWineRose extends WineGlass {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[0].types[1].dishes.push(this);
  }
}

class GlassWineRed extends WineGlass {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[0].types[2].dishes.push(this);
  }
}

class WineBottle extends Wine {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[1].dishes.push(this);
    this._addID();
  }
  _addID() {
    this.id = `${this.titleEN
      .toLowerCase()
      .replaceAll(" ", "_")}_${this.descriptionEN
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll(",", "")}_bottle_${this.vintage}`;
  }
}

class WineRed extends WineBottle {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[1].types[2].dishes.push(this);
  }
}

class WineWhite extends WineBottle {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[1].types[0].dishes.push(this);
  }
}

class WineRose extends WineBottle {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[1].types[1].dishes.push(this);
  }
}

class WineCellar extends Wine {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, vintage);
    state.wine[2].dishes.push(this);
    this._addID();
  }
  _addID() {
    this.id = `${this.titleEN
      .toLowerCase()
      .replaceAll(" ", "_")}_${this.descriptionEN
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll(",", "")}_cellar_${this.vintage}`;
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
  "אטריות תפוחי אדמה, בצל ירוק וסלמון ברוטב וואפו (ניתן לבקש טבעוני, ניתן לבקש ללא גלוטן)",
  "Harusame Salad",
  "Cold potato noodles, scallion & salmon served with Wafu sauce",
  36
);

new ColdAppetiser(
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

// MAID DISHES

const ingenDofu = new MainDish(
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

const kaisenShougaItame = new MainDish(
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

const kurodaiSugatayaki = new MainDish(
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
// git

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

new Dessert(
  "פנה קוטה",
  "פנה קוטה למון גראס וג׳ינג׳ר, אגס מבושל ביין ושטרויזל חלב",
  "Panna cotta",
  "Panna cotta lemongrass & ginger, pear cooked in wine and milk streusel",
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
new Tea("", "ג'ינסנג (ללא&nbspקפאין)", "", "Ginseng (caffeine free)", 12);

new Port("", "אוטימה 10", "", "Otima 10", 36);
new Port("", "דון גוידו פדרו חימנז", "", "Don Guido Pedro Ximenez", 44);

// SESHIMI
const sake = new SeshimiNigiri(0, "סאקה", "סלמון", "Sake", "Salmon", [20, 36]);

new SeshimiNigiri(
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

new SeshimiNigiri(0, "מגורו", "טונה", "Maguro", "Tuna", [24, 50]);

new SeshimiNigiri(0, "המאצ'י", "ילוטייל", "Hamachi", "Yellowtail", [24, 50]);

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

new SeshimiNigiri(2, "הוטטה", "סקלופ", "Hotate", "Scallop", [24, 42]);

new SeshimiNigiri(
  2,
  "הוטטה טריאקי",
  "סקלופ מבושל ברוטב טריאקי",
  "Hotate Teriyaki",
  "Cooked in teriyaki",
  ["-", 26]
);

new SeshimiNigiri(3, "אבוקדו", "", "Avocado", "", ["-", 14], true);

const tamago = new SeshimiNigiri(
  3,
  "טמאגו",
  "אומלט יפני",
  "Tamago",
  "Japanese omelet",
  [16, 22]
);

new SeshimiNigiri(
  4,
  "שימה אג'י",
  "טרחון",
  "Shima-Aji",
  "Yellow jack",
  [22, 44]
);

new SeshimiNigiri(4, "היראמאסה", "אינטיאס", "Hiramasa", "Amberjack", [22, 46]);

new SeshimiNigiri(4, "מאדאי", "פרידה", "Madai", "Red snapper", [28, 56]);

new SeshimiNigiri(4, "או טורו", "טונה שמנה", "Oh-Toro", "Fatty tuna", [30, 66]);

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

const californiaMaki = new Hosomaki(
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

new Hosomaki("טקה מאקי", "טונה", "Tekka Maki", "Tuna", 34);

const spicyTekkaMaki = new Hosomaki(
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
const californiaTemaki = new Temaki(
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

const ebiSakekawaTemaki = new Temaki(
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

new Irodori(
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

new Irodori(
  "אבי סאקה קאווה רול",
  "שרימפ טמפורה, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ואבוקדו",
  "Ebi Sakekawa Roll",
  "Shrimp tempura, salmon skin & avocado",
  38
);

const shiroZakanaRoll = new Irodori(
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

const hotateTobikoRoll = new Irodori(
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

const rootSalad = new Menu(
  "סלט שורשים",
  "סלק, גזר, קולורבי, פפאיה ירוקה, וואסבי קראנץ', שקדים קלויים, עלי מיקרו ברוטב וואפו (טבעוני, ניתן לבקש ללא גלוטן)",
  "Root vegetables salad",
  "Beetroot, carrot, kohlrabi, green papaya, wasabi crunch, roasted almonds, micro green leaves with Wafu sauce",
  42,
  true
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

const ebiSakekawaTemakiLunch = new Menu(
  "אבי סאקה קאווה טמאקי",
  "קונוס עם שרימפ טמפורה, סלמון סקין (קצוץ עם ספייסי מיונז, בצל ירוק וטריאקי) ואבוקדו",
  "Ebi Sakekawa Temaki",
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
  omisoShiru,
  harusameSalad,
  rootSalad,
  ebiFurai,
  agedashiDoufu,
  sakemoriRoll,
  ebiSakekawaTemakiLunch,
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
  'שיכר שזיפים (90/750 מ"ל)',
  "Umeshu Choya",
  "(90/750 ml)",
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
new GlassWineWhite(
  "מוסקדה",
  "גפנים בוגרות, שרו קארה, צרפת",
  "Muscadet",
  "Comte Leloup, Chereau-Carre, France",
  38,
  2017
);
new GlassWineWhite(
  "גוורצטרמינר",
  "פלטר, ישראל",
  "Gewurztraminer",
  "Pelter, Israel",
  44,
  2020
);
new GlassWineWhite(
  "גראז' דה פאפא לבן",
  "לוינסון, ישראל",
  "Garage De Papa Blanc",
  "Lewinsohn, Israel",
  52,
  2020
);

new GlassWineWhite(
  "סנסר",
  "דומיין ושרון, צרפת",
  "Sancerre",
  "Domaine Vacheron, France",
  58,
  2020
);

new GlassWineRose(
  "קרמאן דה לואר ל'אקסטרא",
  "לאנגלואה שאטו, צרפת",
  "Cremants De Loire L'Extra",
  "Langlois Chateau, France",
  38
);
new GlassWineRose(
  "רוזה מאליז",
  "דומיין קארטרון, צרפת",
  "Rose Malyse",
  "Domaine Carteyron, France",
  40,
  2020
);

new GlassWineRed(
  "מנוט",
  "מאס מרטינט, ספרד",
  "Menut",
  "Mas Martinet, Spain",
  38,
  2019
);
new GlassWineRed(
  "גראז' דה פאפא אדום",
  "לוינסון, ישראל",
  "Garage De Papa Rouge",
  "Lewinsohn, Israel",
  56,
  2020
);

// Bottles
new WineWhite(
  "ריזלינג",
  'בסטהיים, צרפת  (375 מ"ל)',
  "Riesling",
  "Bestheim, France  (375 ml)",
  75,
  2018
);

new WineWhite(
  "פינו גריג'יו",
  'לה טונלה, איטליה (375 מ"ל)',
  "Pinot Grigio",
  "LaTunella, Italy (375 ml)",
  85,
  2020
);

new WineWhite(
  "מוסקדה",
  "גפנים בוגרות, שרו קארה, צרפת",
  "Muscadet",
  "Comte Leloup, Chereau-Carre, France",
  155,
  2016
);
new WineWhite(
  "ריזלינג",
  'וילה בורקלין, ד"ר בורקלין וולף, גרמניה',
  "Riesling",
  "Villa Buerklin, Dr Buerklin Wolf, Germany",
  170,
  2018
);

new WineWhite(
  "גוורצטרמינר",
  "פלטר, ישראל",
  "Gewurztraminer",
  "Pelter, Israel",
  180,
  2020
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
  "שבלי פרימייר קרו",
  "דומיין פורי, צרפת",
  "Chablis Premier Cru",
  "Domaine Fourrey, France",
  220,
  2019
);
new WineWhite(
  "רוסאן-ויונייה",
  "אחת, ישראל",
  "Roussanne-Viogniers",
  "Ahat, Israel",
  230,
  2019
);

new WineWhite(
  "גראז' דה פאפא לבן ",
  "לוינסון, ישראל",
  "Garage De Papa Blanc",
  "Lewinsohn, Israel",
  235,
  2020
);

new WineWhite(
  "סאנסר",
  "דומיין ושרון, צרפת",
  "Sancerre",
  "Domaine Vacheron, France",
  260,
  2020
);

new WineRose(
  "רוזה מאליז",
  "דומיין קארטרון, צרפת",
  "Rose Malyse",
  "Domaine Carteyron, France",
  170,
  2020
);

new WineRose("רוזה", "מיראבל, צרפת", "Rose", "Miraval, France", 220, 2020);

new WineRose(
  "קרמאן דה לואר ל'אקסטרא",
  "לאנגלואה שאטו, צרפת",
  "Cremants De Loire L'Extra",
  "Langlois Chateau, France",
  170
);

new WineRose(
  "מואט&שנדו",
  "אימפריאל ברוט, צרפת",
  "Moet & Chandon",
  "Imperial Brut, France",
  430
);

new WineRose(
  "בולינג'ר",
  "ספיישל קווה, צרפת",
  "Bollinger",
  "Special Cuvee, France",
  620
);

new WineRed(
  "קוט דו רון בלרוש",
  'שאפוטייה, צרפת (375 מ"ל)',
  "Belleruche",
  "Cotes Du Rhone, France (375 ml)",
  80,
  2019
);

new WineRed(
  "מנוט",
  "מאס מרטינט, ספרד",
  "Menut",
  "Mas Martinet, Spain",
  170,
  2019
);

new WineRed(
  "פינו נואר",
  "ויתקין, ישראל",
  "Pinot Noir",
  "Vitkin, Israel",
  185,
  2019
);

new WineRed(
  "מרלו",
  "הראל, קלו דה גת, ישראל",
  "Merlot",
  "Har'el, Clos De Gat, Israel",
  210,
  2018
);

new WineRed(
  "גראז' דה פאפא אדום",
  "לוינסון, ישראל",
  "Garage De Papa Rouge",
  "Lewinsohn, Israel",
  235,
  2020
);
new WineRed(
  "אמרונה",
  'טומאסי, איטליה (375 מ"ל)',
  "Amarone",
  "Tommasi, Italy (375 ml)",
  240,
  2016
);

new WineRed("אמרונה", "טומאסי, איטליה", "Amarone", "Tommasi, Italy", 360, 2016);

// Wine from the cellar
new WineCellar(
  "עמק איילון",
  "קלו דה גת, ישראל",
  "Ayalon Valley",
  "Clos De Gat, Israel",
  590,
  2004
);
new WineCellar(
  "מרלו סיקרא",
  "קלו דה גת, ישראל",
  "Merlot Sycra",
  "Clos De Gat, Israel",
  650,
  2006
);
new WineCellar(
  "אמרונה",
  "טומאסי, איטליה",
  "Amarone",
  "Tomassi, Italy",
  [750, 650],
  "2006/2007"
);
new WineCellar(
  "גואדו אל טאסו בולגרי",
  "אנטינורי, איטליה",
  "Guado al Tasso Bolgheri",
  "Antinori, Italy",
  820,
  2005
);
new WineCellar(
  "קברנה סוביניון ירדן",
  "רמת הגולן,ישראל",
  "Cabernet Sauvignon Yarden",
  "Golan Heights, Israel",
  850,
  2004
);
new WineCellar(
  "גראן וין",
  "קסטל, ישראל",
  "Grand Vin",
  "Domaine du Castel, Israel",
  850,
  2007
);
new WineCellar(
  "אליון וגה סיציליה",
  "ספרד",
  "Alion Vega Sicilia",
  "Spain",
  920,
  2005
);
new WineCellar(
  "יער יתיר",
  "יתיר, ישראל",
  "Yatir Forest",
  "Yatir, Israel",
  950,
  2008
);
new WineCellar(
  "רום ירדן",
  "רמת הגולן, ישראל",
  "Rom Yarden",
  "Golan Heights, Israel",
  1350,
  2006
);
new WineCellar(
  "סולאייה אנטינורי",
  "טוסקנה, איטליה",
  "Solaia Antinori",
  "Toscany, Italy",
  1800,
  2004
);
new WineCellar(
  "קצרין",
  "רמת הגולן, ישראל",
  "Katzrin",
  "Golan Heights, Israel",
  [1800, 1500],
  "2007/2008"
);

//Made by konyshevs
