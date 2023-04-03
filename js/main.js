
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
      currentActiveCheck.classList.remove('active-check');
      document.getElementById(selectedDiv).classList.add("active");
      check.classList.add('active-check');
    }
    
    else {
      currentActiveDiv.classList.remove("active");
      check.classList.remove('active-check');
      currentActiveCheck.classList.remove('active-check');
    }
  }
  else {
    document.getElementById(selectedDiv).classList.add("active");
    check.classList.add('active-check');
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

  return totalPrice;
}

const openButton = document.getElementById('footerButton');
const closeButton = document.getElementById('close-button');
const overlay = document.getElementById('overlay');
const addressSpan = document.getElementById('address');
const grandTotalSpan = document.getElementById('grandTotal');
const dishNameSpan = document.getElementById('dishName');
const dishPriceSpan = document.getElementById('dishPrice');
const drinkNameSpan = document.getElementById('drinkName');
const drinkPriceSpan = document.getElementById('drinkPrice');
const dessertNameSpan = document.getElementById('dessertName');
const dessertPriceSpan = document.getElementById('dessertPrice');
const animationDelay = 500;


openButton.addEventListener('click', () => {
  const grandTotal = getTotalPrice();
  const dishName = document.querySelector('#cat01 .category__option.active .option__title').childNodes[0].textContent.trim();
  const drinkName = document.querySelector('#cat02 .category__option.active .option__title').childNodes[0].textContent.trim();
  const dessertName = document.querySelector('#cat03 .category__option.active .option__title').childNodes[0].textContent.trim();
  const dishPrice = document.querySelector('#cat01 .category__option.active .price').textContent.trim();
  const drinkPrice = document.querySelector('#cat02 .category__option.active .price').textContent.trim();
  const dessertPrice = document.querySelector('#cat03 .category__option.active .price').textContent.trim();


  grandTotalSpan.textContent = grandTotal;
  dishNameSpan.textContent = dishName;
  dishPriceSpan.textContent = dishPrice;
  drinkNameSpan.textContent = drinkName;
  drinkPriceSpan.textContent = drinkPrice;
  dessertNameSpan.textContent = dessertName;
  dessertPriceSpan.textContent = dessertPrice;

  overlay.classList.remove('fade-out');
  overlay.classList.add('fade-in');
  setTimeout(() => {
    overlay.style.display = 'block';
  }, animationDelay); 
});

closeButton.addEventListener('click', () => {
  overlay.classList.add('fade-out');
  overlay.addEventListener('animationend', () => {
    overlay.style.display = 'none';
    overlay.classList.remove('fade-out');
  });
});

function confirmOrder() {
  const name = prompt("Qual seu nome?");
  const address = prompt("E seu endereço?");

  const dish = document.querySelector('#cat01 .category__option.active .option__title').childNodes[0].textContent.trim();
  const drink = document.getElementById("cat02").querySelector(".category__option.active .option__title").childNodes[0].textContent.trim();
  const dessert = document.getElementById("cat03").querySelector(".category__option.active .option__title").childNodes[0].textContent.trim();
  const total = getTotalPrice();
  const number = '5511956045126';
  const message = `Olá, gostaria de fazer o pedido:
- Prato: ${dish}
- Bebida: ${drink}
- Sobremesa: ${dessert}
Total: ${total}

Nome: ${name}
Endereço: ${address}`;
  
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url);
}