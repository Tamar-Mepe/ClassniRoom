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
    let dropDownAdditionalInfo = document.getElementById("show-additional-info");
    if (dropDownAdditionalInfo != null) {
        dropDownAdditionalInfo.addEventListener('click', () => {
            let itemToShow = document.getElementById("additional-info-wrapper")
            if (itemToShow.style.display != "block") {
                document.getElementById("additional-info-wrapper").style.display = "block";
                let image = document.getElementById("title-image");
                image.style.borderBottomLeftRadius = "0";
                image.style.borderBottomRightRadius = "0";
                // TODO - Change SVG
            } else {
                let dropDown = document.getElementById("additional-info-wrapper")
                dropDown.style.display = "none";
                let image = document.getElementById("title-image");
                image.style.boxShadow = "0 0 11px rgba(33, 33, 33, .2)";
                dropDown.style.boxShadow = "0 0 11px rgba(33, 33, 33, .2)";
                image.style.borderBottomLeftRadius = "10px";
                image.style.borderBottomRightRadius = "10px";
                // TODO - Change SVG
            }
        })
    }
};