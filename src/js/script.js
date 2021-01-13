'use strict'

// Courses Page
const dropDownButton = document.querySelector('.plus-button');
const menu = document.querySelector('.menu-content');
if (dropDownButton) {
    dropDownButton.addEventListener('click', () => {
        if (menu.style.display !== 'block') {
            menu.style.display = 'block';
            dropDownButton.style.backgroundColor = 'rgb(236, 236, 236)';
        } else {
            menu.style.display = 'none';
            dropDownButton.style.backgroundColor = 'white';
        }
    })
}

const joinClassButton = document.getElementById('join-class');
if (joinClassButton) {
    joinClassButton.addEventListener('click', () => {
        document.getElementById('join-class-popup').style.visibility = 'visible';
    })
}

const closeJoinButton = document.getElementById('close-join');
if (closeJoinButton) {
    closeJoinButton.addEventListener('click', () => {
        document.getElementById('join-class-popup').style.visibility = 'hidden';
    })
}

const createClassButton = document.getElementById('create-class');
if (createClassButton) {
    createClassButton.addEventListener('click', () => {
        document.getElementById('create-class-popup').style.visibility = 'visible';
    })
}

const closeCreateButton = document.getElementById('close');
if (closeCreateButton) {
    closeCreateButton.addEventListener('click', () => {
        document.getElementById('create-class-popup').style.visibility = 'hidden';
    })
}

const burgerIcon = document.getElementById('burger-icon');
if (burgerIcon) {
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarStyle = document.getElementById('sidebar-style');
    burgerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        showSidebar(sidebarContainer, sidebarStyle);
    });
    document.addEventListener('click', () => {
        if (sidebarContainer.style.display === 'block')
            hideSidebar(sidebarContainer, sidebarStyle);
    });
}

function showSidebar(sidebarContainer, sidebarStyle) {
    sidebarContainer.style.display = 'block';
    sidebarStyle.style.transform = 'translateX(0)';
    // TODO: Animation
}

function hideSidebar(sidebarContainer, sidebarStyle) {
    sidebarContainer.style.display = 'none';
    sidebarStyle.style.transform = 'translateX(-100%)';
    // TODO: Animation
}

//==============

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

// Stream Page
const dropDownAdditionalInfo = document.getElementById('show-additional-info');
if (dropDownAdditionalInfo) {
    dropDownAdditionalInfo.addEventListener('click', () => {
        const itemToShow = document.getElementById('additional-info-wrapper')
        if (itemToShow.style.display !== 'block') {
            document.getElementById('additional-info-wrapper').style.display = 'block';
            const image = document.getElementById('title-image');
            image.style.borderBottomLeftRadius = '0';
            image.style.borderBottomRightRadius = '0';
            // TODO - Change SVG
        } else {
            const dropDown = document.getElementById('additional-info-wrapper')
            dropDown.style.display = 'none';
            const image = document.getElementById('title-image');
            image.style.boxShadow = '0 0 11px rgba(33, 33, 33, .2)';
            dropDown.style.boxShadow = '0 0 11px rgba(33, 33, 33, .2)';
            image.style.borderBottomLeftRadius = '10px';
            image.style.borderBottomRightRadius = '10px';
            // TODO - Change SVG
        }
    })
}
//==============

// Classwork Page

const assignmentBar = document.querySelectorAll('.assignment-bar');
if (assignmentBar) {
    const assignmentBarsArr = Array.from(assignmentBar);
    let currentlyDisplayed = [];
    assignmentBar.forEach(
        function (aBar) {
            aBar.addEventListener('click', function (event) {
                const elemIndex = assignmentBarsArr.indexOf(event.target);
                const assignmentContent = aBar.parentElement.lastElementChild;
                if (assignmentContent.style.display !== 'block') {
                    assignmentContent.style.display = 'block';
                    if (currentlyDisplayed.length) {
                        const toHideIndex = currentlyDisplayed.pop();
                        const elemToHide = assignmentBarsArr[toHideIndex];
                        changeStyling(elemToHide);
                        elemToHide.parentElement.lastElementChild.style.display = 'none';
                    }
                    currentlyDisplayed.push(elemIndex);
                } else {
                    assignmentContent.style.display = 'none';
                    currentlyDisplayed.pop();
                }
                changeStyling(aBar);
            });
        }
    );
}

function changeStyling(aBar) {
    aBar.classList.toggle('assignment-bar');
    aBar.classList.toggle('assignment-bar-pressed');
    aBar.parentElement.classList.toggle('assignment-bar-style-pressed');
}
//==============