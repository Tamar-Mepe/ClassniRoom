window.onload = function () {
    let dropDownButton = document.querySelector('.plus-button');
    let menu = document.querySelector('.menu-content');
    if (dropDownButton != null) {
        dropDownButton.addEventListener('click', () => {
            if (menu.style.display === "") {
                menu.style.display = "block";
                dropDownButton.style.backgroundColor = "rgb(236, 236, 236)";
            } else {
                menu.style.display = "";
                dropDownButton.style.backgroundColor = "white";
            }
        })
    }
    let joinClassButton = document.getElementById("join-class");
    if (joinClassButton != null) {
        joinClassButton.addEventListener('click', () => {
            document.getElementById("join-class-popup").style.visibility = "visible";
        })
    }
    let closeJoinButton = document.getElementById("close-join");
    if (closeJoinButton != null) {
        document.getElementById("close-join").addEventListener('click', () => {
            document.getElementById("join-class-popup").style.visibility = "hidden";
        })
    }
    let createClassButton = document.getElementById("create-class");
    if (createClassButton != null) {
        createClassButton.addEventListener('click', () => {
            document.getElementById("create-class-popup").style.visibility = "visible";
        })
    }
    let closeCreateButton = document.getElementById("close");
    if (closeCreateButton != null) {
        closeCreateButton.addEventListener('click', () => {
            document.getElementById("create-class-popup").style.visibility = "hidden";
        })
    }
    let inviteButton = document.getElementById("invite-button");
    if (inviteButton != null) {
        inviteButton.addEventListener('click', () => {
            document.getElementById("invite-popup-container").style.visibility = "visible";
        })
    }
    let inviteClose = document.getElementById("invite-close-button");
    if (inviteClose != null) {
        inviteClose.addEventListener('click', () => {
            document.getElementById("invite-popup-container").style.visibility = "hidden";
        })
    }
};