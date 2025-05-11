import { updateLocalStorage } from "./storage.js";
import { erase_sound, add_sound } from "./sounds.js"


// Variable pour savoir si le panet est en mode validation afin de configurer
// l'action de Enter dans l'input
export let isPanelValidationMode = true;

// Générer l'affichage des todos dans #liste
// array: le tableau a afficher
// action: permet de personnaliser un peu la fonction par rapport au contexte
export function displayList(array, action) {
  // formattage de array pour que les actions checkées soient en dernière position
  const ul = document.getElementById("liste");
  array.forEach((todo, index, array) => {
    // Creation des li
    const li = create_li(todo, index, array, action);
    ul.appendChild(li);
  });
  // réinitialise input et focus
  document.getElementById("input").value = "";
  document.getElementById("input").focus();
  action === "add" && add_sound.play();
  action === "supp" && erase_sound.play();
}

export function initListe() {
  document.getElementById("liste").innerHTML = "";
}

export function returnToPanelValidation() {
  // je cache le bouton update et je fais apparaitre le bouton add
  document.getElementById("add").classList.remove("btn_round-hiddened");
  document.getElementById("update").classList.add("btn_round-hiddened");
  // je change le style du focus de input
  document.getElementById("input").classList.remove("modifMod");
  // je cache le bouton annuler et je fais apparaitre le bouton supprimer
  document.getElementById("supp").classList.remove("btn-hiddened");
  document.getElementById("cancel").classList.add("btn-hiddened");
  // Je réinitialise le champ de saisie
  document.getElementById("input").value = "";
  // J'annule les modificateurs de modif sur les li
  init_modif_value();
  // je focus sur le champ de saisie
  document.getElementById("input").focus();
  // je change l'état de la variable isPanelValidationMode
  isPanelValidationMode = true;
}

export function erase_last_one(array) {
  array.pop();
  updateLocalStorage(array);
  initListe();
  displayList(array, "supp");
}

export function formattage(array) {
    const array_unchecked = array.filter((element) => !element.isChecked);
    const array_checked = array.filter((element) => element.isChecked);
    return array_unchecked.concat(array_checked);
  }
//
// Fonctions private
//

function create_li(todo, index, array, action) {
  const li = document.createElement("li");
  // Configuration d'un évènement quand dblclick sur le li
  li.addEventListener("dblclick", () => {
    // je récupère la valeur dblcliqué
    const valueToUpDate = todo.todo;
    // je la copie dans input et je focus
    document.getElementById("input").value = valueToUpDate;
    document.getElementById("input").focus();
    // Je ré-initialise la mise en valeur des éléments
    init_modif_value();
    // je met en valeur l'élément en train d'être modifié
    li.classList.add("modif_up");
    // je cache le bouton add et je fais apparaitre le bouton update
    document.getElementById("add").classList.add("btn_round-hiddened");
    document.getElementById("update").classList.remove("btn_round-hiddened");
    // je change le style du focus de input
    document.getElementById("input").classList.add("modifMod");
    // je cache le bouton supprimer et je fais apparaitre le bouton annuler
    document.getElementById("supp").classList.add("btn-hiddened");
    document.getElementById("cancel").classList.remove("btn-hiddened");
    // je modifie l'indicateur de isPanelValidatinMode
    isPanelValidationMode = false;
  });

  const p = document.createElement("p");
  p.textContent = todo.todo;

  const checkbox = document.createElement("input");
  checkbox.checked = todo.isChecked;
  if (checkbox.checked) {
    li.classList.add("to_supp");
  }
  checkbox.setAttribute("name", "todos");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("data-index", index);
  // listerner sur checkox pour "marquer" à supprimer
  checkbox.addEventListener("change", () => {
    array[index].isChecked = checkbox.checked;
    updateLocalStorage(array);
    li.classList.toggle("to_supp");
    initListe();
    displayList(array, "supp");
  });
  li.appendChild(p);
  li.appendChild(checkbox);
  // Je marque le p du dernier li pour faire une animamation dessus si c'est une action add
  if (index == array.length - 1 && action === "add")
    li.querySelector("p").classList.add("last_one");
  return li;
}

// Fonction pour annuler les modificateurs de modif sur les li
function init_modif_value() {
  const all_li = document.querySelectorAll("#container li");
  all_li.forEach((li) => {
    li.classList.remove("modif_up");
  });
}


