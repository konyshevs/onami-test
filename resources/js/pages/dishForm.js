"use strict";
import {
  pushDishesToState,
  Dish,
  sortDishes,
  inputTypes,
  genId,
  menuList,
} from "../state-server-test";

const DishForm = (dish, reranderMenu, isNewDish = false) => {
  window.onbeforeunload = function (e) {
    var dialogText = "אם השינויים לא נשלחו לממשק הם לא ישמרו";
    e.returnValue = dialogText;
    return dialogText;
  };

  const readDataFromForm = () => {
    const price1 = document.getElementById("price").value;
    const price2 = document.getElementById("price2").value;
    const price = price2 ? [Number(price1), Number(price2)] : Number(price1);
    const titleHE = document.getElementById("titleHE").value.trim();
    const titleEN = document.getElementById("titleEN").value.trim();
    const type = document.querySelector(".select-type")?.value;
    if (!titleHE) return alert("שם המנה הוא שדה חובה");
    if (!titleEN) return alert("שם המנה באנגלית הוא שדה חובה");
    if (!price1) return alert("מחיר הוא שדה חובה");
    return {
      titleHE,
      titleEN,
      descriptionHE: document.getElementById("descriptionHE").value.trim(),
      descriptionEN: document.getElementById("descriptionEN").value.trim(),
      price,
      isActive: document.getElementById("isActive").checked,
      isVegi: document.getElementById("isVegi").checked,
      isSpecial: document.getElementById("isSpecial").checked,
      type: type ? Number(type) : undefined,
      vintage: document.getElementById("vintage")?.value,
    };
  };

  const createSelectElm = (contents, selectedType) => {
    return `
    <label>סוג הפריט</label>
    <select class="select-type">
    ${contents.map(
      content =>
        `<option value="${content[0]}" ${
          selectedType == content[0] ? "selected" : ""
        }>${content[1]}</option>`
    )}
  </select>`;
  };

  // button functions
  const createNewDish = (Constructor, category) => {
    const data = readDataFromForm();
    if (!data) return;
    const id = genId(data.titleEN, category);
    if (menuList[id])
      return alert(
        `פריט "${data.titleEN}" כבר קיים. נסו לשנות את שם הפריט באנגלית`
      );
    console.log(data);
    new Constructor({
      id,
      titleHE: data.titleHE,
      titleEN: data.titleEN,
      descriptionHE: data.descriptionHE,
      descriptionEN: data.descriptionEN,
      price: data.price,
      isActive: data.isActive,
      isVegi: data.isVegi,
      isSpecial: data.isSpecial,
      type: data.type,
      vintage: data.vintage,
      category,
    });
    alert(`פריט "${data.titleHE}" נשמר בהצלחה`);
    pushDishesToState();

    reranderMenu();
  };

  const saveDishData = dish => {
    const data = readDataFromForm();
    if (!data) return;
    const typeChanged =
      dish.type || dish.type === 0 ? dish.type !== data.type : false;
    const priceChanged = dish.price != data.price;
    const isSpecialChanged = dish.isSpecial !== data.isSpecial;

    dish.titleHE = data.titleHE;
    dish.titleEN = data.titleEN;
    dish.descriptionHE = data.descriptionHE;
    dish.descriptionEN = data.descriptionEN;
    dish.price = data.price;
    dish.isVegi = data.isVegi;
    dish.isSpecial = data.isSpecial;
    dish.isActive = data.isActive;
    if (dish.type || dish.type === 0) dish.type = data.type;
    if (dish.vintage) dish.vintage = data.vintage;
    dish.updated = true;
    if (typeChanged || isSpecialChanged) pushDishesToState();
    if (priceChanged) sortDishes(dish.category);
    console.log(dish);
    reranderMenu();
  };

  const deleteDish = dish => {
    if (!confirm(`למחוק פריט "${dish.titleHE}"?`)) return;
    dish.deleted = true;
    pushDishesToState();
    console.log(`Dish "${dish.titleEN}" deleted`);
    alert(`"${dish.titleHE}" היה ונעלם`);
    reranderMenu();
  };
  const cancel = () => reranderMenu();
  const form = document.createElement("div");
  form.classList.add("form", "dish-form");

  const createButton = (content, func) => {
    const button = document.createElement("button");
    button.insertAdjacentHTML("beforeend", content);
    button.onclick = func;
    return button;
  };

  form.innerHTML = `
      
      <label for="titleHE">*שם המנה</label>
      <input type="text" name="titleHE" id="titleHE" required value="${
        dish.titleHE || ""
      }">
      <label for="decription-HE">תיאור המנה</label>
      <textarea name="descriptionHE" id="descriptionHE" cols="30" rows="4" required>${
        dish.descriptionHE || ""
      }</textarea>
      <label for="titleEN">*שם המנה באנגלית</label>
      <input lang="en" dir="ltr" type="text" name="titleEN" id="titleEN" required value="${
        dish.titleEN || ""
      }">
      <label for="decription-EN">תיאור המנה באנגלית</label>
      <textarea dir="ltr" lang="en" name="descriptionEN" id="descriptionEN" cols="30" rows="4" required>${
        dish.descriptionEN || ""
      }</textarea>
      ${
        dish.category === "wineGlass" ||
        dish.category === "wineBottle" ||
        dish.category === "wineCellar"
          ? `<label for="vintage">בציר</label>
      <input type="text" name="vintage" id="vintage" required value="${
        dish.vintage || ""
      }">`
          : ""
      }
      <label for="price">${
        dish.category === "seshimiNigiri" ? "*מחיר ניגירי" : "*מחיר"
      }</label>
      <input type="number" name="price" id="price" required value="${
        Array.isArray(dish.price) ? dish.price[0] : dish.price
      }">
      <label for="price2">${
        dish.category === "seshimiNigiri" ? "מחיר סשימי" : "מחיר נוסף"
      }</label>
      <input type="number" name="price2" id="price2" value="${
        Array.isArray(dish.price) ? dish.price[1] : ""
      }">
      ${
        inputTypes[dish.category]
          ? createSelectElm(inputTypes[dish.category], dish.type)
          : ""
      }
      
      ${
        dish.category === "wineGlass" || dish.category === "wineBottle"
          ? createSelectElm(inputTypes.wine, dish.type)
          : ""
      }
      <div>
          <input type="checkbox" name="isActive" id="isActive" ${
            dish.isActive || isNewDish ? "checked" : ""
          }>
          <label class="label-checkbox" for="isActive">פעיל</label>
      </div>
      <div>
          <input type="checkbox" name="isVegi" id="isVegi" ${
            dish.isVegi ? "checked" : ""
          }>
          <label class="label-checkbox" for="isVegi">טבעוני</label>
      </div>
      <div>
      <input type="checkbox" name="isSpecial" id="isSpecial" ${
        dish.isSpecial || dish.category === "special" ? "checked" : ""
      }>
      <label class="label-checkbox" for="isSpecial">ספיישל</label>
  </div>`;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("formButtonsContainer");
  buttonsContainer.append(
    createButton(
      isNewDish ? "צור מנה" : "שמור",
      isNewDish
        ? () => createNewDish(Dish, dish.category)
        : () => saveDishData(dish)
    )
  );
  buttonsContainer.append(createButton("ביטול", () => cancel()));
  if (!isNewDish)
    buttonsContainer.append(
      createButton('<i class="far fa-trash-alt"></i>', () => deleteDish(dish))
    );

  form.append(buttonsContainer);

  return form;
};

export default DishForm;
