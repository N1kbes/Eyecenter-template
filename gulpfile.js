var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('connect', function() {
  connect.server({
    port: 8080,
    root: 'src',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./src/css/*.css')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('png-build/*.png').pipe(spritesmith({
        imgName: 'sprite-icon.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('src/images'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/css/*.css', ['css']);
});

gulp.task('default', ['connect', 'watch']);
