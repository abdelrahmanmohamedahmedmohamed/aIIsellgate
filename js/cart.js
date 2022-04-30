var baseUrl =
  "https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/";
let enableDisabling = false;
const getAddToCartButton = () => {
  let addToCartButton = document.querySelector(".addToCartBtn");
  return addToCartButton;
};
const getCart = () => {
  let cart = document.querySelector(".js-show-cart");
  return cart;
};
const getHeaderCartContent = () => {
  let headerCartContent = document.querySelector(".header-cart-content");
  let cartData = headerCartContent.getElementsByClassName(
    "header-cart-wrapitem w-full"
  );
  if (cartData !== undefined ) cartData[0].remove();
  return headerCartContent;
};

let addToCartButton = getAddToCartButton();
let cartIcon = getCart();
let getCurrentUser = () => {
  let loginUserId = localStorage.getItem("loginUserId");
  return loginUserId === null ? null : loginUserId;
};
const getQueryParamaters = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params;
};

let disableAddToCartButton = (cartIds) => {
  let productId = parseInt(getQueryParamaters().proId);
  if (
    productId !== null &&
    cartIds.includes(productId) &&
    addToCartButton !== null &&
    enableDisabling
  ) {
    addToCartButton.disabled = true;
    addToCartButton.style.pointerEvents = "none";
  }
};
let getCurrentCart = (isAddToCart = false) => {
  let user = getCurrentUser;
  if (user === null) {
    return;
  }

  fetch(`${baseUrl}getcart?id=${user()}`)
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      let key = "id";
      const cart = [
        ...new Map(response.map((item) => [item[key], item])).values(),
      ];
      let ids = cart.map((a) => a[key]);
      if (isAddToCart && addToCartButton !== null) {
        addToCartButton.addEventListener("click", () => {
          addToCart(cart);
        });
      }
      populateProducts(cart);
      disableAddToCartButton(ids);
      increase(cart.length);
    });
};
let populateShoppingCart = (cart) => {};
let populateProducts = (cart) => {
  let cartModal = getHeaderCartContent();
  console.log(cart);
  let ulBegin = `<ul class="header-cart-wrapitem w-full">`;
  let li = `<li class="header-cart-item flex-w flex-t m-b-12">`;
  let img = `<div class="header-cart-item-img">`;
  let endDiv = `</div>`;
  let cartItemText = `<div class="header-cart-item-txt p-t-8">`;
  let ulEnd = `</ul>`;
  let liEnd = `</li>`;
  let anchorEnd = `</a>`;
  let endSpan = `</span>`;
  cart.forEach((element) => {
    console.log(element);
    let images = [];
    if (element.image !== undefined) images = element.image.split("~");
    let src = `<img src="${images[0]}" alt="IMG">`;
    let anchor = `<a href="product.html?proId=${element.id}" class="header-cart-item-name m-b-18 hov-cl1 trans-04">${element.name}`;
    let price = `<span class="header-cart-item-info">1 x $${element.price}.00`;
    let data =
      ulBegin +
      li +
      img +
      src +
      endDiv +
      cartItemText +
      anchor +
      anchorEnd +
      price +
      endSpan +
      endDiv +
      liEnd +
      ulEnd;
    console.log(cartModal);
    cartModal.insertAdjacentHTML("afterbegin", data);
  });
  let headerCartTotal = document.querySelector(".header-cart-total");
  if (headerCartTotal !== null) {
    let total = cart
      .map((item) => item.price)
      .reduce((prev, next) => prev + next);
    headerCartTotal.innerHTML = `Total: $${total}`;
  }
};

let addToCart = (cart) => {
  let productId = parseInt(getQueryParamaters().proId);
  fetch(`${baseUrl}addTocart`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prudectid: productId,
      customerid: getCurrentUser(),
    }),
  }).then(() => {
    disableAddToCartButton([productId]);
    increase(1);
  });
};
let getProductAndPush = (cart, productId) => {
  fetch(
    `${baseUrl}getSpecialPru?id=${productId}`
  )
    .then(function (productResponse) {
      return productResponse.json();
    })
    .then(function (productData) {
      cart = [...cart , productData];
      populateProducts(cart);
    });
};
getCurrentCart(addToCartButton !== null ? true : false);

let getCartValue = () => {
  let value = parseInt(cartIcon.getAttribute("data-notify"));
  if (isNaN(value)) value = 0;
  return value;
};

let increase = (value) => {
  cartIcon.setAttribute("data-notify", getCartValue() + value);
};
