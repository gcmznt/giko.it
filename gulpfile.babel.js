const paths = {
    scss: './src/assets/scss/**/*.scss',
    js: 'src/assets/js/*.js',
    jade: './src/**/*.jade',
    svg: './src/assets/icons/*.svg',
    images: 'src/assets/img/*',
    pdf: 'src/assets/pdf/*',
    copy: 'src/{assets/pdf/*}',
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
import rename from 'gulp-rename';
gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()],
        }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(rename(function(path) { path.extname += '.webp'; }))
        .pipe(imageminWebp()())
        .pipe(gulp.dest('dist/assets/img'));
});

import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
gulp.task('scripts', function() {
    return gulp.src(paths.js)
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/'));
});

gulp.task('copy', function() {
    return gulp.src(paths.pdf)
        .pipe(gulp.dest('dist/assets/pdf/'));
});

import replace from 'gulp-replace-task';
gulp.task('version', function() {
    return gulp.src('src/giko.appcache')
        .pipe(replace({
            patterns: [{
                match: 'timestamp',
                replacement: new Date().getTime(),
            }],
        }))
        .pipe(gulp.dest('dist'));
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
    const fn = () => rimraf('./dist', cb);
    rimraf('./rev-manifest.json', fn);
});

import rev from 'gulp-rev';
gulp.task('revision', ['build', 'version'], function() {
    return gulp.src(['dist/**/*.css', 'dist/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./'));
});

import revReplace from 'gulp-rev-replace';
gulp.task('revreplace', ['revision'], function() {
    return gulp.src('./dist/*')
        .pipe(revReplace({
            replaceInExtensions: ['.html', '.appcache'],
            manifest: gulp.src('./rev-manifest.json'),
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch(paths.jade, ['templates']);
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.svg, ['icons']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.copy, ['copy']);
});

gulp.task('build', ['images', 'templates', 'styles', 'scripts', 'copy']);

import rsync from 'gulp-rsync';
gulp.task('deploy', ['revreplace'], function() {
    return gulp.src('dist/**')
        .pipe(rsync({
            root: 'dist',
            hostname: 'giko',
            destination: '/var/vhosts/giko.it/docroot',
            incremental: true,
            progress: true,
        }));
});
