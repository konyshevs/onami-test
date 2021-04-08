import $ from "jquery";
import "core-js/stable";
import { state } from "./state.js";

$("document").ready(function () {
  const dishBlockEl = document.querySelector(".menu");
  const lang = document.documentElement.lang.toUpperCase();
  // css colors
  const color1 = getComputedStyle(document.documentElement).getPropertyValue(
    "--color1"
  );
  const color2 = getComputedStyle(document.documentElement).getPropertyValue(
    "--color2"
  );

  const controlHashChange = function () {
    const id = window.location.hash.slice(1);

    if (!id) return renderMenuPage(state.appetisers);

    renderMenuPage(state[id]);
    document.body.scrollIntoView();
  };

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
    controlHashChange();
    window.addEventListener("hashchange", controlHashChange, false);
    // renderMenuPage(state.appetisers);
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
      $("#menu-butt").css({ color: color1, "background-color": color2 });
      $("#nav-container").css({ display: "flex" });
      $("html,body").css("overflow", "hidden");
    } else {
      $("#nav").animate({ width: 0 }, 200);
      $("#menu-butt").css({ color: color2, "background-color": color1 });
      setTimeout(function () {
        $("#nav-container").css({ display: "none" });
      }, 200);
      $("html,body").css("overflow", "auto");
    }
  });

  // MENU BTNS
  // $("#nav-container").on("click", function (e) {
  //   if (e.target.classList.contains("nav-butt")) {
  //     renderMenuPage(state[e.target.dataset.link]);
  //     document.body.scrollIntoView();
  //   }
  // });

  // MENU RENDERING
  function genDishMarkup(dish) {
    let price = Array.isArray(dish.price) ? dish.price.join("/") : dish.price;
    if (lang === "EN" && typeof dish.price[0] === "string")
      price = `${dish.price[1]}/${dish.price[0]}`;

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
    const isString = item => typeof item === "string";
    let price = Array.isArray(dish.price) ? dish.price.join("/") : dish.price;

    if (lang === "EN" && isString(dish.price[0]))
      price = `${dish.price[1]}/${dish.price[0]}`;

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

  function genMenuMarkup(menuObj, oneLine = false) {
    return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
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
        <div class="menu-description">${menuObj[`description${lang}`]}</div>
    </div>
    ${menuObj.types
      .map(
        type => `<div class="type-name">${
          type[`title${lang}`]
        }<div class="price-description-seshimi">${
          menuObj[`price${lang}`] || ""
        }</div></div>
        
      ${type.dishes.map(dish => genDishMarkupOneLine(dish)).join("")}`
      )
      .join("")}`;
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
    function genWineDishMarkup(dish) {
      return `<div class="dish">
     <div class="title-price-section">
        <div class="dish-title">
          <div>${dish[`title${lang}`]}</div>
        </div>
        <div class="dish-price">${dish.price ? "₪" : ""} ${dish.price}</div>
     </div>
      <div class="dish-description">${
        dish[`description${lang}`]
      } ${dish.vintage}</div>
   </div>`;
    }

    function genWineTypeMarkup(menuObj) {
      return `
    <div class="menu-title">
        <div class="">${menuObj[`title${lang}`]}</div>
        <div class="menu-description">${menuObj[`description${lang}`]}</div>
    </div>
    ${menuObj.types
      .map(
        type => `<div class="type-name">${type[`title${lang}`]}</div>
      ${type.dishes.map(dish => genWineDishMarkup(dish)).join("")}`
      )
      .join("")}
      <div class="menu-postscriptum">${menuObj[`postScriptum${lang}`]}</div>`;
    }

    return page.map(menu => genWineTypeMarkup(menu)).join("");
  }

  function renderMenuPage(page) {
    dishBlockEl.innerHTML = "";
    if (page === state.seshimi)
      return dishBlockEl.insertAdjacentHTML(
        "beforeend",
        genSeshimiMarkup(page)
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
    if (Array.isArray(page))
      page.forEach(menu =>
        dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(menu))
      );
    else dishBlockEl.insertAdjacentHTML("beforeend", genMenuMarkup(page));
  }

  init();
});
