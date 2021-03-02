$("document").ready(function () {
  const dishBlockEl = document.querySelector(".menu");
  const lang = document.documentElement.lang.toUpperCase();

  // Меняет направление отступа для английской версии для большого экрана
  if (lang === "EN" && window.innerWidth > 480)
    dishBlockEl.style.margin = "45px 0 0 150px";

  window.addEventListener("resize", function (e) {
    console.log(e);
    if (e.currentTarget.innerWidth > 480 && lang === "EN")
      dishBlockEl.style.margin = "45px 0 0 150px";
    if (e.currentTarget.innerWidth < 480 && lang === "EN")
      dishBlockEl.style.margin = "45px 0 0 0";
  });

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

  function genMenuMarkup(menuObj) {
    function gendishMarkup(dish) {
      const price = Array.isArray(dish.price)
        ? dish.price.join("/")
        : dish.price;

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

    // <div class="price-description">${menuObj[`price${lang}`] || ""}</div>
    return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        <div class="menu-description dish-description">${
          menuObj[`description${lang}`]
        }</div>
    </div>
    ${menuObj.dishes.map(dish => gendishMarkup(dish)).join("")}
    <div class="menu-postscriptum">${menuObj[`postScriptum${lang}`]}</div>  
    `;
  }

  function renderMenuPage(page) {
    dishBlockEl.innerHTML = "";
    if (Array.isArray(page))
      page.forEach(menu =>
        dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(menu))
      );
    else dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(page));
  }
});

// STATE

const state = {
  appetisers: [
    {
      titleHE: "ראשונות קרות",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Cold appetisers",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [
        {
          titleHE: "סלט וואקאמה",
          descriptionHE:
            "אצות וואקאמה, צנונית, מלפפון ובצל ברוטב וואפו (ניתן לבקש ללא גלוטן)",
          titleEN: "",
          descriptionEN: "",
          price: 24,
          isVegi: true,
          imgUrl: "",
        },
        {
          titleHE: "סלט הרוסאמה",
          descriptionHE:
            "אטריות תפוחי אדמה, מלפפון, בצל ירוק וסלמון ברוטב וואפו (ניתן לבקש ללא גלוטן)",
          titleEN: "",
          descriptionEN: "",
          price: 32,
          isVegi: false,
          imgUrl: "",
        },
        {
          titleHE: "סלט מידורי",
          descriptionHE:
            "סלט עלי חסה, רוקט, צנונית, מלפפון, תפוח, בצל ושקדים קלויים ברוטב למון ג'ויו (טבעוני, ללא גלוטן)",
          titleEN: "",
          descriptionEN: "",
          price: 52,
          isVegi: true,
          imgUrl: "",
        },
      ],
    },
    {
      titleHE: "ראשונות חמות",
      descriptionHE: "",
      postScriptumHE: "",
      titleEN: "Hot appetisers",
      descriptionEN: "",
      postScriptumEN: "",
      dishes: [
        {
          titleHE: "אדה ממה",
          descriptionHE: "פולי סויה חלוטים ומומלחים (טבעוני ללא גלוטן)",
          titleEN: "",
          descriptionEN: "",
          price: 26,
          isVegi: true,
          imgUrl: "",
        },
        {
          titleHE: "אומיסו שירו",
          descriptionHE: "מרק מיסו עם אצות וואקאמה, טופו ובצל ירוק",
          titleEN: "",
          descriptionEN: "",
          price: 28,
          isVegi: false,
          imgUrl: "",
        },
        {
          titleHE: "אגדאשי דופו",
          descriptionHE:
            "קוביות טופו פריכות ברוטב טנצויו חם, צנון כתוש, בצל ירוק ופטריות נמקו (ניתן לבקש טבעוני)",
          titleEN: "",
          descriptionEN: "",
          price: [36, 44],
          isVegi: false,
          imgUrl: "",
        },
      ],
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
    titleEN: "Main dishes",
    descriptionEN: "",
    postScriptumEN: "",
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
    dishes: [],
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
    titleHE: "עסקית 75",
    descriptionHE:
      "ארוחה עסקית מוגשת בימי חול בלבד א'- ה',<br> בין בשעות 12:00-18:00, ביום ו' בין השעות 12:00-16:00<br> ארוחה עסקית כוללת: מנה ראשונה ומנה עיקרית<br> בנוסף, קוקטייל צהריים על בסיס סאקה ופירות טריים-  ₪ 28 <br> כוס יין צהריים לבן/ אדום/ רוזה- 28 ₪ ",
    postScriptumHE: "",
    titleEN: "Lunch 75",
    descriptionEN:
      "Lunch Menu is served from Sunday to Thursday, 12:00-18:00<br>and on Friday, 12:00-16:00 (exclude holidays)<br>Lunch menu includes: first course & main course<br>In addition, noon cocktail based on sake & fruits - 28 ₪<br>wine of the month red/ white/ rose 28 ₪",
    postScriptumEN: "",
    dishes: [],
  },
  lunch90: {
    titleHE: "עסקית 90",
    descriptionHE:
      "ארוחה עסקית מוגשת בימי חול בלבד א'- ה',<br> בין בשעות 12:00-18:00, ביום ו' בין השעות 12:00-16:00<br> ארוחה עסקית כוללת: מנה ראשונה ומנה עיקרית<br> בנוסף, קוקטייל צהריים על בסיס סאקה ופירות טריים-  ₪ 28 <br> כוס יין צהריים לבן/ אדום/ רוזה- 28 ₪ ",
    postScriptumHE: "",
    titleEN: "Lunch 90",
    descriptionEN:
      "Lunch Menu is served from Sunday to Thursday, 12:00-18:00<br>and on Friday, 12:00-16:00 (exclude holidays)<br>Lunch menu includes: first course & main course<br>In addition, noon cocktail based on sake & fruits - 28 ₪<br>wine of the month red/ white/ rose 28 ₪",
    postScriptumEN: "",
    dishes: [],
  },
  lunch105: {
    titleHE: "עסקית 105",
    descriptionHE:
      "ארוחה עסקית מוגשת בימי חול בלבד א'- ה',<br> בין בשעות 12:00-18:00, ביום ו' בין השעות 12:00-16:00<br> ארוחה עסקית כוללת: מנה ראשונה ומנה עיקרית<br> בנוסף, קוקטייל צהריים על בסיס סאקה ופירות טריים-  ₪ 28 <br> כוס יין צהריים לבן/ אדום/ רוזה- 28 ₪ ",
    postScriptumHE: "",
    titleEN: "Lunch 105",
    descriptionEN:
      "Lunch Menu is served from Sunday to Thursday, 12:00-18:00<br>and on Friday, 12:00-16:00 (exclude holidays)<br>Lunch menu includes: first course & main course<br>In addition, noon cocktail based on sake & fruits - 28 ₪<br>wine of the month red/ white/ rose 28 ₪",
    postScriptumEN: "",
    dishes: [],
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
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
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
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.appetisers[1].dishes.push(this);
  }
}

class Skewer extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.skewers.dishes.push(this);
  }
}

class MainDish extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.mainDishes.dishes.push(this);
  }
}

class Dessert extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.desserts.dishes.push(this);
  }
}

class SeshimiNigiri extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.seshimi.dishes.push(this);
  }
}

class InariGunkan extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.inari[0].dishes.push(this);
  }
}

class InariSpecial extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.inari[1].dishes.push(this);
  }
}

class Hosomaki extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.hosomaki.dishes.push(this);
  }
}

class Temaki extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.temaki.dishes.push(this);
  }
}

class Irodori extends Menu {
  constructor(
    titleHE,
    descriptionHE,
    titleEN = "",
    descriptionEN = "",
    price = 0,
    isVegi = false
  ) {
    super(titleHE, descriptionHE, titleEN, descriptionEN, price, isVegi);
    state.irodori.dishes.push(this);
  }
}

// const dish = new ColdAppetiser(
//   "",
//   "",
//   "",
//   "",
//   0
// )

const botargaSoba = new ColdAppetiser(
  "בוטרגה סובה",
  "אטריות סובה עם בוטרגה, חלמון כבוש ואיקורה",
  "Bottarga Soba",
  "Soba noodles with bottarga, grated egg yolk & ikura",
  58
);

const dish = new HotAppetiser(
  "אבי/ איקה טמפורה",
  "שרימפ/ קלמארי טמפורה בליווי רוטב טנצויו חם, צנון וג'ינג'ר כתושים",
  "Ebi/Ika Tempura",
  "Shrimp/calamari tempura served with tentsuyu sauce, minced radish & ginger",
  58
);

const negima = new Skewer(
  "נגימה",
  "פרגית עם בצל ירוק",
  "Negima",
  "Spring chicken & scallion",
  24
);

const ingenDofu = new MainDish(
  "אינגן דופו",
  "טופו מוקפץ עם שעועית ירוקה, פטריות שמפניון ובצל לבן ברוטב יאקיניקו (טבעוני)",
  "Ingen Doufu",
  "Stir fried tofu, green beans, champignon mushrooms & onion with yakiniku sauce",
  54,
  true
);

const rio = new Dessert(
  "ריו",
  "מוס שוקולד מריר, קראנץ' נוגט וקציפת שוקולד לבן",
  "Rio",
  "",
  44
);

const seshimiSake = new SeshimiNigiri("סאקה", "סלמון", "Sake", "Salmon", [
  18,
  34,
]);

const inariYasay = new InariGunkan(
  "יאסאי קוקטייל",
  "אספרגוס טמפורה, אבוקדו, צנון מוחמץ, בצל ירוק, שומשום, שקדים קלויים וטריאקי",
  "Yasai Cocktail",
  "Asparagus tempura, avocado, pickled radish, scallion, sesame seeds, roasted almonds & teriyaki",
  [15, 19],
  true
);

const specialVegitarian = new InariSpecial(
  "אינארי ספיישל צמחוני",
  "אינארי טמפורה, שיטאקה, אבוקדו, מלפפון, גזר, בצל ירוק, אספרגוס טמפורה, ספייסי מיונז וטריאקי",
  "Inari Special Vegetarian",
  "Inari tempura, Shiitake, avocado, cucumber, carrot, scallion, asparagus tempura, spicy mayonnaise & Teriyaki",
  22,
  true
);

const kappaMaki = new Hosomaki(
  "קאפה מאקי",
  "מלפפון ושומשום",
  "Kappa Maki",
  "Cucumber & sesame seeds",
  14,
  true
);

const californiaTemaki = new Temaki(
  "קליפורניה טמאקי",
  "סלמון, אבוקדו ומלפפון",
  "California Temaki",
  "Salmon, avocado & cucumber",
  28
);

const vegiterianRoll = new Irodori(
  "רול צמחוני",
  "אבוקדו, שיטאקה, בצל ירוק, מלפפון, גזר, ספייסי מיונז וטריאקי",
  "Vegetarian Roll",
  "Shiitake, avocado, cucumber, carrot, scallion, spicy mayonnaise & teriyaki",
  22,
  true
);
