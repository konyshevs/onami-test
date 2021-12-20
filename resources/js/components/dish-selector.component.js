import { dishConstructors } from "../state";
import DishForm from "../pages/dishForm";
const dishBlockEl = document.querySelector(".menu");

const DishSelector = controlHashChange => {
  const createDish = () => {
    const dishFormElms = document.querySelectorAll(".dish-form");
    const category = document.querySelector(".dish-category").value;
    console.log(category);
    if (dishFormElms[0]) dishFormElms.forEach(elm => (elm.innerHTML = ""));
    dishBlockEl.append(DishForm({ category }));
  };

  const selectElm = document.createElement("select");
  selectElm.classList.add("form", "dish-category");

  selectElm.onchange = () => createDish();
  selectElm.innerHTML = `
          <option value="coldAappetiser">נא לבחור קטגוריה</option>
          <option value="special">ספיישלים</option>
          <option value="coldAappetiser">ראשונות קרות</option>
          <option value="hotAppetiser">ראשונות חמות</option>
          <option value="skewer">שיפודי עץ על הגריל</option>
          <option value="mainDishe">מנות עיקריות</option>
          <option value="dessert">קינוחים</option>
          <option value="coffee">קפה</option>
          <option value="teaInfusion">תה חליטה</option>
          <option value="tea">תיונים</option>
          <option value="port">פורט & שרי</option>
          <option value="seshimiNigiri">סשימי / ניגירי</option>
          <option value="seshimiSpecial">סשימי ספיישל</option>
          <option value="inariGunkan">אינרי / גונקן</option>
          <option value="inariSpecial">אינארי ספיישל</option>
          <option value="hosomaki">הוסומקי</option>
          <option value="hosomakiIngredient">תוספות אפשריות למאקי</option>
          <option value="temaki">טמקי - קונוס</option>
          <option value="irodori">אירודורי</option>
          <option value="irodoriIngredient">תוספות אפשריות (בחוץ)</option>
          <option value="wineGlass">יין בכוסות</option>
          <option value="wineBottle">יין בבקבוק</option>
          <option value="wineCellar">יינות מתיישנים</option>
          <option value="beer">בירות</option>
          <option value="sake">סאקה ואומשו</option>
          <option value="cocktail">קוקטיילים</option>
          <option value="softDrink">שתייה קלה</option>
          <option value="spirit">אלכוהול</option>
  `;

  return selectElm;
};

export default DishSelector;
