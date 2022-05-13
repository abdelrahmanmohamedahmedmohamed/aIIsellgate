
document.getElementsByClassName("BtnSeeMoreIFs")[0].addEventListener("click", () => {
    document.getElementsByClassName("mainItemsForSale")[0].style.overflow = "inherit";
    document.getElementsByClassName("mainItemsForSale")[0].style.maxHeight = "unset";
    document.getElementsByClassName("BtnSeeMoreIFs")[0].style.display = "none";
});

if (document.getElementsByClassName("mainItemsForSale")[0].clientHeight < 1290) {
    document.getElementsByClassName("BtnSeeMoreIFs")[0].style.display = "none";
}
/********************************** */

//getProfileInfo  by  fetch (GET)
let profileInfo = {};
let profileInfoProducts =[];
let mainPhotoProfileHeader = document.querySelector(".mainPhotoProfileHeader  img");
let profileNameU = document.getElementsByClassName("profileNameU")[0];
let profileAddressU = document.getElementsByClassName("profileAddressU")[0];
let profileEmail = document.getElementsByClassName("profileEmail")[0];
let numItemsFSa = document.getElementsByClassName("numItemsFSa")[0];
let modelId="#exampleModal";
let parametervendorIdP = new URLSearchParams(location.search);
let vendorIdP = parametervendorIdP.get("venId");
/*if(localStorage.getItem("loginUserId")==vendorIdP){
    document.getElementsByClassName("settingProImageBtn")[0].style.display="inherit";
}else{
    document.getElementsByClassName("settingProImageBtn")[0].style.display="none"; 
}*/
if(localStorage.getItem("loginUserId")==vendorIdP){
    document.getElementsByClassName("acceptTable")[0].style.display="inherit";
}else{
    document.getElementsByClassName("acceptTable")[0].style.display="none";
}
getProfileInfo();
document.getElementsByClassName("allVendorProductBtn")[0].addEventListener("click",
    function() {
        getProfileInfo();
    });
function getProfileInfo() {
    fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/Profile?id=${vendorIdP}`)
        .then(
            function(profileResponse) {
                return profileResponse.json();

            }
        ).then(
            function(profileData) {
                profileInfo = profileData;
                profileInfoProducts=profileInfo.prudects;
            
                if(profileInfoProducts.length==0){
                    numItemsFSa.textContent="0";
                    document.getElementsByClassName("parentItemsForSale")[0].innerHTML =
                    `<div class="alert alert-warning ErrorCommntSho" role="alert">
      No Items To Show...
                  </div>`;
                  displayProfileInfo();
                }else{
                    displayProfileInfo();
               
                    for (let ch = 0; ch <profileInfoProducts.length; ch++) {
                        if(localStorage.getItem("loginUserId")==vendorIdP){
                            document.getElementsByClassName("settingProfBtn")[ch].style.display="inherit";
                             /************start delete product method************** */
                document.getElementsByClassName("settingProfBtnDel")[ch].addEventListener("click",
                function() {
                deleteProductAll();
                function deleteProductAll(){
                    const deleteInfoSendedAll ={
                         id: profileInfoProducts[ch].id
                        }
                    fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/deletPrudect`,
                     {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(deleteInfoSendedAll)
                    })
                    .then(deleteResponseAll => {
                        return deleteResponseAll.json()
                    })
                    .then(function (deleteDataAll){
                   document.location.reload();
                    }
                    ).catch(
                        function(deleteErrorAll) {
                        }
                    );
                }
                });
                  /************end delete product method************** */
                        }else{
                            document.getElementsByClassName("settingProfBtn")[ch].style.display="none"; 
                        }
                    }
                }

              
             
            }
        ).catch(
            function(profileError) {
            }
        );
}

function displayProfileInfo() {
  
    mainPhotoProfileHeader.src=profileInfo.image;
    profileNameU.textContent=profileInfo.fullname;
    profileAddressU.textContent=profileInfo.country;
    profileEmail.textContent=profileInfo.email;
    profileEmail.href="mailto:" + profileInfo.email;
    numItemsFSa.textContent=profileInfoProducts.length;

    let sallesItemsContainer = '';
    for (let i = 0; i <profileInfoProducts.length; i++) {
  
        let imagesString=profileInfoProducts[i].images;
        let imagesArray = imagesString.split("~");
  
        sallesItemsContainer += `
        <div class="col-sm-6 col-md-4 col-lg-3">    
            <div class="itemForSale">
            <button class="btn btn-secondary  settingProfBtn" type="button" id="${"dropdownMenuButton"+i}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu dropTop" aria-labelledby="${"dropdownMenuButton"+i}">
              <span class="dropdown-item" >       <button href="#" type="button" class="btn btn-danger w-100 settingProfBtnDel">Delete</button>
              </span>
            </div>
          </div>
            <a href="product.html?proId=${profileInfoProducts[i].id}"class="mainItemForSalePhoto">
                    <img src="${imagesArray[0]}" alt="item sale photo">
                </a>
                <a href="product.html?proId=${profileInfoProducts[i].id}"class="itemForSaleP">${profileInfoProducts[i].name}</a>
                <div class="itemForSalePrice">
                    <span class="theItemForSalePrice">${profileInfoProducts[i].price} </span> ${profileInfoProducts[i].currency}
                </div>
            </div>
        </div>`;
               
    }
    document.getElementsByClassName("parentItemsForSale")[0].innerHTML = sallesItemsContainer;

}
//searchVendorProduct  by  fetch get
let getSearchVendorProductArr = [];

document.getElementsByClassName("searchVendorProductBtn")[0].addEventListener("click",
    function() {
        let SearchFiledValue33 = document.getElementsByClassName("searchVendorProductField")[0].value;

        if (SearchFiledValue33 == '') {

        } else {
            getSearchVendorProduct();
    
        }

        function getSearchVendorProduct() {
            fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/getsreachprofile?name=${SearchFiledValue33}&vendorid=${vendorIdP}`)
                .then(
                    function(getSearchVendorProductResponse) {
                        return getSearchVendorProductResponse.json();

                    }
                ).then(
                    function(getSearchVendorProductData) {
                        getSearchVendorProductArr = getSearchVendorProductData;

                        if (getSearchVendorProductArr.length == 0) {
                            numItemsFSa.textContent="0";
                            document.getElementsByClassName("parentItemsForSale")[0].innerHTML =
                            `<div class="alert alert-warning ErrorCommntSho" role="alert">
              No Items  Found  &#128540;
                          </div>`;
                        } else {
                            displaygetSearchVendorProduct();
                            for (let ch2 = 0; ch2 <getSearchVendorProductArr.length; ch2++) {
                                if(localStorage.getItem("loginUserId")==vendorIdP){
                                    document.getElementsByClassName("settingProfBtn")[ch2].style.display="inherit";
                                    /************start delete product method************** */
 document.getElementsByClassName("settingProfBtnDel")[ch2].addEventListener("click",
 function() {
 deleteProduct();
 function deleteProduct(){
     const deleteInfoSended ={
          id: getSearchVendorProductArr[ch2].id
         }
     fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/deletPrudect`,
      {
         method: 'DELETE',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(deleteInfoSended)
     })
     .then(deleteResponse => {
         return deleteResponse.json( )
     })
     .then(deleteData => {}).catch(
         function(deleteError) {
         }
     );
 }
 });
   /************end delete product method************** */
                                }else{
                                    document.getElementsByClassName("settingProfBtn")[ch2].style.display="none"; 
                                }
                            }
                            
                        }

                    }
                ).catch(
                    function(getSearchVendorProductError) {
                        console.log("FETCH ERROR IS :" + getSearchVendorProductError);
                    }
                );
        }
    })

function displaygetSearchVendorProduct() {
    numItemsFSa.textContent=getSearchVendorProductArr.length;
    let getSearchVendorProductContainer = '';
    for (let ven = 0; ven < getSearchVendorProductArr.length; ven++) {
       
        let imagesSearchString=getSearchVendorProductArr[ven].images;
        let imagesSearchArray = imagesSearchString.split("~");
       
        getSearchVendorProductContainer += `
        <div class="col-sm-6 col-md-4 col-lg-3">    
        <div class="itemForSale">
        <div class="dropdown">
  <button class="btn btn-secondary  settingProfBtn" type="button" id="${"dropdownMenuButton"+ven+799}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i class="fas fa-ellipsis-v"></i>
  </button>
  <div class="dropdown-menu dropTop" aria-labelledby="${"dropdownMenuButton"+ven+799}">
    <span class="dropdown-item" >     <button href="#" type="button" class="btn btn-danger w-100 settingProfBtnDel">Delete</button>
    </span>
  </div>
</div>
        <a href="product.html?proId=${getSearchVendorProductArr[ven].id}"class="mainItemForSalePhoto">
                <img src="${imagesSearchArray[0]}" alt="item sale photo">
            </a>
            <a href="product.html?proId=${getSearchVendorProductArr[ven].id}"class="itemForSaleP">${getSearchVendorProductArr[ven].name}</a>
            <div class="itemForSalePrice">
                <span class="theItemForSalePrice">${getSearchVendorProductArr[ven].price} </span> ${getSearchVendorProductArr[ven].currency}
            </div>
        </div>
    </div>`;
 
    }
    document.querySelector(".parentItemsForSale").innerHTML = getSearchVendorProductContainer;

}
/**************transactiontable************* */
//getAllTransOrders  by  fetch get
let AllTransOrders = [];

let AllTransOrdersProducts = [];
getAllTransOrders();

function getAllTransOrders() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/getTransaction?vendorid=${vendorIdP}`)
        .then(
            function(getAllTransOrdersresponses) { //(entire HTTP response)
                return getAllTransOrdersresponses.json(); // to next then

            }
        ).then(
            function(getAllTransOrdersdatas) {
                AllTransOrders = getAllTransOrdersdatas; //the js array of obj / obj  json of api
           
                displayAllTransOrders();
               
            }
        ).catch(
            function(getAllTransOrderserrors) {
            }
        );
}

function displayAllTransOrders() {
    let AllTransOrdersContainer = '';
    let productsContT='';

    for (let iao = 0; iao < AllTransOrders.length; iao++) {
        let productsContT='';
        AllTransOrdersProducts=AllTransOrders[iao].prudect;
        for (let iaoP = 0; iaoP < AllTransOrdersProducts.length; iaoP++) {
            productsContT+= `
        <div><a class=" dropdown-item" href="product.html?proId=${AllTransOrdersProducts[iaoP].prudect}">${"Product "+(iaoP+1)} <span><b>Qunity:</b> ${AllTransOrdersProducts[iaoP].qunity} </span><span><b>Color:</b> ${AllTransOrdersProducts[iaoP].color} </span></a></div>
      `;
    }
    AllTransOrdersContainer += `
        <tr>
        <td>
        <div class="dropdown show">
  <a class="btn btn-info dropdown-toggle" href="#" role="button" id="${"dropdownMenuLink"+iao}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    All Products
  </a>

  <div class="dropdown-menu" aria-labelledby="${"dropdownMenuLink"+iao}">
 ${productsContT}
  </div>
</div>
      </td>
  
        <td>${AllTransOrders[iao].price} ${AllTransOrders[iao].currency}</td>

<td class="acceptTD">
<button class="btn btn-success"onclick="postAccept(${AllTransOrders[iao].id},${iao})">
<i class="fas fa-check"></i></button>
<span class="seelinkspanAlt"> Already Pressed</span>
    <a class="seelinkspan" href="${AllTransOrders[iao].label}"> See Label</a>

</td>

        <td>${AllTransOrders[iao].order_purchase_timestamp}</td>

 </tr>
        `;


    }
    
    document.getElementsByClassName("acceptTableTbody")[0].innerHTML = AllTransOrdersContainer;
//ffff();
}

 /********accept trans btn********************* */
let returnpostacceptdata={};
     function postAccept(idOrderAccept,iaoVar) {
        if(AllTransOrders[iaoVar].label==null){
       //   document.getElementsByClassName("seelinkspan")[iaoVar].style.display="no";
            insideAccept();
            
            }else{
                document.getElementsByClassName("seelinkspan")[iaoVar].style.display="inline";
                document.getElementsByClassName("seelinkspanAlt")[iaoVar].style.display="inline";
           
            }
function insideAccept(){
         const url = 'http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/makeTransaction';
 
         let postAcceptdata = {
             id:idOrderAccept
 
         }
 
         let postAcceptfetchData = {
             method: 'PUT',
             body: JSON.stringify(postAcceptdata),
             headers: new Headers({
                 'Content-Type': 'application/json; charset=UTF-8'
             })
         }
         fetch(url, postAcceptfetchData)
             .then(
                 function(postAcceptresponse) { //(entire HTTP response)
                     return postAcceptresponse.json(); // to next then
                 }
             ).then(
                 function(postAcceptdata) {
                    
                     returnpostacceptdata=postAcceptdata;
                     if(returnpostacceptdata.state==1){
                        document.location.reload();
                     }
 
                 }).catch(
                 function(postAccepterror) {
                 }
             );
     }
    }
