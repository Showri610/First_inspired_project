$(document).ready(function(){
  $('#search-icon').click(function(){
    $(this).toggleClass('fa-times');
    $('#search-box').toggleClass('active');
  });
  $('#menu').click(function(){
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });
  $(window).on('scroll load',function(){
    $('#search-icon').removeClass('fa-times');
    $('#search-box').removeClass('active');
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');
    if($(window).scrollTop() > 0){
      $('header').addClass('sticky');
    }else{
      $('header').removeClass('sticky');
    }
  });
  // smooth scrolling 
  $('a[href*="#"]').on('click',function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop : $($(this).attr('href')).offset().top,
    },
      500,
      'linear'
    );
  });
});
// Shopping cart logic
let cartCount = 0;
// Add event listeners to all add-to-cart buttons
document.querySelectorAll('.btn').forEach(button => {
    if (button.textContent.toLowerCase().includes('add to cart')) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;
        });
    }
});
const cartIcon = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let cartItems = [];
document.querySelectorAll(".btn").forEach(btn => {
    if (btn.textContent.toLowerCase().includes("add to cart")) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const productBox = this.closest(".box");
            const name = productBox.querySelector("h3").textContent;
            const priceText = productBox.querySelector(".price")?.textContent || "$0";
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

            cartItems.push({ name, price });
            updateCart();
        });
    }
});
function updateCart() {
    cartItemsList.innerHTML = "";
    let total = 0;
    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
// Toggle dropdown visibility on icon click
cartIcon.addEventListener("click", () => {
    cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
});
