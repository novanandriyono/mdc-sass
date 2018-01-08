var gulp 	= require('gulp');
var replace = require('gulp-replace');
var disablevar = gulp.src('node_modules/@material/theme/_mixins.scss')
.pipe(replace('@import','// @import'))
.pipe(gulp.dest("./dist/@material/theme/"));
console.log(disablevar);
