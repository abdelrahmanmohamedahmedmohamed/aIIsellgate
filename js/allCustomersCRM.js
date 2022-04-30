/*************all customers page******************/
/************func of get the id of cliked user and use it to redirect*************** */
function getUserOfTableIdARedi() {
    let elemntsInTable = document.getElementsByClassName("oneUserT");
    let idOfUser = document.getElementsByClassName("idOfUser");
    let textOfElemnt;
    for (let m = 0; m < elemntsInTable.length; m++) {
        if (document.getElementsByClassName("statusCell")[m].textContent == "block") {
            // document.getElementsByClassName("delBtn")[m].style.display = "none";
            document.getElementsByClassName("delBtn")[m].textContent = "Recover";
            document.getElementsByClassName("delBtn")[m].style.backgroundColor = "#138496";
            document.getElementsByClassName("delBtn")[m].style.border = "0";
            document.getElementsByClassName("statusCell")[m].style.color = "red";
            document.getElementsByClassName("statusCell")[m].style.fontWeight = "bold";
            document.getElementsByClassName("statusCell")[m].textContent = "DELETED";
        } else if (document.getElementsByClassName("statusCell")[m].textContent == "allow") {
            // document.getElementsByClassName("delBtn")[m].style.display = "inherit";
            document.getElementsByClassName("delBtn")[m].textContent = "Delete";
            document.getElementsByClassName("delBtn")[m].style.backgroundColor = "#C82333";
            document.getElementsByClassName("statusCell")[m].style.color = "green";
            document.getElementsByClassName("statusCell")[m].style.fontWeight = "bold";
            document.getElementsByClassName("statusCell")[m].textContent = "Available";
        }
        elemntsInTable[m].addEventListener("click", (e) => {
            textOfElemnt = idOfUser[m].innerHTML;
            location.href = `customerDetails.html?uId=${textOfElemnt}`;
        })
    }
}
/***********select filter part***************/
function selectFilterFunc(elem) {
    var selectedValue = elem.value;
    if (selectedValue == "all") {
        getAllUsers();
    } else {
        getFilterUsers();
    }
    //getFilterUsers  by  fetch get
    let getFilterUsersArr = [];

    function getFilterUsers() {
        fetch(`http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/filterBytag?tag=${selectedValue}`)
            .then(
                function(getFilterUsersResponse) { //(entire HTTP response)
                    return getFilterUsersResponse.json(); // to next then

                }
            ).then(
                function(getFilterUsersData) {
                    getFilterUsersArr = getFilterUsersData;
                    if (getFilterUsersArr.length == 0) {
                        document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML =
                            `
                        <tr>
                            <td colspan="9">
                                <div class="alert alert-warning" role="alert">
                               NO USERS   
                                </div>
                            </td>
                        </tr>
                        `;
                    } else {
                        displaygetFilterUsers();
                        getUserOfTableIdARedi();

                    }

                }
            ).catch(
                function(getFilterUsersError) {
                    console.log("FETCH ERROR IS :" + getFilterUsersError);
                }
            );
    }

    function displaygetFilterUsers() {
        let getFilterUsersContainer = '';
        for (let usF = 0; usF < getFilterUsersArr.length; usF++) {
            getFilterUsersContainer += `
        <tr class="oneUserT">
        <th scope="row" class="idOfUser">${getFilterUsersArr[usF].id}</th>
        <td>${getFilterUsersArr[usF].name}</td>
        <td>${getFilterUsersArr[usF].email}</td>
        <td>${getFilterUsersArr[usF].country}</td>
        <td>${getFilterUsersArr[usF].phone}</td>
        <td>${getFilterUsersArr[usF].tag}</td>
        <td class="statusCell">${getFilterUsersArr[usF].status}</td>
        <td></td>
        </tr>
        <button onclick="getDelete(${getFilterUsersArr[usF].id})" class="btn btn-danger delBtn" role="button">Delete</button>
      `;
        }
        document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML = getFilterUsersContainer;
    }
}
//getAllUsers  by  fetch get
let getAllUsersArr = [];
getAllUsers();

function getAllUsers() {
    fetch('http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/getallprofile')
        .then(
            function(getAllUsersResponse) { //(entire HTTP response)
                return getAllUsersResponse.json(); // to next then

            }
        ).then(
            function(getAllUsersData) {
                getAllUsersArr = getAllUsersData;
                displayAllUsers();
                getUserOfTableIdARedi();

            }
        ).catch(
            function(getAllUsersError) {
                console.log("FETCH ERROR IS :" + getAllUsersError);
            }
        );
}

function displayAllUsers() {
    let allUsersContainer = '';
    for (let us = 0; us < getAllUsersArr.length; us++) {
        allUsersContainer += `
        <tr class="oneUserT">
        <th scope="row" class="idOfUser">${getAllUsersArr[us].id}</th>
        <td>${getAllUsersArr[us].name}</td>
        <td>${getAllUsersArr[us].email}</td>
        <td>${getAllUsersArr[us].country}</td>
        <td>${getAllUsersArr[us].phone}</td>
        <td>${getAllUsersArr[us].tag}</td>
        <td class="statusCell">${getAllUsersArr[us].status}</td>
        <td></td>
    </tr>
    <button onclick="getDelete(${getAllUsersArr[us].id})" class="btn btn-danger delBtn" role="button">Delete</button>
    `;

    }
    document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML = allUsersContainer;

}
//searchId  by  fetch get
let getSearchIdbj = {};

document.getElementsByClassName("searchIdBtn")[0].addEventListener("click",
    function() {
        let SearchFiledValue = document.getElementsByClassName("searchIDField")[0].value;
        if (SearchFiledValue == '') {

        } else {
            getSearchId();
        }


        function getSearchId() {
            fetch(`http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/filterByid?id=${SearchFiledValue}`)
                .then(
                    function(getSearchIdResponse) {
                        return getSearchIdResponse.json();

                    }
                ).then(
                    function(getSearchIdData) {
                        getSearchIdbj = getSearchIdData;
                        if (getSearchIdbj.state == 1) {
                            displaySearchId();
                            getUserOfTableIdARedi();

                        } else {
                            document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML = `
  
<tr>
<td colspan="9">
<div class="alert alert-danger" role="alert">
User Not Exist
</div>
</td>

</tr>
`;
                        }

                    }
                ).catch(
                    function(getSearchIdError) {
                        console.log("FETCH ERROR IS :" + getSearchIdError);
                    }
                );
        }
    })

function displaySearchId() {

    document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML = `
        <tr class="oneUserT">
        <th scope="row" class="idOfUser">${getSearchIdbj.id}</th>
        <td>${getSearchIdbj.name}</td>
        <td>${getSearchIdbj.email}</td>
        <td>${getSearchIdbj.country}</td>
        <td>${getSearchIdbj.phone}</td>
        <td>${getSearchIdbj.tag}</td>
        <td class="statusCell">${getSearchIdbj.status}</td>
        <td></td>
    </tr>
    <button onclick="getDelete(${getSearchIdbj.id})" class="btn btn-danger delBtn" role="button">Delete</button>
 `;
}
//searchEmail  by  fetch get
let getSearchEmailObj = {};

document.getElementsByClassName("searchEmailBtn")[0].addEventListener("click",
    function() {
        let SearchFiledValue2 = document.getElementsByClassName("searchEmailField")[0].value;
        if (SearchFiledValue2 == '') {

        } else {
            getSearchEmail();
        }


        function getSearchEmail() {
            fetch(`http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/filterByemail?email=${SearchFiledValue2}`)
                .then(
                    function(getSearchEmailResponse) {
                        return getSearchEmailResponse.json();

                    }
                ).then(
                    function(getSearchEmailData) {
                        getSearchEmailObj = getSearchEmailData;

                        if (getSearchEmailObj.state == 1) {
                            displaygetSearchEmail();
                            getUserOfTableIdARedi();

                        } else {
                            document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML = `
  
<tr>
<td colspan="9">
<div class="alert alert-danger" role="alert">
User Not Exist
</div>
</td>

</tr>
`;
                        }

                    }
                ).catch(
                    function(getSearchEmailError) {
                        console.log("FETCH ERROR IS :" + getSearchEmailError);
                    }
                );
        }
    })

function displaygetSearchEmail() {
    document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML = `
        <tr class="oneUserT">
        <th scope="row" class="idOfUser">${getSearchEmailObj.id}</th>
        <td>${getSearchEmailObj.name}</td>
        <td>${getSearchEmailObj.email}</td>
        <td>${getSearchEmailObj.country}</td>
        <td>${getSearchEmailObj.phone}</td>
        <td>${getSearchEmailObj.tag}</td>
        <td class="statusCell">${getSearchEmailObj.status}</td>
        <td></td>
    </tr>
    <button onclick="getDelete(${getSearchEmailObj.id})" class="btn btn-danger delBtn" role="button">Delete</button>
 
    `;
}
//searchName  by  fetch get
let getSearchNameArr = [];

document.getElementsByClassName("searchNameBtn")[0].addEventListener("click",
    function() {
        let SearchFiledValue3 = document.getElementsByClassName("searchNameField")[0].value;

        if (SearchFiledValue3 == '') {

        } else {
            getSearchName();
        }

        function getSearchName() {
            fetch(`http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/filterByname?name=${SearchFiledValue3}`)
                .then(
                    function(getSearchNameResponse) {
                        return getSearchNameResponse.json();

                    }
                ).then(
                    function(getSearchNameData) {
                        getSearchNameArr = getSearchNameData;

                        if (getSearchNameArr.length == 0) {
                            document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML = `
  
<tr>
<td colspan="9">
<div class="alert alert-danger" role="alert">
User Not Exist
</div>
</td>

</tr>
`;
                        } else {
                            displaygetSearchName();
                            getUserOfTableIdARedi();


                        }

                    }
                ).catch(
                    function(getSearchNameError) {
                        console.log("FETCH ERROR IS :" + getSearchNameError);
                    }
                );
        }
    })

function displaygetSearchName() {

    let getSearchNameContainer = '';
    for (let us = 0; us < getSearchNameArr.length; us++) {
        getSearchNameContainer += `
        <tr class="oneUserT">
        <th scope="row" class="idOfUser">${getSearchNameArr[us].id}</th>
        <td>${getSearchNameArr[us].name}</td>
        <td>${getSearchNameArr[us].email}</td>
        <td>${getSearchNameArr[us].country}</td>
        <td>${getSearchNameArr[us].phone}</td>
        <td>${getSearchNameArr[us].tag}</td>
        <td class="statusCell">${getSearchNameArr[us].status}</td>
        <td></td>
        </tr>
        <button onclick="getDelete(${getSearchNameArr[us].id})" class="btn btn-danger delBtn" role="button">Delete</button>
      `;
    }
    document.querySelector(".tableAllUsers .tableAllUsersTbody").innerHTML = getSearchNameContainer;

}
/*****************delete btn****************/
//delete  by  fetch get
let getDeleteObj = {};

function getDelete(idDeleted) {
    let data = {
        id: idDeleted
    }
    console.log(idDeleted);
    let fetchData = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(`http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/blockAccount`, fetchData)
        .then(
            function(getDeleteResponse) {
                return getDeleteResponse.json();

            }
        ).then(
            function(getDeleteData) {
                getDeleteObj = getDeleteData;

                if (getDeleteObj.state == 1) {
                    location.href = "allCustomers.html";
                } else if (getDeleteObj.state == 2) {
                    location.href = "allCustomers.html";
                }

            }
        ).catch(
            function(getDeleteError) {
                console.log("FETCH ERROR IS :" + getDeleteError);
            }
        );
}