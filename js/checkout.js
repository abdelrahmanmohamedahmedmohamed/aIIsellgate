import * as consts from "/js/consts.js";

let getShoopingTable = () => {
  let table = document.getElementsByClassName("table-shopping-cart")[0];
  return table;
};
let removeTableStaticElements = () => {
  let table = getShoopingTable();
  if (table !== undefined) {
    const elements = document.getElementsByClassName("table_row");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
};
let addNewCost = (cost) => {
  return `<div class="flex-w flex-t p-t-27">
    <div class="size-208">
      <span class="mtext-101 cl2">
         UPS Fees
      </span>
  </div>
  <div class="size-209 p-t-1">
    <span class="mtext-110 cl2">
    ${cost}
    </span>
  </div>
</div>`;
};
let getTableInfo = () => {
  let vendorRow = `<tr class="vendor-row table_row">`;
  let vendorNameColumnOne = `<td class="vendor_column column-1 badge badge-info">`;
  let vendorColumnTwo = `<td class="vendor_column column-2">`;
  let vendorColumnThree = `<td class="vendor_column column-3">`;
  let vendorColumnFour = `<td class="vendor_column column-4">`;
  let vendorColumnFive = `<td class="vendor_column column-5">`;
  let row = `<tr class="table_row">`;
  let columnOne = `<td class="column-1">`;
  let imageClass = `<div class="how-itemcart1">`;
  let columnTwo = `<td class="column-2">`;
  let columnThree = `<td class="column-3">`;
  let columnFour = `<td class="column-4">`;
  let columnFive = `<td class="column-5">`;
  let plusMinus = `<td class="column-4">
   
  </td>`;
  return {
    vendorRow,
    vendorNameColumnOne,
    vendorColumnFive,
    vendorColumnThree,
    vendorColumnTwo,
    vendorColumnFour,
    row,
    columnOne,
    imageClass,
    columnTwo,
    columnThree,
    columnFour,
    columnFive,
    plusMinus,
  };
};
let createProduct = (element) => {
  let values = getTableInfo();
  let images = [];
  if (element.image !== undefined) images = element.image.split("~");
  let src = `<img src="${images[0]}" alt="IMG">`;
  let title = element.name;
  let subTotal = `$ ${element.price}`;
  let total = `$ ${element.price}`;
  let data =
    values.row +
    values.columnOne +
    values.imageClass +
    src +
    "</div>" +
    "</td>" +
    values.columnTwo +
    title +
    "</td>" +
    values.columnThree +
    subTotal +
    "</td>" +
    values.plusMinus +
    values.columnFive +
    total +
    "</td>" +
    "</tr>";
  return data;
};
window.goToShippingCompanies = (vendorid) => {
  let buyNowProductId = parseInt(getQueryParamaters().productId);
  if (!isNaN(buyNowProductId)) {
    window.location.href = `shippingCompany.html?vendorid=${vendorid}&productId=${buyNowProductId}`;
  } else {
    window.location.href = `shippingCompany.html?vendorid=${vendorid}`;
  }
};

let createVendorRow = (element) => {
  let values = getTableInfo();
  let data =
    values.vendorRow +
    values.vendorNameColumnOne +
    element.vendorname +
    "</td>" +
    values.vendorColumnTwo +
    "</td>" +
    values.vendorColumnThree +
    "</td>" +
    values.vendorColumnFour +
    "</td>" +
    values.vendorColumnFive +
    `<button type="button" 
    id=${"select-shipping" + element.vendorid} 
    class="btn btn-success btn-sm rounded" onClick="goToShippingCompanies(${
      element.vendorid
    })">Choose Shipping</button>` +
    "</td>" +
    "</tr>";

  return data;
};
window.goToPurshasePage = () => {
  let buyNowProductId = parseInt(getQueryParamaters().productId);
  if (!isNaN(buyNowProductId))
    window.location.href = `/purchasePage.html?productId=${buyNowProductId}`;
  else window.location.href = "/purchasePage.html";
};
window.createForm = (element, table, index) => {
  let vendorRow = createVendorRow(element);
  let data = createProduct(element);
  if (index === 0) table.innerHTML += vendorRow;
  table.innerHTML += data;
};
let generateShoppingCart = (bigCart) => {
  let buyNowProductId = parseInt(getQueryParamaters().productId);
  let table = getShoopingTable();
  for (var i = 0; i < bigCart.length; i++) {
    if (!isNaN(buyNowProductId)) {
      createForm(bigCart[i], table, i);
    } else {
      bigCart[i].forEach((element, index) => {
        createForm(element, table, index);
      });
    }
  }
  var merged = [].concat.apply([], bigCart).reduce(function (a, b) {
    return a + b["price"];
  }, 0);
  var amounts;
  let ups = JSON.parse(localStorage.getItem("ups"));
  let totalHolders = document.getElementById("totals-holders");
  if (ups !== null) {
    if (ups.length !== 0) {
      ups = ups.filter((a) => a.buyNowCart === !isNaN(buyNowProductId));
      ups.forEach((value) => {
        totalHolders.innerHTML += addNewCost(value.amount);
      });
      amounts = ups.reduce((accumulator, object) => {
        return parseFloat(accumulator) + parseFloat(object.amount);
      }, 0);
    }
  }
  if (amounts === undefined) amounts = 0;
  let total = (parseFloat(merged) + parseFloat(amounts)).toFixed("2");
  document.querySelector(".total").innerHTML = `$${total}`;
  document.querySelector(".subtotal").innerHTML = `$${merged}`;
};
let getTableShoppingCart = (bigCart) => {
  if (bigCart.length !== 0) {
    removeTableStaticElements();
    generateShoppingCart(bigCart);
  }
};

let getBigCart = () => {
  fetch(
    `${consts.default.baseUrl}bigcart?id=${consts.default.getCurrentUser()}`
  )
    .then((result) => {
      return result.json();
    })
    .then((bigCart) => {
      let buyNowProductId = parseInt(getQueryParamaters().productId);
      if (!isNaN(buyNowProductId)) {
        console.log(buyNowProductId);
        var merged = [].concat
          .apply([], bigCart)
          .filter((a) => a.id === buyNowProductId);
        console.log(merged);
        bigCart = merged;
      }
      getTableShoppingCart(bigCart);
    });
};

getBigCart();
