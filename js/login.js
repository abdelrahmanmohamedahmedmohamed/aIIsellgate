const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

//login by fetch api (POST)
let loginObj = {};
const formLogin = document.getElementsByClassName("loginForm")[0];
let mainErrorMessage = document.getElementsByClassName("mainErrorMessage")[0];
let loginSuccessMsg = document.getElementsByClassName("loginSuccessMsg")[0];
let loginerrorMsgNotExist = document.getElementsByClassName("loginerrorMsgNotExist")[0];
let loginerrorMsgAlExist = document.getElementsByClassName("loginerrorMsgNotExist")[0];
formLogin.onsubmit = (e) => {
    e.preventDefault();
}

document.getElementsByClassName("btnLoginForm")[0].onclick = () => {
        let email = document.getElementsByClassName("emailField")[0].value;
        let password = document.getElementsByClassName("passwordField")[0].value;
if(email == ""||password == ""){
    mainErrorMessage.style.display = "inherit";
    loginerrorMsgNotExist.style.display = "none";
    loginerrorMsgAlExist.style.display = "none";
    loginSuccessMsg.style.display = "none";
}else{
    loginPostApi();
}
           

            function loginPostApi() {
                const loginUrl = 'https://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/Login';

                let loginData = {
                    email: email,
                    password:password
                }

                let loginFetchData = {
                    method: 'POST',
                    body: JSON.stringify(loginData),
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8'
                    })
                }
                fetch(loginUrl, loginFetchData)
                    .then(
                        function(loginResponse) {
                            return loginResponse.json();
                        }
                    ).then(
                        function(loginFinalResponse) {
                            loginObj = loginFinalResponse;
                            console.log(loginObj);
                            if (loginObj.state == "1") {
                          let loginUserId =loginObj.id;
                          localStorage.setItem("loginUserId", loginUserId);
                          loginSuccessMsg.style.display = "inherit";
                          loginerrorMsgNotExist.style.display = "none";
                          loginerrorMsgAlExist.style.display = "none";
                          mainErrorMessage.style.display = "none";
                                location.href = "index.html";
    
                            } else if(loginObj.state == "0"){
                                loginerrorMsgNotExist.style.display = "inherit";
                                mainErrorMessage.style.display = "none";
                                loginSuccessMsg.style.display = "none";
    
                            } else if(loginObj.state == "2"){
                                loginerrorMsgAlExist.style.display = "inherit";
                                mainErrorMessage.style.display = "none";
                                loginSuccessMsg.style.display = "none";
    
                            }
                        }).catch(
                        function(loginError) {
                            console.log("FETCH Login ERROR IS :" + loginError);
                        }
                    );

            }
        
    }
  /*************************reset password************************** */
    /**********************************sign up*************************** */
    let resetObj={};
    let goodEmailReset = document.getElementsByClassName("goodEmailReset")[0];
    let badEmailReset = document.getElementsByClassName("badEmailReset")[0];
    document.getElementsByClassName("forgetPassSendBtn")[0].onclick = () => {
            let resetEmailValue = document.getElementsByClassName("resetemail")[0].value;
   
            if(resetEmailValue == ""){
                badEmailReset.style.display="inherit";
                badEmailReset.textContent="The Field is Empty...";
            }
            else if(resetEmailValue.length>50){
                badEmailReset.style.display="inherit";
                badEmailReset.textContent="The Email is So Long ...";
            }else{
                forgetEmailFunc();
            }
      

            function forgetEmailFunc() {
                fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/resetpassword?email=${resetEmailValue}`)
                    .then(
                        function(rresponse) { //(entire HTTP response)
                            return rresponse.json(); // to next then
            
                        }
                    ).then(
                        function(rdata) {
                            resetObj=rdata;
                             console.log(rdata); //the js array of obj / obj  json of api
                       if(resetObj.state==1){
goodEmailReset.style.display="inherit";
badEmailReset.style.display="none";
                       }else{
                        goodEmailReset.style.display="none";
                        badEmailReset.style.display="inherit";
                        badEmailReset.textContent="This Email Is Not Valid...";
                       }
                        }
                    ).catch(
                        function(rerror) {
                            console.log("FETCH ERROR IS :" + rerror);
                        }
                    );
            }
        }
     