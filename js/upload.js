let getCatgorysArr = [];
getCatgorys();

function getCatgorys() {
    fetch(`https://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/getcategory`)
        .then(
            function(getCatgorysResponses) { //(entire HTTP response)
                return getCatgorysResponses.json(); // to next then

            }
        ).then(
            function(getCatgorysDatas) {
                getCatgorysArr = getCatgorysDatas; //the js array of obj / obj  json of api
                displayCatgory();
            }
        ).catch(
            function(getCatgorysErrors) {
            }
        );
}

function displayCatgory() {
    let CatgoryContainer = '';
    for (let iC = 0; iC <getCatgorysArr.length; iC++) {
        CatgoryContainer += `
        <option value="${getCatgorysArr[iC].name}">${getCatgorysArr[iC].name}</option>
        `;
    }
    document.getElementsByClassName("uProCategory")[0].innerHTML = CatgoryContainer;

}
 /****************js google map api*******************/
let finalLat=0;
let finalLng=0;
function initMap() {
    const myLatlng = {lat:30.033333 ,lng:31.233334};
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click The Map To Determine Your Address :)",
      position: myLatlng,
    });
  
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        
      );
      infoWindow.open(map);

      finalLat=JSON.parse(infoWindow.content).lat;
      finalLng=JSON.parse(infoWindow.content).lng;
    }
   
    );
  }
 
 /*********upload images************ */
 // this variable will store images for preview
 var images = [];
   
 // this function will select images
 function image_select() {
    var image = document.getElementById('image').files;
    for (i = 0; i < image.length; i++) {
          if (check_duplicate(image[i].name)) {
     images.push({
                  "name" : image[i].name,
                  "url" : URL.createObjectURL(image[i]),
                  "file" : image[i],
            })
          } else 
          {
               alert(image[i].name + " is already added to the list");
          }
    }

 
    document.getElementById('container').innerHTML = image_show();
}
 // this function will show images in the DOM
 function image_show() {
    var image = "";
    images.forEach((i) => {
         image += `<div class="image_container d-flex justify-content-center position-relative">
                <img src="`+ i.url +`" alt="Image">
                <span class="position-absolute" onclick="delete_image(`+ images.indexOf(i) +`)">&times;</span>
          </div>`;
    })
  
    return image;
}
let containerObj='';
var CLOUDINARY_URL='https://api.cloudinary.com/v1_1/aiselgate/upload';
var CLOUDINARY_UPLOAD_PRESET='lrthln0k';

 function loopingOnFetch() {
 
for (let index = 0; index < images.length; index++) {
    if(images.length>5){
document.getElementsByClassName("errorUploadMsg")[0].style.display="inherit";
document.getElementsByClassName("errorUploadMsgSpan")[0].textContent="The Number Of Images Is Greater Than 5 :(";
document.getElementsByClassName("successUploadMsg")[0].style.display="none";
    }else if(images.length<3){
        document.getElementsByClassName("errorUploadMsg")[0].style.display="inherit";
        document.getElementsByClassName("errorUploadMsgSpan")[0].textContent="The Number Of Images Is Less Than 3 :(";
        document.getElementsByClassName("successUploadMsg")[0].style.display="none";
    }else{
        postCloudinary(index);
    }
   }
   
}

document.getElementsByClassName("uploadBtn")[0].onclick = () => {
    loopingOnFetch();
   
}
 //prevnt form from submit
const formUpload = document.getElementsByClassName("formUpload")[0];
formUpload.onsubmit = (e) => {
    e.preventDefault();
}
//---------------func of postCloudinary------------
          function postCloudinary(num) {
            let uProName = document.getElementsByClassName("uProName")[0].value;
            let uProDescription = document.getElementsByClassName("uProDescription")[0].value;
            let uProCategory = document.getElementsByClassName("uProCategory")[0].value;
            let uProPrice = document.getElementsByClassName("uProPrice")[0].value;
            let uProCurrency = document.getElementsByClassName("uProCurrency")[0].value;
            let uProBrand = document.getElementsByClassName("uProBrand")[0].value;
            let uProColor = document.getElementsByClassName("uProColor")[0].value;
            let uProLength = document.getElementsByClassName("uProLength")[0].value;
            let uProHeight = document.getElementsByClassName("uProHeight")[0].value;
            let uProWidth = document.getElementsByClassName("uProWidth")[0].value;
            let uProWeight = document.getElementsByClassName("uProWeight")[0].value;
               
   if(uProName.length>40||uProDescription.length>300||uProBrand.length>20||uProCurrency.length>20||
    uProPrice>900000000||uProLength>900000||uProHeight>100000||uProWidth>100000||
    uProWeight>100000 ){
document.getElementsByClassName("errorUploadMsg")[0].style.display="inherit";
document.getElementsByClassName("errorUploadMsgSpan")[0].textContent="The Value Of Field Is So Long... :(";
document.getElementsByClassName("successUploadMsg")[0].style.display="none";


    }else{
            var form = new FormData()
        
            form.append("file", images[num]['file']);
            form.append('upload_preset',CLOUDINARY_UPLOAD_PRESET);
              const urlCloudinary = CLOUDINARY_URL;
              let fetchDataCloudinary = {
                  method: 'POST',
                  body:form,
              }
              fetch(urlCloudinary, fetchDataCloudinary)
                  .then(
                      function(responseCloudinary) { //(entire HTTP response)
                          return responseCloudinary.json(); // to next then
                      }
                  ).then(
                      function(dataCloudinary) {
                          containerObj+=(JSON.stringify(dataCloudinary.url).replace('"', '')).slice(0, -1)+"~";
                          let objsString =containerObj;
                          let arrObjs = objsString.split("~");
                          if(arrObjs.length==images.length+1){
                            let allImagesUrls=containerObj.slice(0, -1);
                          postUploadAll(allImagesUrls,finalLat,
                            finalLng,uProName,uProDescription,uProCategory,
                            uProPrice,uProCurrency,uProBrand,uProColor,uProLength,uProHeight,
                            uProWidth,uProWeight);
                          }
                         
                      }).catch(
                      function(errorCloudinary) {
                      }
                  );
                    }        
          }
         
    //    }
 // this function will delete a specific image from the container
 function delete_image(e) {
    images.splice(e, 1);
    document.getElementById('container').innerHTML = image_show();
}
 
 // this function will check duplicate images
 function check_duplicate(name) {
    var image = true;
    if (images.length > 0) {
        for (e = 0; e < images.length; e++) {
            if (images[e].name == name) {
                image = false;
                break;
            }
        }
    }
    return image;
}
//postUploadAll info to server 

function postUploadAll(allImagesUrlsIn,flat,flng,uProName,uProDescription,uProCategory,
    uProPrice,uProCurrency,uProBrand,uProColor,uProLength,uProHeight,
    uProWidth,uProWeight) {
 
    const postUploadAllUrl = 'https://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/Upload';

    let postUploadAllData = {

        name:uProName,
        currency:uProCurrency,
        color:uProColor,
        category:uProCategory,
        description:uProDescription,
        brand:uProBrand,
        images:allImagesUrlsIn,
        price:uProPrice,
        vendorid:localStorage.getItem("loginUserId"),
        rate:3,
        weight:uProWeight,
        height:uProHeight,
        width:uProWidth,
        Length: uProLength,
        lang:flng,
        lad:flat 
    }

    let postUploadAllFetchData = {
       
        method: 'POST',
        body: JSON.stringify(postUploadAllData),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
      
        })
    }
    fetch(postUploadAllUrl, postUploadAllFetchData)
        .then(
            function(postUploadAllResponse) { //(entire HTTP response)
                return postUploadAllResponse.json(); // to next then
            }
        ).then(
            function(postUploadAllData) {
                document.location.reload();
                document.getElementsByClassName("errorUploadMsg")[0].style.display="none";
document.getElementsByClassName("errorUploadMsg")[0].textContent="The Value Of Field Is So Long... :(";
document.getElementsByClassName("successUploadMsg")[0].style.display="inherit";
            }).catch(
            function(postUploadAllError) {
            }
        );
        }

/****************************** */

  