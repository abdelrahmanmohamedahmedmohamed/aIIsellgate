  /**********************************sign up*************************** */
  let signupObj = {};

  const formSignUp = document.getElementsByClassName("signupForm")[0];
  let mainErrorMessage2 = document.getElementsByClassName("mainErrorMessage2")[0];
  let loginSuccessMsg2 = document.getElementsByClassName("loginSuccessMsg2")[0];
  let loginerrorMsgNotExist2 = document.getElementsByClassName("loginerrorMsgNotExist2")[0];
  let loginerrorMsgAlExist2 = document.getElementsByClassName("loginerrorMsgNotExist2")[0];
  formSignUp.onsubmit = (event) => {
      event.preventDefault(); //prevnt form from submit
  }
  
  document.getElementsByClassName("btnSignUp")[0].onclick = () => {
          let fullName = document.getElementsByClassName("fullName")[0].value;
          let SignUpEmail = document.getElementsByClassName("SignUpEmail")[0].value;
          let SignUpPass = document.getElementsByClassName("SignUpPass")[0].value;
          if(fullName == ""||SignUpEmail == ""||SignUpPass == ""){
              mainErrorMessage2.style.display = "inherit";
              loginerrorMsgNotExist2.style.display = "none";
              loginerrorMsgAlExist2.style.display = "none";
              loginSuccessMsg2.style.display = "none";
          }else{
              signupPostApi();
          }
          function signupPostApi() {
              const signupUrl = 'https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/register';
  
              let signupData = {
                  email: SignUpEmail,
                  password:SignUpPass,
                  fullname:fullName
              }
  
              let signupFetchData = {
                  method: 'POST',
                  body: JSON.stringify(signupData),
                  headers: new Headers({
                      'Content-Type': 'application/json; charset=UTF-8'
                  })
              }
              fetch(signupUrl, signupFetchData)
                  .then(
                      function(signupResponse) {
                          return signupResponse.json();
                      }
                  ).then(
                      function(signupFinalResponse) {
                          signupObj = signupFinalResponse;
                      if(signupObj.state == "1") {
                        loginSuccessMsg2.style.display = "inherit";
                        loginerrorMsgNotExist2.style.display = "none";
                        loginerrorMsgAlExist2.style.display = "none";
                        mainErrorMessage2.style.display = "none";
  
                          } else if(signupObj.state == "0"){
                              loginerrorMsgNotExist2.style.display = "inherit";
                              mainErrorMessage2.style.display = "none";
                              loginSuccessMsg2.style.display = "none";
  
                          } else if(signupObj.state == "2"){
                              loginerrorMsgAlExist2.style.display = "inherit";
                              mainErrorMessage2.style.display = "none";
                              loginSuccessMsg2.style.display = "none";
  
                          }
                      }).catch(
                      function(signupError) {
                      }
                  );
  
          }
      }
   