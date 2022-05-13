import * as consts from "/js/consts.js";
let getPurchaseTable = () => {
  let table = document.getElementsByClassName("order-table")[0];
  return table;
};
let removeTableStaticElements = () => {
  let table = getPurchaseTable();
  if (table !== undefined) {
    const elements = document.getElementsByClassName("order-table-row");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
};

let createProduct = (element) => {
  let images = [];
  if (element.image !== undefined) images = element.image.split("~");
  return `
    <tr class="order-table-row">
    <td><img src='${images[0]}' class='full-width rounded' style="margin:8px;"></img>
    </td>
    <td>
    <div class="d-flex mt-5" style="justify-content: space-between;">
    <span class='thin ml-2'>${element.name}</span>
    <div class='price'>$${element.price}</div>
    </div>
    </td>
<tr style="border-bottom: 1px solid #ddd;">
</tr>
</tr>

`;
};

let generatePurchase = (bigCart) => {
  let table = getPurchaseTable();
  for (var i = 0; i < bigCart.length; i++) {
    bigCart[i].forEach((element, index) => {
      console.log(element);
      let data = createProduct(element);
      table.innerHTML += data;
    });
  }
  var merged = [].concat.apply([], bigCart).reduce(function (a, b) {
    return a + b["price"];
  }, 0);
  var amounts;
  let ups = JSON.parse(localStorage.getItem("ups"));
  if (ups !== null) {
    if (ups.length !== 0) {
      amounts = ups.reduce((accumulator, object) => {
        return parseFloat(accumulator) + parseFloat(object.amount);
      }, 0);
    }
  }
  if (amounts === undefined) amounts = 0;
  let total = (parseFloat(merged) + parseFloat(amounts)).toFixed("2");
  document.querySelector(".purchase-total").innerHTML = `$${total}`;
  document.querySelector(".ups-fees").innerHTML = `$${amounts}`;
};

let getTablePurchase = (bigCart) => {
  if (bigCart.length !== 0) {
    removeTableStaticElements();
    generatePurchase(bigCart);
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
      getTablePurchase(bigCart);
    });
};

let getCard = () => {
  fetch(
    `${consts.default.baseUrl}getcard?id=${consts.default.getCurrentUser()}`
  )
    .then((result) => {
      return result.json();
    })
    .then((card) => {
        console.log(card);
    });
};

getBigCart();

getCard();
