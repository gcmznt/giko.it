import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';
import rename from 'gulp-rename';

module.exports = function(source, dest) {
    return function() {
        return gulp.src(source)
            .pipe(imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(gulp.dest(dest))
            .pipe(rename(function(path) { path.extname = '.webp'; }))
            .pipe(imageminWebp()())
            .pipe(gulp.dest(dest));
    };
};
