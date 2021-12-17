const createSelectElm = (contents, className = "select-type") => {
  return `
  <label>סוג הפריט</label>
  <select class="${className}">
  ${contents.map((content, i) => `<option value="${i}">${content}</option>`)}
</select>`;
};

const DishForm = (dish, reranderMenu) => {
  const saveDishData = dish => {
    dish.titleHE = document.getElementById("titleHE").value;
    dish.titleEN = document.getElementById("titleEN").value;
    dish.descriptionHE = document.getElementById("descriptionHE").value;
    dish.descriptionEN = document.getElementById("descriptionEN").value;
    const price = Number(document.getElementById("price").value);
    const price2 = Number(document.getElementById("price2").value);
    dish.price = price2 ? [price, price2] : price;
    dish.isActive = document.getElementById("isActive").checked;
    dish.isVegi = document.getElementById("isVegi").checked;
    if (dish.vintage) dish.vintage = document.getElementById("vintage").value;
    dish.addID();
    console.log(dish);

    reranderMenu();
  };

  const form = document.createElement("div");
  form.classList.add("form", "dish-form");
  const button = document.createElement("button");
  button.textContent = "שמור";
  button.onclick = () => saveDishData(dish);
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
      <label for="price">*מחיר</label>
      <input type="number" name="price" id="price" required value="${
        Array.isArray(dish.price) ? dish.price[0] : dish.price
      }">
      <label for="price2">מחיר נוסף</label>
      <input type="number" name="price2" id="price2" value="${
        Array.isArray(dish.price) ? dish.price[1] : ""
      }">
      
      ${
        dish.category === "seshimiNigiri"
          ? createSelectElm([
              "דגי ים",
              "מים תתוקים",
              "פירוט ים",
              "שונות",
              "רק בעונה",
            ])
          : ""
      }
      ${
        dish.category === "wineGlass" || dish.category === "wineBottle"
          ? createSelectElm(["לבן", "אדום", "רוזה"])
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
  form.append(button);

  return form;
};

export default DishForm;
