// =============================
// PTOMB NEWS - script.js
// =============================

// Load everything
window.onload = function () {
    loadNews();
    loadAdvertisements();

    const search = document.getElementById("search");
    if (search) {
        search.addEventListener("keyup", searchNews);
    }
};

// ----------------------------
// Load News
// ----------------------------

function loadNews() {

    let news = JSON.parse(localStorage.getItem("news")) || [];

    let html = "";

    news.forEach(function(item, index){

        html += `
        <div class="news-card">

            <img src="${item.image}" alt="${item.title}">

            <div class="news-content">

                <h3>${item.title}</h3>

                <div class="news-date">
                    ${item.category} | ${item.date}
                </div>

                <p>${item.description.substring(0,150)}...</p>

                <a href="news.html?id=${index}">
                    <button>Read More</button>
                </a>

            </div>

        </div>
        `;

    });

    document.getElementById("newsContainer").innerHTML = html;

}

// ----------------------------
// Search News
// ----------------------------

function searchNews(){

    let keyword = document
    .getElementById("search")
    .value
    .toLowerCase();

    let news = JSON.parse(localStorage.getItem("news")) || [];

    let html = "";

    news.forEach(function(item,index){

        if(
            item.title.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword) ||
            item.category.toLowerCase().includes(keyword)
        ){

            html += `
            <div class="news-card">

                <img src="${item.image}" alt="${item.title}">

                <div class="news-content">

                    <h3>${item.title}</h3>

                    <div class="news-date">
                        ${item.category} | ${item.date}
                    </div>

                    <p>${item.description.substring(0,150)}...</p>

                    <a href="news.html?id=${index}">
                        <button>Read More</button>
                    </a>

                </div>

            </div>
            `;

        }

    });

    document.getElementById("newsContainer").innerHTML = html;

}

// ----------------------------
// Advertisements
// ----------------------------

function loadAdvertisements(){

    let ads = JSON.parse(localStorage.getItem("ads")) || [];

    let html = "";

    ads.forEach(function(ad){

        if(ad.type==="image"){

            html += `
            <div class="ad-card">

                <img src="${ad.image}" alt="Advertisement">

                <br><br>

                <a href="${ad.link}" target="_blank">
                    Visit Sponsor
                </a>

            </div>
            `;

        }

        else if(ad.type==="video"){

            html += `
            <div class="ad-card">

                <video controls width="100%">

                    <source src="${ad.image}">

                </video>

                <br><br>

                <a href="${ad.link}" target="_blank">
                    Visit Sponsor
                </a>

            </div>
            `;

        }

        else{

            html += `
            <div class="ad-card">

                <h3>Sponsored</h3>

                <p>${ad.text}</p>

                <a href="${ad.link}" target="_blank">
                    Visit Sponsor
                </a>

            </div>
            `;

        }

    });

    document.getElementById("adsContainer").innerHTML = html;

}