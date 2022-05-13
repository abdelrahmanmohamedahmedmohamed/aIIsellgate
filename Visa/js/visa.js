let saveCardIntoDataBase = (creditCardNumber, month, year, cvv) => {
    fetch(`https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/addcard`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            number: creditCardNumber,
            exp_month: month,
            exp_year: year,
            cvc : cvv
        }),
      }).then((result) => {
          console.log(result);
      });
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
          "http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/PostMessage";

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
          .catch(function (error2) {
            console.log("FETCH POST ERROR IS :" + error2);
          });
      }
    });
}
