import gulp from 'gulp';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';
import rsp from 'remove-svg-properties';

module.exports = function(source, dest) {
    return function() {
        return gulp.src(source)
            .pipe(rsp.stream.remove({ properties: [rsp.stream.PROPS_FILL] }))
            .pipe(svgo())
            .pipe(svgstore({ inlineSvg: false }))
            .pipe(gulp.dest(dest));
    };
};
