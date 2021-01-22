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
    burgerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebarContainer.classList.add('show');
    });
    document.addEventListener('click', () => {
        if (sidebarContainer.classList.contains('show'))
            sidebarContainer.classList.remove('show');
    });
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
        } else {
            const dropDown = document.getElementById('additional-info-wrapper')
            dropDown.style.display = 'none';
            const image = document.getElementById('title-image');
            image.style.boxShadow = '0 0 11px rgba(33, 33, 33, .2)';
            dropDown.style.boxShadow = '0 0 11px rgba(33, 33, 33, .2)';
            image.style.borderBottomLeftRadius = '10px';
            image.style.borderBottomRightRadius = '10px';
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
                const [firstChild, secondChild] = assignmentContent.children;
                if (firstChild.classList.contains('show')) {
                    firstChild.classList.remove('show');
                    secondChild.classList.remove('show');
                    currentlyDisplayed.pop();
                } else {
                    firstChild.classList.add('show');
                    secondChild.classList.add('show');
                    if (currentlyDisplayed.length) {
                        const toHideIndex = currentlyDisplayed.pop();
                        const elemToHide = assignmentBarsArr[toHideIndex];
                        changeStyling(elemToHide);
                        elemToHide.parentElement.lastElementChild.children[0].classList.remove('show');
                        elemToHide.parentElement.lastElementChild.children[1].classList.remove('show');
                    }
                    currentlyDisplayed.push(elemIndex);
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

// Requests for Courses Page (Temporary)

if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1) === 'courses.html') {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText).data;
            if (!data.length) {
                const emptyListWindow = document.getElementById('empty-class-list');
                const windowClone = emptyListWindow.content.cloneNode(true);
                const coursesMain = document.getElementById('courses-main');
                coursesMain.appendChild(windowClone);
                return;
            }
            const courseRow = document.getElementById('course-row');
            const sidebarComponent = document.getElementById('sidebar-component');
            const courseCardTemplate = document.getElementById('course-card-template');
            const sidebarCourseTemplate = document.getElementById('sidebar-course-template');
            data.forEach(function (currCourse) {
                const tmpClone = courseCardTemplate.content.cloneNode(true);
                const tmpClone2 = sidebarCourseTemplate.content.cloneNode(true);
                tmpClone.querySelector('img').src = currCourse.image;
                tmpClone.querySelector('.class-label').textContent = currCourse.name;
                tmpClone.querySelector('.lecturer-label').textContent = currCourse.lecturer;
                tmpClone.querySelector('.class-label').href += ('?id=' + currCourse.id);
                const courseName = currCourse.name;
                tmpClone2.querySelector('.classroom-icon').textContent = courseName[0];
                tmpClone2.getElementById('course-name-label').textContent = courseName;
                tmpClone2.querySelector('.sidebar-item').href += ('?id=' + currCourse.id);
                courseRow.appendChild(tmpClone);
                sidebarComponent.appendChild(tmpClone2);
            });
        }
    };
    request.open("GET", "http://localhost:5000/api/courses");
    request.send();
}

// Requests for Login Page (Temporary)
if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1).startsWith('login.html')) {
    const logInButton = document.getElementById('button-lr');
    logInButton.addEventListener('click', function (event) {
        const emailField = document.getElementById('email').value;
        const passwordField = document.getElementById('password').value;
        event.preventDefault();
        const userData = {
            email: emailField,
            password: passwordField
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:5000/api/auth/login', options)
            .then(res => res.json())
            .then(function (res) {
                if (res.message === 'Ok') {
                    window.location.href = 'courses.html';
                } else {
                    const errorMessage = document.getElementById('wrong-credentials');
                    errorMessage.style.display = 'block';
                }
            })
            .catch(err => console.error("AAAA"));
    });
}