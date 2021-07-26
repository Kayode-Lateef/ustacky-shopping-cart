productItems.addEventListener('click', cartNumbersIncrease);
productItems.addEventListener('click', cartNumbersDecrease);


function cartNumbersIncrease (e){
  if(e.target.classList.contains('qty-increase')){
  let productNumbers = localStorage.getItem("cartNumbers");
productNumbers = parseInt(productNumbers);
let shoppingCart = document.querySelector("#cart-items");
let quantityButton = document.querySelector(".quantity-buttons");
if (productNumbers) {
  localStorage.setItem("cartNumbers", productNumbers + 1);
  shoppingCart.textContent = productNumbers + 1;
  quantityButton.textContent = productNumbers + 1;
} else {
  localStorage.setItem("cartNumbers", 1);
  shoppingCart.innerText = 1;
    }
}
  }

  function cartNumbersDecrease (e){
    if(e.target.classList.contains('qty-decrease')){
      let shoppingCart = document.querySelector("#cart-items");
      let quantityButton = document.querySelector(".quantity-buttons");
      let productNumbers = localStorage.getItem("cartNumbers");
      productNumbers = parseInt(productNumbers);
      if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        shoppingCart.textContent = productNumbers - 1;
        quantityButton.textContent = productNumbers - 1;
      } else {
        localStorage.setItem("cartNumbers", 0);
      }

    }
  }
