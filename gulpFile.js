const { dest, parallel, watch, src } = require('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

const styles = () => {
  return src('./src/assets/scss/*.scss')
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({
      cascade: true,
      overrideBrowserslist: ['last 5 versions']
    }))
    .pipe(concat('main.css'))
    .pipe(dest('./public/css/'));
}

const watching = () => {
  watch('./src/assets/scss/*.scss', parallel(styles));
}

exports.build = parallel(styles);
exports.default = parallel(exports.build, watching);