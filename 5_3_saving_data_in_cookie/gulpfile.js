var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');

gulp.task('babel', () => {
    return gulp.src('src/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('browserify', ['babel'], () => {
    gulp.src('dist/main.js')
        .pipe(browserify({
            insertGlobals : true,
        }))
        .pipe(gulp.dest('./js/'))
});

gulp.task('default', ['browserify']);