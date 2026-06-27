// ======================================
// PTOMB NEWS - Chief Editor Dashboard
// chief-editor.js
// ======================================

// Load Data
let news = JSON.parse(localStorage.getItem("news")) || [];
let ads = JSON.parse(localStorage.getItem("ads")) || [];
let staff = JSON.parse(localStorage.getItem("staff")) || [];

// Dashboard
window.onload = function () {
    updateDashboard();
    loadNews();
    loadAds();
};

// Dashboard Cards
function updateDashboard() {

    document.getElementById("totalNews").innerHTML = news.length;
    document.getElementById("totalAds").innerHTML = ads.length;
    document.getElementById("totalStaff").innerHTML = staff.length;

}

// ==========================
// NEWS
// ==========================

function loadNews() {

    let html = "";

    if(news.length===0){

        html="<h3>No News Available</h3>";

    }else{

        news.forEach(function(item,index){

            html += `

            <div class="news">

            <h3>${item.title}</h3>

            <p>${item.description}</p>

            <small>${item.date || ""}</small>

            <br><br>

            <button class="edit-btn"
            onclick="editNews(${index})">
            Edit
            </button>

            <button class="delete-btn"
            onclick="deleteNews(${index})">
            Delete
            </button>

            </div>

            `;

        });

    }

    document.getElementById("newsList").innerHTML = html;

}

// Search News
function searchNews(){

    let key=document.getElementById("newsSearch").value.toLowerCase();

    document.querySelectorAll(".news").forEach(function(card){

        card.style.display=
        card.innerText.toLowerCase().includes(key)
        ?"block":"none";

    });

}

// Delete News
function deleteNews(index){

    if(!confirm("Delete this news?")) return;

    news.splice(index,1);

    localStorage.setItem("news",JSON.stringify(news));

    updateDashboard();

    loadNews();

}

// Edit News
function editNews(index){

    let item=news[index];

    let title=prompt("Edit News Title",item.title);

    if(title===null) return;

    let desc=prompt("Edit Description",item.description);

    if(desc===null) return;

    news[index].title=title;
    news[index].description=desc;

    localStorage.setItem("news",JSON.stringify(news));

    loadNews();

}

// ==========================
// ADS
// ==========================

function loadAds(){

    let html="";

    if(ads.length===0){

        html="<h3>No Advertisements Available</h3>";

    }else{

        ads.forEach(function(item,index){

            html+=`

            <div class="ad">

            <h3>${item.type}</h3>

            <p>${item.text || ""}</p>

            <small>${item.date || ""}</small>

            <br><br>

            <button class="edit-btn"
            onclick="editAd(${index})">
            Edit
            </button>

            <button class="delete-btn"
            onclick="deleteAd(${index})">
            Delete
            </button>

            </div>

            `;

        });

    }

    document.getElementById("adsList").innerHTML=html;

}

// Search Ads
function searchAds(){

    let key=document.getElementById("adSearch").value.toLowerCase();

    document.querySelectorAll(".ad").forEach(function(card){

        card.style.display=
        card.innerText.toLowerCase().includes(key)
        ?"block":"none";

    });

}

// Delete Ad
function deleteAd(index){

    if(!confirm("Delete this advertisement?")) return;

    ads.splice(index,1);

    localStorage.setItem("ads",JSON.stringify(ads));

    updateDashboard();

    loadAds();

}

// Edit Ad
function editAd(index){

    let ad=ads[index];

    let text=prompt("Edit Advertisement",ad.text || "");

    if(text===null) return;

    ads[index].text=text;

    localStorage.setItem("ads",JSON.stringify(ads));

    loadAds();

}

// ==========================
// FILTER NEWS
// ==========================

function filterNews(category){

    let filtered=news.filter(function(item){

        return item.category===category;

    });

    console.log(filtered);

}

// ==========================
// LOGOUT
// ==========================

function logout(){

    if(confirm("Are you sure you want to logout?")){

        sessionStorage.clear();

        location.href="admin-login.html";

    }

}