
// select single option from each category
function selected(element) {
    const selectedDiv = element.getAttribute("id");
    const parentDiv = element.parentNode;
  
    if (parentDiv.querySelector(".active") !== null) {
      const currentActiveDiv = parentDiv.querySelector(".active");

      if (currentActiveDiv.id !== selectedDiv) {
        currentActiveDiv.classList.remove("active");
        document.getElementById(selectedDiv).classList.add("active");
      } 
      
      else {
        currentActiveDiv.classList.remove("active");
      }
    } 

    else {
      document.getElementById(selectedDiv).classList.add("active");
    }
  }

// if user selected an option from each category, enable confirm order button

function buttonEnable() {
    const cat01 = document.getElementById("cat01").querySelector(".active");
    const cat02 = document.getElementById("cat02").querySelector(".active");
    const cat03 = document.getElementById("cat03").querySelector(".active");

    if(cat01 !== null && cat02 !== null && cat03 !== null) {
        document.querySelector(".footer__button").classList.add("footer__button__active");
    }

    else {
        document.querySelector(".footer__button").classList.remove("footer__button__active");
    }
}

// Get all elements with class "category__option"
const categoryOptions = document.getElementsByClassName("category__option");
// get footer button
const footerButton = document.getElementById("footerButton");

// Loop over the elements and add event listener to each element
for (let i = 0; i < categoryOptions.length; i++) {
  categoryOptions[i].addEventListener("click", function() {
    buttonEnable();
    footerButton.disabled = false;
  });
}