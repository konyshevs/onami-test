$("document").ready(function () {
  const dishBlockEl = document.querySelector(".menu");
  const lang = document.documentElement.lang.toUpperCase();

  function init() {
    // Меняет направление отступа для английской версии для большого экрана
    if (lang === "EN" && window.innerWidth > 480)
      dishBlockEl.style.margin = "45px 0 0 150px";

    window.addEventListener("resize", function (e) {
      if (e.currentTarget.innerWidth > 480 && lang === "EN")
        dishBlockEl.style.margin = "45px 0 0 150px";
      if (e.currentTarget.innerWidth < 480 && lang === "EN")
        dishBlockEl.style.margin = "45px 0 0 0";
    });
    renderMenuPage(state.appetisers);
  }

  function shake(thing) {
    //тресет объект
    const interval = 100;
    const distance = 3;
    const times = 10;

    for (let i = 0; i < times + 1; i++) {
      $(thing).animate(
        {
          left: i % 2 == 0 ? distance : distance * -1,
        },
        interval
      );
    }
    $(thing).animate(
      {
        left: 0,
        top: 0,
      },
      interval
    );
  }

  shake("#menu-butt");

  // OPEN/CLOSE MENU
  $("#menu-butt, #nav-container").on("click", function () {
    if (window.outerWidth > 480) return;
    const width = $("#nav").css("width");
    if (width == "0px") {
      $("#nav").animate({ width: "150px" }, 200);
      $("#menu-butt").css({ color: "black", "background-color": "white" });
      $("#nav-container").css({ display: "flex" });
      $("html,body").css("overflow", "hidden");
    } else {
      $("#nav").animate({ width: 0 }, 200);
      $("#menu-butt").css({ color: "white", "background-color": "black" });
      setTimeout(function () {
        $("#nav-container").css({ display: "none" });
      }, 200);
      $("html,body").css("overflow", "auto");
    }
  });

  //MENU BTNS
  $("#nav-container").on("click", function (e) {
    if (e.target.classList.contains("nav-butt")) {
      renderMenuPage(state[e.target.dataset.link]);
    }
  });

  // MENU RENDERING
  function genDishMarkup(dish) {
    const price = Array.isArray(dish.price) ? dish.price.join("/") : dish.price;

    return `<div class="dish">
     <div class="title-price-section">
        <div class="dish-title">
          <div>${dish[`title${lang}`]}</div>
          ${dish.isVegi ? '<div class="veg"></div>' : ""}
        </div>
        <div class="dish-price">${price ? "₪" : ""} ${price}</div>
     </div>
      <div class="dish-description">${dish[`description${lang}`]}</div>
   </div>`;
  }

  function genDishMarkupOneLine(dish) {
    const price = Array.isArray(dish.price) ? dish.price.join("/") : dish.price;

    return `<div class="dish one-line">
     <div class="title-price-section">
        <div class="dish-title">
          <div>${
            dish[`title${lang}`]
          }<span class="dish-description"> ${dish[`description${lang}`]}</span></div>
          ${dish.isVegi ? '<div class="veg"></div>' : ""}
        </div>
        <div class="dish-price">${price ? "₪" : ""} ${price}</div>
     </div>
   </div>`;
  }

  function genMenuMarkup(menuObj) {
    // <div class="price-description">${menuObj[`price${lang}`] || ""}</div>
    return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        <div class="menu-description">${menuObj[`description${lang}`]}</div>
    </div>
    ${menuObj.dishes.map(dish => genDishMarkup(dish)).join("")}
    <div class="menu-postscriptum">${menuObj[`postScriptum${lang}`]}</div>  
    `;
  }
  function genSeshimiMarkup(menuObj) {
    return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        <div class="menu-description">${menuObj[`description${lang}`]}</div>
    </div>
    ${menuObj.types
      .map(
        type => `<div class="type-name">${type[`title${lang}`]}</div>
      ${type.dishes.map(dish => genDishMarkupOneLine(dish)).join("")}`
      )
      .join("")}`;
  }

  function genLunchMarkup(lunchObj) {
    function genDishMarkupOneLine(dish) {
      if (dish.isTypeTitle)
        return `
      <div class="dish one-line">
      <div class="title-price-section">
         <div class="lunch-sushi-type">
           <div>${dish[`title${lang}`]}</div>
         </div>
      </div>
    </div>
      `;

      return `<div class="dish one-line">
       <div class="title-price-section">
          <div class="dish-title">
            <div>${
              dish[`title${lang}`]
            }<span class="dish-description"> ${dish[`description${lang}`]}${dish.price >= 100 ? "(+ 20 ₪)" : ""}</span></div>
            ${dish.isVegi ? '<div class="veg"></div>' : ""}
          </div>
       </div>
     </div>`;
    }

    return `
  <div class="">
      <div class="lunch-title">${lunchObj[`title${lang}`]}</div>
      <div class="menu-description center">${
        lunchObj[`description${lang}`]
      }</div>
  </div>
  ${lunchObj.types
    .map(
      type =>
        `<div class="menu-title">
          <div class="lunch-type">${type[`title${lang}`]}</div>
          <div class="menu-description ">${type[`description${lang}`]}</div>
        </div>
    ${type.dishes.map(dish => genDishMarkupOneLine(dish)).join("")}`
    )
    .join("")}`;
  }

  function renderMenuPage(page) {
    dishBlockEl.innerHTML = "";
    if (page === state.seshimi)
      return dishBlockEl.insertAdjacentHTML(
        "beforeend",
        genSeshimiMarkup(page)
      );
    if (
      page === state.lunch75 ||
      page === state.lunch90 ||
      page === state.lunch105
    )
      return dishBlockEl.insertAdjacentHTML("beforeend", genLunchMarkup(page));
    if (Array.isArray(page))
      page.forEach(menu =>
        dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(menu))
      );
    else dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(page));
  }

  init();
});

// STATE

const lunchDescriptionHE =
  "ארוחה עסקית מוגשת בימי חול בלבד א'- ה',<br> בין בשעות 12:00-18:00, ביום ו' בין השעות 12:00-16:00<br> ארוחה עסקית כוללת: מנה ראשונה ומנה עיקרית<br> בנוסף, קוקטייל צהריים על בסיס סאקה ופירות טריים-  ₪ 28 <br> כוס יין צהריים לבן/ אדום/ רוזה- 28 ₪";

const lunchDescriptionEN =
  "Lunch Menu is served from Sunday to Thursday, 12:00-18:00<br>and on Friday, 12:00-16:00 (exclude holidays)<br>Lunch menu includes: first course & main course<br>In addition, noon cocktail based on sake & fruits - 28 ₪<br>wine of the month red/ white/ rose 28 ₪";

const state = {
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
      postScriptumHE: "שף <b>עידו כהן צדק</b>",
      titleEN: "Hot appetisers",
      descriptionEN: "",
      postScriptumEN: "Chef <b>Ido Cohen Zedek</b>",
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
    titleEN: "Nigiri / Seshimi",
    descriptionEN:
      "Nigiri - rice ball topped with fish or seafood<br>Seshimi - fish or seafood fillet without rice",
    postScriptumEN: "",
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
      // priceHE: "אינרי/גונקן",
      titleEN: "Gunkan / Inari",
      descriptionEN:
        "Guncan - rice ball wrapped with Nori & filled with fish / seafood / vegetables<br>Inari - sweet tofu pocket filled with rice, fish / seafood / vegetables",
      postScriptumEN: "",
      // priceEN: "inari/gunkan",
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

  hosomaki: {
    titleHE: "הוסומקי",
    descriptionHE:
      "אצת נורי במילוי אורז, דג / פרי ים / ירקות (חתוך ל-8) אינסייד אאוט (חתוך ל-4)",
    postScriptumHE: "",
    titleEN: "Hosomaki",
    descriptionEN: "Thin roll (Cut into 8)",
    postScriptumEN: "",
    dishes: [],
  },
  temaki: {
    titleHE: "טמקי - קונוס",
    descriptionHE: "קונוס נורי במילוי אורז / דג / פרי ים / ירקות",
    postScriptumHE: "",
    titleEN: "Temaki",
    descriptionEN: "Hand roll",
    postScriptumEN: "",
    dishes: [],
  },
  irodori: {
    titleHE: "אירודורי - IO",
    descriptionHE: "אורז עוטף אצה במילוי ירק / פרי ים / דג (חתוך ל-4)",
    postScriptumHE: "",
    titleEN: "Irodori i/o",
    descriptionEN: "Inside-Out roll - cut into 4",
    postScriptumEN: "",
    dishes: [],
  },
  combinations: {
    titleHE: "קומבינציות",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Combinations",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },
  lunch75: {
    titleHE: "עסקית 75 ₪",
    descriptionHE: lunchDescriptionHE,
    postScriptumHE: "",
    titleEN: "Lunch 75 ₪",
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
    titleHE: "עסקית 90 ₪",
    descriptionHE: lunchDescriptionHE,
    postScriptumHE: "",
    titleEN: "Lunch 90 ₪",
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
    titleHE: "עסקית 105 ₪",
    descriptionHE: lunchDescriptionHE,
    postScriptumHE: "",
    titleEN: "Lunch 105 ₪",
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
  wine: {
    titleHE: "יינות",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Wine",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },
  sake: {
    titleHE: "סאקה",
    descriptionHE: "",
    postScriptumHE: "",
    titleEN: "Sake & Beer",
    descriptionEN: "",
    postScriptumEN: "",
    dishes: [],
  },
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
};

const menuList = [];

class Menu {
  constructor(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi) {
    this.titleHE = titleHE;
    this.descriptionHE = descriptionHE;
    this.titleEN = titleEN;
    this.descriptionEN = descriptionEN;
    this.price = price;
    this.isVegi = isVegi;
    this._addID();
    menuList.push(this);
  }

  _addID() {
    this.id = this.titleEN.toLowerCase().replaceAll(" ", "_");
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
    state.hosomaki.dishes.push(this);
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
    state.irodori.dishes.push(this);
  }
}

// COLD APPETISERS

const wakameSalad = new ColdAppetiser(
  "סלט וואקאמה",
  "אצות וואקאמה, צנונית, מלפפון ובצל ברוטב וואפו (ניתן לבקש ללא גלוטן)",
  "Wakame Salad",
  "Wakame seaweed, radish, cucumber & onion served with Wafu sauce",
  24,
  true
);

const harusameSalad = new ColdAppetiser(
  "סלט הרוסאמה",
  "אטריות תפוחי אדמה, מלפפון, בצל ירוק וסלמון ברוטב וואפו (ניתן לבקש ללא גלוטן)",
  "Harusame Salad",
  "Cold potato noodles, cucumber, scallion & salmon served with Wafu sauce",
  32
);

const midoriSalad = new ColdAppetiser(
  "סלט מידורי",
  "סלט עלי חסה, רוקט, צנונית, מלפפון, תפוח, בצל ושקדים קלויים ברוטב למון ג'ויו (טבעוני, ללא גלוטן)",
  "Midori Salad",
  "Lettuce, rocket leaves, radish, cucumber, apple, onion, roasted almonds served with lemon jouyo sauce",
  52,
  true
);

const bottargaSoba = new ColdAppetiser(
  "בוטרגה סובה",
  "אטריות סובה עם בוטרגה, חלמון כבוש ואיקורה",
  "Bottarga Soba",
  "Soba noodles with bottarga, grated egg yolk & ikura",
  58
);

const iwaGaki = new ColdAppetiser(
  "איוואגקי",
  "אוייסטר מוגש על קרח כתוש בליווי רוטב ספייסי פונזו",
  "Iwa Gaki",
  "Fresh oyster on crushed ice served with spicy ponzu sauce",
  36
);

const boraYuzuAburaDoushi = new ColdAppetiser(
  "בורה יוזו אבורה דושי",
  "סשימי בורי בחיתוך דק צרוב בשמן שומשום חם ויוזו, סויה וג'ינג'ר",
  "Bora Yuzu Abura Doushi",
  "Grey mullet sashimi thinly sliced, seared with hot sesame oil, yuzu, soy sauce & ginger",
  52
);

const sakeAvocadoCocktail = new ColdAppetiser(
  "סאקה אבוקדו קוקטייל",
  "טרטר סלמון ואבוקדו עם סויה, ווסאבי קראנץ' בעיטור ביצי סלמון",
  "Sake & Avocado Cocktail",
  "Diced salmon & avocado tartar with wasabi seasoned beans & soy sauce topped with salmon roe",
  58
);

const maguroYukke = new ColdAppetiser(
  "מגורו יוקה",
  "טרטר טונה מתובל בסויה, בצל ירוק וחלמון ביצת שליו נא",
  "Maguro Yukke",
  "Tuna tartar seasoned with garlic, scallion & soy sauce, served with quail egg yolk",
  68
);

const maguroTataki = new ColdAppetiser(
  "מגורו טטאקי",
  "סשימי טונה צרובה, רוטב ספייסי פונזו וג'ינג'ר טרי",
  "Maguro Tataki",
  "Lightly seared & sliced tuna sashimi served with spicy ginger ponzu sauce",
  68
);

const wafuYukke = new ColdAppetiser(
  "וואפו יוקה",
  "טרטר בקר וחלמון ביצת שליו נא",
  "Wafu Yukke",
  "Beef tartar served with quail egg yolk",
  72
);

// HOT APPETISERS
const spicyEdamame = new HotAppetiser(
  "ספייסי אדה ממה",
  "פולי סויה חלוטים ומומלחים עם צ'ילי גרוס (טבעוני ללא גלוטן)",
  "Spicy Edamame",
  "",
  26,
  true
);

const omisoShiru = new HotAppetiser(
  "אומיסו שירו",
  "מרק מיסו עם אצות וואקאמה, טופו ובצל ירוק",
  "Omiso Shiru",
  "Miso soup with wakame seaweed, fresh tofu & scallion",
  28
);

const agedashiDoufu = new HotAppetiser(
  "אגדאשי דופו",
  "קוביות טופו פריכות ברוטב טנצויו חם, צנון כתוש, בצל ירוק ופטריות נמקו (ניתן לבקש טבעוני)",
  "Agedashi Doufu",
  "Crispy tofu cubes in hot tentsuyu sauce with nameko mushrooms, minced radish & scallion",
  [36, 44]
);

const dish = new HotAppetiser(
  "אבי/ איקה טמפורה",
  "שרימפ/ קלמארי טמפורה בליווי רוטב טנצויו חם, צנון וג'ינג'ר כתושים",
  "Ebi/Ika Tempura",
  "Shrimp/calamari tempura served with tentsuyu sauce, minced radish & ginger",
  38
);

const zakanaButterShoyu = new HotAppetiser(
  "סקאנה באטר שואיו",
  "נתחי בורי בחמאה, שום, סויה, סאקה ומירי",
  "Zakana Butter Shoyu",
  "Sautéed grey mullet with soy sauce, butter & garlic",
  52
);

const kaisenButterShoyu = new HotAppetiser(
  "קאיסן באטר שואיו",
  "פירות ים בחמאה, שום, סויה, סאקה ומירין",
  "Kaisen Butter Shoyu",
  "Sautéed sea food with soy sauce, butter & garlic",
  58
);

const koroUdon = new HotAppetiser(
  "קורו אודון",
  "אטריות אודון שחורות, שרימפ, בחמאה, צ'ילי ושום",
  "Koro Udon",
  "",
  58
);

// SKEWERS
const negima = new Skewer(
  "נגימה",
  "פרגית עם בצל ירוק",
  "Negima",
  "Spring chicken & scallion",
  24
);

// MAID DISHES

// const dish = new MainDish(
//   "",
//   "",
//   "",
//   "",
//   0
// )
const ingenDofu = new MainDish(
  "אינגן דופו",
  "טופו מוקפץ עם שעועית ירוקה, פטריות שמפניון ובצל לבן ברוטב יאקיניקו (טבעוני)",
  "Ingen Doufu",
  "Stir fried tofu, green beans, champignon mushrooms & onion with yakiniku sauce",
  54,
  true
);

// DESSERTS
const rio = new Dessert(
  "ריו",
  "מוס שוקולד מריר, קראנץ' נוגט וקציפת שוקולד לבן",
  "Rio",
  "",
  44
);

// SESHIMI
const sake = new SeshimiNigiri(0, "סאקה", "סלמון", "Sake", "Salmon", [18, 34]);

const bora = new SeshimiNigiri(1, "בורה", "בורי", "Bora", "Mullet", [16, 32]);

const ebi = new SeshimiNigiri(
  2,
  "אבי",
  "שרימפ מאודה",
  "Ebi",
  "Steamed shrimp",
  [14, 28]
);

const avocado = new SeshimiNigiri(3, "אבוקדו", "", "Avocado", "", ["-", 12]);

const shimaAji = new SeshimiNigiri(
  4,
  "שימה אג'י",
  "טרחון",
  "Shima-Aji",
  "Yellow jack",
  [20, 42]
);

// INARI GUNKAN
const inariYasay = new InariGunkan(
  "יאסאי קוקטייל",
  "אספרגוס טמפורה, אבוקדו, צנון מוחמץ, בצל ירוק, שומשום, שקדים קלויים וטריאקי",
  "Yasai Cocktail",
  "Asparagus tempura, avocado, pickled radish, scallion, sesame seeds, roasted almonds & teriyaki",
  [15, 19],
  true
);

// INARI SPECIAL
const specialVegitarian = new InariSpecial(
  "אינארי ספיישל צמחוני",
  "אינארי טמפורה, שיטאקה, אבוקדו, מלפפון, גזר, בצל ירוק, אספרגוס טמפורה, ספייסי מיונז וטריאקי",
  "Inari Special Vegetarian",
  "Inari tempura, Shiitake, avocado, cucumber, carrot, scallion, asparagus tempura, spicy mayonnaise & Teriyaki",
  22,
  true
);

// HOSOMAKI
const kappaMaki = new Hosomaki(
  "קאפה מאקי",
  "מלפפון ושומשום",
  "Kappa Maki",
  "Cucumber & sesame seeds",
  14,
  true
);

// TEMAKI
const californiaTemaki = new Temaki(
  "קליפורניה טמאקי",
  "סלמון, אבוקדו ומלפפון",
  "California Temaki",
  "Salmon, avocado & cucumber",
  28
);

// IRODORI
const vegiterianRoll = new Irodori(
  "רול צמחוני",
  "אבוקדו, שיטאקה, בצל ירוק, מלפפון, גזר, ספייסי מיונז וטריאקי",
  "Vegetarian Roll",
  "Shiitake, avocado, cucumber, carrot, scallion, spicy mayonnaise & teriyaki",
  22,
  true
);

//LUNCH MENU
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

state.lunch75.types[0].dishes = [wakameSalad, harusameSalad, agedashiDoufu];
state.lunch75.types[1].dishes = [ingenDofu];
state.lunch75.types[2].dishes = [];

state.lunch90.types[0].dishes = state.lunch75.types[0].dishes;
state.lunch90.types[1].dishes = [];
state.lunch90.types[2].dishes = [];

state.lunch105.types[0].dishes = [...state.lunch75.types[0].dishes];
state.lunch105.types[1].dishes = [];
state.lunch105.types[2].dishes = [
  lunchSushiTypeNigiri,
  lunchSushiTypeSeshimi,
  lunchSushiTypeIrodori,
  lunchSushiTypeHosomaki,
  lunchSushiTypeTemaki,
  lunchSushiTypeGunkan,
];
