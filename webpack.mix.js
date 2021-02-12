const mix = require('laravel-mix')

mix.styles([
    'css/styles.css'
], 'css/app.css');

mix.scripts([
    'js/navigo.min.js',
    'js/script.js',
    'js/modules/index.js',
    'js/modules/login.js',
    'js/modules/courses.js',
    'js/router.js'
], 'js/app.js');