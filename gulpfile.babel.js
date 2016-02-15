import gulp from 'gulp';

const paths = {
    scss: './src/assets/scss/**/*.scss',
    js: 'src/assets/js/*.js',
    jade: './src/**/*.jade',
    svg: './src/assets/icons/*.svg',
    svgSprite: './src/assets/icons/sprite/',
    images: 'src/assets/img/*',
    pdf: 'src/assets/pdf/*',
    copy: 'src/{assets/pdf/*}',
    dest: './dist/',
    destStyles: './dist/assets/css',
    destImages: './dist/assets/img',
    destScripts: './dist/assets/js',
};

import jade from './tasks/templates.js';
gulp.task('templates', ['icons'], jade(paths.jade, paths.dest));

import svg from './tasks/icons.js';
gulp.task('icons', svg(paths.svg, paths.svgSprite));

import scss from './tasks/styles.js';
gulp.task('styles', scss(paths.scss, paths.destStyles));

import images from './tasks/images.js';
gulp.task('images', images(paths.images, paths.destImages));

import scripts from './tasks/scripts.js';
gulp.task('scripts', scripts(paths.js, paths.destScripts));

gulp.task('copy', function() {
    return gulp.src(paths.pdf)
        .pipe(gulp.dest('dist/assets/pdf/'));
});

import replace from 'gulp-replace';
gulp.task('version', function() {
    return gulp.src('src/giko.appcache')
        .pipe(replace('@@timestamp', new Date().getTime()))
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
