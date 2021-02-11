'use strict'

const currLoggedIn = 'John Doe';
const approvedEmail = 'test@test';
const approvedPassword = 'test';

// Get Wrapper
function get(url, callback) {
    return new Promise((resolve, reject) => {
        const displayPostsRequest = new XMLHttpRequest();
        displayPostsRequest.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    callback(JSON.parse(this.responseText));
                    return resolve();
                } else return reject();
            }
        }
        displayPostsRequest.open('GET', url);
        displayPostsRequest.send();
    })
}

// Helper Functions
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

function changeHeaderStyleAndNav(displayMiddle, displayJoinCreate, displayInvite, courseID) {
    changeHeaderElementsDisplay(displayMiddle, displayJoinCreate, displayInvite);
    setNavHrefs(courseID);
}

function changeHeaderElementsDisplay(displayMiddle, displayJoinCreate, displayInvite) {
    document.getElementById('middle-text-id').style.display = displayMiddle ? 'flex' : 'none';
    document.getElementById('right-join-and-create-id').style.display = displayJoinCreate ? 'flex' : 'none';
    document.getElementById('right-invite-id').style.display = displayInvite ? 'flex' : 'none';
}

function setNavHrefs(courseID) {
    document.getElementById('stream-page').href = '/courses/' + courseID;
    document.getElementById('classwork-page').href = '/courses/' + courseID + '/classwork';
    document.getElementById('students-page').href = '/courses/' + courseID + '/students';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function operationSuccessful(stringToDisplay) {
    const loadingScreenContainer = document.getElementById('loading-screen-container');
    const mainLabel = document.getElementById('loading-screen-main-label');
    mainLabel.textContent = 'Please wait';
    loadingScreenContainer.style.display = 'block';
    await sleep(1313);
    mainLabel.textContent = stringToDisplay;
    await sleep(1313);
    loadingScreenContainer.style.display = 'none';
}