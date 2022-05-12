
//getAllOrders  by  fetch get
let AllOrders = [];
let AllOrdersProducts = [];
getAllOrders();

function getAllOrders() {
    fetch('http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/AllOrder')
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
  <a class="btn btn-info dropdown-toggle" href="#" role="button" id="${"dropdownMenuLink"+iao}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    All Products
  </a>

  <div class="dropdown-menu" aria-labelledby="${"dropdownMenuLink"+iao}">
 ${productsCont}
  </div>
</div>
      </td>
  
        <td>${AllOrders[iao].price} ${AllOrders[iao].currency}</td>

        <td> ${AllOrders[iao].shanPricel} ${AllOrders[iao].currency}</td>

        <td>${AllOrders[iao].order_status}</td>

        <td>${AllOrders[iao].order_purchase_timestamp}</td>

        <td>${AllOrders[iao].order_approved_at}</td>

        <td class="order_delivered">${AllOrders[iao].order_delivered_customer_date}</td>

        <td class="manyDate">${AllOrders[iao].manyDate}</td>

        <td>${AllOrders[iao].tracknumber}</td>

        <td>${AllOrders[iao].quntity}</td>
        <td><i class="cirFlag fas fa-check-circle"></i></td>
        <td><a class="btn btn-secondary" href="profile.html?venId=${AllOrders[iao].customerid}"><i class="fas fa-user-plus"></i></a></td>

        <td><a class="btn btn-dark" href="profile.html?venId=${AllOrders[iao].vendorid}"><i class="fas fa-user-minus"></i></a></td>
    </tr>
        `;
 
    }
    
    document.getElementsByClassName("tableAllOTbody")[0].innerHTML = allOrdersContainer;
    for (let iaok = 0; iaok < AllOrders.length; iaok++) {
    if(AllOrders[iaok].flag==2){
        console.log("flag value :"+AllOrders[iaok].flag);
document.getElementsByClassName("cirFlag")[iaok].style.color="green";
    }else if(AllOrders[iaok].flag==1){
        document.getElementsByClassName("cirFlag")[iaok].style.color="gray"; 
    }else if(AllOrders[iaok].flag==0){
        document.getElementsByClassName("cirFlag")[iaok].style.color="red";   
        document.getElementsByClassName("order_delivered")[iaok].innerHTML=`<i class="fas fa-exclamation-circle"></i>`;
        document.getElementsByClassName("manyDate")[iaok].innerHTML=`<i class="fas fa-exclamation-circle"></i>`;
    }else{
        document.getElementsByClassName("cirFlag")[iaok].style.color="yellow";   
    }
}
}