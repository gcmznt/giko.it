import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

module.exports = function(source, dest) {
    return function() {
        return gulp.src(source)
            .pipe(babel({ presets: ['es2015'] }))
            .pipe(uglify())
            .pipe(gulp.dest(dest));
    };
};
