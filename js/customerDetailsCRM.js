/*************customerDetails page******************/
//customerDetails  by  fetch get
let parameter = new URLSearchParams(location.search);
let UserSenId = parameter.get("uId");
let userDetailsInfobj = {};
getuserDetailsInfo();

function getuserDetailsInfo() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/filterByid?id=${UserSenId}`)
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
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgateproproj.herokuapp.com/getNote?id=${UserSenId}`)
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