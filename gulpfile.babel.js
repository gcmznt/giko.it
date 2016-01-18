const paths = {
    scss: './src/assets/scss/**/*.scss',
    js: 'src/assets/js/*.js',
    jade: './src/**/*.jade',
    svg: './src/assets/icons/*.svg',
    images: 'src/assets/img/*',
    pdf: 'src/assets/pdf/*',
};
import gulp from 'gulp';

import jade from 'gulp-jade';
import htmlmin from 'gulp-htmlmin';
gulp.task('templates', ['icons'], function() {
    return gulp.src(paths.jade)
        .pipe(jade({
            locals: {},
            pretty: true,
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeOptionalTags: true,
        }))
        .pipe(gulp.dest('./dist/'));
});

import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import rsp from 'remove-svg-properties';
gulp.task('icons', function() {
    return gulp.src(paths.svg)
        .pipe(rsp.stream.remove({ properties: [rsp.stream.PROPS_FILL] }))
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest('./src/assets/icons/sprite/'));
});

import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
gulp.task('styles', function() {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets/css'));
});

import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import pngquant from 'imagemin-pngquant';
gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()],
        }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(imageminWebp()())
        .pipe(gulp.dest('dist/assets/img'));
});

import babel from 'gulp-babel';
import uglify from 'gulp-uglifyjs';
gulp.task('scripts', function() {
    return gulp.src(paths.js)
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/'));
});

gulp.task('pdf', function() {
    return gulp.src(paths.pdf)
        .pipe(gulp.dest('dist/assets/pdf/'));
});

const browserSync = require('browser-sync').create();
gulp.task('serve', ['watch'], function() {
    browserSync.init({
        open: false,
        ui: false,
        notify: false,
        server: {
            baseDir: './dist/',
        },
    });
    browserSync.watch('./dist/**/*[!.map]').on('change', browserSync.reload);
});

import rimraf from 'rimraf';
gulp.task('clean', function(cb) {
    rimraf('./dist', cb);
});

gulp.task('watch', ['build'], function() {
    gulp.watch(paths.jade, ['templates']);
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.svg, ['icons']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.pdf, ['pdf']);
});

gulp.task('build', ['images', 'templates', 'styles', 'scripts', 'pdf']);
