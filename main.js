'use strict';
// global variable to increment url on loadmore
var page = 1;
// get json from url
function fetchData() {
  fetch(`https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${page}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const html = data.products.map(card => {
        // display JSON data in HTML
        return `
        <div class="wrapper">
          <div class="items">
            <div class="item">
              <img src="http:${card.image}" alt="${card.name}">
              <h2 class="product-name">${card.name}</h2>
              <p class="product-description">${card.description}</p>
              <p class="oldPrice">De: <em>R$ ${card.oldPrice}</em></p>
              <p class="price">Por: <em>R$ ${card.price}</em></p>
              <p class="parcela">ou 2x de <em>R$ ${Math.floor((card.price/2)+1)},99</em></p>
              <button class="add-to-cart" type="button">Comprar</button>
            </div>
          </div>
        </div>
        `;
      }).join('');
      console.log(html);
      document
        .querySelector("#app")
        // insertAdjacentHTML worked better then innerHTML
        .insertAdjacentHTML("beforebegin", html);
    }).catch(error => {
      console.log(error);
    });
}
fetchData();

function loadMore() {
  // increment URL
  page += 1;
  fetchData();
}

// Client-side validation (only)
function validateName() {
  let name = document.getElementById('fieldName').value;

  if (name.length == 0) {
    document.getElementById("fieldName").style.borderColor = "red";
    return false;
  } else if (!name.match(/^[a-zA-Z]{2,}$/)) {
    document.getElementById("fieldName").style.borderColor = "red";
    return false;
  } else {
    document.getElementById("fieldName").style.borderColor = "blue";
    return true;
  }
}

function validateEmail() {
  let email = document.getElementById('fieldEmail').value;

  if (email.length == 0) {
    document.getElementById("fieldEmail").style.borderColor = "red";
    return false;
  } else if (!email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
    document.getElementById("fieldEmail").style.borderColor = "red";
    return false;
  } else {
    document.getElementById("fieldEmail").style.borderColor = "blue";
    return true;
  }
}

// clear validaton alerts
function clearBorderName() {
  document.getElementById("fieldName").style.borderColor = "#707070";
  return;
}

function clearBorderMail() {
  document.getElementById("fieldEmail").style.borderColor = "#707070";
}

function submitFunction() {
  event.preventDefault();
  if (validateName() & validateEmail()) {
    document.getElementById('success_message').style.display = 'block';
  } else {
    document.getElementById('success_message').style.display = 'none';
  }
}
