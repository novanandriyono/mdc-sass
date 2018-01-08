var gulp 	= require('gulp');
var replace = require('gulp-replace');
var copy    = gulp.src(['node_modules/@material/**/*.scss'])
.pipe(replace('@import "@material','@import "node_modules/mdc-sass/dist/@material'))
.pipe(gulp.dest('./dist/@material'));

var theme = gulp.src('node_modules/@material/theme/*.scss').pipe(gulp.dest('./dist/theme/default/'));
console.log(copy);
console.log(theme);