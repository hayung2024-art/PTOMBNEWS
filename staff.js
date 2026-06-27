// ===========================
// PTOMB NEWS - staff.js
// ===========================

window.onload = function () {
    loadStaff();
};

// -------------------------
// Add Staff
// -------------------------
function addStaff() {

    const name = document.getElementById("staffName").value.trim();
    const username = document.getElementById("staffUsername").value.trim();
    const password = document.getElementById("staffPassword").value.trim();
    const role = document.getElementById("staffRole").value;

    if (name === "" || username === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    let staff = JSON.parse(localStorage.getItem("staff")) || [];

    // Check duplicate username
    const exists = staff.find(user => user.username === username);

    if (exists) {
        alert("Username already exists.");
        return;
    }

    staff.push({
        id: Date.now(),
        name: name,
        username: username,
        password: password,
        role: role,
        status: "Active",
        created: new Date().toLocaleString()
    });

    localStorage.setItem("staff", JSON.stringify(staff));

    alert("Staff Added Successfully");

    document.getElementById("staffName").value = "";
    document.getElementById("staffUsername").value = "";
    document.getElementById("staffPassword").value = "";
    document.getElementById("staffRole").value = "staff";

    loadStaff();
}

// -------------------------
// Load Staff
// -------------------------
function loadStaff() {

    const staff = JSON.parse(localStorage.getItem("staff")) || [];

    let html = "";

    if (staff.length === 0) {

        html = `
        <div class="card">
            <h3>No Staff Found</h3>
        </div>
        `;

    } else {

        staff.forEach(function(user, index){

            html += `

            <div class="card">

                <h3>${user.name}</h3>

                <p><b>Username:</b> ${user.username}</p>

                <p><b>Password:</b> ${user.password}</p>

                <p><b>Role:</b> ${user.role}</p>

                <p><b>Status:</b> ${user.status}</p>

                <p><small>${user.created}</small></p>

                <button onclick="editStaff(${index})">
                Edit
                </button>

                <button onclick="deleteStaff(${index})">
                Delete
                </button>

            </div>

            <br>

            `;

        });

    }

    document.getElementById("staffList").innerHTML = html;

}

// -------------------------
// Edit Staff
// -------------------------
function editStaff(index){

    let staff = JSON.parse(localStorage.getItem("staff")) || [];

    let user = staff[index];

    document.getElementById("staffName").value = user.name;
    document.getElementById("staffUsername").value = user.username;
    document.getElementById("staffPassword").value = user.password;
    document.getElementById("staffRole").value = user.role;

    staff.splice(index,1);

    localStorage.setItem("staff",JSON.stringify(staff));

    loadStaff();

}

// -------------------------
// Delete Staff
// -------------------------
function deleteStaff(index){

    if(!confirm("Delete this staff member?")){
        return;
    }

    let staff = JSON.parse(localStorage.getItem("staff")) || [];

    staff.splice(index,1);

    localStorage.setItem("staff",JSON.stringify(staff));

    loadStaff();

}

// -------------------------
// Search Staff
// -------------------------
function searchStaff(){

    const keyword = document
    .getElementById("searchStaff")
    .value
    .toLowerCase();

    const staff = JSON.parse(localStorage.getItem("staff")) || [];

    let html = "";

    staff.forEach(function(user,index){

        if(
            user.name.toLowerCase().includes(keyword) ||
            user.username.toLowerCase().includes(keyword) ||
            user.role.toLowerCase().includes(keyword)
        ){

            html += `

            <div class="card">

                <h3>${user.name}</h3>

                <p>${user.username}</p>

                <p>${user.role}</p>

                <button onclick="editStaff(${index})">
                Edit
                </button>

                <button onclick="deleteStaff(${index})">
                Delete
                </button>

            </div>

            <br>

            `;

        }

    });

    document.getElementById("staffList").innerHTML = html;

}