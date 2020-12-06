window.onload = function () {
    let dropDownButton = document.querySelector('.plus-button');
    let menu = document.querySelector('.menu-content');
    dropDownButton.addEventListener('click', () => {
        if (menu.style.display === "") {
            menu.style.display = "block";
            dropDownButton.style.backgroundColor = "rgb(236, 236, 236)";
        } else {
            menu.style.display = "";
            dropDownButton.style.backgroundColor = "white";
        }
    })
    document.getElementById("join-class").addEventListener('click', () => {
        document.getElementById("join-class-popup").style.visibility = "visible";
    })
    document.getElementById("close-join").addEventListener('click', () => {
        document.getElementById("join-class-popup").style.visibility = "hidden";
    })
    document.getElementById("create-class").addEventListener('click', () => {
        document.getElementById("create-class-popup").style.visibility = "visible";
    })
    document.getElementById("close").addEventListener('click', () => {
        document.getElementById("create-class-popup").style.visibility = "hidden";
    })
};