import { start, updateLocalStorage } from "./javascript/storage.js";
import { nav_up, nav_down, nav_rigth, nav_Enter } from "./javascript/ui.js";
import { 
  isPanelValidationMode,
  displayList,
  initListe,
  returnToPanelValidation,
  erase_last_one,
  formattage,
} from "./javascript/display.js";

/////
// main program
/////
// start : récupérer une liste du localStorage ou initialiser
let todos = start();
// Afficher la liste
displayList(todos, "init");

/////
// Evènements à l'écoute
/////

// Ajouter
document.getElementById("add").addEventListener("click", () => {
  // Récupérer la valeur de input
  const value = document.getElementById("input").value;
  // Vérification de la saisie
  if (value.trim()) {
    // Construction de l'objet todo
    const todo = {
      todo: value,
      isChecked: false,
    };
    // Update todos
    todos.push(todo);
  }
  updateLocalStorage(todos);
  initListe();
  displayList(todos, "add");
});

// Supprimer
document.getElementById("supp").addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.isChecked);
  updateLocalStorage(todos);
  initListe();
  displayList(todos, "supp");
});

// Annuler
document.getElementById("cancel").addEventListener("click", () => {
  returnToPanelValidation();
});

// Modifer
document.getElementById("update").addEventListener("click", () => {
  const newValue = document.getElementById("input").value;
  if (newValue.trim()) {
    // je récupère l'index de la valeur à modifier grâce au marquer modif_up sur le li
    const index = document
      .querySelector(".modif_up input")
      .getAttribute("data-index");
    // je met à jours le tableau todos à l'index récupéré
    todos[index].todo = newValue;
    updateLocalStorage(todos);
    initListe();
    displayList(todos);
    returnToPanelValidation();
  }
});

// Ajouter / modifier avec la touche Enter
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    isPanelValidationMode
      ? document.getElementById("add").click()
      : document.getElementById("update").click();
  }
});

// Sort
document.getElementById("sort").addEventListener("click", () => {
  todos = formattage(todos);
  updateLocalStorage(todos);
  initListe();
  displayList(todos);
});

// navigation avec le pavé numérique

document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.getElementById("supp").click();
    if (e.key === "ArrowUp") nav_up()
    if (e.key === "ArrowDown") nav_down()
    if (e.key === "ArrowRight") nav_rigth()
    if (e.key === "Enter") nav_Enter()
  });