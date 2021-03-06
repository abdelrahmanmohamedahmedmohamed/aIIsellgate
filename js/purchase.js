import * as consts from "/js/consts.js";
let getPurchaseTable = () => {
  let table = document.getElementsByClassName("order-table")[0];
  return table;
};

window.makeOrder = (orderObject) => {
  fetch(
    `http://cros-anywhere.herokuapp.com/http://a7bb-41-237-180-230.ngrok.io/makeorder`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObject),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result !== undefined && "state" in result && parseInt(result.state) === 1) {
        swal("", "the order has been created successfully", "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    });
};
window.onPayButton = (bigCart, total, upsFees) => {
  $(".pay-btn").click((event) => {
    console.log(bigCart);
    console.log(total);
    console.log(upsFees);

    let makeOrderObject = {
      orderResponse: {
        price: parseInt(total),
        shanPricel: parseInt(upsFees),
        currency: "USD",
        customerid: parseInt(localStorage.getItem("loginUserId")),
        vendorid: 1,
      },
    };
    let prudectdetails = [];
    for (var i = 0; i < bigCart.length; i++) {
      bigCart[i].forEach((element) => {
        prudectdetails = [
          ...prudectdetails,
          { prudect: element.id, qunity: 0, color: "yellow" },
        ];
      });
    }
    makeOrderObject["prudectdetails"] = prudectdetails;
    makeOrder(makeOrderObject);
  });
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
  let buyNowProductId = parseInt(getQueryParamaters().productId);
  let table = getPurchaseTable();
  for (var i = 0; i < bigCart.length; i++) {
    if (!isNaN(buyNowProductId)) {
      let data = createProduct(bigCart[i]);
      table.innerHTML += data;
    } else {
      bigCart[i].forEach((element, index) => {
        let data = createProduct(element);
        table.innerHTML += data;
      });
    }
  }
  var merged = [].concat.apply([], bigCart).reduce(function (a, b) {
    return a + b["price"];
  }, 0);
  var amounts;
  let ups = JSON.parse(localStorage.getItem("ups"));

  if (ups !== null) {
    if (ups.length !== 0) {
      ups = ups.filter((a) => a.buyNowCart === !isNaN(buyNowProductId));
      amounts = ups.reduce((accumulator, object) => {
        return parseFloat(accumulator) + parseFloat(object.amount);
      }, 0);
    }
  }
  if (amounts === undefined) amounts = 0;
  let total = parseFloat(merged) + parseFloat(amounts);
  let totalFixed = (parseFloat(merged) + parseFloat(amounts)).toFixed("2");
  let amountsFixed = amounts.toFixed("2");
  onPayButton(bigCart, total, amounts);
  document.querySelector(".purchase-total").innerHTML = `$${totalFixed}`;
  document.querySelector(".ups-fees").innerHTML = `$${amountsFixed}`;
};

let getTablePurchase = (bigCart) => {
  if (bigCart.length !== 0) {
    removeTableStaticElements();
    generatePurchase(bigCart);
  }
};

let getBigCart = () => {
  let buyNowProductId = parseInt(getQueryParamaters().productId);

  fetch(
    `${consts.default.baseUrl}bigcart?id=${consts.default.getCurrentUser()}`
  )
    .then((result) => {
      return result.json();
    })
    .then((bigCart) => {
      if (!isNaN(buyNowProductId)) {
        var merged = [].concat
          .apply([], bigCart)
          .filter((a) => a.id === buyNowProductId);
        console.log(merged);
        bigCart = merged;
      }
      getTablePurchase(bigCart);
    });
};

// let getCard = () => {
//   fetch(
//     `https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/getcard?id=${localStorage.getItem("loginUserId")}`
//   )
//     .then((resultc) => {
//       return resultc.json();
//     })
//     .then((cardc) => {
//         console.log(cardc);
//     });
// };

getBigCart();

//  getCard();

//getAirline  by  fetch get
let getvisa = {};
getgetvisa();

function getgetvisa() {
  console.log("lkndfkdsnkjfbaskf jnf" + localStorage.getItem("loginUserId"));
  // https://sellgate91.herokuapp.com/getcard?id=2
  fetch(
    `https://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/getcard?id=${localStorage.getItem(
      "loginUserId"
    )}`
  )
    .then(function (response) {
      //(entire HTTP response)
      return response.json(); // to next then
    })
    .then(function (data) {
      getvisa = data; //the js array of obj / obj  json of api
      console.log(data);
      displaygetgetvisa();
      console.log(getvisa.last4);
      if (getvisa.last4 != null) {
        document.getElementsByClassName("addvisa")[0].style.display = "none";

        console.log("esfsdgfdsf");
      } else {
        document.getElementsByClassName("last4")[0].innerHTML = "";
        document.getElementsByClassName("expdata")[0].innerHTML = "";
      }
    })
    .catch(function (error) {
      console.log("FETCH ERROR IS :" + error);
    });
}
function displaygetgetvisa() {
  document.getElementsByClassName("last4")[0].innerHTML = getvisa.last4;
  document.getElementsByClassName("expdata")[0].innerHTML = getvisa.expdate;
}

/* Start Location from  purchase*/
//getAirline by fetch get
let getprimarylocation = {};
getgetprimarylocation();

function getgetprimarylocation() {
  console.log("welcomme");
  fetch(
    `https://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/getprimarylocation?id=1`
  )
    .then(function (response) {
      //(entire HTTP response)
      return response.json(); // to next then
    })
    .then(function (data) {
      getprimarylocation = data; //the js array of obj / obj  json of api
      displaygetprimarylocation();
    })
    .catch(function (error) {
      console.log("FETCH ERROR IS :" + error);
    });
}
function displaygetprimarylocation() {
  document.getElementsByClassName("locationstreet")[0].innerHTML =
    getprimarylocation.street1;
  document.getElementsByClassName("locationstreet1")[0].innerHTML =
    getprimarylocation.city;
}
/* End Location from  purchase*/
