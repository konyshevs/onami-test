import $, { map } from "jquery";
import "core-js/stable";
import {
  menuList,
  state,
  favorits,
  changeFavoritesCount,
  favoritesCount,
} from "./state";

$("document").ready(function () {
  const dishBlockEl = document.querySelector(".menu");
  const lang = document.documentElement.lang.toUpperCase();
  const navConteiner = document.querySelector("#nav-container");
  const nav = document.querySelector("#nav");
  const menuBtn = document.querySelector(".menu-butt");

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

  const controlHashChange = function () {
    let id = window.location.hash.slice(1);
    if (!id) {
      id = "appetisers";
      firstLoad = true;
    }
    document
      .querySelectorAll(".nav-butt")
      .forEach(el => el.classList.remove("nav-btn-active"));
    document.getElementById(`${id}-btn`).classList.add("nav-btn-active");

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

  dishBlockEl.addEventListener("click", function (e) {
    if (!e.target.closest(".favorite")) return;
    e.target.classList.toggle("fas");
    const id = e.target.dataset.id;
    const dish = menuList.find(el => el.id === id);

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

  // MENU RENDERING
  function genDishMarkup(dish) {
    let price = Array.isArray(dish.price) ? dish.price.join("/") : dish.price;
    if (lang === "EN" && typeof dish.price[0] === "string")
      price = `${dish.price[1]}/${dish.price[0]}`;

    return `<div class="dish">
     <div class="title-price-section">
        <div class="dish-title">
        <i data-id="${
          dish.id
        }" class="far ${dish.isFavorite ? "fas" : ""} fa-heart favorite favorite-${lang}"></i>
          <div>${dish[`title${lang}`]}</div>
          ${dish.isVegi ? '<div class="veg"></div>' : ""}
        </div>
        <div class="dish-price dish-price-${lang}">${price ? "₪" : ""} ${price}</div>
     </div>
      <div class="dish-description dish-description-${lang}">${dish[`description${lang}`]} ${dish.vintage || ""}</div>
   </div>`;
  }

  function genDishMarkupOneLine(dish, favorite = false) {
    const isString = item => typeof item === "string";
    let price = Array.isArray(dish.price) ? dish.price.join("/") : dish.price;

    if (lang === "EN" && isString(dish.price[0]))
      price = `${dish.price[1]}/${dish.price[0]}`;

    return `<div class="dish one-line">
     <div class="title-price-section">
        <div class="dish-title">
        ${
          favorite
            ? `<i data-id="${dish.id}" class="far ${
                dish.isFavorite ? "fas" : ""
              } fa-heart favorite favorite-${lang}"></i>`
            : ""
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
    function genDishMarkupOneLine(dish) {
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

  function genWineMarkup(page) {
    function genWineTypeMarkup(menuObj) {
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

  function renderMenuPage(page) {
    dishBlockEl.innerHTML = "";
    if (page === state.appetisers && firstLoad) {
      page.forEach(menu =>
        dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(menu))
      );
      dishBlockEl.insertAdjacentHTML(
        "beforeend",
        `<div class="full-menu-btn btn">${
          lang === "HE" ? "תפריט מלא" : "Full menu"
        }</div>`
      );
      firstLoad = false;
      $(".full-menu-btn").on("click", openCloseMenu);
      return;
    }
    if (page === state.seshimi)
      return dishBlockEl.insertAdjacentHTML(
        "beforeend",
        genSeshimiMarkup(page[0]) + genMenuMarkup(page[1])
      );
    if (page === state.softDrinks)
      return dishBlockEl.insertAdjacentHTML(
        "beforeend",
        genMenuMarkup(page, true)
      );
    if (
      page === state.lunch75 ||
      page === state.lunch90 ||
      page === state.lunch105
    )
      return dishBlockEl.insertAdjacentHTML("beforeend", genLunchMarkup(page));

    if (page === state.combinations)
      return dishBlockEl.insertAdjacentHTML(
        "beforeend",
        genCombitionsMarkup(page)
      );
    if (page === state.wine) {
      return dishBlockEl.insertAdjacentHTML("beforeend", genWineMarkup(page));
    }

    if (page === state.favorites)
      return dishBlockEl.insertAdjacentHTML("beforeend", renderFavorites(page));
    if (Array.isArray(page))
      page.forEach(menu =>
        dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(menu))
      );
    else dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(page));
  }

  function init() {
    // window.addEventListener("resize", function (e) {
    //   if (e.currentTarget.innerWidth > 480) {
    //     navConteiner.style.display = "block";
    //     nav.style.width = "150px";
    //   }
    //   if (e.currentTarget.innerWidth < 480) {
    //     navConteiner.style.display = "none";
    //     nav.style.width = "0";
    //   }
    // });

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
