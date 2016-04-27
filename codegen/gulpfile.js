/**
 * Created by zhuxijun on 16-4-27.
 */

var gulp = require('gulp');
var del = require('del');

var option = {

}

gulp.task('clear', function () {
    return del(['build']);
});

gulp.task('default', ['clear']);