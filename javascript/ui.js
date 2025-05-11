export function nav_up(){
    const focused_element = document.activeElement;
    if(focused_element.tagName === "LI"){
        const previous_element = focused_element.previousElementSibling
        if(previous_element && previous_element.tagName === "LI"){
            previous_element.focus()
        }
    } else {
        document.querySelector("ul li:last-child").focus()
    }
}

export function nav_down(){
    const focused_element = document.activeElement;
    if(focused_element.tagName === "LI"){
        const next_element = focused_element.nextElementSibling
        if(next_element && next_element.tagName === "LI"){
            next_element.focus()
        }
    } else {
        document.querySelector("ul li:last-child").focus()
    }
}