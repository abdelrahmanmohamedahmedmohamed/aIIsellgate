/*******get comments******* */
let comments = [];
import * as consts from "/js/consts.js";

let getComments = () => {
  fetch(
    `https://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/getLocation?id=1`
  )
    .then(function (getCommentsResponses) {
      return getCommentsResponses.json();
    })
    .then(function (getCommentsData) {
      comments = getCommentsData;
      displayComments();
    })
    .catch(function (getCommentsError) {
    });
};
getComments();

let displayComments = () => {
  var postsContanier = "";
  for (var i = 0; i < comments.length; i++) {
    let iterate = comments[i];
    postsContanier += `
        <div class="card mt-3">
          <div class="card-body coverCard ">
          <h6 class="d-inline" >${iterate.fullname}</h6>
          ,
          <span>${iterate.city}</span>
          <span>${iterate.address}</span>
          <span class='${
            iterate?.primary === 1 ? "badge bg-success" : ""
          } float-right m-1'>
          ${
            iterate?.primary === 1
              ? "Default Address"
              : `<button type='button' class='btn btn-info btn-sm lh-1' onClick="changeToDefaultAddress('${iterate.id}')">Change to primary</button>`
          }
          </span>
            </div>
         </div>
        `;
  }
  document.getElementsByClassName("locationAPI")[0].innerHTML = postsContanier;
};
window.changeToDefaultAddress = (id) => {
  fetch(
    `${
      consts.default.baseUrl
    }setprimarylocation?locationid=${id}&id=${consts.default.getCurrentUser()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if ("error" in result) return;
      comments.map((a) => (a.primary = 0));
      comments.forEach((iterate) => {
        if (iterate.id == id) {
          iterate.primary = 1;
        }
      });
      displayComments();
    });
};

//post requst by fethch
const formPostLocation = document.getElementsByClassName("formPostLocation");
let returnData = {};
formPostLocation.onsubmit = (e) => {
  e.preventDefault(); //prevnt form from submit
};

document
  .getElementsByClassName("btnPostLocation")[0]
  .addEventListener("click", function () {
    let inputfield1Value = document.getElementById("inputFullName").value;
    let inputfield2Value = document.getElementById("inputAddress").value;
    let inputfield3Value = document.getElementById("inputCountry").value;
    let inputfield4Value = document.getElementById("inputCity").value;
    let inputfield5Value = document.getElementById("inputPhone").value;
    let inputfield6Value = document.getElementById("inputCode").value;

    postAirline();
    function postAirline() {
      const url =
        "http://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/PostLocation";

      let data = {
        id: localStorage.getItem("loginUserId"),
        fullname: inputfield1Value,
        address: inputfield2Value,
        city: inputfield3Value,
        country: inputfield4Value,
        phone: inputfield5Value,
        code: inputfield6Value,
      };

      let fetchData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
        }),
      };
      fetch(url, fetchData)
        .then(function (response2) {
          //(entire HTTP response)
          return response2.json(); // to next then
        })
        .then(function (data2) {
        })
        .catch(function (error2) {
        });
    }
  });





