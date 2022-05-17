// var form = document.getElementById('form')
// form.addEventListener('submit',function(e){
//   e.preventDefault()
//   var title =  document.getElementById('CreditCard').value
//   var date =  document.getElementById('day_month').value
//   var rating =  document.getElementById('year').value
//   var prodid =  document.getElementById('ccv').value
//   fetch("https://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/addcard",{
//     method:'POST',
//     body:JSON.stringify({
     
//       reviewtitle:CreditCard,
// datee:day_month,
// rat:year,
// prudid:ccv,    
//     }),
//     headers: new Headers({
//                     'Content-Type': 'application/json; charset=UTF-8'
//                 })
//   })
//   .then(function(response){
//     return response.json()
//   })
//   .then(function(data){
//     console.log(data)
//   })
// })



// http://a7bb-41-237-180-230.ngrok.io/prud
let saveCardIntoDataBase = (creditCardNumber, month, year, cvv) => {
    fetch(`http://cros-anywhere.herokuapp.com/http://a7bb-41-237-180-230.ngrok.io/addcard`, {
        method: "POST",
        mode : 'cors',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid:localStorage.getItem("loginUserId"),
            number: creditCardNumber,
             exp_month: month,
             exp_year: year,
             cvc : cvv
        }),
      }).then((result) => {
          console.log(result);
      }) 
};
let saveCard = () => {
  let creditCardNumber = document.getElementById("ccnumber")?.value;
  let month = document.getElementById("ccmonth")?.value;
  let year = document.getElementById("ccyear")?.value;
  let cvv = document.getElementById("cvv")?.value;

  if (creditCardNumber === "" || creditCardNumber.length !== 16)
    alert("you need to add credit card");
  if (month === "") alert("you need to add month");
  if (year === "") alert("you need to add year");
  if (cvv === "" || cvv.length !== 3) alert("you need to add cvv");

  saveCardIntoDataBase(creditCardNumber, month, year, cvv);
};

// start addvisa























//end addvisa















//post requst by fethch
const formPostLocation = document.getElementsByClassName("formPostLocation");
if (formPostLocation !== undefined) {
  formPostLocation.onsubmit = (e) => {
    e.preventDefault(); //prevnt form from submit
  };

  document
    .getElementsByClassName("btnPostLocation")[0]
    ?.addEventListener("click", function () {
      let floatingId = document.getElementById("floatingId").value;
      let floatingBody = document.getElementById("floatingBody").value;
      let floatingTitle = document.getElementById("floatingTitle").value;
      const date = new Date();
      date.getUTCFullYear();

      postAirline();
      function postAirline() {
        const url =
          "http://cros-anywhere.herokuapp.com/https://sellgate91.herokuapp.com/PostMessage";

        let data = {
          id: floatingId,
          body: floatingBody,
          title: floatingTitle,
          date: date,
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
            console.log(data2);
          })
         
      }
    });
}
