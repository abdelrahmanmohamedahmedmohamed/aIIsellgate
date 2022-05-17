let parametero = new URLSearchParams(location.search);
let orderId = parametero.get("id");
/*******get comments******* */
let comments = [];
getComments();

function getComments() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/orderprudect?id=${orderId}`)
    .then(
        function(getCommentsResponses) {
            return getCommentsResponses.json();
            
        }
    ).then(
        function(getCommentsData) {
            comments = getCommentsData;
            displayComments();
        }
    ).catch(
        function(getCommentsError) {
        }
    );
}



function displayComments() {
  
    var postsContanier= "";

    for(var i =0; i<comments.length; i++){
        postsContanier += 
        `   
        <div class="row justify-content-center mb-3">
        <div class="col-md-12 col-xl-10">
          <div class="card shadow-0 border rounded-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div class="bg-image hover-zoom ripple rounded ripple-surface">
                    <img src="${comments[i].images}"
                      class="w-100" />
                    <a href="#!">
                      <div class="hover-overlay">
                        <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                      </div>
                    </a>
                  </div>
                </div>
  
                
                <div class="col-md-6 col-lg-6 col-xl-6 ">
                  <h5>${comments[i].name}</h5>
                  <div class="mt-1 mb-0 text-muted small">
                    <span></span>
                  </div>
                  <div class="mb-2 text-muted small">
                  Qunity : ${comments[i].qunity}
                  </div>
                  
                </div>
  
                <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div class="d-flex flex-row align-items-center mb-1">
                    <h4 class="mb-1 me-1">$${comments[i].price}</h4>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
        
        `;
        
    }
    document.getElementsByClassName("anotherProductApi")[0].innerHTML = postsContanier;
    
}













getHistoryHome();
function getHistoryHome(){

    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/orderprudect?id=${orderId}`).then((datahist)=>{
  
        return datahist.json();
    }).then((completedata2)=>{
        let data2="";
    
    
        completedata2.reverse().map((valuess)=>{
            let imagesString222=valuess.images;
            let imagesArray222 = imagesString222.split("~");
            data2 +=
               `
       
               <div class="row justify-content-center mb-3">
               <div class="col-md-12 col-xl-10">
                 <div class="card shadow-0 border rounded-3">
                   <div class="card-body">
                     <div class="row">
                       <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                         <div class="bg-image hover-zoom ripple rounded ripple-surface">
                           <img src="  ${imagesArray222[0]}}"
                             class="w-100" />
                           <a href="#!">
                             <div class="hover-overlay">
                               <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                             </div>
                           </a>
                         </div>
                       </div>
         
                       
                       <div class="col-md-6 col-lg-6 col-xl-6 ">
                         <h5>  ${valuess.name}</h5>
                         <div class="mt-1 mb-0 text-muted small">
                           <span></span>
                         </div>
                         <div class="mb-2 text-muted small">
                         Qunity :   ${valuess.qunity}
                         </div>
                         
                       </div>
         
                       <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                         <div class="d-flex flex-row align-items-center mb-1">
                           <h4 class="mb-1 me-1">$     ${valuess.price}</h4>
                           
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
         
               
            
         
    ` 
                });
        document.getElementById("anotherProductApi").innerHTML=data2;
    }).catch((err2)=>{
        console.log(err2);
    })
        
    }


 