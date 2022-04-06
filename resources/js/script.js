"use strict";
import $ from "jquery";
import "core-js/actual";
import "regenerator-runtime/runtime";

// import {
//   config,
//   menuList,
//   state,
//   favorits,
//   changeFavoritesCount,
//   favoritesCount,
// } from "./state";

import DishForm from "./pages/dishForm";
import DishSelector from "./components/dish-selector.component";
import { SERVER_URL, ADMIN_PASS } from "./config";

import { AJAX } from "./helpers";

import {
  favorits,
  getMenu,
  state,
  changeFavoritesCount,
  favoritesCount,
  config,
  map,
} from "./state-server-test";

$("document").ready(function () {
  const dishBlockEl = document.querySelector(".menu");
  const lang = document.documentElement.lang.toUpperCase();
  const navConteiner = document.querySelector("#nav-container");
  const nav = document.querySelector("#nav");
  const menuBtn = document.querySelector(".menu-butt");
  const adminBarElm = document.querySelector(".admin-bar");
  const createDishBtn = document.querySelector(".create-dish");
  const fetchDishesBtn = document.querySelector(".save-changes");
  const specialConteinerElm = document.getElementById("js-special-container");

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
  let isTest = false;
  let menuList;
  let isSpacialsBtnRendered = false;
  let isOnlyLunchBtnRendered = false;
  let isNoActiveBtnRendered = false;

  const controlHashChange = function () {
    let id = window.location.hash.slice(1);

    if (id === "test") {
      isTest = true;
    }
    if (id === "admin") {
      if (isAdmin || prompt("סיסמה") === ADMIN_PASS) {
        isAdmin = true;
        adminBarElm.classList.remove("hidden");
        $("#favorites-btn").css({ display: "none" });
        addSpecialsButton();
        addOnlyLunchButton();
        addNoActiveButton();
        renderNoActiv();
        document
          .getElementById("no-active-btn")
          ?.classList.add("nav-btn-active");
        return;
      } else {
        alert("סיסמה לא נכונה!");
      }
    }
    if (id === "test") {
      isAdmin = true;
      adminBarElm.classList.remove("hidden");
      $("#favorites-btn").css({ display: "none" });
      addSpecialsButton();
      addOnlyLunchButton();
      addNoActiveButton();
    }
    if (!id || id === "admin" || id === "test" || !state[id]) {
      id = config.isSpecialsFirstPage ? "specials" : "appetisers";
      firstLoad = true;
    }
    if (isAdmin) adminBarElm.classList.remove("hidden");
    if (id === "no-active") return renderNoActiv();

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

  const addSpecialsButton = () => {
    if (isSpacialsBtnRendered) return;
    isSpacialsBtnRendered = true;
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
  };

  const addOnlyLunchButton = () => {
    if (isOnlyLunchBtnRendered) return;
    isOnlyLunchBtnRendered = true;
    specialConteinerElm.insertAdjacentHTML(
      "beforeend",
      `
    <a href="#lunch">
    <div class="nav-cat-title"></div>
    <div id="lunch-btn" class="nav-butt margin-top">
    ${lang === "HE" ? "רק בעסקיות" : "Only in lunch"}
    </div>
  </a>`
    );
  };

  const addNoActiveButton = () => {
    if (isNoActiveBtnRendered) return;
    isNoActiveBtnRendered = true;
    specialConteinerElm.insertAdjacentHTML(
      "beforeend",
      `
    <a href="#no-active">
    <div class="nav-cat-title"></div>
    <div id="no-active-btn" class="nav-butt margin-top">
    ${lang === "HE" ? "מנות לא פעילות" : "No active"}
    </div>
  </a>`
    );
  };

  // OPEN/CLOSE MENU
  function openCloseMenu() {
    if (window.outerWidth > 480) return;
    const width = $("#nav").css("width");
    if (width == "0px") {
      $("#nav").animate({ width: "150px" }, 200);
      $(".menu-butt").css({ color: color1, "background-color": color2 });
      $("#nav-container").css({ display: "flex" });
      $("html,body").css("overflow", "hidden");
      $(".menu-sign").toggleClass("fa-bars fa-times");
    } else {
      $("#nav").animate({ width: 0 }, 200);
      $(".menu-butt").css({ color: color2, "background-color": headingColor });
      setTimeout(function () {
        $("#nav-container").css({ display: "none" });
      }, 200);
      $("html,body").css("overflow", "auto");
      $(".menu-sign").toggleClass("fa-bars fa-times");
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
      dish.updated = true;
    });

    //Create dish button
    createDishBtn.addEventListener("click", function () {
      dishBlockEl.innerHTML = "";
      dishBlockEl.append(DishSelector(controlHashChange));
    });

    //Specials page config butns
    dishBlockEl.addEventListener("click", function (e) {
      const target = e.target;
      if (!target.closest(".specials-config-btn")) return;

      if (target.classList.contains("fa-toggle-on")) {
        target.classList.remove("fa-toggle-on");
        target.classList.add("fa-toggle-off");
      } else {
        target.classList.remove("fa-toggle-off");
        target.classList.add("fa-toggle-on");
      }
      if (target.classList.contains("toggle-isSpecialsOn")) {
        config.isSpecialsOn = !config.isSpecialsOn;
        console.log(config.isSpecialsOn);
      }
      if (target.classList.contains("toggle-isSpecialsFirstPage")) {
        config.isSpecialsFirstPage = !config.isSpecialsFirstPage;
        console.log(config.isSpecialsFirstPage);
      }
      config.updated = true;
    });

    //Save changes button
    fetchDishesBtn.addEventListener("click", function () {
      if (!confirm("לשלוח שינויים לממשק?")) return;
      if (isTest)
        return alert("You can't send menu updates to the server in Test Mode");
      $(".spin-wrapper").css("display", "block");
      for (let key in menuList) {
        if (menuList[key].isFavorite) menuList[key].isFavorite = false;
      }
      AJAX(SERVER_URL, { menu: Object.values(menuList), config })
        .then(data => {
          $(".spin-wrapper").css("display", "none");
          alert("שינויים נשלחו לממשק");
          console.log(data);
        })
        .catch(err => {
          $(".spin-wrapper").css("display", "none");
          alert("משהו קרה והנתונים לא נשמרו. נשו לשלוח שנית");
          console.log(err);
        });
    });
  }

  // MENU RENDERING
  const renderNoActiv = () => {
    const keys = Object.keys(map);
    dishBlockEl.innerHTML = `
    <div class="lunch-title">
    <div class="">מנות לא פעילות</div>
</div>
    `;
    keys.forEach(key => {
      if (map[key].dishes.some(dish => dish.isActive === false))
        dishBlockEl.insertAdjacentHTML(
          "beforeend",
          genMenuMarkup(map[key], false, true)
        );
    });
  };

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
       
        
          <div>${
            dish[`title${lang}`]
          } ${dish.isSpecial ? '<span class="special-sign">special</span>' : ""}</div>
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

    const genPraceMarkup = price => {
      if (Array.isArray(price)) {
        return price[1] === 0 && lang === "HE"
          ? `-/${price[0]}`
          : `${price[0] || "-"}/${price[1] || "-"}`;
      }
      return price;
    };
    const price = genPraceMarkup(dish.price);

    return `<div class="dish one-line">
     <div class="title-price-section">
        <div class="dish-title">
        ${
          isAdmin
            ? AdminButtons(dish)
            : `${favorite ? FavoriteButton(dish) : ""}`
        }
          <div class ="${
            dish.category === "hosomakiIngredient" ||
            dish.category === "irodoriIngredient"
              ? "font-weight-normal"
              : ""
          }">${dish[`title${lang}`]}<span class="dish-description"> ${dish[`description${lang}`]}</span></div>
          ${dish.isVegi ? '<div class="veg"></div>' : ""}
        </div>
        <div class="dish-price dish-price-${lang}">${price ? "₪" : ""} ${price}</div>
     </div>
   </div>`;
  }

  function genMenuMarkup(menuObj, oneLine = false, noActiveOnly = false) {
    if (!menuObj) {
      console.log("Menu object is missing");
      return "";
    }
    return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        ${
          menuObj.imageUrl && !noActiveOnly
            ? `<div class="menu-img-container"><div class="menu-img-wrapper"><img class="menu-img" src="${menuObj.imageUrl}" alt="${menuObj.titleEN}"></div></div>`
            : ""
        }
        ${
          !noActiveOnly
            ? `<div class="menu-description">${
                menuObj[`description${lang}`]
              }</div>`
            : ""
        }
        <div class="price-description">${menuObj[`price${lang}`] || ""}</div>
    </div>
    ${menuObj.dishes
      .map(dish => {
        if ((noActiveOnly && !dish.isActive) || !noActiveOnly) {
          return !dish.descriptionHE || oneLine
            ? genDishMarkupOneLine(dish)
            : genDishMarkup(dish);
        } else return "";
      })
      .join("")}`;
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
      .join("")}`;
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
    <div class="lunch-title text-align-center">
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
      if (dish.isActive)
        return `<div class="dish one-line">
       <div class="title-price-section">
          <div class="dish-title">
            <div>${dish[`title${lang}`]}<span class="dish-description"> ${
          dish[`description${lang}`]
        }${
          dish.type === 4
            ? ` ${lang === "HE" ? "(רק בעונה)" : "(Only in season)"}`
            : ""
        }${dish.price >= 100 ? "(+ 20 ₪)" : ""}</span></div>
            ${dish.isVegi ? '<div class="veg"></div>' : ""}
          </div>
       </div>
     </div>`;
    }

    return `
  <div class="">
      <div class="lunch-title">${lunchObj[`title${lang}`]}</div>
      <div class="menu-description text-align-center">${
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
          .join("")}`
      : `${menuObj.dishes.map(dish => genDishMarkup(dish)).join("")}`
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
        if (
          menu.dishes
            .filter(dish => dish.isFavorite)
            .some(dish => dish.isActive)
        )
          return genFavoritesMenuMarkup(menu);
        else return "";
      })
      .join("");
  }
  function renderSpecials(page) {
    if (!page) return "";
    function genSpecialsMenuMarkup(menuObj) {
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
    specials - config - btns;
    const messageEN = `No specials today`;
    if (!page.dishes.some(dish => dish.isActive) && !isAdmin)
      return `<div class="pop-up-container">
    <div class="pop-up">
      <p>${lang === "HE" ? messageHE : messageEN}</p>
    </div>
  </div>`;

    return (
      `<div class="">
      <div class="lunch-title">${page[`title${lang}`]}</div>
      ${
        isAdmin
          ? `
      <div class='specials-config-btns'><i class="fas specials-config-btn toggle-isSpecialsOn fa-toggle-${
        config.isSpecialsOn ? "on" : "off"
      }"></i> עמוד ספיישלים פעיל
      <br>
      <i class="fas specials-config-btn toggle-isSpecialsFirstPage fa-toggle-${
        config.isSpecialsFirstPage ? "on" : "off"
      }"></i> עמוד ספיישלים הוא עמוד הראשי</div>
      `
          : ""
      }
    
      <div class="menu-description text-align-center">${
        page[`description${lang}`]
      }</div>
  </div>` +
      page.types
        .map(menu => {
          if (
            menu.dishes.some(dish => dish.isActive) ||
            (isAdmin && menu.dishes.length > 0)
          )
            return genSpecialsMenuMarkup(menu);
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
    .join("")}`}`;
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

  async function init() {
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

    try {
      menuList = await getMenu();

      // Special menu button
      if (config.isSpecialsOn) addSpecialsButton();

      shake(".menu-butt");
      controlHashChange();
      window.addEventListener("hashchange", controlHashChange, false);
      ifPopUpStorage();
      popUpRender();
    } catch (err) {
      document.querySelector(".roll-container").innerHTML =
        lang === "HE"
          ? "מתנצלים אבל משהו השתבש.  נסו לרענן את העמוד!"
          : "Sorry, but something has gone wrong. Try to refresh the page!";
    }

//     if (config.isSpecialsOn) addSpecialsButton();
//     shake(".menu-butt");
//     controlHashChange();
//     window.addEventListener("hashchange", controlHashChange, false);
//     ifPopUpStorage();
//     popUpRender();
  }
  init();
});
