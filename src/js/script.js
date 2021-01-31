'use strict'

// Courses Page
const dropDownButton = document.querySelector('.plus-button');
const menu = document.querySelector('.menu-content');
const currLoggedIn = 'John Doe';
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

function route(path) {
    return path;
}

// Post Wrapper
function post(url, body, callback) {
    const postRequest = new XMLHttpRequest();
    postRequest.open('POST', url);
    postRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    postRequest.send(JSON.stringify(body));
    postRequest.onreadystatechange = function () {
        if (postRequest.readyState === 4)
            callback(postRequest.response);
    }
}

// Get Wrapper
function get(url, callback) {
    const displayPostsRequest = new XMLHttpRequest();
    displayPostsRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText))
        }
    }
    displayPostsRequest.open('GET', route(url));
    displayPostsRequest.send();
}

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
    get(route('/src/data/courses.json'), function (data) {
        data = data.data
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
    })
}

// Requests for Login Page (Temporary)
if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1).startsWith('login.html')) {
    const logInButton = document.getElementById('button-lr');
    logInButton.addEventListener('click', function (event) {
        const emailField = document.getElementById('email').value;
        const passwordField = document.getElementById('password').value;
        event.preventDefault();
        const url = route('api/auth/login');
        const userData = {
            email: emailField,
            password: passwordField
        };
        post(url, userData, function (res) {
            res = JSON.parse(res)
            if (res.message === 'Ok') {
                window.location.href = 'courses.html';
            } else {
                const errorMessage = document.getElementById('wrong-credentials');
                errorMessage.style.display = 'block';
            }
        })
    });

}

// Requests for Stream Page (Temporary)
if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1).startsWith('classroom.html')) {
    const queryStr = window.location.search;
    const urlParameters = new URLSearchParams(queryStr);
    const classID = urlParameters.get('id');
    displayVisuals(classID);
}

function displayVisuals(classID) {
    get(route('/src/data/courses/' + classID + '.json'), function (data) {
        displayUpperPart(data);
        displayPosts(data);
    });
}


function displayUpperPart(data) {
    document.title = data.course.name;

    document.getElementById('classroom-title').textContent = data.course.name;
    document.getElementById('classroom-subject').textContent = data.course.subject;
    document.getElementById('classroom-room').textContent = data.course.room;
    document.getElementById('title-image').src = data.course.image;

    const subjectLabel = document.getElementById('subject-label');
    const roomLabel = document.getElementById('room-label');
    if (!data.course.subject) subjectLabel.style.display = 'none';
    if (!data.course.room) roomLabel.style.display = 'none';
    if (!data.course.subject && !data.course.room) document.getElementById('show-additional-info').style.display = 'none';
}

function displayPosts(data) {
    const postData = data.data
    const rightPartContainer = document.getElementById('right-part-container');
    const postContainerTemplate = document.getElementById('class-post-template');
    const assignmentAnnouncementTemplate = document.getElementById('assignment-announcement-template');

    // Iterate over posts
    postData.forEach(function (currPost) {
        const commentsForPost = currPost.comments;
        const typeOfPost = currPost.type;
        if (!typeOfPost) {
            // Displaying regular post
            const postContainerClone = postContainerTemplate.content.cloneNode(true);
            updateUpperLabeling(currPost, postContainerClone, 'post-owner', 'date-style', typeOfPost);
            postContainerClone.getElementById('post-class-main-text').textContent = currPost.description;
            const commentsContainer = postContainerClone.getElementById('post-comments');
            const postCommentsButton = commentsContainer.children[0];
            postCommentsButton.textContent = classCommentsButton(commentsForPost.length, postCommentsButton);
            rightPartContainer.appendChild(postContainerClone);

            // Iterate over comments
            const commentsTemplate = document.getElementById('post-comment-template');
            commentsForPost.forEach(function (currComment) {
                displayComment(commentsContainer, commentsTemplate, currComment.user.displayName, currComment.date, currComment.description);
            });

            // Hide all comments but last
            let commentsAreHidden = false;
            if (!commentsForPost.length) commentsContainer.style.display = 'none';
            else if (commentsForPost.length > 1) {
                const currPostComments = Array.from(commentsContainer.querySelectorAll('.post-comment'));
                changeStylingOfComments(currPostComments, 'none');
                commentsAreHidden = true;
            }
            handleCommentsButtonClick(commentsContainer, postCommentsButton, commentsAreHidden);
            handleCommentAdding(commentsContainer, commentsContainer.parentElement.lastElementChild,
                commentsTemplate, postCommentsButton, commentsForPost.length);

        } else {
            // Displaying assignment posted by the teacher
            const assignmentAnnouncementClone = assignmentAnnouncementTemplate.content.cloneNode(true);
            updateUpperLabeling(currPost, assignmentAnnouncementClone, 'assignment-announcement-owner',
                'assignment-announced-date', typeOfPost);
            const commentsElem = assignmentAnnouncementClone.getElementById('assignment-announcement-comments');
            assignmentAnnouncementClone.getElementById('assignment-comment-num').textContent = classCommentsButton(commentsForPost.length, null);
            if (!commentsForPost.length) commentsElem.style.display = 'none';
            rightPartContainer.appendChild(assignmentAnnouncementClone);
        }
    });
}

function displayComment(commentsContainer, commentsTemplate, displayName, postedDate, commentDesc) {
    const commentsClone = commentsTemplate.content.cloneNode(true);
    commentsClone.getElementById('comment-owner').textContent = displayName;
    commentsClone.getElementById('comment-posted').textContent = postedDate;
    commentsClone.getElementById('comment-text').textContent = commentDesc;
    commentsContainer.appendChild(commentsClone);
}

function handleCommentAdding(commentsContainer, commentInputField, commentsTemplate, postCommentsButton, commentsForPostLen) {
    let commentQuantity = commentsForPostLen;
    const addCommentButton = commentInputField.querySelector('.comment-input-field button');
    const textField = commentInputField.querySelector('input');
    postOnEnter(commentInputField, addCommentButton);
    addCommentButton.addEventListener('click', function () {
        let currTime = new Date();
        let currTimeHours = currTime.getHours();
        currTimeHours = (currTimeHours < 10) ? '0' + currTimeHours : currTimeHours;
        let currTimeMinutes = currTime.getMinutes();
        currTimeMinutes = (currTimeMinutes < 10) ? '0' + currTimeMinutes : currTimeMinutes;
        const textFieldText = textField.value;
        if (textFieldText) {
            displayComment(commentsContainer, commentsTemplate, currLoggedIn, currTimeHours + ":" + currTimeMinutes, textField.value);
            commentQuantity++;
            textField.value = "";
            changeButtonStyling(commentsContainer, commentQuantity, postCommentsButton);
        }
    });
}

function changeButtonStyling(commentsContainer, commentQuantity, postCommentsButton) {
    postCommentsButton.textContent = classCommentsButton(commentQuantity, postCommentsButton);
    if (commentsContainer.style.display === 'none') {
        commentsContainer.style.display = 'block';
    } else if (postCommentsButton.textContent[0] === '2') {
        postCommentsButton.classList.add('button-hover');
        postCommentsButton.style.pointerEvents = 'auto';
    }
}

function postOnEnter(inputField, buttonToClick) {
    inputField.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            buttonToClick.click();
        }
    });
}

function changeStylingOfComments(currPostComments, displayType) {
    for (let i = 0; i < currPostComments.length - 1; i++) currPostComments[i].style.display = displayType;
}

function handleCommentsButtonClick(commentsContainer, commentsButton, commentsAreHidden) {
    commentsButton.addEventListener('click', function () {
        const currPostComments = Array.from(commentsContainer.querySelectorAll('.post-comment'));
        changeStylingOfComments(currPostComments, commentsAreHidden ? 'flex' : 'none');
        commentsAreHidden = !commentsAreHidden;
    });
}

function updateUpperLabeling(currPost, clone, author, date, type) {
    const textToEdit = clone.getElementById(author);
    textToEdit.textContent = currPost.user.displayName;
    if (type > 0) textToEdit.textContent += ' posted a new ';
    if (type == 1) textToEdit.textContent += 'assignment: ' + currPost.assignment_name;
    if (type == 2) textToEdit.textContent += 'material: ' + currPost.assignment_name;
    clone.getElementById(date).textContent = currPost.date;
}

function classCommentsButton(commentsForPostLen, postCommentsButton) {
    let stringToDisplay = commentsForPostLen + ' class comment';
    if (commentsForPostLen == 1) {
        if (postCommentsButton) {
            postCommentsButton.classList.remove('button-hover');
            postCommentsButton.style.pointerEvents = 'none';
        }
    }
    if (commentsForPostLen > 1) stringToDisplay += 's';
    return stringToDisplay;
}

// Requests for Students Page (Temporary)
if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1).startsWith('students.html')) {
    const queryStr = window.location.search;
    const urlParameters = new URLSearchParams(queryStr);
    const classID = urlParameters.get('id');
    displayStudents(classID);
}

function displayStudents(classID) {
    get(route('/src/data/courses/' + classID + '.json'), function (data) {
        const studentsList = data.students;
        const lecturerLabel = data.course.lecturer;
        const studLabelStyling = document.querySelector('.stud-label-styling');
        studLabelStyling.textContent = studentsList.length + ' students';
        const tableTemplate = document.getElementById('table-template');
        const tableContainer = document.querySelector('.table-container table');
        document.getElementById('lecturer-label').textContent = lecturerLabel;
        studentsList.forEach(function (student) {
            const studClone = tableTemplate.content.cloneNode(true);
            studClone.getElementById('student-label').textContent = student.displayName;
            tableContainer.appendChild(studClone);
        });
    });
}