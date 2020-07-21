const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const { src, series, dest, watch, parallel } = require('gulp');

function style() {
  return gulp.src('assets/css/**/*.scss')
  .pipe(sass())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
}
function script() {
  return gulp.src('assets/js/**/*.js')
  .pipe(concat('script.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
}

function watchh() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('assets/css/**/*.scss', style);
  gulp.watch('assets/js/**/*.js', script);
  gulp.watch('*.html').on('change', browserSync.reload);
  // gulp.watch('assets/js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.script = script;
exports.watchh = watchh;
exports.default = parallel(style, watchh, script); 