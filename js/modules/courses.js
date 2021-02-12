const header = () => {
    return fetch('/html/header.html')
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById('body').innerHTML = data;
        })
        .then(() => {
            handleSidebarInfo();
        });
}

function handleSidebarInfo() {
    const dropDownButton = document.querySelector('.plus-button');
    const menu = document.querySelector('.menu-content');
    const joinClassButton = document.getElementById('join-class');
    const closeJoinButton = document.getElementById('close-join');
    const createClassButton = document.getElementById('create-class');
    const createClassBtn = document.getElementById('create-button');
    const createButtonJoin = document.getElementById('create-button-join');
    const closeCreateButton = document.getElementById('close');
    const inviteButton = document.getElementById('invite-button');
    const inviteClose = document.getElementById('invite-close-button');
    const iniviteBtn = document.getElementById('inv-button');
    const burgerIcon = document.getElementById('burger-icon');
    const sidebarContainer = document.getElementById('sidebar-container');

    dropDownButton.addEventListener('click', () => {
        if (menu.style.display !== 'block') {
            menu.style.display = 'block';
            dropDownButton.style.backgroundColor = 'rgb(236, 236, 236)';
        } else {
            menu.style.display = 'none';
            dropDownButton.style.backgroundColor = 'white';
        }
    })

    joinClassButton.addEventListener('click', () => {
        document.getElementById('join-class-popup').style.display = 'block';
        dropDownButton.click();
    })

    closeJoinButton.addEventListener('click', () => {
        document.getElementById('join-class-popup').style.display = 'none';
    })

    createClassButton.addEventListener('click', () => {
        document.getElementById('create-class-popup').style.display = 'block';
        dropDownButton.click();
    })

    createClassBtn.addEventListener('click', () => {
        operationSuccessful('Class created!');
        document.getElementById('create-class-popup').style.display = 'none';
    })

    createButtonJoin.addEventListener('click', () => {
        operationSuccessful('Class Joined!');
        document.getElementById('join-class-popup').style.display = 'none';
    })

    closeCreateButton.addEventListener('click', () => {
        document.getElementById('create-class-popup').style.display = 'none';
    })

    inviteButton.addEventListener('click', () => {
        document.getElementById('invite-popup-container').style.display = 'block';
    })

    inviteClose.addEventListener('click', () => {
        document.getElementById('invite-popup-container').style.display = 'none';
    })

    iniviteBtn.addEventListener('click', () => {
        operationSuccessful('Friend invited!');
        document.getElementById('invite-popup-container').style.display = 'none';
    })

    burgerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebarContainer.classList.add('show');
    });

    document.addEventListener('click', () => {
        if (sidebarContainer.classList.contains('show')) sidebarContainer.classList.remove('show');
    });

    const sidebarComponent = document.getElementById('sidebar-component');
    const sidebarCourseTemplate = document.getElementById('sidebar-course-template');
    get('/data/courses.json', function (jsonData) {
        jsonData = jsonData.data
        jsonData.forEach(function (currCourse) {
            const sidebarClone = sidebarCourseTemplate.content.cloneNode(true);
            const courseName = currCourse.name;
            sidebarClone.querySelector('.classroom-icon').textContent = courseName[0];
            sidebarClone.getElementById('course-name-label').textContent = courseName;
            sidebarClone.querySelector('.sidebar-item').href += '/' + currCourse.id;
            sidebarComponent.appendChild(sidebarClone);
        });
    });
}

export class coursesController {
    static loadPage(url) {
        return fetch(url)
            .then(response => {
                return response.text();
            })
            .then(data => {
                const main = document.getElementById('main');
                if (!main) return header().then(() => { return data })
                else return data;
            })
    }

    static index() {
        return coursesController.loadPage('/html/courses-index.html')
            .then(data => {
                document.getElementById('main').innerHTML = data;
                changeHeaderElementsDisplay(false, true, false);
            })
            .then(() => {
                return get('/data/courses.json', function (jsonData) {
                    jsonData = jsonData.data
                    checkIfNoCourses(jsonData);
                    displayCourses(jsonData);
                })
            });

        function checkIfNoCourses(jsonData) {
            if (!jsonData.length) {
                const emptyListWindow = document.getElementById('empty-class-list');
                const windowClone = emptyListWindow.content.cloneNode(true);
                const coursesMain = document.getElementById('courses-main');
                coursesMain.appendChild(windowClone);
                return;
            }
        }

        function displayCourses(jsonData) {
            const courseRow = document.getElementById('course-row');
            const courseCardTemplate = document.getElementById('course-card-template');
            jsonData.forEach(function (currCourse) {
                const courseCardClone = courseCardTemplate.content.cloneNode(true);
                courseCardClone.querySelector('img').src = currCourse.image;
                courseCardClone.querySelector('.class-label').textContent = currCourse.name;
                courseCardClone.querySelector('.lecturer-label').textContent = currCourse.lecturer;
                courseCardClone.querySelector('.class-label').href += '/' + currCourse.id;
                courseCardClone.getElementById('redirect-to-your-work').href = '/courses/' + currCourse.id + '/classwork-assignments';
                courseRow.appendChild(courseCardClone);
            });
        }
    }

    static show(params) {
        let courseID = params.data.id;
        return coursesController.loadPage('/html/courses-show.html')
            .then(data => {
                document.getElementById('main').innerHTML = data;
                changeHeaderStyleAndNav(true, false, true, courseID);
                addBorderBottomMiddle(document.querySelectorAll('.middle-text a'), document.getElementById('stream-page'));
            })
            .then(() => {
                return get('/data/courses/' + courseID + '.json', function (data) {
                    displayUpperPart(data, courseID);
                    announceContainer();
                    displayPosts(data, courseID);
                    searchBar();
                })
            });

        function displayUpperPart(data, courseID) {
            document.title = data.course.name;
            setNavHrefs(courseID);

            document.getElementById('classroom-title').textContent = data.course.name;
            document.getElementById('classroom-subject').textContent = data.course.subject;
            document.getElementById('classroom-room').textContent = data.course.room;
            document.getElementById('title-image').src = data.course.image;

            const dropDownAdditionalInfo = document.getElementById('show-additional-info');
            dropDownAdditionalInfo.addEventListener('click', () => {
                const itemToShow = document.getElementById('additional-info-wrapper');
                const titleLabel = document.getElementById('title-image');
                if (!itemToShow.classList.contains('show')) {
                    itemToShow.classList.add('show');
                    titleLabel.classList.add('show');
                } else {
                    itemToShow.classList.remove('show');
                    titleLabel.classList.remove('show');
                }
            });

            const subjectLabel = document.getElementById('subject-label');
            const roomLabel = document.getElementById('room-label');

            if (!data.course.subject) subjectLabel.style.display = 'none';
            if (!data.course.room) roomLabel.style.display = 'none';
            if (!data.course.subject && !data.course.room) document.getElementById('show-additional-info').style.display = 'none';

            data.data.forEach(function (currAssignment) {
                if (currAssignment.type == 1 && currAssignment.assignment_status == "Assigned") {
                    const upcomingAssignmenthref = document.getElementById('upcoming-assignment-href');
                    document.getElementById('upcoming-assignment-text').style.display = 'none';
                    upcomingAssignmenthref.href = 'courses/' + courseID + '/classwork/' + currAssignment.id;
                    upcomingAssignmenthref.textContent = currAssignment.assignment_name;
                    return;
                }
                document.getElementById('view-all-materials').href = 'courses/' + courseID + '/classwork-assignments';
            });
        }

        function announceContainer() {
            const firstTypeContainer = document.querySelector('.announce-container');
            const secondTypeContainer = document.querySelector('.announce-container-2');
            const cancelButton = document.getElementById('cancel-button-post');
            const postButton = document.getElementById('post-button-post');
            const textArea = document.getElementById('announce-textarea');
            const resetButton = document.getElementById('reset-search-btn');

            firstTypeContainer.addEventListener('click', function () {
                firstTypeContainer.style.display = 'none';
                secondTypeContainer.style.display = 'block';
                textArea.select();
                resetButton.click();
            });

            cancelButton.addEventListener('click', function () {
                firstTypeContainer.style.display = 'flex';
                secondTypeContainer.style.display = 'none';
            });

            postButton.addEventListener('click', function () {
                secondTypeContainer.style.display = 'none';
                firstTypeContainer.style.display = 'flex';
                addPost(textArea, firstTypeContainer);
            });

            postOnEnter(textArea, postButton);
        }

        function displayPosts(data, courseID) {
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
                    assignmentAnnouncementClone.getElementById('assignment-href').href = 'courses/' + courseID + '/classwork/' + currPost.id;
                    if (!commentsForPost.length) commentsElem.style.display = 'none';
                    rightPartContainer.appendChild(assignmentAnnouncementClone);
                }
            });
        }

        function searchBar() {
            const searchBarInput = document.getElementById('search-stream-bar-id');
            searchBarInput.addEventListener(('keyup'), function (event) {
                if (event.keyCode === 13) {
                    const searchFor = searchBarInput.value;
                    if (searchFor !== "") {
                        searchForInput(searchFor);
                        searchBarInput.value = "";
                    }
                }
            });
        }

        function searchForInput(searchFor) {
            const resetButton = document.getElementById('reset-search-btn')
            const rightPartContainer = document.getElementById('right-part-container');
            const searchStreamBar = document.querySelector('.search-stream-bar');
            const childrenComponents = Array.from(rightPartContainer.children);

            childrenComponents.forEach(function (currChild) {
                if (currChild.className === 'assignment-announcement' || currChild.className === 'class-post-container') {
                    let maintextLabeling = "";
                    const upperLabeling = currChild.querySelector('.post-owner').textContent;
                    const mainText = currChild.querySelector('.post-class-main-text');
                    if (mainText) maintextLabeling = mainText.textContent;
                    if (upperLabeling.toLowerCase().includes(searchFor.toLowerCase())
                        || maintextLabeling.toLowerCase().includes(searchFor.toLowerCase())) {
                        changeStyling(currChild, '#4285F4');
                    } else currChild.style.display = 'none';
                }
            });

            resetButton.style.display = 'block';
            searchStreamBar.style.display = 'none';

            resetButton.addEventListener('click', function () {
                revertToStartingPoint();
                resetButton.style.display = 'none';
                searchStreamBar.style.display = 'block';
            });
        }

        function changeStyling(currChild, borderColor) {
            let classPostContainer = currChild;
            if (currChild.className === 'assignment-announcement') classPostContainer = currChild.querySelector('.class-post-container');
            classPostContainer.style.borderColor = borderColor;
        }

        function revertToStartingPoint() {
            const rightPartContainer = document.getElementById('right-part-container');
            const childrenComponents = Array.from(rightPartContainer.children);
            childrenComponents.forEach(function (currChild) {
                changeStyling(currChild, 'lightgray');
                currChild.style.display = 'block';
            });
        }

        function addPost(textArea) {
            const postContainerTemplate = document.getElementById('class-post-template');
            const searchStreamBar = document.querySelector('.search-stream-bar-container');
            const postContainerClone = postContainerTemplate.content.cloneNode(true);

            postContainerClone.getElementById('post-owner').textContent = currLoggedIn;
            postContainerClone.getElementById('date-style').textContent = getCurrHM();
            postContainerClone.getElementById('post-class-main-text').textContent = textArea.value;

            const commentsContainer = postContainerClone.getElementById('post-comments');
            const postCommentsButton = commentsContainer.children[0];
            commentsContainer.style.display = 'none';
            textArea.value = "";
            postCommentsButton.textContent = classCommentsButton(0, postCommentsButton);
            const commentsTemplate = postContainerClone.getElementById('post-comment-template');

            handleCommentsButtonClick(commentsContainer, postCommentsButton, false);
            handleCommentAdding(commentsContainer, commentsContainer.parentElement.lastElementChild,
                commentsTemplate, postCommentsButton, 0);
            searchStreamBar.parentNode.insertBefore(postContainerClone, searchStreamBar.nextSibling);
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
            addCommentButton.addEventListener('click', function () {
                const textFieldText = textField.value;
                if (textFieldText) {
                    displayComment(commentsContainer, commentsTemplate, currLoggedIn, getCurrHM(), textField.value);
                    commentQuantity++;
                    textField.value = "";
                    changeButtonStyling(commentsContainer, commentQuantity, postCommentsButton);
                }
            });
            postOnEnter(commentInputField, addCommentButton);
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

        function changeButtonStyling(commentsContainer, commentQuantity, postCommentsButton) {
            postCommentsButton.textContent = classCommentsButton(commentQuantity, postCommentsButton);
            if (commentsContainer.style.display === 'none') {
                commentsContainer.style.display = 'block';
            } else if (postCommentsButton.textContent[0] === '2') {
                postCommentsButton.classList.add('button-hover');
                postCommentsButton.style.pointerEvents = 'auto';
            }
        }

        function changeStylingOfComments(currPostComments, displayType) {
            for (let i = 0; i < currPostComments.length - 1; i++) currPostComments[i].style.display = displayType;
        }

    }

    static students(params) {
        let courseID = params.data.id;
        return coursesController.loadPage('/html/courses-students.html')
            .then(data => {
                document.getElementById('main').innerHTML = data;
                changeHeaderStyleAndNav(true, false, true, courseID);
            })
            .then(() => {
                return get('/data/courses/' + courseID + '.json', function (data) {
                    document.title = data.course.name;
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
            });
    }

    static classwork(params, router) {
        let courseID = params.data.id;
        return coursesController.loadPage('/html/courses-classwork.html')
            .then(data => {
                document.getElementById('main').innerHTML = data;
                changeHeaderStyleAndNav(true, false, true, courseID);
            })
            .then(() => {
                return get('/data/courses/' + courseID + '.json', function (data) {
                    document.title = data.course.name;
                    document.getElementById('view-your-work-btn-id').href = '/courses/' + courseID + '/classwork-assignments';
                    const assignments = data.data.filter(currData => currData.type == 1 || currData.type == 2);
                    const assignmentBarTemplate = document.getElementById('assignment-bar-style-id');
                    const assignmentBarContainer = document.getElementById('assignments-container');
                    assignments.forEach(function (curr) {
                        const assignmentBarClone = assignmentBarTemplate.content.cloneNode(true);
                        assignmentBarClone.getElementById('assignment-name-id').textContent = curr.assignment_name;
                        assignmentBarClone.getElementById('number-of-comments').textContent = curr.comments.length ? curr.comments.length : "";
                        assignmentBarClone.getElementById('assignment-due-date').textContent = curr.type == 1 ? "Due " + curr.due_date : "Posted " + curr.date;
                        assignmentBarClone.getElementById('assignment-posted-date').textContent = "Posted " + curr.date;
                        assignmentBarClone.getElementById('assignment-content-main').textContent = curr.description;
                        const classworkButton = assignmentBarClone.getElementById('view-assignment-button');
                        classworkButton.textContent = curr.type == 1 ? "View assignment" : "View material";
                        classworkButton.addEventListener('click', function () {
                            router.navigate('/courses/' + courseID + '/classwork/' + curr.id);
                        });
                        if (!curr.comments.length) assignmentBarClone.getElementById('assignment-comments-id').style.display = 'none';
                        assignmentBarContainer.appendChild(assignmentBarClone);
                    });
                    handleClicksForAssignments();
                });
            });
    }

    static classworkInner(params) {
        let courseID = params.data.id;
        let classWorkID = params.data.classworkid;
        return coursesController.loadPage('/html/courses-classwork-inner.html')
            .then(data => {
                document.getElementById('main').innerHTML = data;
                changeHeaderStyleAndNav(false, false, false, courseID);
            })
            .then(() => {
                return get('/data/courses/' + courseID + '.json', function (data) {
                    const currAssignment = data.data.filter(currPost => currPost.id == classWorkID)
                    displayCurrentAssignment(currAssignment[0]);
                });
            });

        function displayCurrentAssignment(currAssignment) {
            document.title = currAssignment.assignment_name;
            document.getElementById('assignment-name-id').textContent = currAssignment.assignment_name;
            document.getElementById('author-id').textContent = currAssignment.user.displayName + ' •';
            document.getElementById('posted-date-id').textContent = currAssignment.date;
            document.getElementById('single-assignment-content').textContent = currAssignment.description;

            if (currAssignment.type == 1) {
                document.getElementById('points-id').textContent = currAssignment.max_points + " Points";
                document.getElementById('due-date-id').textContent = currAssignment.due_date + ", " + currAssignment.due_date_h;
                const assignmentStatus = document.getElementById('assignment-curr-status');
                const currAssignmentStatus = currAssignment.assignment_status;
                assignmentStatus.textContent = currAssignmentStatus;
                if (currAssignmentStatus == "Assigned") assignmentStatus.style.color = "#2e7d32";
                else {
                    document.getElementById('mark-as-done').style.display = 'none';
                    if (currAssignmentStatus == "Turned in late" || currAssignmentStatus == "Missing") assignmentStatus.style.color = "red";
                }
            } else {
                document.getElementById('type-1-bar-id').style.display = 'none';
                document.getElementById('single-assignment-right').style.display = 'none';
            }
            displaySingleAssignmentComments(currAssignment.comments);
        }

        function displaySingleAssignmentComments(currAssignmentComments) {
            const assignmentCommentsContainer = document.getElementById('post-comments-container');
            const assignmentCommentsTemplate = document.getElementById('single-assignment-comments-template');
            const singleCommentsBtn = document.getElementById('single-comments-btn');
            const currAssignmentComLen = currAssignmentComments.length;
            let stringToDisplay = currAssignmentComLen + " class comment";
            if (currAssignmentComLen) {
                if (currAssignmentComLen > 1) stringToDisplay += 's';
                singleCommentsBtn.textContent = stringToDisplay;
                currAssignmentComments.forEach(function (currComment) {
                    displayCommentForAssignment(assignmentCommentsTemplate, assignmentCommentsContainer, currComment, true);
                });
            } else assignmentCommentsContainer.style.display = 'none';
            assignmentPageCommentAdding(currAssignmentComLen, singleCommentsBtn, assignmentCommentsTemplate, assignmentCommentsContainer);
        }

        function displayCommentForAssignment(assignmentCommentsTemplate, assignmentCommentsContainer, currComment, isPrevComment) {
            const assignmentCommentsClone = assignmentCommentsTemplate.content.cloneNode(true);
            assignmentCommentsClone.getElementById('comm-owner-id').textContent = isPrevComment ? currComment.user.displayName : currLoggedIn;
            assignmentCommentsClone.getElementById('comm-date-id').textContent = isPrevComment ? currComment.date : getCurrHM();
            assignmentCommentsClone.getElementById('comm-main-content').textContent = isPrevComment ? currComment.description : currComment;
            assignmentCommentsContainer.appendChild(assignmentCommentsClone);
        }

        function assignmentPageCommentAdding(currAssignmentComLen, singleCommentsBtn, assignmentCommentsTemplate, assignmentCommentsContainer) {
            let commentQuantity = currAssignmentComLen;
            const commentInputField = document.querySelector('.comment-input-field');
            const commentInputFieldText = commentInputField.querySelector('input');
            singleCommentsBtn.addEventListener('click', function () {
                assignmentCommentsContainer.style.display = 'block';
                const textFieldText = commentInputFieldText.value;
                if (textFieldText) {
                    displayCommentForAssignment(assignmentCommentsTemplate, assignmentCommentsContainer, textFieldText, false);
                    commentQuantity++;
                    commentInputFieldText.value = "";
                    let stringToDisplay = commentQuantity + " class comment";
                    if (commentQuantity > 1) stringToDisplay += 's';
                    singleCommentsBtn.textContent = stringToDisplay;
                }
            });
            postOnEnter(commentInputField, singleCommentsBtn);
        }
    }

    static classworkAssignments(params, router) {
        let courseID = params.data.id;
        return coursesController.loadPage('/html/courses-classwork-assignments.html')
            .then(data => {
                document.getElementById('main').innerHTML = data;
                changeHeaderElementsDisplay(false, false, false);
            })
            .then(() => {
                return get('/data/courses/' + courseID + '.json', function (data) {
                    document.title = data.course.name;
                    const assignments = data.data.filter(currData => currData.type == 1);
                    const assignmentBarTemplate = document.getElementById('your-work-template');
                    const assignmentBarContainer = document.getElementById('your-work-assignments');
                    const nothingAssignedTemplate = document.getElementById('nothing-assigned-id');
                    document.getElementById('logged-in-id').textContent = currLoggedIn;

                    if (!assignments.length) {
                        const nothingAssignedClone = nothingAssignedTemplate.content.cloneNode(true);
                        assignmentBarContainer.appendChild(nothingAssignedClone);
                        return;
                    }

                    assignments.forEach(function (curr) {
                        const assignmentBarClone = assignmentBarTemplate.content.cloneNode(true);
                        const commentsNum = assignmentBarClone.getElementById('num-of-comments');
                        const assignmentStatus = assignmentBarClone.getElementById('your-work-status-id');
                        const yourWorkViewButton = assignmentBarClone.getElementById('your-work-view-button');
                        const yourWorkMainText = assignmentBarClone.getElementById('your-work-main');
                        const mainText = "work has been attached.";
                        const currAssignmentStatus = curr.assignment_status;

                        assignmentBarClone.getElementById('your-work-assignment-name').textContent = curr.assignment_name;
                        commentsNum.textContent = curr.comments.length ? curr.comments.length : "";
                        assignmentBarClone.getElementById('your-work-due-date').textContent = curr.due_date;

                        if (currAssignmentStatus == 'Graded') assignmentStatus.textContent = curr.score + "/" + curr.max_points;
                        else assignmentStatus.textContent = currAssignmentStatus;
                        if (currAssignmentStatus == 'Assigned' || currAssignmentStatus == 'Missing') yourWorkMainText.textContent = "No " + mainText;
                        else yourWorkMainText.textContent = "Your " + mainText;
                        yourWorkViewButton.textContent = 'View details';
                        yourWorkViewButton.addEventListener('click', function () {
                            router.navigate('/courses/' + courseID + '/classwork/' + curr.id);
                        });
                        if (!curr.comments.length) {
                            assignmentBarClone.getElementById('your-work-comments').style.display = 'none';
                            commentsNum.style.display = 'none';
                        }
                        assignmentBarContainer.appendChild(assignmentBarClone);
                    });
                    handleClicksForAssignments();
                });
            });
    }
}