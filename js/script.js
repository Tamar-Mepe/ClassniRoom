'use strict'

const currLoggedIn = 'John Doe';
const approvedEmail = 'test@test';
const approvedPassword = 'test';

const joinClassButton = document.getElementById('join-class');
if (joinClassButton) {
    joinClassButton.addEventListener('click', () => {
        document.getElementById('join-class-popup').style.display = 'block';
    })
}

const closeJoinButton = document.getElementById('close-join');
if (closeJoinButton) {
    closeJoinButton.addEventListener('click', () => {
        document.getElementById('join-class-popup').style.display = 'none';
    })
}

const createClassButton = document.getElementById('create-class');
if (createClassButton) {
    createClassButton.addEventListener('click', () => {
        document.getElementById('create-class-popup').style.display = 'block';
    })
}

const createClassBtn = document.getElementById('create-button');
if (createClassBtn) {
    createClassBtn.addEventListener('click', () => {
        document.getElementById('create-class-popup').style.display = 'none';
    })
}

const closeCreateButton = document.getElementById('close');
if (closeCreateButton) {
    closeCreateButton.addEventListener('click', () => {
        document.getElementById('create-class-popup').style.display = 'none';
    })
}

const burgerIcon = document.getElementById('burger-icon');
if (burgerIcon) {
    const sidebarContainer = document.getElementById('sidebar-container');
    burgerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebarContainer.classList.add('show');
    });
    document.addEventListener('click', () => {
        if (sidebarContainer.classList.contains('show'))
            sidebarContainer.classList.remove('show');
    });
}

const inviteButton = document.getElementById('invite-button');
if (inviteButton) {
    inviteButton.addEventListener('click', () => {
        document.getElementById('invite-popup-container').style.visibility = 'visible';
    })
}

const inviteClose = document.getElementById('invite-close-button');
if (inviteClose) {
    inviteClose.addEventListener('click', () => {
        document.getElementById('invite-popup-container').style.visibility = 'hidden';
    })
}

const iniviteBtn = document.getElementById('inv-button');
if (iniviteBtn) {
    iniviteBtn.addEventListener('click', () => {
        document.getElementById('invite-popup-container').style.visibility = 'hidden';
    })
}

// Get Wrapper
function get(url, callback) {
    const displayPostsRequest = new XMLHttpRequest();
    displayPostsRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            callback(JSON.parse(this.responseText))
    }
    displayPostsRequest.open('GET', url);
    displayPostsRequest.send();
}

function getCurrHM() {
    let currTime = new Date();
    let currTimeHours = currTime.getHours();
    currTimeHours = (currTimeHours < 10) ? '0' + currTimeHours : currTimeHours;
    let currTimeMinutes = currTime.getMinutes();
    currTimeMinutes = (currTimeMinutes < 10) ? '0' + currTimeMinutes : currTimeMinutes;
    return currTimeHours + ":" + currTimeMinutes;
}

function postOnEnter(inputField, buttonToClick) {
    inputField.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) buttonToClick.click();
    });
}

function handleClicksForAssignments() {
    const assignmentBar = document.querySelectorAll('.assignment-bar');
    const assignmentBarsArr = Array.from(assignmentBar);
    let currentlyDisplayed = [];
    assignmentBar.forEach(function (aBar) {
        aBar.addEventListener('click', function (event) {
            const elemIndex = assignmentBarsArr.indexOf(event.target);
            const assignmentContent = aBar.parentElement.lastElementChild;
            const [firstChild, secondChild] = assignmentContent.children;
            if (firstChild.classList.contains('show')) {
                firstChild.classList.remove('show');
                secondChild.classList.remove('show');
                assignmentContent.parentElement.children[0].classList.remove('show');
                currentlyDisplayed.pop();
            } else {
                firstChild.classList.add('show');
                secondChild.classList.add('show');
                assignmentContent.parentElement.children[0].classList.add('show');
                if (currentlyDisplayed.length) {
                    const toHideIndex = currentlyDisplayed.pop();
                    const elemToHide = assignmentBarsArr[toHideIndex];
                    const elemParentElement = elemToHide.parentElement;
                    elemParentElement.children[0].classList.remove('show');
                    elemParentElement.lastElementChild.children[0].classList.remove('show');
                    elemParentElement.lastElementChild.children[1].classList.remove('show');
                }
                currentlyDisplayed.push(elemIndex);
            }
        });
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}