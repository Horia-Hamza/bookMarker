var nameInput = document.querySelector("#name");
var urlInput = document.querySelector("#url");
var btn = document.querySelector(".btn");
var visit = document.querySelector("#visit");
var searchInput = document.querySelector("#search");
var updateInput = document.querySelector("#update");
var updateTable;
var deleteTable = document.querySelector("#delete");
var allUpdateTableBtn;
var bookMarkArray =[];

if(localStorage.getItem("displaystorage") !=null){
    bookMarkArray =JSON.parse(localStorage.getItem("displaystorage"));
    bookmarkerDisplay(bookMarkArray)
}


btn.addEventListener("click" , function() {
    function getData(){
var userData ={
    nameInput:nameInput.value,
    urlInput:urlInput.value
}
bookMarkArray.push(userData);
localStorage.setItem("displaystorage" , JSON.stringify(bookMarkArray));
// console.log(bookMarkArray);
clearForm();
bookmarkerDisplay(bookMarkArray)
    }
    getData()  
})


function clearForm(){
    nameInput.value= "";
    urlInput.value="";
}


function bookmarkerDisplay(list){
    var display="";
    for(var i=0 ; i<list.length; i++){
    display += `<tr>
     <td ><h4>${list[i].nameInput}</h4></td>
    <td><button onclick="location.href='${list[i].urlInput}';" class="btn btn-outline-info" id="visit">Visit</button></td>
    <td><button onclick="deleteRowTable(${i})" class="btn btn-outline-danger" id="delete">Delete</button></td>
    <td><button onclick="update(${i})" class="btn btn-outline-warning" id="updateTable">Update</button></td>

    </tr>`
    
    // console.log(visit);
    }
    document.getElementById("tableBody").innerHTML = display
}


  function search(searchTerm){
      var searchArray=[];
      for(var i = 0 ; i<bookMarkArray.length ; i++)
      {
          if(bookMarkArray[i].nameInput.toLowerCase().includes(searchTerm.toLowerCase())==true)
          {
            searchArray.push(bookMarkArray[i]);
          }
      }
      
      bookmarkerDisplay(searchArray)
  }

  searchInput.addEventListener("input" , function(){
    search(this.value)
  })


function update(updatedInput){

    nameInput.value = bookMarkArray[updatedInput].nameInput;
    urlInput.value = bookMarkArray[updatedInput].urlInput;

    updateInput.classList.remove("d-none");
    btn.classList.add("d-none");
}

updateInput.addEventListener("click" , function() {
    function getData(){
var userData ={
    nameInput:nameInput.value,
    urlInput:urlInput.value
}
bookMarkArray.push(userData);
localStorage.setItem("displaystorage" , JSON.stringify(bookMarkArray));
// console.log(bookMarkArray);
clearForm();
bookmarkerDisplay(bookMarkArray)
    }
    getData()  
})

function deleteRowTable(deletedRow){
    bookMarkArray.splice(deletedRow,1);
    localStorage.setItem("displaystorage" , JSON.stringify(bookMarkArray));
    bookmarkerDisplay(bookMarkArray)

    console.log(bookMarkArray);
}

// validation functions
let invaidMessage=document.getElementById("invaid-message");
let nameRegex = /^[A-Z][a-z]{2,8}$/

nameInput.onkeyup=function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        invaidMessage.classList.add("d-none");
    return true;
}else{
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    invaidMessage.classList.remove("d-none");
   return false;
}
}

let invaidUrlMessage=document.getElementById("invaidUrlMessage");
var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/

urlInput.onkeyup=function isUrlValid(){
    if(urlRegex.test(urlInput.value)){
        urlInput.classList.add("is-valid");
        urlInput.classList.remove("is-invalid");
        invaidUrlMessage.classList.add("d-none");
    return true;
}else{
    urlInput.classList.add("is-invalid");
    urlInput.classList.remove("is-valid");
    invaidUrlMessage.classList.remove("d-none");
   return false;
}
}
// if (isNameValid() == true && isUrlValid() == true){
//     btn.removeAttribute("disabled");
// }
nameInput.onkeyup = function(){
 if(isNameValid() && isUrlValid() ==true){
        btn.removeAttribute("disabled");
    }else{
        btn.disabled ="true";
    }
}
 
urlInput.onKeyup = function(){
    if(isNameValid() && isUrlValid() ==true){
           btn.removeAttribute("disabled");
       }else{
           btn.disabled ="true";
       }
   }


