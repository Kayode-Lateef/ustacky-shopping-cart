
// Grab the buttons for modal display/none
  let modalId = document.querySelector(".modal");
  let modalContainer = document.querySelector(".modal-container");
  let buttonRemoveModal = document.querySelector(".close");
  let shoppingButtonCart = document.querySelector("#cart");

// Add event listeners to the modal buttons
shoppingButtonCart.addEventListener("click", modalDisplay);
buttonRemoveModal.addEventListener("click", removeModalDisplay);
modalId.addEventListener('click', modalDisappear); 

// When the user clicks the shoppingCart button, open it
function modalDisplay() {
    modalId.style.display = "block";
    modalContainer.style.display = "block";
}

// When the user clicks the X button, close it
function removeModalDisplay() {
    modalContainer.style.display = "none";
    modalId.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
function modalDisappear(e){
    if(e.target == modalId){
        modalContainer.style.display = "none";
        modalId.style.display = "none";
    }
}

// Continue Shopping Button from Modal
let continueShoppingButton = document.querySelector('.btn-continue-shopping');
continueShoppingButton.addEventListener('click', continueShopping );

// When the user clicks continue Shopping Button close the modal
function continueShopping(e){
  e.preventDefault();
    modalContainer.style.display = "none";
    modalId.style.display = "none";

}

//Declare all the products objects in an array
let products = [
    {
      name: "SAMSUNG TV",
      tag: "SAMSUNG TV",
      price: 80000,
      inCart: 0,
    },
    {
      name: "PIXEL 4a",
      tag: "PIXEL 4a",
      price: 150500,
      inCart: 0,
    },
    { 
      name: "PS 5",
      tag: "PS 5",
      price: 420000,
      inCart: 0 },
    {
      name: "MAC BOOK AIR",
      tag: "MAC BOOK AIR",
      price: 379999,
      inCart: 0,
    },
    {
      name: "APPLE WATCH",
      tag: "APPLE WATCH",
      price: 50000,
      inCart: 0,
    },
    {
      name: "AIR PODS",
      tag: "AIR PODS",
      price: 88000,
      inCart: 0,
    },
  ];


// Grab the  add to cart buttons
let carts = document.querySelectorAll('.product-btn');

// Add event listeners to all the add to cart buttons to add to cart
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', function() {
 
     carts[i].classList.add("btn-cart");
     carts[i].classList.remove("remove-btn");
     carts[i].innerText = "Add to cart";  
    })   
 }

// Add event listeners to all the add to cart buttons
for (let i = 0; i < carts.length; i++) {
   carts[i].addEventListener('click', function() {

    carts[i].classList.remove("btn-cart");
    carts[i].classList.add("remove-btn");
    carts[i].innerText = "Remove from cart";
    cartNumbers(products[i]);
    totalCost(products[i]);
    displayCart();  
   })   
}



// Load cart numbers to shopping cart basket
function loadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    let shoppingCart = document.querySelector('#cart-items');

    if(productNumbers){
        shoppingCart.textContent = productNumbers;
    }
}

//  add number of products to carts
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    let shoppingCart = document.querySelector('#cart-items');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        shoppingCart.textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        shoppingCart.textContent = 1;
        }
        setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if (cartItems[product.tag] == undefined) {
         cartItems = {
             ...cartItems,
             [product.tag]: product
         }
        }
        cartItems[product.tag].inCart += 1; 
    } else{
        product.inCart = 1;      
         cartItems = {
             [product.tag]: product
         }
    }
    localStorage.setItem('productsInCart', JSON.stringify( cartItems));

}

//  Set Total cost of products
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

// Display Cart items to modals
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
  
    let productsContainer = document.querySelector(".products-items");

    let productsTotal = document.querySelector('#total-value');

    let cartCost = localStorage.getItem('totalCost');
  
    if (cartItems && productsContainer) {
      productsContainer.innerHTML = " ";
      Object.values(cartItems).map((item) => {
        productsContainer.innerHTML += `
        <li>
        <div class="js-items">
        <img src="Images/${item.tag}.png"
            alt="">
          <h4>${item.name}</h4>
        </div>
        <h4 class="price">₦${item.price}.00</h4>
        <h4 class="quantity"><button class="qty-increase">+</button><span class="quantity-buttons">${item.inCart}</span><button class="qty-decrease">-</button>
          </h4>
        <button class="btn-remove">Remove</button>
      </li>
          `; 
        });
    }
    if(cartItems && productsTotal) {
        productsTotal.innerHTML = " ";
        productsTotal.innerHTML= `₦${cartCost}.00`;   
    } else {
        productsTotal.innerHTML = '';
    }

}

// Remove product items from modal
let productItems = document.querySelector('.products-items')
productItems.addEventListener('click', removeProducts);

function removeProducts(e){
  if(e.target.classList.contains('btn-remove')){
    if(confirm('Are you sure')){
      var del = e.target.parentElement;
      productItems.removeChild(del);

      let productsContainer = document.querySelector(".products-items");
      let productsTotal = document.querySelector('#total-value');
        let productNumbers = localStorage.getItem('cartNumbers');
        let cartItems = localStorage.getItem('productsInCart');
        let cartCost = localStorage.getItem('totalCost');  
        let shoppingCart = document.querySelector('#cart-items');
        productNumbers = parseInt(productNumbers);
        if(productNumbers && cartItems && cartCost && productsContainer == " " ) {
            localStorage.setItem('cartNumbers', productNumbers - 1);
                        
            productsTotal.innerHTML= ""; 
            shoppingCart.textContent = productNumbers - 1;
        } else {
            localStorage.setItem('cartNumbers', 0);
            shoppingCart.textContent = 0;
            productsTotal.innerHTML= " "; 
            window.localStorage.removeItem('totalCost');
            window.localStorage.removeItem('productsInCart');

            }
            // if(productsContainer.innerHTML == ""){
            //     localStorage.setItem('cartNumbers', 0);
            //     shoppingCart.textContent = 0;
            // }
            
    }
}
}


  

// let increaseQtyButton = document.querySelector(".qty-increase");
// increaseQtyButton.addEventListener('click', cartNumbersIncrease());

// function cartNumbersIncrease(e){
//     if(e.target.classList.contains('qty-increase')){
//         if(confirm('Are you sure')){
//           var del = e.target.parentElement;
//           productItems.removeChild(del);
//         console.log(1);
//       }
// }

// Increase values of items quantity

//  let increaseQtyButton = document.querySelector(".qty-increase");
//     console.log(increaseQtyButton);

//   for (let i = 0; i < increaseQtyButton.length; i++) {
//     let increaseBtns = increaseQtyButton[i];
//     increaseBtns.addEventListener("click", function(){
        


//         cartNumbersIncrease();

//     }); 
//   }



// Decrease values of items quantity
// const decreaseQtyButton = document.querySelectorAll(".qty-decrease");
// for (let i = 0; i < decreaseQtyButton.length; i++) {
//   let decreaseBtns = decreaseQtyButton[i];
//   decreaseBtns.addEventListener("click", function () {
//     cartNumbersDecrease();
//   });
// }



// Call Global functions
loadCartNumbers();
displayCart();
