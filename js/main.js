
// select single option from each category. Toggle green border and check icon.
function selected(element) {
  const selectedDiv = element.getAttribute("id");
  const parentDiv = element.parentNode;
  const check = document.getElementById(selectedDiv).querySelector(".check");

  if (parentDiv.querySelector(".active") !== null) {
    const currentActiveDiv = parentDiv.querySelector(".active");
    const currentActiveCheck = currentActiveDiv.querySelector(".check");
    
    if (currentActiveDiv.id !== selectedDiv) {
      currentActiveDiv.classList.remove("active");
      currentActiveCheck.classList.remove("active-check");
      document.getElementById(selectedDiv).classList.add("active");
      check.classList.add("active-check");
    } 
    
    else {
      currentActiveDiv.classList.remove("active");
      check.classList.remove("active-check");
      currentActiveCheck.classList.remove("active-check");
    }
  } 

  else {
    document.getElementById(selectedDiv).classList.add("active");
    check.classList.add("active-check");
  }
}

// if user selected an option from each category, enable confirm order button

function buttonEnable() {
    const cat01 = document.getElementById("cat01").querySelector(".active");
    const cat02 = document.getElementById("cat02").querySelector(".active");
    const cat03 = document.getElementById("cat03").querySelector(".active");

    if(cat01 !== null && cat02 !== null && cat03 !== null) {
        document.querySelector(".footer__button").classList.add("footer__button__active");
        document.getElementById("button-text").innerHTML = "Fechar pedido";
        return true;
    }

    else {
        document.querySelector(".footer__button").classList.remove("footer__button__active");
        document.getElementById("button-text").innerHTML = "Selecione os 3 itens <br> para fechar o pedido";
        return false;
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
    getTotalPrice();
    footerButton.disabled = false;
  });
}

// return sum of"price" from all elements with class ".active"

function getTotalPrice() {
  let totalPrice = 0;
  const activeElements = document.querySelectorAll('.active');

  activeElements.forEach(function (element) {
    const priceElement = element.querySelector('.price');
    const price = parseFloat(priceElement.innerHTML.replace(',', '.'));
    totalPrice += price;
  });

  // console.log(totalPrice);
  return totalPrice;
}

// function closeOrder() {
//   if (buttonEnable) {
//     alert("fechar!");
//   }
//   else {
//     return;
//   }
// }

const openButton = document.getElementById('footerButton');
const closeButton = document.getElementById('close-button');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const nameSpan = document.getElementById('name');
const addressSpan = document.getElementById('address');
const grandTotalSpan = document.getElementById('grandTotal');


openButton.addEventListener('click', () => {
  let name = prompt("Qual seu nome?");
  let address = prompt("E seu endereço?");
  let grandTotal = getTotalPrice();

  nameSpan.textContent = name;
  addressSpan.textContent = address;
  grandTotalSpan.textContent = grandTotal;

  overlay.classList.remove('fade-out');
  overlay.classList.add('fade-in');
  setTimeout(() => {
    overlay.style.display = 'block';
  }, 500); // adjust duration to match animation time
});

closeButton.addEventListener('click', () => {
  overlay.classList.add('fade-out');
  overlay.addEventListener('animationend', () => {
    overlay.style.display = 'none';
    overlay.classList.remove('fade-out');
  });
});