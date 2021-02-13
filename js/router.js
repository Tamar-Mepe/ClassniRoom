const router = new Navigo('/');
const renderer = (match, callback, navigo = null) => {
    if (navigo == null) {
        callback(match).then(() => {
            router.updatePageLinks();
        });
    } else {
        callback(match, navigo).then(() => {
            router.updatePageLinks();
        });
    }
}

router
    .on('/', (match) => (renderer(match, indexController.index)))
    .on('/login', (match) => (renderer(match, loginController.login, router)))
    .on('/courses', (match) => (renderer(match, coursesController.index)))
    .on('/courses/:id', (match) => (renderer(match, coursesController.show)))
    .on('/courses/:id/students', (match) => (renderer(match, coursesController.students)))
    .on('/courses/:id/classwork', (match) => (renderer(match, coursesController.classwork, router)))
    .on('/courses/:id/classwork/:classworkid', (match) => (renderer(match, coursesController.classworkInner)))
    .on('/courses/:id/classwork-assignments', (match) => (renderer(match, coursesController.classworkAssignments, router)))
    .resolve();
