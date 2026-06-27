// ====================================
// PTOMB NEWS - ADS.JS
// ====================================

window.onload = function () {
    loadAdvertisements();
};

// Publish Advertisement
function saveAdvertisement(){

    const type=document.getElementById("adType").value;
    const text=document.getElementById("adText").value.trim();
    const link=document.getElementById("adLink").value.trim();
    const file=document.getElementById("adFile").files[0];

    if(type==="text" && text===""){
        alert("Enter advertisement text.");
        return;
    }

    if(type!=="text" && !file){
        alert("Please select an image or video.");
        return;
    }

    if(file){

        const reader=new FileReader();

        reader.onload=function(){

            saveData(reader.result);

        }

        reader.readAsDataURL(file);

    }else{

        saveData("");

    }

    function saveData(media){

        let ads=JSON.parse(localStorage.getItem("ads"))||[];

        ads.unshift({

            id:Date.now(),

            type:type,

            media:media,

            text:text,

            link:link,

            date:new Date().toLocaleString()

        });

        localStorage.setItem("ads",JSON.stringify(ads));

        alert("Advertisement Published Successfully");

        clearForm();

        loadAdvertisements();

    }

}

// Load Advertisements
function loadAdvertisements(){

    let ads=JSON.parse(localStorage.getItem("ads"))||[];

    let html="";

    if(ads.length===0){

        html="<h3>No Advertisements Found</h3>";

    }else{

        ads.forEach(function(ad,index){

            html+=`

            <div class="card">

            <h2>${ad.type.toUpperCase()} Advertisement</h2>

            ${
            ad.type==="image"
            ?
            `<img src="${ad.media}" width="100%">`
            :
            ""
            }

            ${
            ad.type==="video"
            ?
            `<video controls width="100%">
            <source src="${ad.media}">
            </video>`
            :
            ""
            }

            ${
            ad.type==="text"
            ?
            `<p>${ad.text}</p>`
            :
            ""
            }

            <br>

            ${
            ad.link
            ?
            `<a href="${ad.link}" target="_blank">Visit Sponsor</a>`
            :
            ""
            }

            <br><br>

            <small>${ad.date}</small>

            <br><br>

            <button onclick="editAdvertisement(${index})">

            Edit

            </button>

            <button onclick="deleteAdvertisement(${index})">

            Delete

            </button>

            </div>

            <br>

            `;

        });

    }

    document.getElementById("adsList").innerHTML=html;

}

// Edit Advertisement
function editAdvertisement(index){

    let ads=JSON.parse(localStorage.getItem("ads"))||[];

    let ad=ads[index];

    document.getElementById("adType").value=ad.type;
    document.getElementById("adText").value=ad.text;
    document.getElementById("adLink").value=ad.link;

    ads.splice(index,1);

    localStorage.setItem("ads",JSON.stringify(ads));

    loadAdvertisements();

}

// Delete Advertisement
function deleteAdvertisement(index){

    if(!confirm("Delete this advertisement?")){

        return;

    }

    let ads=JSON.parse(localStorage.getItem("ads"))||[];

    ads.splice(index,1);

    localStorage.setItem("ads",JSON.stringify(ads));

    loadAdvertisements();

}

// Search Advertisement
function searchAdvertisement(){

    const keyword=document.getElementById("searchAd").value.toLowerCase();

    let ads=JSON.parse(localStorage.getItem("ads"))||[];

    let html="";

    ads.forEach(function(ad,index){

        if(
        ad.type.toLowerCase().includes(keyword) ||
        ad.text.toLowerCase().includes(keyword)
        ){

            html+=`

            <div class="card">

            <h3>${ad.type}</h3>

            <p>${ad.text}</p>

            <button onclick="editAdvertisement(${index})">

            Edit

            </button>

            <button onclick="deleteAdvertisement(${index})">

            Delete

            </button>

            </div>

            `;

        }

    });

    document.getElementById("adsList").innerHTML=html;

}

// Clear Form
function clearForm(){

    document.getElementById("adType").value="image";
    document.getElementById("adFile").value="";
    document.getElementById("adText").value="";
    document.getElementById("adLink").value="";

}