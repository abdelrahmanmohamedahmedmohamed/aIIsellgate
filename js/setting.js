/*******get comments******* */
let comments = [];
getComments();

function getComments() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/getLocation?id=1`)
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
            console.log("FETCH ERROR IS :" + getCommentsError);
        }
    );
}



function displayComments() {
    var postsContanier= "";
    for(var i =0; i<comments.length; i++){
        postsContanier += 
        `
        <div class="card anotherCard mt-3">
          <div class="card-body coverCard ">
          <h6 class="d-inline" >${comments[i].fullname}</h6>
          ,
          <span>${comments[i].city}</span>
          <span>${comments[i].address}</span>
            </div>
         </div>
        `;
        
    }


    document.getElementsByClassName("locationAPI")[0].innerHTML = postsContanier;
    for(var j =0; j<comments.length; j++){
        if(comments[j].primary == 1)
            {
                document.getElementsByClassName("anotherCard")[j].style.border = "thick solid green";
            }
        
        
    }
}













//post requst by fethch
const formPostLocation = document.getElementsByClassName("formPostLocation");
let returnData = {};
formPostLocation.onsubmit = (e) => {
    e.preventDefault(); //prevnt form from submit
}

document.getElementsByClassName("btnPostLocation")[0].addEventListener("click",
        function() {
            let inputfield1Value = document.getElementById("inputFullName").value;
            let inputfield2Value = document.getElementById("inputAddress").value;
            let inputfield3Value = document.getElementById("inputCountry").value;
            let inputfield4Value = document.getElementById("inputCity").value;
            let inputfield5Value = document.getElementById("inputPhone").value;
            let inputfield6Value = document.getElementById("inputCode").value;

            postAirline();
            function postAirline() {
                const url = 'http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/PostLocation';

                let data = 
                    {
                        id: 1,
                        fullname: inputfield1Value,
                        address: inputfield2Value,
                        city: inputfield3Value,
                        country: inputfield4Value,
                        phone: inputfield5Value,
                        code: inputfield6Value
                    }
                

                let fetchData = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8'
                    })
                }
                fetch(url, fetchData)
                    .then(
                        function(response2) { //(entire HTTP response)
                            return response2.json(); // to next then
                        }
                    ).then(
                        function(data2) {
                            console.log(data2);
                            returnData = data2
                            if (returnData.state == 1) {
                                alert("success add location!")
                            }
                            else
                                alert("Faild add location!")
                           
                        }).catch(
                        function(error2) {
                            console.log("FETCH POST ERROR IS :" + error2);
                        }
                    );
            }
        })
