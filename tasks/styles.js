import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';

module.exports = function(source, dest) {
    return function() {
        return gulp.src(source)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(cssnano())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(dest));
    };
};
