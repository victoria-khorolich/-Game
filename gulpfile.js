var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    // rimraf = require('rimraf'),
    gcmq = require('gulp-group-css-media-queries'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {

    build: { // paths to build
        html: './',
        js: './js/',
        css: './css/',
        img: './images/',
        libs: './libs/',
        fonts: './fonts/'
    },

    src: { // paths to source files
        html: './src/*.html',
        js: './src/js/app.js',
        scss: './src/scss/app.scss',
        img: './src/images/**/*.*',
        libs: './src/libs/**/*.*',
        fonts: './src/fonts/**/*.*'
    },

    watch: { // paths to modify files
        html: './src/**/*.html',
        js: './src/js/**/*.js',
        scss: './src/scss/**/*.scss',
        img: './src/images/**/*.*',
        libs: './src/libs/**/*.*',
        fonts: './src/fonts/**/*.*'
    },

    clean: './dist/'
};

var sassPaths = [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src',
    'node_modules/fa-scss-plus'
];

var config = {
    server: {
        baseDir: "./"
    },
    tunnel: '',
    host: 'localhost',
    port: 9000,
    logPrefix: "RE",
    open: true
};

gulp.task('webserver', function () { // <- init localserver
    browserSync.init(config);
});

gulp.task('clean', function (cb) { // <- clear
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () { // <- task to build html
    gulp.src(path.src.html)
        .pipe(rigger().on("error", notify.onError("Rigger: <%= error.message %>")))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () { // <- task to build fonts
    gulp.src(path.src.fonts)
        .pipe(rigger().on("error", notify.onError("Rigger: <%= error.message %>")))
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () { // <- task to build js
    gulp.src(path.src.js)
        .pipe(rigger().on("error", notify.onError("Rigger: <%= error.message %>")))
        // .pipe(sourcemaps.init())
        .pipe(uglify().on("error", notify.onError("JS-Error: <%= error.message %>")))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('libs:build', function () { // <- task to build libs
    gulp.src(path.src.libs)
        .pipe(gulp.dest(path.build.libs))
        .pipe(reload({stream: true}));
});

gulp.task('scss:build', function () { // <- task to build scss
    gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: sassPaths,
            outputStyle: 'compressed'
        }).on("error", notify.onError("SCSS-Error: <%= error.message %>")))
        .pipe(prefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gcmq())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('images:build', function () { // <- task to build images
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'scss:build',
    'js:build',
    'images:build',
    'libs:build',
    'fonts:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.scss], function (event, cb) {
        gulp.start('scss:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('images:build');
    });
    watch([path.watch.libs], function (event, cb) {
        gulp.start('libs:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'watch', 'webserver']);
