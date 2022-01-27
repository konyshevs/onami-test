import $, { map } from "jquery";
import "core-js/stable";
import {
  menuList,
  state,
  favorits,
  changeFavoritesCount,
  favoritesCount,
} from "./state";

import DishForm from "./pages/dishForm";
import DishSelector from "./components/dish-selector.component";
import { FIRS_LOADED_PAGE, IS_SPACIALS_BUTTON_ACTIVE } from "./config";

$("document").ready(function () {
  const dishBlockEl = document.querySelector(".menu");
  const lang = document.documentElement.lang.toUpperCase();
  const navConteiner = document.querySelector("#nav-container");
  const nav = document.querySelector("#nav");
  const menuBtn = document.querySelector(".menu-butt");
  const adminBarElm = document.querySelector(".admin-bar");
  const createDishBtn = document.querySelector(".create-dish");
  const specialConteinerElm = document.getElementById("js-special-container");

  console.log(JSON.stringify(state.spirits.dishes))
  
  // css colors
  const color1 = getComputedStyle(document.documentElement).getPropertyValue(
    "--color1"
  );
  const color2 = getComputedStyle(document.documentElement).getPropertyValue(
    "--color2"
  );

  const headingColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--heading-color");

  let firstLoad = false;
  let isAdmin = false;

  const controlHashChange = function () {
    let id = window.location.hash.slice(1);
    if (id === "admin") {
      isAdmin = true;
      adminBarElm.classList.remove("hidden");
    }
    if (!id || id === "admin" || !state[id]) {
      id = FIRS_LOADED_PAGE;
      firstLoad = true;
    }
    document
      .querySelectorAll(".nav-butt")
      .forEach(el => el.classList.remove("nav-btn-active"));
    document.getElementById(`${id}-btn`)?.classList.add("nav-btn-active");
    renderMenuPage(state[id]);
    document.body.scrollIntoView();
  };

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

  shake(".menu-butt");
  // OPEN/CLOSE MENU
  function openCloseMenu() {
    if (window.outerWidth > 480) return;
    const width = $("#nav").css("width");
    if (width == "0px") {
      $("#nav").animate({ width: "150px" }, 200);
      $(".menu-butt").css({ color: color1, "background-color": color2 });
      $("#nav-container").css({ display: "flex" });
      $("html,body").css("overflow", "hidden");
    } else {
      $("#nav").animate({ width: 0 }, 200);
      $(".menu-butt").css({ color: color2, "background-color": headingColor });
      setTimeout(function () {
        $("#nav-container").css({ display: "none" });
      }, 200);
      $("html,body").css("overflow", "auto");
    }
  }

  $(".menu-butt, #nav-container").on("click", openCloseMenu);

  // MENU BTNS
  // $("#nav-container").on("click", function (e) {
  //   if (e.target.classList.contains("nav-butt")) {
  //     renderMenuPage(state[e.target.dataset.link]);
  //     document.body.scrollIntoView();
  //   }
  // });

  // FAVORITS LOGIC

  function FavoriteButton(dish) {
    if (!dish) {
      console.log("Dish is missing");
      return "";
    }
    return `<i data-id="${
      dish.id
    }" class="far ${dish.isFavorite ? "fas" : ""} fa-heart favorite favorite-${lang}"></i>`;
  }

  dishBlockEl.addEventListener("click", function (e) {
    if (!e.target.closest(".dish-title")) return;
    const target =
      e.target.closest(".favorite") || e.target.previousElementSibling;
    if (!target) return;
    target.classList.toggle("fas");
    const id = target.dataset.id;
    const dish = menuList[id];

    if (dish.isFavorite) {
      dish.isFavorite = false;
      changeFavoritesCount("-");
      const index = favorits.findIndex(el => el === id);
      favorits.splice(index, 1);
    } else {
      dish.isFavorite = true;
      changeFavoritesCount("+");
      favorits.push(id);
    }

    localStorage.setItem("favorits", JSON.stringify(favorits));
  });

  // POP-UP LOGIC
  const ifPopUp = {
    HE: true,
    EN: true,
  };

  function ifPopUpStorage() {
    const storage =
      lang === "HE"
        ? localStorage.getItem("ifPopUpHE")
        : localStorage.getItem("ifPopUpEN");
    if (storage) ifPopUp[lang] = JSON.parse(storage);
  }

  function popUpRender() {
    if (!ifPopUp[lang]) return;
    setTimeout(function () {
      $(".pop-up-wrapper").fadeIn(500);
      $("html,body").css("overflow", "hidden");

      ifPopUp[lang] = false;
      if (lang === "HE")
        localStorage.setItem("ifPopUpHE", JSON.stringify(ifPopUp.HE));
      if (lang === "EN")
        localStorage.setItem("ifPopUpEN", JSON.stringify(ifPopUp.EN));
    }, 1000);

    $(".ok-btn, .pop-up-wrapper").on("click", function () {
      $(".pop-up-wrapper").fadeOut();
      $("html,body").css("overflow", "auto");
    });
  }

  //ADMIN LOGIC

  function AdminButtons(dish) {
    if (!dish) {
      console.log("Dish is missing");
      return "";
    }
    return ` <div class='admin-buttons'>
    <i data-id="${
      dish.id
    }" class="fas toggle-dish fa-toggle-${dish.isActive ? "on" : "off"}"></i>
    <i data-id="${dish.id}" class="edit fas fa-pen-square"></i>
    </div>`;
  }

  if (lang === "HE") {
    //Edit button
    dishBlockEl.addEventListener("click", function (e) {
      if (!e.target.closest(".edit")) return;
      const id = e.target.dataset.id;
      const dish = menuList[id];
      dishBlockEl.innerHTML = "";
      dishBlockEl.append(DishForm(dish, controlHashChange));
    });

    //Toggle button
    dishBlockEl.addEventListener("click", function (e) {
      const target = e.target;
      if (!target.closest(".toggle-dish")) return;

      if (target.classList.contains("fa-toggle-on")) {
        target.classList.remove("fa-toggle-on");
        target.classList.add("fa-toggle-off");
      } else {
        target.classList.remove("fa-toggle-off");
        target.classList.add("fa-toggle-on");
      }
      const id = target.dataset.id;
      const dish = menuList[id];
      dish.isActive = !dish.isActive;
    });

    //Create dish button
    createDishBtn.addEventListener("click", function () {
      dishBlockEl.innerHTML = "";
      dishBlockEl.append(DishSelector(controlHashChange));
    });
  }

  // MENU RENDERING
  function genDishMarkup(dish) {
    if (!dish) {
      console.log("Dish is missing");
      return "";
    }
    if (!dish.isActive && !isAdmin) return "";

    let price = Array.isArray(dish.price) ? dish.price.join("/") : dish.price;
    if (lang === "EN" && typeof dish.price[0] === "string")
      price = `${dish.price[1]}/${dish.price[0]}`;

    return `<div class="dish">
     <div class="title-price-section">
        <div class="dish-title">
        ${isAdmin ? AdminButtons(dish) : FavoriteButton(dish)}
       
        
          <div>${dish[`title${lang}`]}</div>
          ${dish.isVegi ? '<div class="veg"></div>' : ""}
        </div>
        <div class="dish-price dish-price-${lang}">${price ? "₪" : ""} ${price}</div>
     </div>
      <div class="dish-description dish-description-${lang}">${dish[`description${lang}`]} ${dish.vintage || ""}</div>
   </div>`;
  }

  function genDishMarkupOneLine(dish, favorite = false) {
    if (!dish) {
      console.log("Dish is missing");
      return "";
    }

    if (!dish.isActive && !isAdmin) return "";

    const isString = item => typeof item === "string";
    let price = Array.isArray(dish.price) ? dish.price.join("/") : dish.price;

    if (lang === "EN" && isString(dish.price[0]))
      price = `${dish.price[1]}/${dish.price[0]}`;

    return `<div class="dish one-line">
     <div class="title-price-section">
        <div class="dish-title">
        ${
          isAdmin
            ? AdminButtons(dish)
            : `${favorite ? FavoriteButton(dish) : ""}`
        }
          <div>${
            dish[`title${lang}`]
          }<span class="dish-description"> ${dish[`description${lang}`]}</span></div>
          ${dish.isVegi ? '<div class="veg"></div>' : ""}
        </div>
        <div class="dish-price dish-price-${lang}">${price ? "₪" : ""} ${price}</div>
     </div>
   </div>`;
  }

  function genMenuMarkup(menuObj, oneLine = false) {
    if (!menuObj) {
      console.log("Menu object is missing");
      return "";
    }
    return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        ${
          menuObj.imageUrl
            ? `<div class="menu-img-container"><div class="menu-img-wrapper"><img class="menu-img" src="${menuObj.imageUrl}" alt="${menuObj.titleEN}"></div></div>`
            : ""
        }
        <div class="menu-description">${menuObj[`description${lang}`]}</div>
        <div class="price-description">${menuObj[`price${lang}`] || ""}</div>
    </div>
    ${menuObj.dishes
      .map(dish =>
        !dish.titleHE || oneLine
          ? genDishMarkupOneLine(dish)
          : genDishMarkup(dish)
      )
      .join("")}
    <div class="menu-postscriptum">${menuObj[`postScriptum${lang}`]}</div>
    `;
  }
  function genSeshimiMarkup(menuObj) {
    if (!menuObj) {
      console.log("Menu object is missing");
      return "";
    }
    return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        ${
          menuObj.imageUrl
            ? `<div class="menu-img-container"><div class="menu-img-wrapper"><img class="menu-img" src="${menuObj.imageUrl}" alt="${menuObj.titleEN}"></div></div>`
            : ""
        }
        <div class="menu-description">${menuObj[`description${lang}`]}</div>
    </div>
    ${menuObj.types
      .map(
        type => `<div class="type-name">${
          type[`title${lang}`]
        }<div class="price-description-seshimi">${
          menuObj[`price${lang}`] || ""
        }</div></div>

      ${type.dishes.map(dish => genDishMarkupOneLine(dish, true)).join("")}`
      )
      .join("")}
      <div class="menu-postscriptum">${menuObj[`postScriptum${lang}`]}</div>`;
  }

  function genCombitionsMarkup(menuObj) {
    if (!menuObj) {
      console.log("Menu object is missing");
      return "";
    }
    function genDishMarkupOneLine(dish) {
      if (!dish) {
        console.log("Dish is missing");
        return "";
      }
      return `<div class="dish one-line">
       <div class="title-price-section">
          <div class="dish-title">
            <div>${
              dish[0][`title${lang}`]
            }${dish[1].type ? ` ${dish[1].type[lang]}` : ""}<span class="dish-description"> ${dish[0][`description${lang}`]} (${dish[1][lang]})</span></div>
          </div>
       </div>
     </div>`;
    }

    return `
    <div class="lunch-title center">
        <div class="">${menuObj[`title${lang}`]}</div>
    </div>
    ${menuObj.types
      .map(
        type => `
        <div class="dish one-line, margin-top">
           <div class="title-price-section">
              <div class="combi-title">
                <div>${type[`title${lang}`]}</div>
                ${type.isVegi ? '<div class="veg"></div>' : ""}
              </div>
              <div class="combi-price">${type.price ? "₪" : ""} ${
          type.price
        }</div>
           </div>
         </div>
      ${type.dishes.map(dish => genDishMarkupOneLine(dish)).join("")}`
      )
      .join("")}`;
  }

  function genLunchMarkup(lunchObj) {
    if (!lunchObj) return "";
    function genDishMarkupOneLine(dish) {
      if (!dish) {
        console.log("Dish is missing");
        return "";
      }
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

  function genWineMarkup(page) {
    if (!page) return "";
    function genWineTypeMarkup(menuObj) {
      if (!menuObj) {
        console.log("Menu object is missing");
        return "";
      }
      return `
      <div class="menu-title">
      <div class="">${menuObj[`title${lang}`]}</div>
      <div class="menu-description">${menuObj[`description${lang}`]}</div>
  </div>
  ${
    menuObj.types
      ? `${menuObj.types
          .map(
            type => `<div class="type-name">${type[`title${lang}`]}</div>
        ${type.dishes.map(dish => genDishMarkup(dish)).join("")}`
          )
          .join("")}
        <div class="menu-postscriptum">${menuObj[`postScriptum${lang}`]}</div>`
      : `${menuObj.dishes.map(dish => genDishMarkup(dish)).join("")}
  <div class="menu-postscriptum">${menuObj[`postScriptum${lang}`]}</div>`
  }`;
    }
    return page.map(menu => genWineTypeMarkup(menu)).join("");
  }

  function renderFavorites(page) {
    function genFavoritesMenuMarkup(menuObj) {
      if (!menuObj) {
        console.log("Menu object is missing");
        return "";
      }
      return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        <div class="price-description">${menuObj[`price${lang}`] || ""}</div>
    </div>
    ${menuObj.dishes
      .map(dish => (dish.isFavorite ? genDishMarkup(dish) : ""))
      .join("")}
    `;
    }

    const messageHE = `לא נבחרו מנות מועדפות עדיין
    <p>סמנו מנות אהובות, גם לפעם הבאה</p>`;
    const messageEN = `No favorite dishes have been selected yet. <p>You can mark dishes you liked</p>`;
    if (!favoritesCount)
      return `<div class="pop-up-container">
    <div class="pop-up">
      <p>${lang === "HE" ? messageHE : messageEN}</p>
      <p>
        <i class="far fa-heart"></i>
        <i class="fas fa-angle-double-left"></i>
        <i class="fas fa-heart"></i>
      </p>
    </div>
  </div>`;

    return page
      .map(menu => {
        if (menu.dishes.filter(dish => dish.isFavorite).length > 0)
          return genFavoritesMenuMarkup(menu);
        else return "";
      })
      .join("");
  }
  function renderSpecials(page) {
    if (!page) return "";
    function genFavoritesMenuMarkup(menuObj) {
      if (!menuObj) {
        console.log("Menu object is missing");
        return "";
      }
      return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        <div class="price-description">${menuObj[`price${lang}`] || ""}</div>
    </div>
    ${menuObj.dishes.map(dish => genDishMarkup(dish)).join("")}
    `;
    }

    const messageHE = `אין ספיישלים היום`;
    const messageEN = `No specials today`;
    if (!page.dishes[0])
      return `<div class="pop-up-container">
    <div class="pop-up">
      <p>${lang === "HE" ? messageHE : messageEN}</p>
    </div>
  </div>`;

    return (
      `<div class="">
      <div class="lunch-title">${page[`title${lang}`]}</div>
      <div class="menu-description center">${page[`description${lang}`]}</div>
  </div>` +
      page.types
        .map(menu => {
          if (menu.dishes.length > 0) return genFavoritesMenuMarkup(menu);
          else return "";
        })
        .join("")
    );
  }

  function genSpiritMarkup(page) {
    if (!page) return "";
    return `
      <div class="menu-title">
      <div class="">${page[`title${lang}`]}</div>
      <div class="menu-description">${page[`description${lang}`]}</div>
  </div>
  ${`${Object.keys(page.types)
    .map(
      key => `<div class="type-name">${page.types[key][`title${lang}`]}</div>
    ${page.types[key].dishes.map(dish => genDishMarkupOneLine(dish)).join("")}`
    )
    .join("")}
    <div class="menu-postscriptum">${page[`postScriptum${lang}`]}</div>`}`;
  }

  function renderMenuPage(page) {
    if (!page) return;
    dishBlockEl.innerHTML = "";
    if (page === state.specials)
      dishBlockEl.insertAdjacentHTML("beforeend", renderSpecials(page));
    else if (page === state.seshimi)
      dishBlockEl.insertAdjacentHTML(
        "beforeend",
        genSeshimiMarkup(page[0]) + genMenuMarkup(page[1])
      );
    else if (page === state.softDrinks)
      dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(page, true));
    else if (
      page === state.lunch75 ||
      page === state.lunch90 ||
      page === state.lunch105
    )
      dishBlockEl.insertAdjacentHTML("beforeend", genLunchMarkup(page));
    else if (page === state.combinations)
      dishBlockEl.insertAdjacentHTML("beforeend", genCombitionsMarkup(page));
    else if (page === state.wine) {
      dishBlockEl.insertAdjacentHTML("beforeend", genWineMarkup(page));
    } else if (page === state.favorites)
      dishBlockEl.insertAdjacentHTML("beforeend", renderFavorites(page));
    else if (page === state.spirits)
      dishBlockEl.insertAdjacentHTML("beforeend", genSpiritMarkup(page));
    else if (Array.isArray(page))
      page.forEach(menu =>
        dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(menu))
      );
    else dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(page));
    if (firstLoad) {
      dishBlockEl.insertAdjacentHTML(
        "beforeend",
        `<div class="full-menu-btn btn">${
          lang === "HE" ? "תפריט מלא" : "Full menu"
        }</div>`
      );
      firstLoad = false;
      $(".full-menu-btn").on("click", openCloseMenu);
    }
  }

  function init() {
    // Special menu button
    if (IS_SPACIALS_BUTTON_ACTIVE) {
      specialConteinerElm.insertAdjacentHTML(
        "beforeend",
        `
      <a href="#specials">
      <div class="nav-cat-title"></div>
      <div id="specials-btn" class="nav-butt margin-top">
      ${lang === "HE" ? "ספיישלים" : "specials"}
      </div>
    </a>`
      );
    }

    // @media query
    window.matchMedia("(max-width: 480px)").addListener(function (e) {
      if (e.matches) {
        navConteiner.style.display = "none";
        nav.style.width = "0";
        menuBtn.style.cssText =
          "color: var(--color2); background-color: var(--heading-color);";
      } else {
        navConteiner.style.display = "block";
        nav.style.width = "150px";
      }
    });

    controlHashChange();
    window.addEventListener("hashchange", controlHashChange, false);
    ifPopUpStorage();
    popUpRender();
    // renderMenuPage(state.appetisers);
  }
  init();
});
