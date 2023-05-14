import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

//styles
export const styles = () => {
  return gulp.src('source/sass/style.scss', {sourcemaps: true})
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', {sourcemaps: '.'}))
    .pipe(browser.stream());
}

//html
export const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
}

//scripts
export const scripts = () => {
  return gulp.src('source/js/*.js', {sourcemaps: true})
    .pipe(terser())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('build/js'))
}

//images
export const imagesBuild = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

export const imagesDev = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(gulp.dest('build/img'));
}

//webp
export const createWebp = () => {
  return gulp.src(['source/img/**/*.{jpg,png}', '!source/img/favicons/*.{jpg,png}'])
    .pipe(squoosh({
      webp: {},
    }))
    .pipe(gulp.dest('build/img'));
}

//svg
export const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

export const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

//copy
export const copy = (done) => {
  gulp.src([
    "source/fonts/**/*.{woff2,woff}",
    "source/manifest.webmanifest",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

//clean
export const clean = () => {
  return deleteAsync("build");
};

//server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const reload = (done) => {
  browser.reload();
  done();
}

//watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

export const build = gulp.series(
  clean,
  copy,
  imagesBuild,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
);

export default gulp.series(
  clean,
  copy,
  imagesDev,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
