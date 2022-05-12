/*******get comments******* */
let comments = [];
getComments();

function getComments() {
    fetch(`http://cros-anywhere.herokuapp.com/https://sellgate1.herokuapp.com/customerorder?id=${localStorage.getItem("loginUserId")}`)
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
    let postsContanier= "";
    let postsContanierTwo = "";
    for(var i =0; i<comments.length; i++){
        postsContanier += 
             `  
            <tr>   
                <td>${comments[i].vendorname}</td>
                <td>${comments[i].order_purchase_timestamp}</td>                        
                <td><span class="status text-success">&bull;</span>${comments[i].order_status}</td>
                <td>$${comments[i].shanPricel}</td>
                <td>$${comments[i].price+comments[i].shanPricel}</td>
                <td><a href="productCustomer.html?id=${comments[i].id}" class="view" title="View Details" data-toggle="tooltip"><i class="material-icons">&#xE5C8;</i></a></td>
            </tr>
             `
        ;

        
    }

    


    document.getElementsByClassName("productAPI")[0].innerHTML = postsContanier;
    
}

