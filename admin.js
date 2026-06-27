// -------------------------
// Dashboard Counts
// -------------------------

function updateDashboard(){

let news = JSON.parse(localStorage.getItem("news")) || [];
let ads = JSON.parse(localStorage.getItem("ads")) || [];
let staff = JSON.parse(localStorage.getItem("staff")) || [];

document.getElementById("totalNews").innerHTML = news.length;
document.getElementById("totalAds").innerHTML = ads.length;
document.getElementById("totalStaff").innerHTML = staff.length;

showNews();
showAdvertisements();
showStaff();

}

window.onload = updateDashboard;


// -------------------------
// Publish News
// -------------------------

function saveNews(){

let title=document.getElementById("title").value;
let desc=document.getElementById("description").value;
let video=document.getElementById("video").value;
let category=document.getElementById("category").value;

let file=document.getElementById("image").files[0];

if(!file){
alert("Please select an image");
return;
}

let reader=new FileReader();

reader.onload=function(){

let news=JSON.parse(localStorage.getItem("news"))||[];

news.unshift({

title:title,
description:desc,
video:video,
category:category,
image:reader.result,
date:new Date().toLocaleString()

});

localStorage.setItem("news",JSON.stringify(news));

alert("News Published Successfully");

document.getElementById("title").value="";
document.getElementById("description").value="";
document.getElementById("video").value="";
document.getElementById("image").value="";

updateDashboard();

}

reader.readAsDataURL(file);

}


// -------------------------
// Show News
// -------------------------

function showNews(){

let news=JSON.parse(localStorage.getItem("news"))||[];

let html="";

news.forEach(function(n,index){

html+=`
<div class="card">

<img src="${n.image}" width="150">

<h3>${n.title}</h3>

<p>${n.category}</p>

<p>${n.date}</p>

<button onclick="deleteNews(${index})">
Delete
</button>

<hr>

</div>
`;

});

document.getElementById("newsList").innerHTML=html;

}

function deleteNews(index){

let news=JSON.parse(localStorage.getItem("news"))||[];

news.splice(index,1);

localStorage.setItem("news",JSON.stringify(news));

updateDashboard();

}


// -------------------------
// Advertisement
// -------------------------

function saveAdvertisement(){

let type=document.getElementById("adType").value;
let text=document.getElementById("adText").value;
let link=document.getElementById("adLink").value;

let file=document.getElementById("adFile").files[0];

let reader=new FileReader();

reader.onload=function(){

let ads=JSON.parse(localStorage.getItem("ads"))||[];

ads.unshift({

type:type,
text:text,
link:link,
file:reader.result

});

localStorage.setItem("ads",JSON.stringify(ads));

alert("Advertisement Published");

updateDashboard();

}

if(file){

reader.readAsDataURL(file);

}else{

let ads=JSON.parse(localStorage.getItem("ads"))||[];

ads.unshift({

type:type,
text:text,
link:link,
file:""

});

localStorage.setItem("ads",JSON.stringify(ads));

updateDashboard();

}

}


function showAdvertisements(){

let ads=JSON.parse(localStorage.getItem("ads"))||[];

let html="";

ads.forEach(function(ad,index){

html+=`

<div class="card">

<p><b>${ad.type}</b></p>

<p>${ad.text}</p>

<a href="${ad.link}" target="_blank">
${ad.link}
</a>

<br><br>

<button onclick="deleteAd(${index})">

Delete

</button>

<hr>

</div>

`;

});

document.getElementById("adsList").innerHTML=html;

}

function deleteAd(index){

let ads=JSON.parse(localStorage.getItem("ads"))||[];

ads.splice(index,1);

localStorage.setItem("ads",JSON.stringify(ads));

updateDashboard();

}


// -------------------------
// Staff
// -------------------------

function addStaff(){

let name=document.getElementById("staffName").value;
let username=document.getElementById("staffUsername").value;
let password=document.getElementById("staffPassword").value;
let role=document.getElementById("staffRole").value;

let staff=JSON.parse(localStorage.getItem("staff"))||[];

staff.push({

name:name,
username:username,
password:password,
role:role

});

localStorage.setItem("staff",JSON.stringify(staff));

alert("Staff Added");

document.getElementById("staffName").value="";
document.getElementById("staffUsername").value="";
document.getElementById("staffPassword").value="";

updateDashboard();

}

function showStaff(){

let staff=JSON.parse(localStorage.getItem("staff"))||[];

let html="";

staff.forEach(function(s,index){

html+=`

<div class="card">

<h3>${s.name}</h3>

<p>${s.username}</p>

<p>${s.role}</p>

<button onclick="deleteStaff(${index})">

Delete

</button>

<hr>

</div>

`;

});

document.getElementById("staffList").innerHTML=html;

}

function deleteStaff(index){

let staff=JSON.parse(localStorage.getItem("staff"))||[];

staff.splice(index,1);

localStorage.setItem("staff",JSON.stringify(staff));

updateDashboard();

}