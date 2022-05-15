//localStorage.removeItem('loginUserId');
console.log("userLast AFTER Delete :" + localStorage.getItem("loginUserId"));
let productInfoName = document.querySelector(".productInfoName");
let catNameH = document.getElementsByClassName("catNameH")[0];
let detail1 = document.getElementsByClassName("detail1")[0];
let detail2 = document.getElementsByClassName("detail2")[0];
let detail3 = document.getElementsByClassName("detail3")[0];
let detail4 = document.getElementsByClassName("detail4")[0];
let brandName = document.getElementsByClassName("brandName")[0];
let productDescription = document.getElementsByClassName("productDescription")[0];
let theProRat = document.getElementsByClassName("theProRat")[0];
let ProductPriceT = document.getElementsByClassName("ProductPriceT")[0];
let ProductCurrencyT = document.getElementsByClassName("ProductCurrencyT")[0];
let sallerInfoName = document.getElementsByClassName("sallerInfoName")[0];
let sallerInfoStars = document.getElementsByClassName("sallerInfoStars")[0];
let vendorlocation = document.getElementsByClassName("vendorlocation")[0];
let ArivelDateT = document.getElementsByClassName("ArivelDateT")[0];
let theSallerInfoNamePic = document.getElementsByClassName("theSallerInfoNamePic")[0];
let parameterProductId = new URLSearchParams(location.search);
let parId = parameterProductId.get("proId");
//display productinfo by api from fetch api
let product = {};
getProduct();

function getProduct() {
    fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/getSpecialPru?id=${parId}&customerid=${localStorage.getItem("loginUserId")}`)
        .then(
            function(productResponse) {
                return productResponse.json();

            }
        ).then(
            function(productData) {
                product = productData;
                displayProduct();
                getComments();
                getRecommend();
                getHistory();
            }
        ).catch(
            function(productError) {
                console.log("FETCH ERROR IS :" + productError);
            }
        );
}

function displayProduct() {
    let imagesString=product.images;
    let imagesArray = imagesString.split("~");

    var imgSelectContainer = "";
    for (var d = 0; d < imagesArray.length; d++) {
        imgSelectContainer += `
    <div class="img-item">
        <a href="#" data-id="${(d+1)}">
            <img src="${imagesArray[d]}" alt="shoe image">
        </a>
    </div>
                `;
    }
    document.getElementsByClassName("img-select")[0].innerHTML = imgSelectContainer;

    var imgShowcaseContainer = "";
    for (var c = 0; c < imagesArray.length; c++) {
        imgShowcaseContainer += `
    <img src="${imagesArray[c]}" alt="shoe image">
                `;
    }
    document.getElementsByClassName("img-showcase")[0].innerHTML = imgShowcaseContainer;
    /*********code of product image slider************* */
    myGreeting();

    function myGreeting() {
        const imgs = document.querySelectorAll('.img-select a');
        const imgBtns = [...imgs];
        let imgId = 1;

        imgBtns.forEach((imgItem) => {
            imgItem.addEventListener('click', (event) => {
                event.preventDefault();
                imgId = imgItem.dataset.id;
                slideImage();
            });
        });

        function slideImage() {
            const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

            document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
        }

        window.addEventListener('resize', slideImage);
    }

    /*************************************** */
    productInfoName.textContent = product.name;
    catNameH.textContent = product.category;
    brandName.textContent = product.brand;
    detail1.textContent = product.weight;
    detail2.textContent = product.height;
    detail3.textContent = product.width;
    detail4.textContent = product.sku;
    productDescription.textContent = product.description;
    theProRat.textContent = product.rate;
    ProductPriceT.textContent = product.price;
    ProductCurrencyT.textContent = product.currency;
    sallerInfoName.textContent = product.fullname;
    theSallerInfoNamePic.src=product.image;
    sallerInfoName.href="profile.html?venId="+product.vendorid;
}
/****************post comment********************* */
let commentForm = {};
const formComment = document.getElementsByClassName("formComment")[0];
let errorMsg3 = document.getElementsByClassName("errorMsg3")[0];
let successMsg = document.getElementsByClassName("successMsg")[0];
formComment.onsubmit = (e) => {
    e.preventDefault(); //prevnt form from submit
}

document.getElementsByClassName("btnAddComment")[0].onclick = () => {
        let reviewtitle = document.getElementsByClassName("reviewtitle")[0].value;
        let rat = document.getElementsByClassName("rat")[0].value;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;
       
   
        if(localStorage.getItem("loginUserId") === null){
            errorMsg3.innerHTML = `Please <a href="login.html">Login</a> First ...`;
            errorMsg3.style.display = "inherit";
            successMsg.style.display = "none";
        }else if (localStorage.getItem("loginUserId")==product.vendorid){
            errorMsg3.textContent = `You Not Allowed To Comment...`;
            errorMsg3.style.display = "inherit";
            successMsg.style.display = "none";
        }
        else if (reviewtitle.trim().length ==0) {
            errorMsg3.textContent = "The Review Text Is Empty...";
            errorMsg3.style.display = "inherit";
            successMsg.style.display = "none";

        }else if(rat==="Choose Your Stars Rating"){
            errorMsg3.textContent = "Choose Rating";
            errorMsg3.style.display = "inherit";
            successMsg.style.display = "none";
        }else if(reviewtitle.trim().length>240){
            errorMsg3.textContent = "The Review Is So Long ...";
            errorMsg3.style.display = "inherit";
            successMsg.style.display = "none";
        } else {
         
            postComment();

        }

        function postComment() {
            const commentUrl = `https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/PostReview`;

            let commentData = {
                id:localStorage.getItem("loginUserId"),
                review: reviewtitle,
                date: today,
                rate: rat,
                prudeid:parId
            }

            let commentFetchData = {
                method: 'POST',
                body: JSON.stringify(commentData),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                })
            }
            fetch(commentUrl, commentFetchData)
                .then(
                    function(commentResponse) {
                        return commentResponse.json();
                    }
                ).then(
                    function(commentData) {
                        commentForm = commentData;
                        if (commentForm.state == 1) {
                            successMsg.style.display = "inherit";
                            errorMsg3.style.display = "none";
                            document.location.reload();

                        } else {
                            errorMsg3.style.display = "inherit";
                            successMsg.style.display = "none";
                        }
                    }).catch(
                    function(commentError) {
                        console.log("FETCH POST ERROR IS :" + commentError);
                        errorMsg3.style.display = "inherit";
                        successMsg.style.display = "none";
                    }
                );

        }
    }
    /******************get comments****************** */
let comments = [];


function getComments() {
    fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/getReview?id=${parId}`)
        .then(
            function(getCommentsResponses) {
                return getCommentsResponses.json();

            }
        ).then(
            function(getCommentsData) {
                comments = getCommentsData;
                console.log(getCommentsData);
                if(comments.length==0){
                    document.getElementsByClassName("CustReviewsArea")[0].innerHTML =
                    `<div class="alert alert-warning ErrorCommntSho" role="alert">
      No Comments To Show...
                  </div>`;
                }else{
                    displayComments();
                }
             
            }
        ).catch(
            function(getCommentsError) {
                console.log("FETCH ERROR IS :" + getCommentsError);
            }
        );
}

function displayComments() {
    var commentsContainer = "";
  
    for (var c = 0; c < comments.length; c++) {
        var commentsStarsContainer = "";
        for (var rateN = 0; rateN < comments[c].comments.rate; rateN++) {
            console.log(comments[c].comments.rate);
            commentsStarsContainer+=`  <i class="fas fa-star"></i>`;
        }
        commentsContainer +=
            `
                    <div class=" container">
                    <div class=" row CustReview">
            
                    <div class="CustReviewInfoAll col-lg-3">
                    <div class="CustReviewInfoPhoto">
                    <img src="${comments[c].image}" alt="image">
                    </div>
                        <div class="CustReviewInfoN">
                        ${comments[c].fullname}
                        </div>
                        <div class="CustReviewInfoD">
                         ${comments[c].comments.date}
                        </div>
                        <div class="CustReviewStarsALikes">
                            <span class="CustReviewStars">
                         ${commentsStarsContainer}
                      </span>
                       
                        </div>
                      
                    </div>
                    <div class="CustReviewText col-lg-9">
                    ${comments[c].comments.review}
                   </div>
                </div>
                </div>
                    `;
    }
    document.getElementsByClassName("CustReviewsArea")[0].innerHTML = commentsContainer;
}
/*********************sec of recommend*****************************/
function getRecommend(){

fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/getrecommendMachine?id=${product.spe_id}`).then((data)=>{
    console.log("recmmoend:"+product.spe_id);
    return data.json();
}).then((completedata1)=>{
    let data1="";


    completedata1.reverse().map((values)=>{
        let imagesString22=values.images;
        let imagesArray22 = imagesString22.split("~");
        data1 +=
           `
 <div class="col-sm-12 col-md-4 col-lg-3 col-xl-3 recommend p-b-50 isotope-item women ">
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
							<img src="${imagesArray22[0]}" alt="IMG-PRODUCT">

							<a href="product.html?proId=${values.id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
								Quick View
							</a>
						</div>

						<div class="block2-txt flex-w flex-t p-t-14">
							<div class="block2-txt-child1 flex-col-l ">
								<a href="product.html?proId=${values.id}" class=" text-recomend stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
								${values.name}
								</a>

								
                            

      
                            <span class="stext-105 cl3">
								
								</span>
                    
                                                        </div>

							<div class="block2-txt-child2 flex-r p-t-3">
								<a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
									<img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
									<img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
								</a>
							</div>
						</div>
					</div>
				</div>



		
     
` 
            });
    document.getElementById("postsRecommend").innerHTML=data1;
}).catch((err)=>{
    console.log(err);
})
    
}

/*********************sec of History*****************************/
function getHistory(){

    fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/history?customerid=${localStorage.getItem("loginUserId")}`).then((datahist)=>{
  
        return datahist.json();
    }).then((completedata2)=>{
        let data2="";
    
    
        completedata2.reverse().map((valuess)=>{
            let imagesString222=valuess.images;
            let imagesArray222 = imagesString222.split("~");
            data2 +=
               `
     <div class="col-sm-12 col-md-4 col-lg-3 col-xl-3 recommend p-b-50 isotope-item women ">
                        <!-- Block2 -->
                        <div class="block2">
                            <div class="block2-pic hov-img0">
                                <img src="${imagesArray222[0]}" alt="IMG-PRODUCT">
    
                                <a href="product.html?proId=${valuess.id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                    Quick View
                                </a>
                            </div>
    
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l ">
                                    <a href="product.html?proId=${valuess.id}" class=" text-recomend stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    ${valuess.name}
                                    </a>
    
                                    
                                
    
          
                                <span class="stext-105 cl3">
                                    
                                    </span>
                        
                                                            </div>
    
                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                        <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                                        <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
    
    
    
            
         
    ` 
                });
        document.getElementById("postsHistory").innerHTML=data2;
    }).catch((err2)=>{
        console.log(err2);
    })
        
    }