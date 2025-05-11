// On recherche dans le localstorage la présence d'un array todos sinon on initialer un array vide
export function start() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

export function updateLocalStorage(array){
    localStorage.setItem("todos", JSON.stringify(array))
}

