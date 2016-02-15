import gulp from 'gulp';
import jade from 'gulp-jade';
import htmlmin from 'gulp-htmlmin';

module.exports = function(source, dest) {
    return function() {
        return gulp.src(source)
            .pipe(jade({
                locals: {},
                pretty: true,
            }))
            .pipe(htmlmin({
                collapseWhitespace: true,
                removeOptionalTags: true,
            }))
            .pipe(gulp.dest(dest));
    };
};
