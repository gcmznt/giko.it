import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import rsp from 'remove-svg-properties';

module.exports = function(source, dest) {
    return function() {
        return gulp.src(source)
            .pipe(rsp.stream.remove({ properties: [rsp.stream.PROPS_FILL] }))
            .pipe(svgmin())
            .pipe(svgstore({ inlineSvg: true }))
            .pipe(gulp.dest(dest));
    };
};
