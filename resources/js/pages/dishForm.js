import { dishConstructors } from "../state";

const DishForm = (dish, reranderMenu, isNewDish = false) => {
  const readDataFromForm = () => ({
    titleHE: document.getElementById("titleHE").value,
    titleEN: document.getElementById("titleEN").value,
    descriptionHE: document.getElementById("descriptionHE").value,
    descriptionEN: document.getElementById("descriptionEN").value,
    price: Number(document.getElementById("price").value) || "-",
    price2: Number(document.getElementById("price2").value),
    isActive: document.getElementById("isActive").checked,
    isVegi: document.getElementById("isVegi").checked,
    type: document.querySelector(".select-type")?.value,
    vintage: document.getElementById("vintage")?.value,
  });

  const createSelectElm = (contents, className = "select-type") => {
    return `
    <label>סוג הפריט</label>
    <select class="${className}">
    ${contents.map(
      content => `<option value="${content[0]}">${content[1]}</option>`
    )}
  </select>`;
  };

  // button functions
  const createNewDish = constructor => {
    const data = readDataFromForm();
    const price = data.price2 ? [data.price, data.price2] : data.price;
    constructor(
      data.titleHE,
      data.titleEN,
      data.descriptionHE,
      data.descriptionEN,
      price,
      // data.isActive,
      data.isVegi,
      data.type,
      data.vintage
    );
  };

  const saveDishData = dish => {
    const data = readDataFromForm();
    const price = data.price2 ? [data.price, data.price2] : data.price;

    dish.titleHE = data.titleHE;
    dish.titleEN = data.titleEN;
    dish.descriptionHE = data.descriptionHE;
    dish.descriptionEN = data.descriptionEN;
    dish.price = price;
    dish.isActive = data.isActive;
    dish.isVegi = data.isVegi;
    if (dish.vintage) dish.vintage = data.vintage;
    dish.addID();
    console.log(dish);

    reranderMenu();
  };

  const deleteDish = dish => {
    if (!confirm(`למחוק פריט "${dish.titleHE}"?`)) return;
    dish.remove();
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
      <label for="decription-HE">*תיאור המנה</label>
      <textarea name="descriptionHE" id="descriptionHE" cols="30" rows="4" required>${
        dish.descriptionHE || ""
      }</textarea>
      <label for="titleEN">*שם המנה באנגלית</label>
      <input type="text" name="titleEN" id="titleEN" required value="${
        dish.titleEN || ""
      }">
      <label for="decription-EN">*תיאור המנה באנגלית</label>
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
        dish.category === "seshimiNigiri" ? "מחיר ניגירי" : "מחיר"
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
        dish.category === "seshimiNigiri" && isNewDish
          ? createSelectElm([
              [0, "דגי ים"],
              [1, "מים תתוקים"],
              [2, "פירוט ים"],
              [3, "שונות"],
              [4, "רק בעונה"],
            ])
          : ""
      }
      
      ${
        (dish.category === "wineGlass" && isNewDish) ||
        (dish.category === "wineBottle" && isNewDish)
          ? createSelectElm([
              [0, "לבן"],
              [1, "אדום"],
              [2, "רוזה"],
            ])
          : ""
      }

      ${
        dish.category === "spirit" && isNewDish
          ? createSelectElm([
              ["aperitif", "אפריטיף"],

              ["vodka", "וודקה"],

              ["rum", "רום"],

              ["gin", "ג'ין"],

              ["tequila", "טקילה"],

              ["anise", "אניס"],

              ["cognac", "קוניאק"],

              ["liqueur", "ליקרים"],

              ["digestif", "דיז'סטיף"],

              ["scotch", "ויסקי סקוטי"],

              ["american", "ויסקי אמריקאי"],

              ["irish", "ויסקי אירי"],

              ["single", "ויסקי סינגל מאלט"],
            ])
          : ""
      }
      <div>
          <input type="checkbox" name="isActive" id="isActive" ${
            dish.isActive ? "checked" : ""
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
        ? () => createNewDish(dishConstructors[dish.category])
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
