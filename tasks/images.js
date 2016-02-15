import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import pngquant from 'imagemin-pngquant';
import rename from 'gulp-rename';

module.exports = function(source, dest) {
    return function() {
        return gulp.src(source)
            .pipe(imagemin({
                progressive: true,
                use: [pngquant()],
            }))
            .pipe(gulp.dest(dest))
            .pipe(rename(function(path) { path.extname += '.webp'; }))
            .pipe(imageminWebp()())
            .pipe(gulp.dest(dest));
    };
};
