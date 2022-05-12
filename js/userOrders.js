
//getAllOrders  by  fetch get
let AllOrders = [];
let AllOrdersProducts = [];
getAllOrders();

function getAllOrders() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/orderbyvendor?vendorid=${localStorage.getItem("loginUserId")}`)
    
        .then(
            function(getAllOrdersresponses) { //(entire HTTP response)
                return getAllOrdersresponses.json(); // to next then

            }
        ).then(
            function(getAllOrdersdatas) {
                AllOrders = getAllOrdersdatas; //the js array of obj / obj  json of api
           
                displayAllOrders();
            }
        ).catch(
            function(getAllOrderserrors) {
                console.log("FETCH ERROR IS :" + getAllOrderserrors);
            }
        );
}

function displayAllOrders() {
    let allOrdersContainer = '';
    let productsCont='';

    for (let iao = 0; iao < AllOrders.length; iao++) {
        let productsCont='';
        AllOrdersProducts=AllOrders[iao].prudect;
        console.log(AllOrdersProducts);
        for (let iaoP = 0; iaoP < AllOrdersProducts.length; iaoP++) {
            productsCont+= `
        <div><a class=" dropdown-item" href="product.html?proId=${AllOrdersProducts[iaoP].prudect}">${"Product "+(iaoP+1)} <span><b>Qunity:</b> ${AllOrdersProducts[iaoP].qunity} </span><span><b>Color:</b> ${AllOrdersProducts[iaoP].color} </span></a></div>
      `;
    }
        allOrdersContainer += `
        <tr>
        <td>
        <div class="dropdown show">
  <a class="btn btn-dark     dropdown-toggle" href="#" role="button" id="${"dropdownMenuLink"+iao}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i class="fas fa-shopping-basket"></i>
  </a>

  <div class="dropdown-menu" aria-labelledby="${"dropdownMenuLink"+iao}">
 ${productsCont}
  </div>
</div>
      </td>
  
        <td>${AllOrders[iao].price} ${AllOrders[iao].currency}</td>

       

        <td>${AllOrders[iao].order_status}</td>

   

        <td>${AllOrders[iao].order_approved_at}</td>

        <td class="order_delivered">${AllOrders[iao].order_delivered_customer_date}</td>

        <td class="manyDate">${AllOrders[iao].manyDate}</td>

        <td>${AllOrders[iao].tracknumber}</td>

        <td>${AllOrders[iao].quntity}</td>
        <td>${AllOrders[iao].vendormany}</td>
  </tr>
        `;
 
    }
    
    document.getElementsByClassName("tableAllOTbody")[0].innerHTML = allOrdersContainer;

}