//  GET request using fetch()
let upsList = [];
fetch(
  "https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/shippmentRate?customerid=1&prudectid=1"
)
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    upsList = json;
    // Create a variable to store HTML
    let li = `<thead><tr class=" text-black"><th scope="col">Name of Company</th><th scope="col">servicr</th><th scope="col">Currency</th><th scope="col">Price</th><th scope="col">duration</th><th scope="col">Status</th></tr></thead>`;
    // Loop through each data and add a table row
    json.forEach((user) => {
      li += `<tbody>
             <tr>
             
                <td>${user.provider} </td>
                <td>${user.servicr}</td>   
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

let onClickApply = (upsId) => {
  let vendorId = parseInt(getQueryParamaters().vendorid);
  if (vendorId !== null) {
    let amount = upsList.find((a) => a.idRate === upsId).amount;
    let upsStorage = getUpsStorage();
    let isVendorFound = upsStorage.find((a) => a.vendorId === vendorId);
    if (isVendorFound) {
      isVendorFound.upsId = upsId;
      isVendorFound.amount = amount;
      localStorage.setItem("ups", JSON.stringify(upsStorage));
    } else {
      upsStorage.push({ upsId, amount, vendorId });
      localStorage.setItem("ups", JSON.stringify(upsStorage));
    }
    window.location.href = `/shoping-cart.html`;
  }
};
