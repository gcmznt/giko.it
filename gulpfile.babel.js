import gulp from 'gulp';
import sequence from 'gulp-sequence';
import sriHash from 'gulp-sri-hash';
import rimraf from 'rimraf';
import inlinesource from 'gulp-inline-source';
import rev from 'gulp-rev';
import revdel from 'gulp-rev-delete-original';
import revReplace from 'gulp-rev-replace';
import rsync from 'gulp-rsync';
import browserSync from 'browser-sync';
import wbBuild from 'workbox-build';
import brotli from 'gulp-brotli';
import gzip from 'gulp-gzip';

import jade from './tasks/templates.js';
import icons from './tasks/icons.js';
import less from './tasks/styles.js';
import images from './tasks/images.js';
import scripts from './tasks/scripts.js';

const run = (...args) => function(cb) {
  sequence(...args)(cb);
};

const paths = {
  less: './src/assets/less/*.less',
  js: './src/assets/js/*.js',
  jade: './src/**/*.jade',
  icons: './src/assets/icons/*.svg',
  images: './src/assets/img/**/*.*',
  copy: './src/{humans.txt,manifest.json,sw.js,assets/pdf/*,browserconfig.xml,favicon.ico,safari-pinned-tab.svg}',
  dest: './dist/',
  temp: './.tmp/',
  destTemplates: './.tmp/',
  destStyles: './.tmp/assets/css',
  destImages: './.tmp/assets/img',
  destIcons: './.tmp/assets/icons',
  destScripts: './.tmp/assets/js',
};

gulp.task('clean', (cb) => rimraf('{./.tmp,./dist}', cb));

gulp.task('templates', jade(paths.jade, paths.destTemplates));
gulp.task('styles', less(paths.less, paths.destStyles));
gulp.task('icons', icons(paths.icons, paths.destIcons));
gulp.task('images', images(paths.images, paths.destImages));
gulp.task('scripts', scripts(paths.js, paths.destScripts));
gulp.task('copy', () => gulp
  .src(paths.copy)
  .pipe(gulp.dest(paths.dest))
);

gulp.task('inlinesource', () => gulp
  .src('./.tmp/*.html')
  .pipe(inlinesource())
  .pipe(gulp.dest(paths.dest))
);
gulp.task('revision', () => gulp
  .src(['./.tmp/**/*.+(css|js|svg|webp|jpg|jpeg|png)', '!sw.js'])
  .pipe(rev())
  .pipe(gulp.dest(paths.dest))
  .pipe(rev.manifest({ merge: true }))
  .pipe(gulp.dest(paths.temp))
);
gulp.task('revreplace', () => gulp
  .src('./dist/**')
  .pipe(revReplace({
    manifest: gulp.src('./.tmp/rev-manifest.json'),
    replaceInExtensions: ['.js', '.css', '.html', '.json', '.xml'],
  }))
  .pipe(gulp.dest(paths.dest))
);
gulp.task('sri', () => gulp
  .src(paths.dest + '*.html')
  .pipe(sriHash())
  .pipe(gulp.dest('dist'))
);
gulp.task('copyMap', () => gulp
  .src('./.tmp/**/*.map')
  .pipe(gulp.dest(paths.dest))
);

gulp.task('bundle-sw', () => {
  // return wbBuild.generateSW({
  //   globDirectory: './dist/',
  //   swDest: './dist/sw.js',
  //   globPatterns: ['**\/*.{html,js,css,webp,jpg,png,svg}'],
  //   globIgnores: [],
  // })
  // .then(() => {
  //   console.log('Service worker generated.');
  // })
  // .catch((err) => {
  //   console.log('[ERROR] This happened: ' + err);
  // });
});

gulp.task('gzip', () => gulp
  .src('./dist/assets/**/*', { base: './dist' })
  .pipe(gzip({
    gzipOptions: {
      level: 9,
    },
  }))
  .pipe(gulp.dest(paths.dest))
);

gulp.task('brotli', () => gulp
  .src('./dist/assets/**/*', { base: './dist' })
  .pipe(brotli.compress({
    quality: 11,
  }))
  .pipe(gulp.dest(paths.dest))
);

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.jade, ['fullTemplates']);
  gulp.watch(paths.less, ['fullStyles']);
  gulp.watch(paths.icons, ['fullIcons']);
  gulp.watch(paths.images, ['fullImages']);
  gulp.watch(paths.js, ['fullScripts']);
  gulp.watch(paths.copy, ['fullCopy']);
});

const bs = browserSync.create();
gulp.task('serve', ['watch'], () => {
  bs.init({
    open: false,
    ui: false,
    notify: false,
    server: { baseDir: paths.dest },
  });
  bs.watch('./dist/**/*[!.map]').on('change', bs.reload);
});

gulp.task('deploy', ['build'], () => gulp
  .src('dist/**')
  .pipe(rsync({
    root: 'dist',
    hostname: 'giko',
    destination: '/var/vhosts/giko.it/docroot',
    incremental: true,
    progress: true,
    chmod: 'Du=rwx,Dgo=rx,Fu=rw,Fog=r',
  }))
);


gulp.task('compile', ['copy', 'icons', 'images', 'templates', 'scripts', 'styles']);
gulp.task('post', function(callback) {
  sequence('inlinesource', 'revision', 'revreplace', 'sri', 'bundle-sw', 'copyMap')(callback);
});

gulp.task('fullTemplates', run('templates', 'post'));
gulp.task('fullStyles', run('styles', 'post'));
gulp.task('fullIcons', run('icons', 'post'));
gulp.task('fullImages', run('images', 'post'));
gulp.task('fullScripts', run('scripts', 'post'));
gulp.task('fullCopy', run('copy', 'post'));

gulp.task('build', run('clean', 'compile', 'post', ['gzip', 'brotli']));

// 'serve'
// 'deploy'
