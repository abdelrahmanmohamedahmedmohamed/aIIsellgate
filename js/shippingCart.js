//  GET request using fetch()

let upsList = [];
fetch(
  "https://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/shippmentRate?customerid=1&prudectid=1"
)
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    upsList = json;
    // Create a variable to store HTML
    let li = `<thead><tr class=" text-black"><th scope="col">Name of Company</th><th scope="col">Currency</th><th scope="col">Price</th><th scope="col">duration</th><th scope="col">Status</th></tr></thead>`;
    // Loop through each data and add a table row
    json.forEach((user) => {
      li += `<tbody>
             <tr>
             
                <td>${user.provider} </td>
                 
                <td>${user.days} </td>
                <td>${user.amount} </td>
                <td>${user.duration}</td>  
                <td>
                <button type="button" onClick="onClickApply('${user.idRate}')" class="btn btn-primary">Apply</button></td>
            </tr> 
            </tbody>`;
    });

    // Display result
    document.getElementById("users").innerHTML = li;
  });

let getUpsStorage = () => {
  let ups = localStorage.getItem("ups");
  if (ups === null || ups === undefined)
    localStorage.setItem("ups", JSON.stringify([]));

  return JSON.parse(localStorage.getItem("ups"));
};

window.onClickApply = (upsId) => {
  let vendorId = parseInt(window.getQueryParamaters().vendorid);
  let buyNowProductId = parseInt(getQueryParamaters().productId);
  console.log(buyNowProductId);
  if (vendorId !== null) {
    let amount = upsList.find((a) => a.idRate === upsId).amount;
    let upsStorage = getUpsStorage();
    let isVendorFound = upsStorage.find((a) => a.vendorId === vendorId);
    if(!isNaN(buyNowProductId)) {
      console.log('not null');
      upsStorage.push({ upsId, amount, vendorId , buyNowCart : true  });
      localStorage.setItem("ups", JSON.stringify(upsStorage));
    } else {
      if (isVendorFound) {
        isVendorFound.upsId = upsId;
        isVendorFound.amount = amount;
        isVendorFound.buyNowCart = false;
        localStorage.setItem("ups", JSON.stringify(upsStorage));
      } else {
        upsStorage.push({ upsId, amount, vendorId , buyNowCart : false });
        localStorage.setItem("ups", JSON.stringify(upsStorage));
      }
    }


    if(!isNaN(buyNowProductId)) {
      window.location.href = `/shoping-cart.html?productId=${buyNowProductId}`;
    } else {
      window.location.href = `/shoping-cart.html`;
    }
  }
};
