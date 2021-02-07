import { indexController } from './modules/index.js';
import { loginController } from './modules/login.js';
import { coursesController } from './modules/courses.js';

const router = new Navigo('/', { hash: true });
router
    .on('/', indexController.index)
    .on('/login', loginController.login)
    .on('/courses', coursesController.index)
    .on('/courses/:id', coursesController.show)
    .on('/courses/:id/students', coursesController.students)
    .on('/courses/:id/classwork', coursesController.classwork)
    .on('/courses/:id/classwork/:classworkid', coursesController.classworkInner)
    .on('/courses/:id/classwork-assignments', coursesController.classworkAssignments)
    .resolve();
