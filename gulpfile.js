const gulp = require('gulp');
const minify = require('gulp-minify');

gulp.task('minify-js', () => {
    return gulp.src('index.js') // ou le fichier à minifier
        .pipe(minify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('minify-js'));
