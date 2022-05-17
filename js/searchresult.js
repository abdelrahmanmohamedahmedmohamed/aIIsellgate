//searchVendorProduct  by  fetch get
let getSearchHomeArr = [];
        document.getElementsByClassName("searchb")[0].onclick = function(){

            let SearchFiledValuef = document.getElementsByClassName("searchf")[0].value;
  if(SearchFiledValuef != ''){
    getSearchHome(SearchFiledValuef);
    document.getElementsByClassName("parentsearchresult")[0].style.backgroundImage = "url('../images/white.png)";
  }
          
        
        function getSearchHome(SearchFiledValuef) {
            console.log("par:"+SearchFiledValuef)
            fetch(`https://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/sreachresult?name=${SearchFiledValuef}`)
                .then(
                    function(getSearchHomeResponse) {
                        return getSearchHomeResponse.json();

                    }
                ).then(
                    function(getSearchHomeProductData) {
                        getSearchHomeArr = getSearchHomeProductData;
                        console.log("par:"+SearchFiledValuef)

                        if (getSearchHomeArr.length == 0) {
                          /*  document.getElementsByClassName("parentsearchresult")[0].innerHTML="  ";*/
                            document.getElementsByClassName("parentsearchresult")[0].style.backgroundImage = "url('../images/not.svg)";
                            document.getElementsByClassName("parentsearchresult")[0].innerHTML =
                            `<div class="alert alert-light ErrorCommntSho" role="alert">
               Sorry , The Thing You Search About Is Not Exist :(
                          </div>`;
                        } else {
                            displaygetSearchHome(); 
                        }

                    }
                ).catch(
                    function(getSearchVendorProductError) {
                        console.log("FETCH ERROR IS :" + getSearchVendorProductError);
                    }
                );
        }
    }

function displaygetSearchHome() {
    let getSearchHomeArrContainer = '';
    for (let ven = 0; ven < getSearchHomeArr.length; ven++) {
       
        let imagesSearchString=getSearchHomeArr[ven].images;
        let imagesSearchArray = imagesSearchString.split("~");
       
        getSearchHomeArrContainer += `
        <div class="col-sm-6 col-md-4 col-lg-3">    
        <div class="itemForSale">

        <a href="product.html?proId=${getSearchHomeArr[ven].id}"class="mainItemForSalePhoto">
                <img src="${imagesSearchArray[0]}" alt="item sale photo">
            </a>
            <a href="product.html?proId=${getSearchHomeArr[ven].id}"class="itemForSaleP">${getSearchHomeArr[ven].name}</a>
            <div class="itemForSalePrice">
                <span class="theItemForSalePrice">${getSearchHomeArr[ven].price} </span> ${getSearchHomeArr[ven].currency}
            </div>
        </div>
    </div>`;
 
    }
    document.querySelector(".parentsearchresult").innerHTML = getSearchHomeArrContainer;

}