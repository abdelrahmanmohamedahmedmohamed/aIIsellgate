
/*************customerDetails page******************/
//customerDetails  by  fetch get
let parameter = new URLSearchParams(location.search);
let UserSenId = parameter.get("uId");
let userDetailsInfobj = {};
getuserDetailsInfo();

function getuserDetailsInfo() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/filterByid?id=${UserSenId}`)
        .then(
            function(userDetailsInfoResponse) {
                return userDetailsInfoResponse.json();

            }
        ).then(
            function(userDetailsInfoData) {
                userDetailsInfobj = userDetailsInfoData;
                if (userDetailsInfobj.state == 1) {
                    displayuserDetailsInfo();
                    formatStatus();
                } else {
                    document.querySelector(" .parentUserDetails").innerHTML = `
<div class="alert alert-danger errorsMsgD" role="alert">
ERROR
</div>
`;
                }

            }
        ).catch(
            function(userDetailsInfoError) {
                console.log("FETCH ERROR IS :" + userDetailsInfoError);
            }
        );
}

function displayuserDetailsInfo() {

    document.querySelector(" .parentUserDetails").innerHTML = `
    <div class="row ">
    <div class="col-md-6">
        <div class="infoPart">
            <div class="infoPartImg"><img src="${userDetailsInfobj.image}" alt="image"></div>
            <div>Name : <span class="infoPartName">${userDetailsInfobj.name}</span></div>
            <div>Tag : <span class="infoPartTag">${userDetailsInfobj.tag}</span> </div>
        
        </div>
    </div>
    <div class="col-md-6">
        <div class="infoPart">
            <div>Email : <a class="userDEmail"href="mailto:${userDetailsInfobj.email}"class="infoPartEmail">${userDetailsInfobj.email}</a> </div>
            <div>Country : <span class="infoPartCountry">${userDetailsInfobj.country}</span> </div>
            <div>Address : <span class="infoPartAddress">${userDetailsInfobj.address}</span> </div>
            <div>Phone : <span class="infoPartPhone">${userDetailsInfobj.phone}</span></div>
            <div>Status : <span class="infoPartStatus">${userDetailsInfobj.status}</span></div>   
        </div>
    </div>
</div>`;
}

function formatStatus() {
    if (document.getElementsByClassName("infoPartStatus")[0].textContent == "block") {
        document.getElementsByClassName("infoPartStatus")[0].style.color = "red";
        document.getElementsByClassName("infoPartStatus")[0].style.fontWeight = "bold";
        document.getElementsByClassName("infoPartStatus")[0].textContent = "DELETED";
    } else if (document.getElementsByClassName("infoPartStatus")[0].textContent == "allow") {
        document.getElementsByClassName("infoPartStatus")[0].style.color = "green";
        document.getElementsByClassName("infoPartStatus")[0].style.fontWeight = "bold";
        document.getElementsByClassName("infoPartStatus")[0].textContent = "Available";
    }
}
/**********************table Notes****************/
//getNotes  by  fetch get
let getNotesArr = [];
getNotes();

function getNotes() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/getNote?id=${UserSenId}`)
        .then(
            function(getNotesResponse) {
                return getNotesResponse.json();

            }
        ).then(
            function(getNotesData) {
                getNotesArr = getNotesData;
                if (getNotesArr.length == 0) {
                    document.querySelector(" .NotesTbody").innerHTML = `
                    <tr>
                    <td colspan="5">
<div class="alert alert-danger errorsMsgD" role="alert">
No Notes Exist
</div>
</td>

</tr>
`;
                } else {
                    displaygetNotes();
                }


            }
        ).catch(
            function(getNotesError) {
                console.log("FETCH ERROR IS :" + getNotesError);
            }
        );
}

function displaygetNotes() {
    let getNotesContainer = '';
    for (let no = 0; no < getNotesArr.length; no++) {
        getNotesContainer += `
        <tr>
        <td>${getNotesArr[no].title}</td>
        <td><a href="${getNotesArr[no].PdfNote}"><img src="images/files.webp" class="purASolidImg" alt="image"></a></td>
        <td>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-cloud-upload-alt"></i></button>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Upgrade File</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
                        </div>
                        <div class="modal-body">
                            <input type="file" class="upgradeFile" name="upgradeFile">
                        </div>
                        <div class="modal-footer">

                            <button type="button" class="btn btn-primary"><i class="fas fa-cloud-upload-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>

        </td>
        <td>${getNotesArr[no].date}</td>
    </tr>
  `;

    }
    document.querySelector(".NotesTbody").innerHTML = getNotesContainer;

}
/********pertable*******/
let pertable = [];
getpertable();

function getpertable() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/customerorder?id=${UserSenId}`)
        .then(
            function(pertableContainerresponses) { //(entire HTTP response)
                return pertableContainerresponses.json(); // to next then

            }
        ).then(
            function(pertableContainerdatas) {
                pertable = pertableContainerdatas; //the js array of obj / obj  json of api
                displaypertable();
            }
        ).catch(
            function(pertableContainererrors) {
                console.log("FETCH ERROR IS :" + pertableContainererrors);
            }
        );
}

function displaypertable() {
    let pertableContainer = '';
    for (let pt= 0; pt < pertable.length; pt++) {
        let productsCont='';
        AllOrdersProducts=pertable[pt].prudect;
        console.log(AllOrdersProducts);
        for (let iaoP = 0; iaoP < AllOrdersProducts.length; iaoP++) {
            productsCont+= `
        <div><a class=" dropdown-item" href="product.html?proId=${AllOrdersProducts[iaoP].prudect}">${"Product "+(iaoP+1)} <span><b>Qunity:</b> ${AllOrdersProducts[iaoP].qunity} </span><span><b>Color:</b> ${AllOrdersProducts[iaoP].color} </span></a></div>
      `;
    }
    pertableContainer += `
        <tr>
    
  <td>${pt+1}</td>
        <td>${pertable[pt].price} ${pertable[pt].currency}</td>

        <td>${pertable[pt].vendorname}</td>
        <td>${pertable[pt].order_purchase_timestamp}</td>
        <td>
        <div class="dropdown show">
  <a class="btn btn-dark     dropdown-toggle" href="#" role="button" id="${"dropdownMenuLink"+pt}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i class="fas fa-shopping-basket"></i>
  </a>

  <div class="dropdown-menu" aria-labelledby="${"dropdownMenuLink"+pt}">
 ${productsCont}
  </div>
</div>
      </td>
  </tr>
        `;
    }
    document.getElementsByClassName("numPurchased")[0].innerHTML= pertable.length;
    document.getElementsByClassName("pertableTbody")[0].innerHTML = pertableContainer;

}
/********soltable*******/
let soltable = [];
getsoltable();

function getsoltable() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/orderbyvendor?vendorid=${UserSenId}`)
        .then(
            function(soltableresponses) { //(entire HTTP response)
                return soltableresponses.json(); // to next then

            }
        ).then(
            function(soltabledatas) {
                soltable = soltabledatas; //the js array of obj / obj  json of api
                displaysoltable();
            }
        ).catch(
            function(soltableerrors) {
                console.log("FETCH ERROR IS :" + soltableerrors);
            }
        );
}

function displaysoltable() {
    let soltableContainer = '';
    for (let pt= 0; pt < soltable.length; pt++) {
        let productsCont='';
        AllOrdersProductss=soltable[pt].prudect;
        console.log(AllOrdersProductss);
        for (let iaoP = 0; iaoP < AllOrdersProductss.length; iaoP++) {
            productsCont+= `
        <div><a class=" dropdown-item" href="product.html?proId=${AllOrdersProductss[iaoP].prudect}">${"Product "+(iaoP+1)} <span><b>Qunity:</b> ${AllOrdersProductss[iaoP].qunity} </span><span><b>Color:</b> ${AllOrdersProductss[iaoP].color} </span></a></div>
      `;
    }
    soltableContainer += `
        <tr>
    
  <td>${pt+1}</td>
        <td>${soltable[pt].price} ${soltable[pt].currency}</td>

        <td>${soltable[pt].order_purchase_timestamp}</td>
        <td>
        <div class="dropdown show">
  <a class="btn btn-dark     dropdown-toggle" href="#" role="button" id="${"dropdownMenuLink"+pt}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i class="fas fa-shopping-basket"></i>
  </a>

  <div class="dropdown-menu" aria-labelledby="${"dropdownMenuLink"+pt}">
 ${productsCont}
  </div>
</div>
      </td>
  </tr>
        `;
    }
    document.getElementsByClassName("numSolded")[0].innerHTML= soltable.length;
    document.getElementsByClassName("soldedtableTbody")[0].innerHTML = soltableContainer;

}

