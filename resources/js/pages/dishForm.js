"use strict";
import {
  deleleDish,
  pushDishesToState,
  Dish,
  sortDishes,
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
    const titleHE = document.getElementById("titleHE").value;
    const titleEN = document.getElementById("titleEN").value;
    if (!titleHE) return alert("שם המנה הוא שדה חובה");
    if (!titleEN) return alert("שם המנה באנגלית הוא שדה חובה");
    if (!price1) return alert("מחיר הוא שדה חובה");
    return {
      titleHE,
      titleEN,
      descriptionHE: document.getElementById("descriptionHE").value,
      descriptionEN: document.getElementById("descriptionEN").value,
      price,
      isActive: document.getElementById("isActive").checked,
      isVegi: document.getElementById("isVegi").checked,
      type: Number(document.querySelector(".select-type")?.value),
      vintage: document.getElementById("vintage")?.value,
    };
  };

  // const addID = (dish)=>{
  //   if (dish.titleEN) dish.id = dish.titleEN.toLowerCase().replaceAll(" ", "_");
  //   else dish.id = dish.descriptionEN.toLowerCase().replaceAll(" ", "_");
  // }

  const createSelectElm = (contents, selectedType) => {
    return `
    <label>סוג הפריט</label>
    <select class="select-type">
    ${contents.map(
      content =>
        `<option value="${content[0]}" ${
          selectedType === content[0] ? "selected" : ""
        }>${content[1]}</option>`
    )}
  </select>`;
  };

  // button functions
  const createNewDish = (Constructor, category) => {
    const data = readDataFromForm();
    if (!data) return;

    console.log(data);
    new Constructor({
      titleHE: data.titleHE,
      titleEN: data.titleEN,
      descriptionHE: data.descriptionHE,
      descriptionEN: data.descriptionEN,
      price: data.price,
      isActive: data.isActive,
      isVegi: data.isVegi,
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
    const priceChanged = dish.price !== price;

    dish.titleHE = data.titleHE;
    dish.titleEN = data.titleEN;
    dish.descriptionHE = data.descriptionHE;
    dish.descriptionEN = data.descriptionEN;
    dish.price = data.price;
    dish.isActive = data.isActive;
    dish.isVegi = data.isVegi;
    if (dish.type || dish.type === 0) dish.type = data.type;
    if (dish.vintage) dish.vintage = data.vintage;
    dish.updated = true;

    if (typeChanged) pushDishesToState();
    else if (priceChanged) sortDishes(dish.category);
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
      <input type="text" name="titleEN" id="titleEN" required value="${
        dish.titleEN || ""
      }">
      <label for="decription-EN">תיאור המנה באנגלית</label>
      <textarea name="descriptionEN" id="descriptionEN" cols="30" rows="4" required>${
        dish.descriptionEN || ""
      }</textarea>
      ${
        dish.vintage
          ? `<label for="vintage">בציר</label>
      <input type="text" name="vintage" id="vintage" required value="${dish.vintage}">`
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
        dish.category === "special"
          ? createSelectElm(
              [
                [0, "מנה"],
                [1, "קינוח"],
                [2, "קוקטייל"],
              ],
              dish.type
            )
          : ""
      }
      ${
        dish.category === "seshimiNigiri"
          ? createSelectElm(
              [
                [0, "דגי ים"],
                [1, "מים תתוקים"],
                [2, "פירוט ים"],
                [3, "שונות"],
                [4, "רק בעונה"],
              ],
              dish.type
            )
          : ""
      }
      
      ${
        dish.category === "wineGlass" || dish.category === "wineBottle"
          ? createSelectElm(
              [
                [0, "לבן"],
                [1, "רוזה"],
                [2, "אדום"],
              ],
              dish.type
            )
          : ""
      }

      ${
        dish.category === "spirit"
          ? createSelectElm(
              [
                ["0", "אפריטיף"],

                ["1", "וודקה"],

                ["2", "רום"],

                ["3", "ג'ין"],

                ["4", "טקילה"],

                ["5", "אניס"],

                ["6", "קוניאק"],

                ["7", "ליקרים"],

                ["8", "דיז'סטיף"],

                ["9", "ויסקי בלנדד"],

                ["10", "ויסקי אמריקאי"],

                ["11", "ויסקי סינגל מאלט"],
              ],
              dish.type
            )
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
