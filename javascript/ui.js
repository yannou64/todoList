export function nav_up() {
  const focused_element = document.activeElement;
  if (focused_element.tagName === "LI") {
    const previous_element = focused_element.previousElementSibling;
    if (previous_element && previous_element.tagName === "LI") {
      previous_element.focus();
    }
  } else {
    document.querySelector("ul li:last-child").focus();
  }
}

export function nav_down() {
  const focused_element = document.activeElement;
  if (!focused_element.nextElementSibling) {
    document.getElementById("input").focus()
  } else if (focused_element.nextElementSibling.tagName === "LI") {
    focused_element.nextElementSibling.focus();
  }
}

export function nav_rigth() {
    const focused_element = document.activeElement;
    if(focused_element.tagName === "LI"){
        let checkbox = focused_element.querySelector("input[type='checkbox']")
       checkbox.checked = !checkbox.checked
       checkbox.dispatchEvent(new Event("change"))
    }
}

export function nav_Enter(){
    if(document.activeElement.tagName === "LI"){
        document.activeElement.dispatchEvent(new Event("dblclick"))
    }
}