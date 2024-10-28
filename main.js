let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads   = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'creat';
let temp;
console.log(total)
// get totale
function getTotal(){
    if(price.value != ""){

            total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
total.style.background="green";
    }else{
        total.innerHTML = '';
        total.style.background="darkred";
    }
}
// creat product
console.log(count)
let dataPro;
if (localStorage.product && localStorage.product !== "null") {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

submit.onclick = function(){
  getTotal()
    let newPro = {
        title :  title.value,
        price : price.value,
        taxes : taxes.value,
        ads   : ads.value,
        discount: discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,

    }

if(
title.value != ''&&
price.value != ''&&
taxes.value != ''&&
ads.value != ''&&
discount.value != ''&&
total.innerHTML != ''&&
newPro.count < 101&&
category.value != ''

){
  
    if(mood === 'creat'){
      if(newPro.count > 1){
    for(let i = 0; i <newPro.count ;i++ ){
        dataPro.push(newPro);
    }
}else{
        dataPro.push(newPro);
    }  
    }else{
dataPro[temp] = newPro;
mood ='creat';
submit.innerHTML = "creat";
count.style.display = "block";

    }
  
}

else{
    alert("يجب تعبئة  جميع البيانات :)")
}







    localStorage.setItem('product',JSON.stringify(dataPro))
    clearData()
    showData()
}
// clear data 
function clearData(){
    title.value = "";
     price.value ='';
     taxes.value = '';
     ads.value = '';
     discount.value = '';
     total.innerHTML = '';
     category.value = '';
     count.value = '';
}

// read
function showData(){
let table = '';
for(let i = 0; i < dataPro.length ; i++){
    table += `
     <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}$</td>
        <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td class="total">${dataPro[i].total}$</td>
        <td>${dataPro[i].category}</td>

        <td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button id="delete" onclick="deleteData(${i})">delete</button></td>
        </tr>

    
    `
}

let tbody = document.getElementById("tbody").innerHTML = table;
let btnDelete = document.getElementById("deleteAll");
if(dataPro.length > 0){
    btnDelete.innerHTML =`
    <button onclick ="deleteAll()" >delete all (${dataPro.length})</button>
    
    `
}else{
     btnDelete.innerHTML ='';
}

}

// delete
function deleteData(i){
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showData()
}
showData()

// delet all
function deleteAll(){
    dataPro.splice(0);
    localStorage.removeItem("product");
    showData()
}


// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value   = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category
    count.style.display="none";
    submit.innerHTML ="update";
    mood ='update';
    temp = i;
    scroll({
        top:0,behavior:"smooth"
    })
}
// search
   let searchMood = 'title';
   function getSearchMood(id){
    let search = document.getElementById("search")
if(id == 'searchTitle'){
searchMood = 'title';

}else{
    searchMood ='category';
}
search.placeholder = `search by ${searchMood}`
search.focus()

   }
   function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === 'title') {
       
            if (dataPro[i].title.includes(value)) {
                table += `
                <tr>
                   <td>${i}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td class="total">${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
           
                   <td><button onclick="updateData(${i})" id="update">update</button></td>
           <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                   </tr>
           
               
               `
            }
        } else {
        
            if ( dataPro[i].category.includes(value)) {
                table += `
                <tr>
                   <td>${i}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                   <td>${dataPro[i].discount}</td>
                   <td class="total">${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
           
                   <td><button onclick="updateData(${i})" id="update">update</button></td>
           <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                   </tr>
           
               
               `
            }
    
    } 
   
    document.getElementById("tbody").innerHTML = table;
}
   }
   
// clean data